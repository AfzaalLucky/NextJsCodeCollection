import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getService, getServiceSlugs } from '@/lib/api';
import { buildMetadata, buildJsonLd, SITE_URL } from '@/lib/seo';

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
    title: service.seo.title || service.title,
    description: service.seo.description || service.excerpt,
    canonical: `${SITE_URL}/services/${service.slug}`,
    ogImage: service.seo.ogImage || service.featuredImage?.url,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getService(params.slug).catch(() => null);
  if (!service) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.excerpt,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'MovingCompany',
      name: 'Dubai Movers Pro',
      url: SITE_URL,
    },
    areaServed: 'Dubai',
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
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-primary-200">{service.excerpt}</p>
          {service.price && (
            <p className="mt-4 text-2xl font-bold text-secondary-500">{service.price}</p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2">
            {service.featuredImage && (
              <div className="relative h-72 w-full rounded-xl overflow-hidden mb-8">
                <Image
                  src={service.featuredImage.url}
                  alt={service.featuredImage.alt || service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {service.features && service.features.length > 0 && (
              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="bg-primary-700 text-white rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg mb-2">Get a Free Quote</h3>
              <p className="text-primary-200 text-sm mb-4">No obligation. Response within 24hrs.</p>
              <Link href="/contact" className="block w-full btn-primary bg-white text-primary-700 hover:bg-primary-50 text-center">
                Request Quote
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
