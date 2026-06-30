import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/lib/api';

interface Props {
  services: Service[];
  currentSlug: string;
}

export default function RelatedServices({ services, currentSlug }: Props) {
  const related = services.filter((s) => s.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">You Might Also Need</h2>
          <p className="text-gray-500 text-sm mt-1">Explore our other professional services</p>
        </div>
        <Link
          href="/services"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          All Services
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group card p-0 flex flex-col"
          >
            {service.featuredImage ? (
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={service.featuredImage.url}
                  alt={service.featuredImage.alt || service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ) : (
              <div className="h-40 w-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                <span className="text-4xl">{service.icon || '📦'}</span>
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 flex-1">{service.excerpt}</p>
              <div className="flex items-center justify-between mt-4">
                {service.price && (
                  <span className="text-sm font-semibold text-primary-600">{service.price}</span>
                )}
                <span className="text-xs font-semibold text-primary-600 flex items-center gap-1 ml-auto">
                  Learn more
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
