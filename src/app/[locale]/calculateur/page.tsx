'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Prix par gamme et grade (TTC)
const PRIX_BASE: Record<string, Record<string, number>> = {
  'baton-rompu-70': {
    exclusive: 67,
    elegance: 63,
    rustic: 61,
  },
  'baton-rompu-120': {
    exclusive: 82,
    elegance: 73,
    rustic: 70,
  },
  'chevron-45': {
    exclusive: 110,
    elegance: 106,
    rustic: 0, // Non dispo
  },
  'chevron-60': {
    exclusive: 122,
    elegance: 114,
    rustic: 0,
  },
  'point-hongrie-70': {
    exclusive: 110,
    elegance: 106,
    rustic: 0,
  },
  'point-hongrie-100': {
    exclusive: 122,
    elegance: 114,
    rustic: 0,
  },
  'point-hongrie-120': {
    exclusive: 126,
    elegance: 115,
    rustic: 0,
  },
  'lames-150-1330': {
    exclusive: 96,
    elegance: 84,
    rustic: 79,
    country: 62,
  },
  'lames-150-1800': {
    exclusive: 108,
    elegance: 89,
    rustic: 82,
    country: 62,
  },
  'lames-190': {
    exclusive: 126,
    elegance: 98,
    rustic: 84,
    country: 0,
  },
};

// Supplément finition
const SUPPLEMENT_FINITION: Record<string, number> = {
  brut: 0,
  verni: 6,
  huile: 5,
  'huile-blanche': 7,
  '2x-huile': 9,
};

const GAMMES = [
  { id: 'baton-rompu-70', label: 'Bâton Rompu 70mm', icon: '🔸' },
  { id: 'baton-rompu-120', label: 'Bâton Rompu 120mm', icon: '🔸' },
  { id: 'chevron-45', label: 'Chevron 45°', icon: '🔹' },
  { id: 'chevron-60', label: 'Chevron 60°', icon: '🔹' },
  { id: 'point-hongrie-70', label: 'Point de Hongrie 70mm', icon: '🔶' },
  { id: 'point-hongrie-100', label: 'Point de Hongrie 100mm', icon: '🔶' },
  { id: 'point-hongrie-120', label: 'Point de Hongrie 120mm', icon: '🔶' },
  { id: 'lames-150-1330', label: 'Lames 150mm (1330mm)', icon: '📏' },
  { id: 'lames-150-1800', label: 'Lames 150mm (1800mm)', icon: '📏' },
  { id: 'lames-190', label: 'Lames 190mm', icon: '📏' },
];

const GRADES = [
  { id: 'exclusive', label: 'Exclusive (Prime)', desc: 'Sans nœuds, aspect épuré' },
  { id: 'elegance', label: 'Elegance (Nature)', desc: 'Quelques petits nœuds' },
  { id: 'rustic', label: 'Rustic', desc: 'Nœuds apparents, authentique' },
  { id: 'country', label: 'Country', desc: 'Très rustique, max caractère' },
];

const FINITIONS = [
  { id: 'brut', label: 'Brut (à finir sur place)', supplement: 0 },
  { id: 'verni', label: 'Verni usine', supplement: 6 },
  { id: 'huile', label: 'Huilé naturel', supplement: 5 },
  { id: 'huile-blanche', label: 'Huile blanche', supplement: 7 },
  { id: '2x-huile', label: 'Double huilage', supplement: 9 },
];

export default function CalculateurPage() {
  const [surface, setSurface] = useState<number>(30);
  const [gamme, setGamme] = useState<string>('lames-150-1800');
  const [grade, setGrade] = useState<string>('elegance');
  const [finition, setFinition] = useState<string>('huile');

  const calcul = useMemo(() => {
    const prixBase = PRIX_BASE[gamme]?.[grade] || 0;
    if (prixBase === 0) {
      return { disponible: false, prixM2: 0, total: 0, totalHT: 0 };
    }
    
    const supplement = SUPPLEMENT_FINITION[finition] || 0;
    const prixM2 = prixBase + supplement;
    const total = prixM2 * surface;
    const totalHT = total / 1.2; // TVA 20%
    
    return {
      disponible: true,
      prixM2,
      total,
      totalHT,
      livraisonGratuite: surface >= 50,
    };
  }, [surface, gamme, grade, finition]);

  const gradesDisponibles = useMemo(() => {
    return GRADES.filter(g => PRIX_BASE[gamme]?.[g.id] > 0);
  }, [gamme]);

  // Reset grade si pas dispo
  useMemo(() => {
    if (!gradesDisponibles.find(g => g.id === grade)) {
      const firstAvailable = gradesDisponibles[0];
      if (firstAvailable) setGrade(firstAvailable.id);
    }
  }, [gradesDisponibles, grade]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 text-white">
      {/* Header */}
      <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-amber-500">
            NATURA PARQUETS
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/produits" className="hover:text-amber-400">Produits</Link>
            <Link href="/catalogue" className="hover:text-amber-400">Catalogue</Link>
            <Link href="/calculateur" className="text-amber-400">Calculateur</Link>
            <Link href="/contact" className="hover:text-amber-400">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">
          🧮 Calculateur de Budget
        </h1>
        <p className="text-center text-stone-400 mb-12">
          Estimez le coût de votre projet parquet en quelques clics
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="space-y-6">
            {/* Surface */}
            <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Surface à couvrir
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="flex-1 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value) || 1)}
                    className="w-20 bg-stone-700 border border-stone-600 rounded-lg px-3 py-2 text-right"
                  />
                  <span className="text-stone-400">m²</span>
                </div>
              </div>
              {surface >= 50 && (
                <p className="text-green-400 text-sm mt-2">✓ Livraison gratuite incluse !</p>
              )}
            </div>

            {/* Gamme */}
            <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
              <label className="block text-sm font-medium text-stone-300 mb-3">
                Type de pose
              </label>
              <select
                value={gamme}
                onChange={(e) => setGamme(e.target.value)}
                className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-3 text-white"
              >
                {GAMMES.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.icon} {g.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade */}
            <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
              <label className="block text-sm font-medium text-stone-300 mb-3">
                Grade (qualité du bois)
              </label>
              <div className="space-y-2">
                {gradesDisponibles.map((g) => (
                  <label
                    key={g.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                      grade === g.id
                        ? 'bg-amber-500/20 border border-amber-500'
                        : 'bg-stone-700/50 border border-transparent hover:bg-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="grade"
                      value={g.id}
                      checked={grade === g.id}
                      onChange={(e) => setGrade(e.target.value)}
                      className="sr-only"
                    />
                    <div>
                      <div className="font-medium">{g.label}</div>
                      <div className="text-sm text-stone-400">{g.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Finition */}
            <div className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
              <label className="block text-sm font-medium text-stone-300 mb-3">
                Finition
              </label>
              <select
                value={finition}
                onChange={(e) => setFinition(e.target.value)}
                className="w-full bg-stone-700 border border-stone-600 rounded-lg px-4 py-3 text-white"
              >
                {FINITIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label} {f.supplement > 0 ? `(+${f.supplement}€/m²)` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Résultat */}
          <div className="sticky top-24 h-fit">
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl p-8 border border-amber-500/30">
              <h2 className="text-xl font-bold mb-6">💰 Votre estimation</h2>
              
              {calcul.disponible ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-lg">
                      <span className="text-stone-300">Prix au m²</span>
                      <span className="font-bold text-amber-400">{calcul.prixM2} €/m²</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-stone-300">Surface</span>
                      <span>{surface} m²</span>
                    </div>
                    <hr className="border-stone-600" />
                    <div className="flex justify-between text-lg">
                      <span className="text-stone-300">Total HT</span>
                      <span>{calcul.totalHT.toFixed(0)} €</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total TTC</span>
                      <span className="text-amber-400">{calcul.total.toFixed(0)} €</span>
                    </div>
                  </div>

                  {calcul.livraisonGratuite && (
                    <div className="bg-green-500/20 text-green-400 rounded-lg p-3 text-center mb-6">
                      🚚 Livraison gratuite incluse
                    </div>
                  )}

                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="block w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-6 rounded-xl text-center transition"
                    >
                      Demander un devis personnalisé
                    </Link>
                    <a
                      href="https://wa.me/33612786185?text=Bonjour, je souhaite un devis pour un parquet. Surface: {surface}m², Gamme: {gamme}"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-center transition"
                    >
                      💬 Devis WhatsApp
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-stone-400">
                  <p className="text-lg mb-2">⚠️ Combinaison non disponible</p>
                  <p className="text-sm">Ce grade n'est pas disponible pour cette gamme.</p>
                </div>
              )}
            </div>

            {/* Avantages */}
            <div className="mt-6 bg-stone-800/50 rounded-2xl p-6 border border-stone-700">
              <h3 className="font-bold mb-4">✨ Nos avantages</h3>
              <ul className="space-y-2 text-sm text-stone-300">
                <li>✓ Prix direct usine, -30% vs revendeurs</li>
                <li>✓ Chêne européen FSC certifié</li>
                <li>✓ Livraison France & Europe</li>
                <li>✓ Échantillons gratuits sur demande</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-stone-500 text-sm">
          <p>© 2026 Natura Parquets - EPENON Active SARL</p>
          <p className="mt-2">
            <Link href="/mentions-legales" className="hover:text-amber-400">Mentions légales</Link>
            {' • '}
            <Link href="/cgv" className="hover:text-amber-400">CGV</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
