import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/api';
import { buildMetadata, buildJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import ServiceCard from '@/components/sections/ServiceCard';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Professional Moving Services in Dubai',
  description:
    'Complete moving and relocation services in Dubai: packing, home moving, office relocation, storage, and more. Licensed & insured. Free quote within 24 hours.',
  canonical: `${SITE_URL}/services`,
});

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moving Services in Dubai',
    url: `${SITE_URL}/services`,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `${SITE_URL}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Page hero */}
      <section className="bg-gradient-to-br from-gray-950 via-primary-900 to-gray-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="badge bg-white/10 text-white border border-white/20 mb-5 mx-auto">
            Dubai&apos;s Most Trusted Movers
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Professional Moving Services in Dubai
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Licensed, insured, and experienced. We handle every move with care — from a studio apartment to a full office relocation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-amber">Get Free Quote</Link>
            <a href="tel:+971500000000" className="btn-outline-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-3 md:grid-cols-3 divide-x divide-gray-100 text-center">
          {[['5,000+', 'Moves Completed'], ['10+', 'Years in Business'], ['4.9 ★', 'Average Rating']].map(
            ([num, label]) => (
              <div key={label} className="px-6 py-2">
                <p className="text-2xl md:text-3xl font-bold text-primary-700">{num}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">All Services</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Whatever your moving needs, we have the right solution — handled by trained professionals.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Services are being set up — please check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-primary-50 border border-primary-100 p-10 md:p-14 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Can&apos;t find what you need?</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We offer customised moving solutions. Get in touch and we&apos;ll build a package just for you.
          </p>
          <Link href="/contact" className="btn-primary-lg">
            Talk to Our Team
          </Link>
        </div>
      </div>
    </>
  );
}
