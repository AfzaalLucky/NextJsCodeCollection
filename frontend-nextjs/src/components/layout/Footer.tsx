import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-sm leading-relaxed mb-4">
              Professional moving and relocation services across Dubai, Abu Dhabi, and Sharjah.
              Trusted by thousands of families and businesses.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/packing" className="hover:text-white transition-colors">Packing Services</Link></li>
              <li><Link href="/services/home-moving" className="hover:text-white transition-colors">Home Moving</Link></li>
              <li><Link href="/services/office-moving" className="hover:text-white transition-colors">Office Moving</Link></li>
              <li><Link href="/services/storage" className="hover:text-white transition-colors">Storage</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
