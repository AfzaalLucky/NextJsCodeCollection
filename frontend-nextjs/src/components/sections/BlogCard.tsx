import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/api';

export default function BlogCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString('en-AE', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="card group block">
      {post.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {post.categories.length > 0 && (
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
            {post.categories[0].name}
          </span>
        )}
        <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        <time className="mt-4 block text-xs text-gray-400">{date}</time>
      </div>
    </Link>
  );
}
