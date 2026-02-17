'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { calculatePrixVenteTTC } from '@/lib/types';

interface Price {
  id: number;
  grade_id: number;
  colour_id: number;
  finish_id: number;
  format_id: number;
  prix_achat: number;
  prix_vente_ttc: number;
  active: boolean;
  grade?: { id: number; name: string; code: string };
  colour?: { id: number; name: string };
  finish?: { id: number; name: string };
  format?: { id: number; name: string };
}

interface FilterOption {
  id: number;
  name: string;
  code?: string;
  active: boolean;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [prices, setPrices] = useState<Price[]>([]);
  const [grades, setGrades] = useState<FilterOption[]>([]);
  const [colours, setColours] = useState<FilterOption[]>([]);
  const [finishes, setFinishes] = useState<FilterOption[]>([]);
  const [formats, setFormats] = useState<FilterOption[]>([]);
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'prices' | 'options'>('prices');

  useEffect(() => {
    const token = localStorage.getItem('natura_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }
    loadData();
  }, [router]);

  async function loadData() {
    setIsLoading(true);
    try {
      const [pricesRes, gradesRes, coloursRes, finishesRes, formatsRes] = await Promise.all([
        supabase.from('natura_prices').select(`
          *,
          grade:natura_grades(id, name, code),
          colour:natura_colours(id, name),
          finish:natura_finishes(id, name),
          format:natura_formats(id, name)
        `).order('id'),
        supabase.from('natura_grades').select('*').order('name'),
        supabase.from('natura_colours').select('*').order('name'),
        supabase.from('natura_finishes').select('*').order('name'),
        supabase.from('natura_formats').select('*').order('name'),
      ]);

      setPrices(pricesRes.data || []);
      setGrades(gradesRes.data || []);
      setColours(coloursRes.data || []);
      setFinishes(finishesRes.data || []);
      setFormats(formatsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('natura_admin_token');
    router.push('/admin');
  }

  async function updatePrixAchat(priceId: number, newPrixAchat: number) {
    setIsSaving(true);
    const newPrixVenteTTC = calculatePrixVenteTTC(newPrixAchat);

    try {
      const { error } = await supabase
        .from('natura_prices')
        .update({ 
          prix_achat: newPrixAchat, 
          prix_vente_ttc: newPrixVenteTTC,
          updated_at: new Date().toISOString()
        })
        .eq('id', priceId);

      if (error) throw error;

      setPrices(prices.map(p => 
        p.id === priceId 
          ? { ...p, prix_achat: newPrixAchat, prix_vente_ttc: newPrixVenteTTC }
          : p
      ));
      setEditingPrice(null);
      showSuccess('Prix mis à jour');
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Erreur lors de la mise à jour');
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleActive(priceId: number, currentActive: boolean) {
    try {
      const { error } = await supabase
        .from('natura_prices')
        .update({ active: !currentActive })
        .eq('id', priceId);

      if (error) throw error;

      setPrices(prices.map(p => 
        p.id === priceId ? { ...p, active: !currentActive } : p
      ));
      showSuccess(currentActive ? 'Produit désactivé' : 'Produit activé');
    } catch (error) {
      console.error('Error toggling active:', error);
    }
  }

  async function toggleOptionActive(table: string, id: number, currentActive: boolean) {
    try {
      const { error } = await supabase
        .from(table)
        .update({ active: !currentActive })
        .eq('id', id);

      if (error) throw error;

      // Refresh the relevant list
      if (table === 'natura_grades') {
        setGrades(grades.map(g => g.id === id ? { ...g, active: !currentActive } : g));
      } else if (table === 'natura_colours') {
        setColours(colours.map(c => c.id === id ? { ...c, active: !currentActive } : c));
      } else if (table === 'natura_finishes') {
        setFinishes(finishes.map(f => f.id === id ? { ...f, active: !currentActive } : f));
      } else if (table === 'natura_formats') {
        setFormats(formats.map(f => f.id === id ? { ...f, active: !currentActive } : f));
      }
      
      showSuccess('Statut mis à jour');
    } catch (error) {
      console.error('Error toggling option:', error);
    }
  }

  function showSuccess(message: string) {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-wood-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-wood-500 to-wood-700 rounded-lg flex items-center justify-center">
              <span className="text-xl">🌳</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-wood-600">Administration</h1>
              <p className="text-sm text-gray-500">Natura Parquets</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-gray-500 hover:text-wood-500 text-sm">
              Voir le site →
            </a>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600 text-sm font-medium">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
          ✓ {successMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Produits actifs</p>
            <p className="text-3xl font-bold text-wood-600">{prices.filter(p => p.active).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Produits inactifs</p>
            <p className="text-3xl font-bold text-gray-400">{prices.filter(p => !p.active).length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Prix moyen (vente TTC)</p>
            <p className="text-3xl font-bold text-gold-500">
              {prices.length > 0 
                ? (prices.reduce((sum, p) => sum + (p.prix_vente_ttc || 0), 0) / prices.length).toFixed(2)
                : '0.00'
              }€
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">Total produits</p>
            <p className="text-3xl font-bold text-wood-600">{prices.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('prices')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'prices' 
                ? 'bg-wood-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Feuille de prix
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'options' 
                ? 'bg-wood-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Options (Grades, Couleurs...)
          </button>
        </div>

        {activeTab === 'prices' ? (
          /* Price Sheet */
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-wood-600">Feuille de prix</h2>
              <p className="text-sm text-gray-500 mt-1">
                Formule: Prix vente TTC = Prix achat × 2 × 1.20
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Produit</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Format</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Prix achat (€)</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Prix vente TTC (€/m²)</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Actif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {prices.map((price) => (
                    <tr key={price.id} className={`hover:bg-gray-50 ${!price.active ? 'opacity-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-800">
                            {price.grade?.name} - {price.colour?.name}
                          </p>
                          <p className="text-sm text-gray-500">{price.finish?.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{price.format?.name}</td>
                      <td className="px-4 py-3 text-right">
                        {editingPrice === price.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <input
                              type="number"
                              step="0.01"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-24 px-2 py-1 border rounded text-right"
                              autoFocus
                            />
                            <button
                              onClick={() => updatePrixAchat(price.id, parseFloat(editValue))}
                              disabled={isSaving}
                              className="text-green-600 hover:text-green-700"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingPrice(null)}
                              className="text-red-500 hover:text-red-600"
                            >
                              ✗
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingPrice(price.id);
                              setEditValue(price.prix_achat?.toString() || '0');
                            }}
                            className="text-wood-600 hover:text-wood-700 font-medium"
                          >
                            {price.prix_achat?.toFixed(2) || '0.00'}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gold-500">
                        {price.prix_vente_ttc?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleActive(price.id, price.active)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            price.active ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                            price.active ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Options Management */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grades */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-wood-600">Grades</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {grades.map(grade => (
                  <div key={grade.id} className="p-4 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{grade.name}</span>
                      <span className="text-gray-400 text-sm ml-2">({grade.code})</span>
                    </div>
                    <button
                      onClick={() => toggleOptionActive('natura_grades', grade.id, grade.active)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        grade.active ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        grade.active ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Colours */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-wood-600">Couleurs</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {colours.map(colour => (
                  <div key={colour.id} className="p-4 flex justify-between items-center">
                    <span className="font-medium">{colour.name}</span>
                    <button
                      onClick={() => toggleOptionActive('natura_colours', colour.id, colour.active)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        colour.active ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        colour.active ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Finishes */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-wood-600">Finitions</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {finishes.map(finish => (
                  <div key={finish.id} className="p-4 flex justify-between items-center">
                    <span className="font-medium">{finish.name}</span>
                    <button
                      onClick={() => toggleOptionActive('natura_finishes', finish.id, finish.active)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        finish.active ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        finish.active ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Formats */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-wood-600">Formats</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {formats.map(format => (
                  <div key={format.id} className="p-4 flex justify-between items-center">
                    <span className="font-medium">{format.name}</span>
                    <button
                      onClick={() => toggleOptionActive('natura_formats', format.id, format.active)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        format.active ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        format.active ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
