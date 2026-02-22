'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { products as allProducts, type Product } from '@/data/products';

const ADMIN_PASSWORD = 'Lematoubleu1789';
const AUTH_KEY = 'natura_admin_auth';
const PUBLISHED_KEY = 'natura_published_products';

export default function AdminPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGamme, setFilterGamme] = useState<string>('all');
  const [filterPublished, setFilterPublished] = useState<string>('all');
  const [publishedProducts, setPublishedProducts] = useState<Record<string, boolean>>({});

  // Load auth and published state
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load published state
    const publishedData = localStorage.getItem(PUBLISHED_KEY);
    if (publishedData) {
      setPublishedProducts(JSON.parse(publishedData));
    } else {
      // Par défaut, tous les produits sont publiés
      const initial: Record<string, boolean> = {};
      allProducts.forEach(p => initial[p.id] = true);
      setPublishedProducts(initial);
    }
    
    setIsLoading(false);
  }, []);

  // Save published state
  const savePublished = (newState: Record<string, boolean>) => {
    localStorage.setItem(PUBLISHED_KEY, JSON.stringify(newState));
    setPublishedProducts(newState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
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

  const togglePublished = (productId: string) => {
    const newState = { ...publishedProducts, [productId]: !publishedProducts[productId] };
    savePublished(newState);
  };

  const publishAll = () => {
    const newState: Record<string, boolean> = {};
    allProducts.forEach(p => newState[p.id] = true);
    savePublished(newState);
  };

  const unpublishAll = () => {
    const newState: Record<string, boolean> = {};
    allProducts.forEach(p => newState[p.id] = false);
    savePublished(newState);
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search filter
      if (searchTerm.length >= 2) {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
          product.name[locale].toLowerCase().includes(search) ||
          product.dimensions.toLowerCase().includes(search) ||
          product.finition.toLowerCase().includes(search) ||
          product.gamme.toLowerCase().includes(search) ||
          product.slug.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }
      
      // Gamme filter
      if (filterGamme !== 'all' && product.gamme !== filterGamme) return false;
      
      // Published filter
      if (filterPublished === 'published' && !publishedProducts[product.id]) return false;
      if (filterPublished === 'unpublished' && publishedProducts[product.id]) return false;
      
      return true;
    });
  }, [allProducts, searchTerm, filterGamme, filterPublished, publishedProducts, locale]);

  // Stats
  const stats = useMemo(() => {
    const total = allProducts.length;
    const published = Object.values(publishedProducts).filter(Boolean).length;
    return { total, published, unpublished: total - published };
  }, [publishedProducts]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-natura-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-500"></div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-natura-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl text-natura-900 mb-2">Administration</h1>
            <p className="text-natura-600 text-sm">Gestion des produits Natura Parquets</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-natura-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 ${
                  error ? 'border-red-300 bg-red-50' : 'border-natura-200'
                }`}
                placeholder="••••••••••"
              />
              {error && <p className="mt-2 text-sm text-red-600">Mot de passe incorrect</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-forest-500 text-white font-medium rounded-lg hover:bg-forest-600 transition-colors"
            >
              Accéder
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-natura-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="text-forest-600 hover:text-forest-700">
              ← Retour au site
            </Link>
            <h1 className="font-display text-xl text-natura-900">Administration Natura Parquets</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-natura-500 hover:text-natura-700"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-natura-500 text-sm">Total produits</p>
            <p className="text-3xl font-semibold text-natura-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-forest-600 text-sm">✓ Publiés</p>
            <p className="text-3xl font-semibold text-forest-600">{stats.published}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-natura-400 text-sm">○ Non publiés</p>
            <p className="text-3xl font-semibold text-natura-400">{stats.unpublished}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-natura-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>

            {/* Gamme filter */}
            <select
              value={filterGamme}
              onChange={(e) => setFilterGamme(e.target.value)}
              className="px-4 py-2 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="all">Toutes les gammes</option>
              <option value="Exclusive">Exclusive</option>
              <option value="Elegance">Elegance</option>
              <option value="Rustic">Rustic</option>
              <option value="Country">Country</option>
            </select>

            {/* Published filter */}
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-4 py-2 border border-natura-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="published">✓ Publiés</option>
              <option value="unpublished">○ Non publiés</option>
            </select>

            {/* Bulk actions */}
            <div className="flex gap-2">
              <button
                onClick={publishAll}
                className="px-4 py-2 bg-forest-500 text-white text-sm rounded-lg hover:bg-forest-600 transition-colors"
              >
                Tout publier
              </button>
              <button
                onClick={unpublishAll}
                className="px-4 py-2 bg-natura-200 text-natura-700 text-sm rounded-lg hover:bg-natura-300 transition-colors"
              >
                Tout dépublier
              </button>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-natura-50 border-b border-natura-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-natura-600 uppercase tracking-wide">Publié</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-natura-600 uppercase tracking-wide">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-natura-600 uppercase tracking-wide">Gamme</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-natura-600 uppercase tracking-wide">Dimensions</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-natura-600 uppercase tracking-wide">Finition</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-natura-600 uppercase tracking-wide">Prix TTC</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-natura-600 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-natura-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className={`hover:bg-natura-50 ${!publishedProducts[product.id] ? 'opacity-50' : ''}`}>
                    {/* Toggle publié */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublished(product.id)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          publishedProducts[product.id] ? 'bg-forest-500' : 'bg-natura-300'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                          publishedProducts[product.id] ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </td>
                    
                    {/* Nom */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-natura-900 truncate max-w-[200px]">{product.name[locale]}</p>
                      <p className="text-xs text-natura-400 font-mono">{product.slug}</p>
                    </td>
                    
                    {/* Gamme */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        product.gamme === 'Exclusive' ? 'bg-natura-800 text-white' :
                        product.gamme === 'Rustic' ? 'bg-amber-100 text-amber-800' :
                        product.gamme === 'Country' ? 'bg-orange-100 text-orange-800' :
                        'bg-natura-200 text-natura-700'
                      }`}>
                        {product.gamme}
                      </span>
                    </td>
                    
                    {/* Dimensions */}
                    <td className="px-4 py-3 text-sm text-natura-600">{product.dimensions}</td>
                    
                    {/* Finition */}
                    <td className="px-4 py-3 text-sm text-natura-600">{product.finition}</td>
                    
                    {/* Prix */}
                    <td className="px-4 py-3 text-sm font-semibold text-natura-900">{product.price.ttc.toFixed(0)} €/m²</td>
                    
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <Link
                        href={`/${locale}/produits/${product.slug}`}
                        target="_blank"
                        className="text-forest-600 hover:text-forest-700 text-sm font-medium"
                      >
                        Voir →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-natura-500">
              Aucun produit ne correspond aux filtres
            </div>
          )}
          
          {/* Footer */}
          <div className="px-4 py-3 bg-natura-50 border-t border-natura-200 text-sm text-natura-500">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} affiché{filteredProducts.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </main>
  );
}
