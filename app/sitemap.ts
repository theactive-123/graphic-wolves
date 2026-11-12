import type { MetadataRoute } from "next";
import { caseStudies } from "@/components/case-studies/data";
import { getAllPublishedPosts, isIndexablePost } from "@/lib/wordpress/posts";
import { getCategories } from "@/lib/wordpress/categories";
import { absoluteUrl } from "@/lib/seo";
import sourceDates from "@/lib/seo-dates.json";

// Re-evaluate inventory per request; WordPress requests use the shared ISR cache.
// Let upstream failures fail the request instead of returning an incomplete sitemap.
export const dynamic = "force-dynamic";

function modified(post: { modified_gmt: string; date_gmt: string }): Date {
  return new Date((post.modified_gmt || post.date_gmt) + "Z");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPosts, categories] = await Promise.all([getAllPublishedPosts(), getCategories()]);
  const posts = allPosts.filter(isIndexablePost);
  const { caseStudies: studyDate, ...staticDates } = sourceDates;
  return [
    ...Object.entries(staticDates).map(([path, date]) => ({
      url: absoluteUrl(path), lastModified: new Date(date),
    })),
    ...caseStudies.map(({ slug }) => ({
      url: absoluteUrl('/our-work/' + slug), lastModified: new Date(studyDate),
    })),
    ...posts.map((post) => ({
      url: absoluteUrl('/blog/' + post.slug), lastModified: modified(post),
    })),
    ...categories.map((category) => {
      const members = posts.filter((post) => post.categories.includes(category.id));
      return {
        url: absoluteUrl('/blog/category/' + category.slug),
        ...(members.length > 0 && { lastModified: new Date(Math.max(...members.map((post) => modified(post).getTime()))) }),
      };
    }),
  ];
}
