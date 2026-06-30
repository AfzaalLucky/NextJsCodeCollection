import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getServices, getPosts, getLocalBusinessSchema } from '@/lib/api';
import { buildMetadata, buildJsonLd, SITE_URL } from '@/lib/seo';
import ServiceCard from '@/components/sections/ServiceCard';
import BlogCard from '@/components/sections/BlogCard';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Dubai Movers Pro | Professional Moving Services in Dubai',
  description:
    'Trusted professional moving company in Dubai. We offer packing, home moving, office relocation, and storage services across UAE. Get a free quote today!',
  canonical: SITE_URL,
  ogImage: `${SITE_URL}/og-home.jpg`,
});

export default async function HomePage() {
  const [services, posts, businessSchema] = await Promise.all([
    getServices().catch(() => []),
    getPosts(1, 3).catch(() => []),
    getLocalBusinessSchema().catch(() => null),
  ]);

  return (
    <>
      {businessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd(businessSchema) }}
        />
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Moving Services in Dubai
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Trusted by thousands of families and businesses across UAE. Safe, reliable, on-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Get Free Quote
            </Link>
            <Link href="/services" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-700">
              Our Services
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
            {[['5000+', 'Happy Clients'], ['10+', 'Years Experience'], ['100%', 'Satisfaction']].map(
              ([num, label]) => (
                <div key={label}>
                  <p className="text-3xl font-bold">{num}</p>
                  <p className="text-primary-200 text-sm mt-1">{label}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Moving Services</h2>
              <p className="section-subtitle">Everything you need for a stress-free move</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Dubai Movers Pro?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Licensed & Insured', desc: 'Fully licensed moving company with comprehensive insurance coverage.' },
              { title: 'Professional Team', desc: 'Trained and experienced movers who handle your belongings with care.' },
              { title: 'On-Time Delivery', desc: 'We guarantee punctual pickup and delivery for every move.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-xl bg-primary-50">
                <h3 className="text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Moving Tips & Guides</h2>
              <p className="section-subtitle">Expert advice to make your move easier</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/blog" className="btn-secondary">
                Read More Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 bg-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Move?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Get a free, no-obligation quote within 24 hours.
          </p>
          <Link href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-lg px-10 py-4">
            Get Free Quote Now
          </Link>
        </div>
      </section>
    </>
  );
}
