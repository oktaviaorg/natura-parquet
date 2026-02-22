'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale() as 'fr' | 'de' | 'en';

  const labels = {
    tagline: {
      fr: 'Parquets chêne européen premium, livrés directement de Pologne.',
      de: 'Premium-Eichenparkette aus Europa, direkt aus Polen geliefert.',
      en: 'Premium European oak parquets, delivered directly from Poland.'
    },
    products: { fr: 'Produits', de: 'Produkte', en: 'Products' },
    company: { fr: 'Entreprise', de: 'Unternehmen', en: 'Company' },
    support: { fr: 'Support', de: 'Support', en: 'Support' },
    allParquets: { fr: 'Tous les parquets', de: 'Alle Parkette', en: 'All parquets' },
    exclusive: { fr: 'Gamme Exclusive', de: 'Exclusive Kollektion', en: 'Exclusive Range' },
    elegance: { fr: 'Gamme Élégance', de: 'Eleganz Kollektion', en: 'Elegance Range' },
    guide: { fr: 'Guide parquet', de: 'Parkettratgeber', en: 'Parquet guide' },
    about: { fr: 'À propos', de: 'Über uns', en: 'About us' },
    partners: { fr: 'Devenir partenaire', de: 'Partner werden', en: 'Become a partner' },
    contact: { fr: 'Contact', de: 'Kontakt', en: 'Contact' },
    faq: { fr: 'FAQ', de: 'FAQ', en: 'FAQ' },
    delivery: { fr: 'Livraison', de: 'Lieferung', en: 'Delivery' },
    legal: { fr: 'Mentions légales', de: 'Impressum', en: 'Legal notice' },
    privacy: { fr: 'Confidentialité', de: 'Datenschutz', en: 'Privacy' },
    rights: { fr: 'Tous droits réservés.', de: 'Alle Rechte vorbehalten.', en: 'All rights reserved.' }
  };

  return (
    <footer className="bg-natura-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-forest-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">N</span>
              </div>
              <span className="font-display text-xl font-semibold">
                Natura Parquets
              </span>
            </Link>
            <p className="mt-4 text-natura-400 text-sm leading-relaxed">
              {labels.tagline[locale]}
            </p>
            
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-natura-800 flex items-center justify-center hover:bg-natura-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-natura-800 flex items-center justify-center hover:bg-natura-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-natura-800 flex items-center justify-center hover:bg-natura-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {labels.products[locale]}
            </h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/produits`} className="text-natura-400 hover:text-white transition-colors text-sm">{labels.allParquets[locale]}</Link></li>
              <li><Link href={`/${locale}/produits?gamme=Exclusive`} className="text-natura-400 hover:text-white transition-colors text-sm">{labels.exclusive[locale]}</Link></li>
              <li><Link href={`/${locale}/produits?gamme=Elegance`} className="text-natura-400 hover:text-white transition-colors text-sm">{labels.elegance[locale]}</Link></li>
              <li><Link href={`/${locale}/guide-parquet`} className="text-natura-400 hover:text-white transition-colors text-sm">{labels.guide[locale]}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {labels.company[locale]}
            </h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/devenir-partenaire`} className="text-natura-400 hover:text-white transition-colors text-sm">{labels.partners[locale]}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-natura-400 hover:text-white transition-colors text-sm">{labels.contact[locale]}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {labels.support[locale]}
            </h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/faq`} className="text-natura-400 hover:text-white transition-colors text-sm">{labels.faq[locale]}</Link></li>
              <li><a href="mailto:contact@natura-parquets.fr" className="text-natura-400 hover:text-white transition-colors text-sm">contact@natura-parquets.fr</a></li>
              <li><a href="tel:+33757821306" className="text-natura-400 hover:text-white transition-colors text-sm">07 57 82 13 06</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-natura-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-natura-500 text-sm">
            © {new Date().getFullYear()} Natura Parquets. {labels.rights[locale]}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/mentions-legales`} className="text-natura-500 hover:text-white transition-colors text-sm">
              {labels.legal[locale]}
            </Link>
            <Link href={`/${locale}/confidentialite`} className="text-natura-500 hover:text-white transition-colors text-sm">
              {labels.privacy[locale]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
