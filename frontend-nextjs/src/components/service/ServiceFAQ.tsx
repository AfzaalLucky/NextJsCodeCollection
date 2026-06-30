'use client';

import { useState } from 'react';

const faqItems = [
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 3–5 days in advance for standard moves. For large office or villa relocations, 1–2 weeks ahead ensures we can plan properly. That said, we do accommodate last-minute moves based on availability.',
  },
  {
    q: 'Are my belongings insured during the move?',
    a: 'Yes. We carry full goods-in-transit insurance covering damage or loss during loading, transport, and unloading. High-value or fragile items can be declared separately for additional coverage.',
  },
  {
    q: 'Do you provide packing materials?',
    a: 'Absolutely. All our packages include high-quality packing materials — double-walled boxes, bubble wrap, stretch wrap, and furniture blankets. You can also purchase materials separately if you prefer to pack yourself.',
  },
  {
    q: 'How is the price calculated?',
    a: 'Pricing is based on the volume of items, distance, number of crew members required, and any special handling needs (e.g. piano, antiques, heavy appliances). We offer a free on-site or virtual survey for an accurate quote.',
  },
  {
    q: 'Do you move on weekends and public holidays?',
    a: 'Yes, we operate 7 days a week including weekends. A small surcharge may apply for public holiday moves. Emergency and same-day moves are available 24/7.',
  },
  {
    q: 'What areas do you cover in Dubai?',
    a: 'We cover all areas of Dubai including Dubai Marina, JBR, Downtown, Business Bay, Jumeirah, Deira, Bur Dubai, Al Quoz, and more. We also service Abu Dhabi, Sharjah, Ajman, and Ras Al Khaimah.',
  },
];

function FAQItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-primary-400 w-6">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-semibold text-gray-900 text-[0.95rem] leading-snug">{item.q}</span>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open ? 'bg-primary-600 rotate-180' : 'bg-gray-100'}`}>
          <svg
            className={`w-4 h-4 transition-colors ${open ? 'text-white' : 'text-gray-500'}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0 bg-white">
          <div className="ml-10 border-l-2 border-primary-100 pl-4">
            <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ServiceFAQ() {
  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-1 rounded-full bg-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-2">
        {faqItems.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
