import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/lib/api';

const StarIcon = () => (
  <svg className="w-4 h-4 fill-secondary-500" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface Props {
  service: Service;
}

export default function ServiceHero({ service }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-gray-950 via-primary-900 to-gray-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Background image with overlay */}
      {service.featuredImage && (
        <div className="absolute inset-0">
          <Image
            src={service.featuredImage.url}
            alt=""
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-blue-300 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-blue-200">{service.title}</span>
        </nav>

        <div className="max-w-3xl">
          {/* Icon */}
          {service.icon && (
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 border border-white/20">
              {service.icon}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            {service.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
            {service.excerpt}
          </p>

          {/* Trust signals */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <span className="text-sm text-blue-200">
              <span className="font-bold text-white">4.9/5</span> from 1,200+ reviews
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-amber text-base">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Get Free Quote
            </Link>
            <a href="tel:+971500000000" className="btn-outline-white text-base">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>

        {/* Price badge */}
        {service.price && (
          <div className="absolute top-8 right-6 md:right-8 hidden md:block">
            <div className="bg-secondary-500 text-white rounded-2xl px-5 py-3 text-center shadow-lg">
              <p className="text-xs font-medium text-amber-100 mb-0.5">Starting from</p>
              <p className="text-2xl font-bold">{service.price}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
