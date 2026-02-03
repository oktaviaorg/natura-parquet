'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/produits`, label: t('products') },
    { href: `/${locale}/devenir-partenaire`, label: t('partners') },
  ];

  const locales = ['fr', 'de', 'en'];
  const currentPath = pathname.replace(`/${locale}`, '');

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className={`font-display text-2xl tracking-wide transition-colors flex items-center gap-2 ${
              isScrolled ? 'text-natura-900' : 'text-white'
            }`}
          >
            <span className="text-xl">🌳</span>
            Natura Parquet
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:opacity-70 ${
                  isScrolled ? 'text-natura-700' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-4">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${currentPath}`}
                  className={`px-2 py-1 text-xs font-medium uppercase tracking-wider transition-all rounded ${
                    locale === loc
                      ? isScrolled 
                        ? 'bg-natura-900 text-white' 
                        : 'bg-white text-natura-900'
                      : isScrolled
                        ? 'text-natura-600 hover:text-natura-900'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {loc}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-natura-900' : 'text-white'}`}
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
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-4 text-xl font-display text-natura-900 border-b border-natura-100"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex gap-4 mt-8">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}${currentPath}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider rounded ${
                  locale === loc
                    ? 'bg-natura-900 text-white'
                    : 'bg-natura-100 text-natura-700'
                }`}
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
