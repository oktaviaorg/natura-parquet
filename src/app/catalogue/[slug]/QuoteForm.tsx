'use client';

import { useState } from 'react';

interface Props {
  productId: number;
  productName: string;
}

export default function QuoteForm({ productId, productName }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    surface: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productId,
          productName,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', surface: '', message: '' });
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-serif text-2xl text-green-800 mb-2">
          Demande envoyée !
        </h3>
        <p className="text-green-700 mb-4">
          Nous avons bien reçu votre demande de devis pour <strong>{productName}</strong>.
          Notre équipe vous recontactera sous 24h.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-green-600 hover:text-green-800 font-medium underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-200">
      <div className="bg-gradient-to-r from-wood-600 to-wood-500 px-8 py-6">
        <h2 className="font-serif text-2xl md:text-3xl text-white">
          Demander un devis gratuit
        </h2>
        <p className="text-cream-200 mt-1">
          Réponse sous 24h • Sans engagement
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
              placeholder="Jean Dupont"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
              placeholder="jean@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
              placeholder="06 12 34 56 78"
            />
          </div>

          {/* Surface */}
          <div>
            <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-1.5">
              Surface estimée (m²)
            </label>
            <input
              type="number"
              id="surface"
              value={formData.surface}
              onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
              className="w-full px-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all"
              placeholder="25"
              min="1"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Votre projet (optionnel)
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Décrivez votre projet : type de pièce, pose, délais souhaités..."
          />
        </div>

        {/* Product Reference */}
        <div className="bg-cream-50 rounded-lg p-4 flex items-center gap-4">
          <span className="text-2xl">🪵</span>
          <div>
            <p className="text-sm text-gray-500">Produit sélectionné</p>
            <p className="font-semibold text-wood-600">{productName}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-gold-400 hover:bg-gold-500 disabled:bg-gray-300 text-natura-text font-semibold px-8 py-4 text-lg transition-all duration-200 rounded-lg shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Envoi en cours...
              </span>
            ) : (
              'Envoyer ma demande'
            )}
          </button>
          
          <p className="text-sm text-gray-500 text-center sm:text-left">
            📞 Ou appelez-nous au <a href="tel:+33604440903" className="text-wood-600 font-medium hover:text-gold-500">06 04 44 09 03</a>
          </p>
        </div>

        {/* Trust */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-cream-200 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span>🔒</span> Données sécurisées
          </span>
          <span className="flex items-center gap-1">
            <span>⏱️</span> Réponse sous 24h
          </span>
          <span className="flex items-center gap-1">
            <span>💬</span> Sans engagement
          </span>
        </div>
      </form>
    </div>
  );
}
