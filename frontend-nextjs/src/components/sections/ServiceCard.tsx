import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/lib/api';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group card flex flex-col">
      {/* Image or icon placeholder */}
      {service.featuredImage ? (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={service.featuredImage.url}
            alt={service.featuredImage.alt || service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {service.price && (
            <span className="absolute top-3 right-3 bg-secondary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {service.price}
            </span>
          )}
        </div>
      ) : (
        <div className="h-52 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center relative">
          <span className="text-5xl">{service.icon || '📦'}</span>
          {service.price && (
            <span className="absolute top-3 right-3 bg-secondary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {service.price}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {service.icon && service.featuredImage && (
          <span className="text-2xl mb-2 block">{service.icon}</span>
        )}

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-snug mb-2">
          {service.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {service.excerpt}
        </p>

        {/* Features preview */}
        {service.features && service.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {service.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          {!service.featuredImage && service.price ? (
            <span className="text-sm font-bold text-secondary-500">{service.price}</span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all">
            View Details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
