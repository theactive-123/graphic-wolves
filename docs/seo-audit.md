> Follow-up status, fixes, and remaining hosting actions: [November 13 SEO status](seo-status.md). The report below records the original audit.

# Technical SEO audit ? Graphic Wolves

Reviewed November 12, 2026. Changes are local and have not been deployed.

## Inspection and production baseline

- Next.js 15.5.28, App Router, TypeScript, Node server build; no static-export configuration. No repository hosting configuration, proxy configuration, or deployment credentials were present.
- Production response headers identify Hostinger/hPanel and hcdn, with Next.js serving the application. Existing HTTP-to-HTTPS normalization occurs upstream, before Next.js.
- All seven distinct requested destinations returned live HTTPS HTTP 200 with no redirect (HEAD requests).
- All ten legacy PHP paths returned live HTTPS HTTP 404 on both www and non-www hosts before deployment.
- HTTP legacy requests currently receive a 301 to the same legacy path on HTTPS, retaining queries. This creates an additional hop once the application redirects are deployed unless the edge rules are updated as described below.
- WordPress REST API is the actual blog source. The local case-study array contains **10**, rather than nine, case studies, including Beyrmedia. All ten are retained and included.
- Existing static sitemap omitted case studies, posts, category archives, and the indexable scheduling page. Several static pages and case studies lacked canonicals; some titles repeated the brand through the inherited template.

## Implemented changes

- Explicit 301 redirects in next.config.ts use the shared legacy map. Absolute HTTPS non-www destinations combine path and host normalization. Queries are retained by Next.js; no destination redirects to another page. A subsequent host-matched www rule handles other paths.
- The explicit status code is intentional: [Next.js permanent: true produces 308](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects). No middleware or changes to forms/API routing were introduced.
- Replaced public/sitemap.xml with app/sitemap.ts. It enumerates all indexable static pages, actual local case studies, all published public WordPress posts, and category archives. Both WordPress inventories paginate beyond 100 items. Password-protected and Yoast-noindex posts are excluded; their page metadata also emits noindex. No API routes, redirects, or missing routes are listed.
- Sitemap is evaluated dynamically, using the shared WordPress fetch cache (60 seconds for posts, one hour for categories). An upstream failure fails the request rather than returning an incomplete successful sitemap.
- Production URL origin is https://graphicwolves.com. Indexable pages have self-referencing canonicals. The root canonical may serialize without its final slash; it resolves to the same root URL. Dynamic titles and descriptions come from each actual post or case study, and inherited brand duplication was corrected.
- Static lastModified values are recorded source revision dates in lib/seo-dates.json, including the date of this metadata review for affected pages. Case studies use the actual content file Git revision date. Posts use WordPress modified_gmt in UTC; category dates use the latest eligible member post. Empty categories omit an unsupported modification date. Dates do not change merely because the sitemap is requested. Maintain this manifest when changing static content or case studies.
- robots.txt permits indexable routes and references the production sitemap.
- Homepage meaningful images already had project/client/tool text alternatives; improved service project descriptions. Decorative shapes, glows, stickers, and duplicated review marquees retain empty alt text. Project carousels continue to use case-study image descriptions. The rendered homepage and e-commerce page have no images missing alt attributes.
- Homepage retains its single H1, sections, service links, project links, and functionality. Removed the existing suggestion of Google speed rewards from a service description while preserving its performance message. No service, testimonial, pricing, or company claims were added.
- E-commerce retains its H1 and existing Shopify service content. Made the core-service section title an H2 above its H3 service cards using its existing CSS class. Clarified the metadata title to reflect Shopify e-commerce design and development, and added Service/BreadcrumbList JSON-LD supported by existing content. Organization schema now has a production URL and a stable ID referenced by the service. No offers, ratings, partner credentials, or pricing schema was invented.
- No layout or stylesheet changes, redesign, content-section removal, new marketing page, or dependency installation.

## Legacy redirect map

| Legacy path | Final path on https://graphicwolves.com |
| --- | --- |
| `/contact-us.php` | `/contact` |
| `/about-us.php` | `/about` |
| `/logo-design.php` | `/services/branding` |
| `/logo-package.php` | `/services/branding` |
| `/website-development.php` | `/services/web-development` |
| `/web-package.php` | `/services/web-development` |
| `/ecommerce-package.php` | `/services/e-commerce` |
| `/combo-package.php` | `/services` |
| `/nft-design.php` | `/services` |
| `/index.php` | `/` |

## Package-page proposals ? approval required before publishing

No dedicated package/pricing pages currently exist. The old logo/web/e-commerce package paths now redirect to their relevant services. Combo and NFT legacy paths redirect to the existing services overview as requested.

| Proposed URL | Source of intent | Required approved information |
| --- | --- | --- |
| /services/branding/packages | logo-package.php | Confirmed branding deliverables, scope, revision limits, timelines and quote or approved pricing details |
| /services/web-development/packages | web-package.php | Confirmed website scope, platform, features, responsibilities, maintenance and quote or approved pricing details |
| /services/e-commerce/packages | ecommerce-package.php | Confirmed store scope, platform, integrations, product setup, ongoing costs and quote or approved pricing details |
| /services/packages | combo-package.php | Only if a real combined package exists; confirmed inclusions and commercial terms |

Prefer one substantial package comparison page per service rather than numerous thin near-duplicate pages. Package pages should link to the parent service and relevant case studies, use their own canonicals and metadata, and enter the sitemap only once approved and published. Use actual currency, billing basis, tax treatment, exclusions and availability for any approved prices. A quote CTA can use the existing contact route when fixed prices are unavailable. Do not create an NFT package page without confirmation that it is an offered service. Keep the approved legacy map stable; reassess redirects separately if real package pages are later published.

## Validation

- npm.cmd run build ? PASS, optimized production build generated successfully, including all ten case-study routes and the dynamic sitemap.
- npm.cmd run typecheck ? PASS.
- npm.cmd run lint ? BLOCKED by existing setup: ESLint and a configuration are absent; next lint opens an interactive setup prompt and exits unsuccessfully in this environment. Build success does not substitute for a lint pass. Configure the project lint baseline separately; no lint findings were suppressed.
- npm.cmd run check:seo against the local production server on port 3100 ? PASS: **450 checks**, **31 sitemap URLs** (12 static + 10 case studies + 5 posts + 4 categories), **30 internal link targets**, zero failures.
- Route audit covers all sitemap URLs returning 200, self-referencing canonicals, no sitemap duplicates/noindex entries, exact inventory coverage against public WordPress and local source, unique post/case-study titles and descriptions, homepage/e-commerce H1 counts and image alt attributes, valid JSON-LD syntax, robots, legacy 301/query preservation on both virtual hosts, direct 200 destinations, www normalization and missing-route noindex behavior.
- All server-rendered same-site anchor targets across the sitemap returned 200 without redirects. The audit does not automate every interactive menu/carousel state, external-site availability, or image-resource availability.
- Existing blog/loading.tsx streams a response before missing post/category lookup completes. Consequently nonexistent blog posts/categories return HTTP 200 with the existing not-found UI and noindex; they are excluded from the sitemap. Ordinary missing pages and case studies return HTTP 404 with noindex. The checker explicitly records these streamed responses. Preserving the existing loading UI avoids a routing/layout change; strict HTTP 404 behavior for these dynamic blog misses would require a separate streaming/routing decision.
- One audit retry was needed after a transient public WordPress DNS error. The successful run used real content, with no fixtures or mocked responses.

Reproduce with npm.cmd run build, then npm.cmd run start -- --port 3100 in one terminal and npm.cmd run check:seo in another. SEO_BASE_URL can select another origin (the checker sends both production Host headers for virtual-host tests). The script loads the normal Next.js environment without printing secrets.

## Deployment and manual steps

1. Deploy the reviewed source as a Next.js Node application on Hostinger; static export cannot serve these redirects or dynamic content. Confirm both www and non-www DNS/TLS hosts reach this application.
2. To eliminate HTTP legacy redirect chains, configure the ten mappings at Hostinger/CDN **before** the generic HTTP-to-HTTPS or www redirect. Each legacy rule should send both hosts and both schemes directly to its mapped https://graphicwolves.com destination with status 301 and preserve the original query string. Generic normalization follows those specific rules. The application already combines host and path normalization for incoming HTTPS legacy requests. Upstream hosting controls were unavailable in this workspace, so these settings were not changed.
3. Purge Hostinger/CDN cached HTML and cached legacy 404s after deployment. Verify HTTP and HTTPS, www and non-www for every legacy path, with and without queries. Final targets must remain 200; avoid an intermediate legacy path or host.
4. Rerun the route checker against the deployed origin and confirm robots/sitemap freshness. Check an actual post and case study with a search-engine URL inspection tool, and submit https://graphicwolves.com/sitemap.xml in Search Console.
5. Configure ESLint and run the repository lint baseline. Review existing company statistics, testimonials, client claims, and Shopify Plus wording with the owner for factual accuracy; this audit retained existing content and did not independently substantiate it.
6. Approve real package scope and commercial information before implementing any proposal. Maintain source revision dates and review WordPress noindex settings when publishing.

No indexing or ranking outcome is guaranteed.

## Changed files

- app/about/page.tsx
- app/blog/[slug]/page.tsx
- app/blog/category/[slug]/page.tsx
- app/blog/page.tsx
- app/contact/page.tsx
- app/layout.tsx
- app/our-work/[slug]/page.tsx
- app/our-work/page.tsx
- app/page.tsx
- app/privacy-policy/page.tsx
- app/schedule/page.tsx
- app/services/e-commerce/page.tsx
- app/services/page.tsx
- app/terms-conditions/page.tsx
- components/home/FutureSection/FutureSection.tsx
- components/home/ServicesSection/ServicesSection.tsx
- components/services/e-commerce/EcommerceStatementSection/EcommerceStatementSection.tsx
- lib/wordpress/categories.ts
- lib/wordpress/posts.ts
- lib/wordpress/types.ts
- next.config.ts
- package.json
- public/robots.txt
- public/sitemap.xml (removed; replaced by app/sitemap.ts)
- app/sitemap.ts
- docs/seo-audit.md
- lib/legacy-redirects.json
- lib/seo-dates.json
- lib/seo.ts
- scripts/check-seo.mjs
