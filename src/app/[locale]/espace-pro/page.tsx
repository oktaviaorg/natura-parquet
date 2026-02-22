'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CORRECT_PASSWORD = 'Lematoubleu1789';
const AUTH_KEY = 'natura_auth';

export default function EspaceProPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPassword('');
  };

  const labels = {
    title: { fr: 'Espace Professionnel', de: 'Professioneller Bereich', en: 'Professional Area' },
    subtitle: { fr: 'Accédez aux tarifs et catalogues réservés aux professionnels.', de: 'Zugang zu Preisen und Katalogen für Fachleute.', en: 'Access prices and catalogs reserved for professionals.' },
    password: { fr: 'Mot de passe', de: 'Passwort', en: 'Password' },
    login: { fr: 'Accéder', de: 'Zugang', en: 'Access' },
    error: { fr: 'Mot de passe incorrect', de: 'Falsches Passwort', en: 'Incorrect password' },
    welcome: { fr: 'Bienvenue dans votre espace pro', de: 'Willkommen in Ihrem Pro-Bereich', en: 'Welcome to your pro area' },
    logout: { fr: 'Se déconnecter', de: 'Abmelden', en: 'Logout' },
    viewProducts: { fr: 'Voir les produits et tarifs', de: 'Produkte und Preise anzeigen', en: 'View products and prices' },
    downloadCatalog: { fr: 'Télécharger le catalogue', de: 'Katalog herunterladen', en: 'Download catalog' },
    contact: { fr: 'Contacter notre équipe', de: 'Unser Team kontaktieren', en: 'Contact our team' },
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-natura-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-500"></div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      <section className="py-24 px-6">
        <div className="max-w-md mx-auto">
          {!isAuthenticated ? (
            // Login Form
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="font-display text-2xl text-natura-900 mb-2">
                  {labels.title[locale]}
                </h1>
                <p className="text-natura-600 text-sm">
                  {labels.subtitle[locale]}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-natura-700 mb-2">
                    {labels.password[locale]}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 ${
                      error ? 'border-red-300 bg-red-50' : 'border-natura-200'
                    }`}
                    placeholder="••••••••••"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">
                      {labels.error[locale]}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-forest-500 text-white font-medium rounded-lg hover:bg-forest-600 transition-colors"
                >
                  {labels.login[locale]}
                </button>
              </form>
            </div>
          ) : (
            // Authenticated Dashboard
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="font-display text-2xl text-natura-900 mb-2">
                  {labels.welcome[locale]}
                </h1>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/${locale}/produits`}
                  className="flex items-center justify-between w-full p-4 bg-natura-50 rounded-lg hover:bg-natura-100 transition-colors"
                >
                  <span className="font-medium text-natura-900">{labels.viewProducts[locale]}</span>
                  <svg className="w-5 h-5 text-natura-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center justify-between w-full p-4 bg-natura-50 rounded-lg hover:bg-natura-100 transition-colors"
                >
                  <span className="font-medium text-natura-900">{labels.contact[locale]}</span>
                  <svg className="w-5 h-5 text-natura-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-6 py-2 text-sm text-natura-500 hover:text-natura-700 transition-colors"
              >
                {labels.logout[locale]}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
