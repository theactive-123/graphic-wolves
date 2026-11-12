import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import http from 'node:http';
import https from 'node:https';
const require = createRequire(import.meta.url);
require('@next/env').loadEnvConfig(process.cwd());
const origin = 'https://graphicwolves.com';
const base = process.env.SEO_BASE_URL || (process.argv.includes('--live') ? origin : 'http://localhost:3100');
const legacy = JSON.parse(readFileSync('lib/legacy-redirects.json', 'utf8'));
const failures = [];
const hostingFindings = [];
let checks = 0;
function check(ok, message) { checks++; if (!ok) failures.push(message); }
const cache = new Map();
function request(path, headers = {}) {
  // Node fetch can override Host; raw HTTP lets us test the actual virtual host.
  const url = new URL(path, base);
  // For remote runs, connect to the real hostname so TLS/SNI and CDN routing are tested too.
  if (headers.host && !["localhost", "127.0.0.1"].includes(new URL(base).hostname)) url.hostname = headers.host;
  const transport = url.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = transport.get(url, { headers: { 'user-agent': 'facebookexternalhit/1.1', ...headers } }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, location: response.headers.location, body }));
      response.on('error', reject);
    });
    req.setTimeout(45000, () => req.destroy(new Error('Request timed out: ' + url.pathname)));
    req.on('error', reject);
  });
}
async function page(path) {
  if (!cache.has(path)) cache.set(path, request(path));
  return cache.get(path);
}
function decode(s) { return s.replace(/&amp;/g, '&').replace(/&#0*39;/g, "'").replace(/&quot;/g, '"'); }
async function wpAll(endpoint) {
  const records = [];
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const url = new URL((process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://blogs.graphicwolves.com/wp-json/wp/v2') + '/' + endpoint);
    url.searchParams.set('per_page', '100'); url.searchParams.set('page', String(page));
    if (endpoint === 'posts') url.searchParams.set('status', 'publish');
    const result = await fetch(url, { signal: AbortSignal.timeout(45000) });
    assert.equal(result.status, 200, 'WordPress inventory unavailable');
    records.push(...await result.json());
    totalPages = Number(result.headers.get('X-WP-TotalPages') || 1);
  }
  return records;
}
const [sitemap, posts, categories] = await Promise.all([request('/sitemap.xml'), wpAll('posts'), wpAll('categories')]);
check(sitemap.status === 200, 'sitemap must return 200');
const urls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]));
check(new Set(urls).size === urls.length, 'duplicate sitemap URLs');
const expected = new Set();
function collect(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.includes('[') && entry.name !== 'api') collect(dir + '/' + entry.name);
    if (entry.name === 'page.tsx') expected.add(origin + (dir.slice(3).replace(/\/\([^/]+\)/g, '') || '/'));
  }
}
collect('app');
const studies = [...readFileSync('components/case-studies/data.ts', 'utf8').matchAll(/(?:"slug"|slug):\s*"([^"]+)"/g)].map(m => '/our-work/' + m[1]);
check(studies.length >= 9, 'expected at least the nine requested case studies');
for (const path of studies) expected.add(origin + path);
for (const post of posts) if (!post.content.protected && post.yoast_head_json?.robots?.index !== 'noindex') expected.add(origin + '/blog/' + post.slug);
for (const category of categories) expected.add(origin + '/blog/category/' + category.slug);
for (const url of expected) check(urls.includes(url), 'missing sitemap URL: ' + url);
for (const url of urls) check(expected.has(url), 'unexpected sitemap URL: ' + url);
const links = new Set();
const titles = new Set(); const descriptions = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  const result = await page(path);
  check(result.status === 200, path + ' returns ' + result.status);
  const canonicals = [...result.body.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)];
  check(canonicals.length === 1 && new URL(decode(canonicals[0][1])).href === url, path + ': incorrect canonical');
  check(!/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(result.body), path + ': noindex in sitemap');
  for (const m of result.body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (/^(mailto:|tel:|javascript:|#)/i.test(href)) continue;
    const target = new URL(href, url);
    if (target.hostname === 'graphicwolves.com' || target.hostname === 'www.graphicwolves.com') links.add(target.pathname + target.search);
  }
  if (studies.includes(path) || (path.startsWith('/blog/') && !path.startsWith('/blog/category/'))) {
    const title = result.body.match(/<title>(.*?)<\/title>/)?.[1];
    const description = result.body.match(/<meta name="description" content="([^"]*)"/)?.[1];
    check(Boolean(title) && !titles.has(title), path + ': missing or duplicate title');
    check(Boolean(description) && !descriptions.has(description), path + ': missing or duplicate description');
    titles.add(title); descriptions.add(description);
  }
  if (path === '/' || path === '/services/e-commerce') {
    check([...result.body.matchAll(/<h1\b/g)].length === 1, path + ': expected one H1');
    for (const image of result.body.matchAll(/<img\b[^>]*>/g)) check(/\balt="[^"]*"/.test(image[0]), path + ': image missing alt');
    for (const script of result.body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try { JSON.parse(script[1]); check(true, 'valid JSON-LD'); } catch { check(false, path + ': invalid JSON-LD'); }
    }
  }
}
for (const path of links) check((await page(path)).status === 200, 'broken or redirected internal link: ' + path);
for (const [source, destination] of Object.entries(legacy)) {
  for (const host of ['graphicwolves.com', 'www.graphicwolves.com']) {
    const result = await request(source + '?utm_source=seo-check&ref=legacy', { host });
    check(result.status === 301, host + source + ': expected 301');
    check(result.location === origin + destination + '?utm_source=seo-check&ref=legacy', host + source + ': wrong destination or query loss');
  }
  check((await page(destination)).status === 200, destination + ': redirect destination must be 200');
}
const www = await request('/about?ref=host-check', { host: 'www.graphicwolves.com' });
check(www.status === 301 && www.location === origin + '/about?ref=host-check', 'www normalization');
const robots = await request('/robots.txt');
check(robots.status === 200 && robots.body.includes('Sitemap: ' + origin + '/sitemap.xml'), 'robots sitemap reference');
check(!/Disallow:\s*\//i.test(robots.body), 'robots blocks public pages');
const agents = [
  'Mozilla/5.0 SEO validation',
  'Googlebot/2.1 (+http://www.google.com/bot.html)',
  'facebookexternalhit/1.1',
];
for (const path of ['/missing-seo-route', '/our-work/missing-seo-study', '/blog/missing-seo-post', '/blog/category/missing-seo-category']) {
  for (const agent of agents) {
    const result = await request(path, { 'user-agent': agent });
    check(result.status === 404, path + ': expected HTTP 404 for ' + agent + ', got ' + result.status);
    check(/noindex/.test(result.body), path + ': expected noindex for ' + agent);
  }
}
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) {
  for (const [source, destination] of Object.entries(legacy)) {
    for (const host of ['graphicwolves.com', 'www.graphicwolves.com']) {
      let url = 'http://' + host + source + '?utm_source=seo-check&ref=legacy';
      const hops = [];
      let result;
      for (let hop = 0; hop < 4; hop++) {
        result = await request(url);
        if (result.status < 300 || result.status >= 400 || !result.location) break;
        hops.push({ status: result.status, location: result.location });
        url = new URL(result.location, url).href;
      }
      check(result?.status === 200 && url === origin + destination + '?utm_source=seo-check&ref=legacy', host + source + ': HTTP redirect does not reach the correct 200 destination');
      const direct = hops.length === 1 && hops[0]?.status === 301;
      check(direct, 'http://' + host + source + ': expected one 301 hop to the final HTTPS URL');
      if (!direct) hostingFindings.push({ source: 'http://' + host + source, hops });
    }
  }
}
const result = { checkedAt: new Date().toISOString(), target: base, checks, sitemapUrls: urls.length, caseStudies: studies.length, publishedPosts: posts.length, categories: categories.length, internalLinks: links.size, hostingFindings, failures };
const output = process.argv.find(arg => arg.startsWith('--output='))?.slice('--output='.length);
if (output) writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
