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
    // Sections
    parquets: { fr: 'Nos Parquets', de: 'Unsere Parkette', en: 'Our Parquets' },
    gammes: { fr: 'Par Gamme', de: 'Nach Kollektion', en: 'By Range' },
    poses: { fr: 'Par Type de Pose', de: 'Nach Verlegemuster', en: 'By Pattern' },
    company: { fr: 'Entreprise', de: 'Unternehmen', en: 'Company' },
    help: { fr: 'Aide & Contact', de: 'Hilfe & Kontakt', en: 'Help & Contact' },
    
    // Products
    allParquets: { fr: 'Tous les parquets', de: 'Alle Parkette', en: 'All parquets' },
    catalogue: { fr: 'Catalogue PDF', de: 'PDF-Katalog', en: 'PDF Catalog' },
    exclusive: { fr: 'Gamme Exclusive', de: 'Exclusive Kollektion', en: 'Exclusive Range' },
    elegance: { fr: 'Gamme Élégance', de: 'Eleganz Kollektion', en: 'Elegance Range' },
    rustic: { fr: 'Gamme Rustic', de: 'Rustic Kollektion', en: 'Rustic Range' },
    country: { fr: 'Gamme Country', de: 'Country Kollektion', en: 'Country Range' },
    
    // Poses
    lames: { fr: 'Lames droites', de: 'Landhausdielen', en: 'Planks' },
    batonRompu: { fr: 'Bâton rompu', de: 'Fischgrät', en: 'Herringbone' },
    chevron: { fr: 'Chevron', de: 'Chevron', en: 'Chevron' },
    pointHongrie: { fr: 'Point de Hongrie', de: 'Ungarischer Punkt', en: 'Hungarian Point' },
    
    // Company
    about: { fr: 'À propos', de: 'Über uns', en: 'About us' },
    partners: { fr: 'Devenir partenaire', de: 'Partner werden', en: 'Become a partner' },
    findPartner: { fr: 'Trouver un revendeur', de: 'Händler finden', en: 'Find a retailer' },
    proSpace: { fr: 'Espace professionnel', de: 'Profi-Bereich', en: 'Professional area' },
    
    // Help
    guide: { fr: 'Guide du parquet', de: 'Parkettratgeber', en: 'Parquet guide' },
    articles: { fr: 'Articles & Conseils', de: 'Artikel & Tipps', en: 'Articles & Tips' },
    faq: { fr: 'Questions fréquentes', de: 'Häufige Fragen', en: 'FAQ' },
    contact: { fr: 'Nous contacter', de: 'Kontakt', en: 'Contact us' },
    samples: { fr: 'Échantillons gratuits', de: 'Kostenlose Muster', en: 'Free samples' },
    
    // Legal
    legal: { fr: 'Mentions légales', de: 'Impressum', en: 'Legal notice' },
    privacy: { fr: 'Politique de confidentialité', de: 'Datenschutz', en: 'Privacy policy' },
    cgv: { fr: 'CGV', de: 'AGB', en: 'Terms' },
    rights: { fr: 'Tous droits réservés.', de: 'Alle Rechte vorbehalten.', en: 'All rights reserved.' },
    
    // Newsletter
    newsletter: { fr: 'Newsletter', de: 'Newsletter', en: 'Newsletter' },
    newsletterDesc: { fr: 'Recevez nos offres et nouveautés', de: 'Erhalten Sie unsere Angebote', en: 'Get our offers and news' },
    subscribe: { fr: 'S\'inscrire', de: 'Abonnieren', en: 'Subscribe' },
    emailPlaceholder: { fr: 'Votre email', de: 'Ihre E-Mail', en: 'Your email' },
  };

  return (
    <footer className="bg-natura-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          
          {/* Brand - spans 2 cols on lg */}
          <div className="col-span-2 lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-forest-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">N</span>
              </div>
              <span className="font-display text-xl font-semibold">
                Natura Parquets
              </span>
            </Link>
            <p className="mt-4 text-natura-400 text-sm leading-relaxed max-w-xs">
              {labels.tagline[locale]}
            </p>
            
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-natura-800 flex items-center justify-center hover:bg-forest-500 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-natura-800 flex items-center justify-center hover:bg-forest-500 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-natura-800 flex items-center justify-center hover:bg-forest-500 transition-colors" aria-label="Pinterest">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-natura-800 flex items-center justify-center hover:bg-forest-500 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Par Gamme */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              {labels.gammes[locale]}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/produits`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.allParquets[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?gamme=Exclusive`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.exclusive[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?gamme=Elegance`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.elegance[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?gamme=Rustic`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.rustic[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?gamme=Country`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.country[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalogue`} className="text-natura-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M6 20h12a2 2 0 002-2V8l-6-6H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {labels.catalogue[locale]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Par Pose */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              {labels.poses[locale]}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/produits?pose=lame`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.lames[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?pose=baton-rompu`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.batonRompu[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?pose=chevron-45`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.chevron[locale]} 45°
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?pose=chevron-60`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.chevron[locale]} 60°
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits?pose=point-hongrie`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.pointHongrie[locale]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              {labels.company[locale]}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/guide-parquet`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.guide[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partenaires`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.findPartner[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/devenir-partenaire`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.partners[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/espace-pro`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.proSpace[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.contact[locale]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              {labels.help[locale]}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/articles`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.articles[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/echantillon`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.samples[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.faq[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-natura-400 hover:text-white transition-colors text-sm">
                  {labels.contact[locale]}
                </Link>
              </li>
              <li>
                <a href="mailto:contact@natura-parquets.fr" className="text-natura-400 hover:text-white transition-colors text-sm">
                  contact@natura-parquets.fr
                </a>
              </li>
              <li>
                <a href="tel:+33612786185" className="text-natura-400 hover:text-white transition-colors text-sm">
                  06 12 78 61 85
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-natura-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-1">{labels.newsletter[locale]}</h4>
              <p className="text-natura-400 text-sm">{labels.newsletterDesc[locale]}</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder={labels.emailPlaceholder[locale]}
                className="flex-1 md:w-64 px-4 py-2.5 bg-natura-800 border border-natura-700 rounded-lg text-sm text-white placeholder-natura-500 focus:outline-none focus:border-forest-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-forest-500 text-white text-sm font-medium rounded-lg hover:bg-forest-600 transition-colors whitespace-nowrap"
              >
                {labels.subscribe[locale]}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-natura-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-natura-500 text-sm">
              © {new Date().getFullYear()} Natura Parquets. {labels.rights[locale]}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href={`/${locale}/mentions-legales`} className="text-natura-500 hover:text-white transition-colors text-sm">
                {labels.legal[locale]}
              </Link>
              <Link href={`/${locale}/confidentialite`} className="text-natura-500 hover:text-white transition-colors text-sm">
                {labels.privacy[locale]}
              </Link>
              <Link href={`/${locale}/cgv`} className="text-natura-500 hover:text-white transition-colors text-sm">
                {labels.cgv[locale]}
              </Link>
              <a href="/admin.html" className="text-natura-600 hover:text-natura-400 transition-colors text-sm">
                ⚙
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
