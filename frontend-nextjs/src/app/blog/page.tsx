import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/api';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import BlogCard from '@/components/sections/BlogCard';

export const revalidate = 1800;

export const metadata: Metadata = buildMetadata({
  title: 'Moving Tips & Guides Blog',
  description:
    'Expert moving tips, packing guides, and relocation advice from Dubai Movers Pro. Make your next move smooth and stress-free.',
  canonical: `${SITE_URL}/blog`,
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(1, 12).catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="section-title">Moving Tips & Guides</h1>
        <p className="section-subtitle max-w-2xl mx-auto">
          Expert advice to help you plan a smooth, stress-free move in Dubai and UAE.
        </p>
      </div>

      {/* Category filter tabs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-medium bg-primary-600 text-white"
          >
            All Posts
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors"
            >
              {cat.name}
              <span className="ml-1 text-xs text-gray-400">({cat.count})</span>
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No articles yet — check back soon!</p>
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
