import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLocation, getLocationSlugs, getServices } from '@/lib/api';
import { buildMetadata, buildJsonLd, SITE_URL } from '@/lib/seo';
import ServiceCard from '@/components/sections/ServiceCard';

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getLocationSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = await getLocation(params.slug).catch(() => null);
  if (!location) return {};
  return buildMetadata({
    title: `Movers in ${location.city || location.title}`,
    description: location.seo.description || location.excerpt,
    canonical: `${SITE_URL}/locations/${location.slug}`,
    ogImage: location.seo.ogImage || location.featuredImage?.url,
  });
}

export default async function LocationPage({ params }: Props) {
  const [location, services] = await Promise.all([
    getLocation(params.slug).catch(() => null),
    getServices().catch(() => []),
  ]);

  if (!location) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/locations/${location.slug}`,
    name: `Dubai Movers Pro - ${location.city || location.title}`,
    url: `${SITE_URL}/locations/${location.slug}`,
    telephone: location.phone || '',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city || location.title,
      addressRegion: location.region || 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: location.city || location.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildJsonLd(schema) }}
      />

      {/* Hero */}
      <section className="bg-primary-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-primary-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Locations</span>
            <span className="mx-2">/</span>
            <span className="text-white">{location.title}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Professional Movers in {location.city || location.title}
          </h1>
          <p className="text-xl text-primary-200">{location.excerpt}</p>
          {location.phone && (
            <a href={`tel:${location.phone}`} className="mt-6 inline-flex items-center gap-2 text-secondary-500 font-semibold text-lg hover:text-secondary-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {location.phone}
            </a>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: location.content }}
        />

        {services.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Our Services in {location.city || location.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.slice(0, 4).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 bg-primary-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Need Movers in {location.city || location.title}?
          </h2>
          <p className="text-gray-600 mb-6">Get a free quote — we respond within 24 hours.</p>
          <Link href="/contact" className="btn-primary">Get Free Quote</Link>
        </div>
      </div>
    </>
  );
}
