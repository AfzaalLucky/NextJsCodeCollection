import type { Metadata } from 'next';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us - Get a Free Moving Quote',
  description:
    'Contact Dubai Movers Pro for a free, no-obligation moving quote. We cover Dubai, Abu Dhabi, Sharjah, and all UAE locations.',
  canonical: `${SITE_URL}/contact`,
});

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Get a Free Quote</h1>
        <p className="section-subtitle">Fill in the form and we&apos;ll get back to you within 24 hours.</p>
      </div>

      <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6" action="#" method="POST">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="+971 XX XXX XXXX"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            placeholder="john@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="from">
              Moving From
            </label>
            <input
              id="from"
              name="from"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Dubai Marina"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="to">
              Moving To
            </label>
            <input
              id="to"
              name="to"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Jumeirah"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service">
            Service Type
          </label>
          <select
            id="service"
            name="service"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="">Select a service...</option>
            <option value="home-moving">Home Moving</option>
            <option value="office-moving">Office Moving</option>
            <option value="packing">Packing Services</option>
            <option value="storage">Storage</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
            Additional Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            placeholder="Tell us about your move..."
          />
        </div>

        <button type="submit" className="w-full btn-primary py-4 text-lg">
          Submit Free Quote Request
        </button>
      </form>
    </div>
  );
}
