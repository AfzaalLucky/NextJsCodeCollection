import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getCategories, getCategorySlugs } from '@/lib/api';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import BlogCard from '@/components/sections/BlogCard';

export const revalidate = 1800;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getCategorySlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories().catch(() => []);
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.name} — Moving Tips & Guides`,
    description:
      cat.description ||
      `Browse all ${cat.name} articles from Dubai Movers Pro. Expert advice for your move.`,
    canonical: `${SITE_URL}/blog/category/${cat.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const [posts, categories] = await Promise.all([
    getPostsByCategory(params.slug, 1, 12).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const currentCategory = categories.find((c) => c.slug === params.slug);
  if (!currentCategory) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-primary-600">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{currentCategory.name}</span>
      </nav>

      <div className="text-center mb-10">
        <h1 className="section-title">{currentCategory.name}</h1>
        {currentCategory.description && (
          <p className="section-subtitle max-w-2xl mx-auto">{currentCategory.description}</p>
        )}
        <p className="text-sm text-gray-400 mt-2">{currentCategory.count} articles</p>
      </div>

      {/* Category filter tabs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
          >
            All Posts
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat.slug === params.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              {cat.name}
              <span className={`ml-1 text-xs ${cat.slug === params.slug ? 'text-primary-200' : 'text-gray-400'}`}>
                ({cat.count})
              </span>
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No posts in this category yet.</p>
          <Link href="/blog" className="btn-primary">Browse All Articles</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
