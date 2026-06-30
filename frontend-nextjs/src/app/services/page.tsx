import type { Metadata } from 'next';
import { getServices } from '@/lib/api';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import ServiceCard from '@/components/sections/ServiceCard';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Moving Services in Dubai',
  description:
    'Explore our complete range of moving services: packing, home moving, office relocation, and storage. Professional movers in Dubai, UAE.',
  canonical: `${SITE_URL}/services`,
});

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Our Moving Services</h1>
        <p className="section-subtitle max-w-2xl mx-auto">
          Professional moving and relocation services tailored to your needs across Dubai and UAE.
        </p>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
