'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  prix_vente_ttc: number;
  grade: { name: string } | null;
  colour: { name: string } | null;
  finish: { name: string } | null;
  format: { name: string } | null;
}

export default function DevisForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ productId: number; quantity: number }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    surface: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    const { data } = await supabase
      .from('natura_prices')
      .select(`
        id, prix_vente_ttc,
        grade:natura_grades(name),
        colour:natura_colours(name),
        finish:natura_finishes(name),
        format:natura_formats(name)
      `)
      .eq('active', true)
      .order('prix_vente_ttc');
    
    // Transform the data to match our interface
    const transformedData: Product[] = (data || []).map((item: any) => ({
      id: item.id,
      prix_vente_ttc: item.prix_vente_ttc,
      grade: Array.isArray(item.grade) ? item.grade[0] : item.grade,
      colour: Array.isArray(item.colour) ? item.colour[0] : item.colour,
      finish: Array.isArray(item.finish) ? item.finish[0] : item.finish,
      format: Array.isArray(item.format) ? item.format[0] : item.format,
    }));
    
    setProducts(transformedData);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (productId && products.length > 0) {
      const exists = selectedProducts.find(p => p.productId === Number(productId));
      if (!exists && products.some(p => p.id === Number(productId))) {
        setSelectedProducts([{ productId: Number(productId), quantity: 10 }]);
      }
    }
  }, [productId, products, selectedProducts]);

  function addProduct() {
    if (products.length > 0) {
      setSelectedProducts([...selectedProducts, { productId: products[0].id, quantity: 10 }]);
    }
  }

  function removeProduct(index: number) {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  }

  function updateProduct(index: number, field: 'productId' | 'quantity', value: number) {
    const updated = [...selectedProducts];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedProducts(updated);
  }

  function calculateTotal() {
    return selectedProducts.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        return total + (product.prix_vente_ttc * item.quantity);
      }
      return total;
    }, 0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          products: selectedProducts,
          total: calculateTotal(),
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l envoi');
      }

      setIsSubmitted(true);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cream-50 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <span className="text-6xl mb-6 block">✅</span>
            <h1 className="text-3xl font-bold text-wood-600 font-serif mb-4">
              Demande envoyée !
            </h1>
            <p className="text-gray-600 mb-8">
              Merci pour votre demande de devis. Notre équipe vous contactera 
              dans les plus brefs délais (généralement sous 24h ouvrées).
            </p>
            <a href="/" className="btn-primary inline-block">
              Retour à l accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-wood-600 font-serif mb-4">
            Demander un Devis
          </h1>
          <p className="text-xl text-gray-600">
            Remplissez le formulaire ci-dessous pour recevoir votre devis personnalisé.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Products Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-wood-600 mb-6 flex items-center gap-2">
              <span>🪵</span> Sélection des produits
            </h2>

            {selectedProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">Aucun produit sélectionné</p>
                <button type="button" onClick={addProduct} className="btn-secondary">
                  Ajouter un produit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedProducts.map((item, index) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-cream-50 rounded-xl">
                      <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                        <select
                          value={item.productId}
                          onChange={(e) => updateProduct(index, 'productId', Number(e.target.value))}
                          className="input"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.grade?.name} - {p.colour?.name} ({p.finish?.name}) - {p.prix_vente_ttc?.toFixed(2)}€/m²
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full md:w-32">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²)</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateProduct(index, 'quantity', Number(e.target.value))}
                          className="input"
                        />
                      </div>
                      <div className="w-full md:w-32 flex items-end">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sous-total</label>
                          <div className="font-bold text-gold-500 py-3">
                            {product ? (product.prix_vente_ttc * item.quantity).toFixed(2) : 0}€
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end pb-2">
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button type="button" onClick={addProduct} className="text-wood-500 hover:text-wood-600 font-medium">
                    + Ajouter un autre produit
                  </button>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total estimé TTC</p>
                    <p className="text-2xl font-bold text-gold-500">{calculateTotal().toFixed(2)}€</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-wood-600 mb-6 flex items-center gap-2">
              <span>👤</span> Vos coordonnées
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  placeholder="jean@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Surface totale estimée (m²)</label>
                <input
                  type="text"
                  value={formData.surface}
                  onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                  className="input"
                  placeholder="ex: 50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse du chantier</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input"
                  placeholder="123 rue Example, 68000 Colmar"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message / Précisions</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input resize-none"
                  placeholder="Précisez vos besoins, contraintes particulières, délais souhaités..."
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <button 
              type="submit" 
              disabled={isSubmitting || selectedProducts.length === 0}
              className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            En soumettant ce formulaire, vous acceptez d être contacté par notre équipe commerciale.
            <br />Vos données sont protégées et ne seront jamais partagées.
          </p>
        </form>
      </div>
    </div>
  );
}
