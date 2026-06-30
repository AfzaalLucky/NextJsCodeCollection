import Link from 'next/link';
import type { Service } from '@/lib/api';

const sidebarPerks = [
  'Free, no-obligation quote',
  'Response within 2 hours',
  'Trained & vetted crew',
  'Fully insured move',
  'On-time guarantee',
];

export default function ServiceSidebar({ service }: { service: Service }) {
  return (
    <aside className="space-y-5">
      {/* Quote Card */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-primary-100">
        {/* Card header gradient */}
        <div className="bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">Get a Free Quote</h3>
          <p className="text-primary-200 text-sm">No obligations. Response in 2 hours.</p>

          {service.price && (
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-sm text-primary-300">Starting from</span>
              <span className="text-2xl font-bold text-secondary-400">{service.price}</span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="bg-white p-6">
          <ul className="space-y-2.5 mb-6">
            {sidebarPerks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn-primary-lg w-full text-base py-3.5">
            Request Free Quote
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 mb-2">Or call us directly</p>
            <a
              href="tel:+971500000000"
              className="flex items-center justify-center gap-2 text-primary-600 font-bold text-lg hover:text-primary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +971 50 000 0000
            </a>
          </div>
        </div>
      </div>

      {/* Quick info card */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <h4 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">
          Service Coverage
        </h4>
        <div className="space-y-2.5">
          {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'].map((city) => (
            <div key={city} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{city}</span>
              <span className="badge badge-green text-xs">Available</span>
            </div>
          ))}
        </div>
      </div>

      {/* Working hours */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <h4 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">
          Working Hours
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Mon – Sat</span>
            <span className="font-medium text-gray-800">7:00 AM – 8:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Sunday</span>
            <span className="font-medium text-gray-800">9:00 AM – 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Emergency</span>
            <span className="font-medium text-green-600">24/7 Available</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
