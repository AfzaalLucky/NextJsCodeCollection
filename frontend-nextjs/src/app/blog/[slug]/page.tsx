import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPost, getPostSlugs } from '@/lib/api';
import { buildArticleMetadata, buildJsonLd, SITE_URL } from '@/lib/seo';

export const revalidate = 1800;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return {};
  return buildArticleMetadata({
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogImage: post.seo.ogImage || post.featuredImage?.url,
    datePublished: post.date,
    dateModified: post.modified,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.featuredImage?.url,
    publisher: {
      '@type': 'Organization',
      name: 'Dubai Movers Pro',
      url: SITE_URL,
    },
    author: {
      '@type': 'Organization',
      name: 'Dubai Movers Pro',
    },
  };

  const dateFormatted = new Date(post.date).toLocaleDateString('en-AE', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildJsonLd(schema) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary-600">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>

        {post.categories.length > 0 && (
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
            {post.categories.map((c) => c.name).join(', ')}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{post.title}</h1>

        <time className="text-sm text-gray-400" dateTime={post.date}>{dateFormatted}</time>

        {post.featuredImage && (
          <div className="relative h-72 w-full rounded-xl overflow-hidden my-8">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose-content mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
