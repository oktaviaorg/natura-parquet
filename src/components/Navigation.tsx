'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import CartButton from './CartButton';

export default function Navigation() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/produits`, label: { fr: 'Parquets', de: 'Parkette', en: 'Parquets' } },
    { href: `/${locale}/guide-parquet`, label: { fr: 'Guide', de: 'Ratgeber', en: 'Guide' } },
    { href: `/${locale}/devenir-partenaire`, label: { fr: 'Professionnels', de: 'Fachleute', en: 'Professionals' } },
    { href: `/${locale}/contact`, label: { fr: 'Contact', de: 'Kontakt', en: 'Contact' } },
  ];

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-forest-500 rounded-lg flex items-center justify-center group-hover:bg-forest-600 transition-colors">
                <span className="text-white font-display text-xl font-bold">N</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-display text-xl font-semibold ${isScrolled ? 'text-natura-900' : 'text-white'} transition-colors`}>
                  Natura
                </span>
                <span className={`font-display text-xl ${isScrolled ? 'text-natura-500' : 'text-white/70'} transition-colors`}>
                  {' '}Parquets
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? isScrolled ? 'text-forest-600' : 'text-white'
                      : isScrolled 
                        ? 'text-natura-600 hover:text-natura-900' 
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label[locale as 'fr' | 'de' | 'en']}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Language switcher */}
              <div className="hidden md:flex items-center gap-1 bg-natura-100/50 rounded-full p-1">
                {['fr', 'de', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLocale(lang)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      locale === lang
                        ? 'bg-white text-natura-900 shadow-sm'
                        : 'text-natura-600 hover:text-natura-900'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Cart */}
              <CartButton isScrolled={isScrolled} />

              {/* CTA Button */}
              <Link
                href={`/${locale}/produits`}
                className={`hidden md:inline-flex px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isScrolled
                    ? 'bg-forest-500 text-white hover:bg-forest-600'
                    : 'bg-white text-natura-900 hover:bg-natura-50'
                }`}
              >
                {locale === 'fr' ? 'Voir les parquets' : locale === 'de' ? 'Parkette ansehen' : 'View parquets'}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg ${
                  isScrolled ? 'text-natura-900' : 'text-white'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-natura-100 shadow-lg">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 text-base font-medium border-b border-natura-100 last:border-0 ${
                    pathname === link.href ? 'text-forest-600' : 'text-natura-700'
                  }`}
                >
                  {link.label[locale as 'fr' | 'de' | 'en']}
                </Link>
              ))}
              
              {/* Mobile language switcher */}
              <div className="flex gap-2 pt-4">
                {['fr', 'de', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { switchLocale(lang); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                      locale === lang
                        ? 'bg-forest-500 text-white'
                        : 'bg-natura-100 text-natura-600'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
