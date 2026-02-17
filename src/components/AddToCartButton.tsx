'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCart, CartItem } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price_ht: number;
    price_ttc: number;
    image: string;
    dimensions?: string;
  };
  quantity_m2: number;
  className?: string;
}

export default function AddToCartButton({ product, quantity_m2, className = '' }: AddToCartButtonProps) {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const labels = {
    addToCart: {
      fr: 'Ajouter au panier',
      de: 'In den Warenkorb',
      en: 'Add to cart',
    },
    adding: {
      fr: 'Ajout...',
      de: 'Wird hinzugefügt...',
      en: 'Adding...',
    },
    added: {
      fr: 'Ajouté !',
      de: 'Hinzugefügt!',
      en: 'Added!',
    },
    minQuantity: {
      fr: 'Minimum 1 m² requis',
      de: 'Mindestens 1 m² erforderlich',
      en: 'Minimum 1 m² required',
    },
  };

  const handleAddToCart = async () => {
    if (quantity_m2 < 1) {
      alert(labels.minQuantity[locale]);
      return;
    }
    
    setIsAdding(true);
    
    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const cartItem: CartItem = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price_ht: product.price_ht,
      price_ttc: product.price_ttc,
      quantity_m2: Math.round(quantity_m2 * 10) / 10, // Round to 0.1
      image: product.image,
      dimensions: product.dimensions,
    };
    
    addItem(cartItem);
    setIsAdding(false);
    setShowSuccess(true);
    
    // Reset success state after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || quantity_m2 < 1}
      className={`
        flex items-center justify-center gap-3 px-8 py-4 
        font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${showSuccess 
          ? 'bg-green-600 text-white' 
          : 'bg-natura-900 text-white hover:bg-natura-800'
        }
        ${className}
      `}
    >
      {isAdding ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {labels.adding[locale]}
        </>
      ) : showSuccess ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {labels.added[locale]}
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {labels.addToCart[locale]} ({quantity_m2.toFixed(1)} m²)
        </>
      )}
    </button>
  );
}
