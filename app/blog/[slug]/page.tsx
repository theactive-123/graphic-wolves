import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import FooterSection from '@/components/layout/Footer/FooterSection';
import PostContent from '@/components/blog/PostContent/PostContent';
import RecommendedArticles from '@/components/blog/RecommendedArticles/RecommendedArticles';
import { getPostBySlug, getRelatedPosts } from '@/lib/wordpress/posts';
import { getFeaturedImage, getPostCategories } from '@/lib/wordpress/types';
import styles from './post.module.css';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getBlogMetaDescription(post: Awaited<ReturnType<typeof getPostBySlug>>): string {
  if (!post) return 'Read the latest article from Graphic Wolves.';

  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160);
  if (excerpt) return excerpt;

  const content = stripHtml(post.content.rendered).slice(0, 160);
  return content || 'Read the latest article from Graphic Wolves.';
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post Not Found | Graphic Wolves' };

  const image = getFeaturedImage(post);
  const title = stripHtml(post.title.rendered) || 'Graphic Wolves Blog';
  const description = getBlogMetaDescription(post);

  return {
    title: `${title} | Graphic Wolves Blog`,
    description,
    openGraph: {
      title: `${title} | Graphic Wolves Blog`,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      ...(image && {
        images: [{ url: image.source_url, alt: image.alt_text || title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Graphic Wolves Blog`,
      description,
      ...(image && { images: [image.source_url] }),
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const categories = getPostCategories(post);
  const primaryCategoryId = categories[0]?.id;

  const relatedPosts = primaryCategoryId
    ? await getRelatedPosts(primaryCategoryId, post.id, 3)
    : [];

  return (
    <main className={styles.main}>
      <Header />
      <PostContent post={post} />
      {relatedPosts.length > 0 && <RecommendedArticles posts={relatedPosts} />}
      <FooterSection />
    </main>
  );
}
