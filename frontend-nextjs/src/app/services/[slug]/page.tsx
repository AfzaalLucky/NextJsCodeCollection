import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getService, getServiceSlugs, getServices } from '@/lib/api';
import { buildMetadata, buildJsonLd, SITE_URL, SITE_NAME } from '@/lib/seo';
import ServiceHero from '@/components/service/ServiceHero';
import TrustStrip from '@/components/service/TrustStrip';
import ServiceFeatures from '@/components/service/ServiceFeatures';
import HowItWorks from '@/components/service/HowItWorks';
import ServiceSidebar from '@/components/service/ServiceSidebar';
import ServiceFAQ from '@/components/service/ServiceFAQ';
import RelatedServices from '@/components/service/RelatedServices';

export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.slug).catch(() => null);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title || `${service.title} in Dubai`,
    description: service.seo.description || service.excerpt,
    canonical: `${SITE_URL}/services/${service.slug}`,
    ogImage: service.seo.ogImage || service.featuredImage?.url,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const [service, allServices] = await Promise.all([
    getService(params.slug).catch(() => null),
    getServices().catch(() => []),
  ]);

  if (!service) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.excerpt,
    url: `${SITE_URL}/services/${service.slug}`,
    image: service.featuredImage?.url,
    provider: {
      '@type': 'MovingCompany',
      name: SITE_NAME,
      url: SITE_URL,
      telephone: '+971500000000',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
    ...(service.price ? { offers: { '@type': 'Offer', description: service.price, priceCurrency: 'AED' } } : {}),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How far in advance should I book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend booking at least 3–5 days in advance. For large moves, 1–2 weeks ahead is ideal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my belongings insured during the move?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We carry full goods-in-transit insurance covering damage or loss.',
        },
      },
    ],
  };

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(faqSchema) }} />

      {/* 1 — Hero */}
      <ServiceHero service={service} />

      {/* 2 — Trust strip */}
      <TrustStrip />

      {/* 3 — Main content + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 xl:gap-16">

          {/* LEFT — Main content */}
          <div className="min-w-0">

            {/* WP rich content */}
            {service.content ? (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            ) : (
              <p className="text-gray-500 italic">Service description coming soon.</p>
            )}

            {/* What's Included */}
            <ServiceFeatures features={service.features ?? []} />

            {/* How It Works */}
            <HowItWorks />

            {/* FAQ */}
            <ServiceFAQ />

            {/* Related services */}
            <RelatedServices services={allServices} currentSlug={service.slug} />
          </div>

          {/* RIGHT — Sticky sidebar */}
          <div className="lg:block">
            <div className="sticky top-24 space-y-5">
              <ServiceSidebar service={service} />
            </div>
          </div>
        </div>
      </div>

      {/* 4 — Bottom CTA banner */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-white/10 text-white border border-white/20 mb-5">
            Ready to move?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Free Moving Quote Today
          </h2>
          <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
            Join over 5,000 happy families who trusted us with their move. No pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-amber text-base px-10 py-4">
              Get Free Quote Now
            </Link>
            <a href="tel:+971500000000" className="btn-outline-white text-base px-10 py-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +971 50 000 0000
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
