import { wpFetch } from './api';
import type { WordPressCategory } from './types';

export async function getCategories(): Promise<WordPressCategory[]> {
  const categories: WordPressCategory[] = [];
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const { data, headers } = await wpFetch<WordPressCategory[]>('/categories', {
      params: { per_page: 100, page },
      revalidate: 3600,
    });
    categories.push(...data);
    totalPages = Number(headers.get('X-WP-TotalPages') || 1);
  }
  return categories;
}

export async function getCategoryBySlug(
  slug: string
): Promise<WordPressCategory | null> {
  const { data } = await wpFetch<WordPressCategory[]>('/categories', {
    params: { slug },
    revalidate: 3600,
  });
  return data[0] ?? null;
}
