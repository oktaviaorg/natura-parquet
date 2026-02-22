'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-wood-500 to-wood-700 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌳</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-wood-600 font-serif">Natura Parquets</h1>
              <p className="text-xs text-wood-400">Parquets Premium Européens</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-wood-500 font-medium transition-colors">
              Accueil
            </Link>
            <Link href="/catalogue" className="text-gray-700 hover:text-wood-500 font-medium transition-colors">
              Catalogue
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-wood-500 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/devis" className="text-gray-700 hover:text-wood-500 font-medium transition-colors">
              Demander un devis
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-wood-500 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/catalogue" className="btn-primary">
              Voir nos parquets
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-wood-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
              <Link href="/catalogue" className="text-gray-700 hover:text-wood-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Catalogue
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-wood-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/devis" className="text-gray-700 hover:text-wood-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Demander un devis
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-wood-500 font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
