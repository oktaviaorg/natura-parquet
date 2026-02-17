'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-stone-200">
      <button
        onClick={onToggle}
        className="w-full py-5 flex justify-between items-center text-left hover:text-amber-700 transition-colors"
      >
        <span className="font-medium text-lg pr-4">{item.question}</span>
        <span className={`text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-stone-600 leading-relaxed whitespace-pre-line">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const t = useTranslations('faq');
  const tNav = useTranslations('nav');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      title: t('categories.delivery.title'),
      items: [
        {
          question: t('categories.delivery.items.delays.question'),
          answer: t('categories.delivery.items.delays.answer'),
        },
        {
          question: t('categories.delivery.items.zones.question'),
          answer: t('categories.delivery.items.zones.answer'),
        },
        {
          question: t('categories.delivery.items.shipping.question'),
          answer: t('categories.delivery.items.shipping.answer'),
        },
      ],
    },
    {
      title: t('categories.products.title'),
      items: [
        {
          question: t('categories.products.items.origin.question'),
          answer: t('categories.products.items.origin.answer'),
        },
        {
          question: t('categories.products.items.heating.question'),
          answer: t('categories.products.items.heating.answer'),
        },
        {
          question: t('categories.products.items.samples.question'),
          answer: t('categories.products.items.samples.answer'),
        },
      ],
    },
    {
      title: t('categories.ordering.title'),
      items: [
        {
          question: t('categories.ordering.items.minimum.question'),
          answer: t('categories.ordering.items.minimum.answer'),
        },
        {
          question: t('categories.ordering.items.quote.question'),
          answer: t('categories.ordering.items.quote.answer'),
        },
        {
          question: t('categories.ordering.items.payment.question'),
          answer: t('categories.ordering.items.payment.answer'),
        },
      ],
    },
    {
      title: t('categories.pro.title'),
      items: [
        {
          question: t('categories.pro.items.partner.question'),
          answer: t('categories.pro.items.partner.answer'),
        },
        {
          question: t('categories.pro.items.prices.question'),
          answer: t('categories.pro.items.prices.answer'),
        },
      ],
    },
  ];

  // Flatten for accordion indexing
  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-playfair text-2xl font-bold text-stone-800">
            Natura Parquet
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/produits" className="text-stone-600 hover:text-amber-700">{tNav('products')}</Link>
            <Link href="/contact" className="text-stone-600 hover:text-amber-700">{tNav('contact')}</Link>
            <Link href="/devenir-partenaire" className="text-stone-600 hover:text-amber-700">{tNav('partners')}</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-stone-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-stone-300">{t('subtitle')}</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="font-playfair text-2xl font-bold text-stone-800 mb-6 pb-2 border-b-2 border-amber-600">
                {category.title}
              </h2>
              <div>
                {category.items.map((item, itemIndex) => {
                  const currentIndex = globalIndex++;
                  return (
                    <FAQAccordion
                      key={itemIndex}
                      item={item}
                      isOpen={openIndex === currentIndex}
                      onToggle={() => setOpenIndex(openIndex === currentIndex ? null : currentIndex)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-12 bg-amber-50 rounded-lg p-8 text-center">
            <h3 className="font-playfair text-2xl font-bold text-stone-800 mb-4">{t('cta.title')}</h3>
            <p className="text-stone-600 mb-6">{t('cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                {t('cta.contact')}
              </Link>
              <Link
                href="/devenir-partenaire"
                className="bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-900 transition-colors"
              >
                {t('cta.partner')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-stone-400">© 2026 Natura Parquet. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
