import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/lib/api';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="card group block">
      {service.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={service.featuredImage.url}
            alt={service.featuredImage.alt || service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {service.icon && <span className="text-3xl mb-3 block">{service.icon}</span>}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{service.excerpt}</p>
        {service.price && (
          <p className="mt-3 text-primary-600 font-semibold">{service.price}</p>
        )}
        <span className="mt-4 inline-flex items-center text-primary-600 font-medium text-sm">
          Learn more
          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
