'use client';

import { useCart } from '@/contexts/CartContext';

export default function CartButton() {
  const { toggleCart, getItemCount, getSubtotalTTC } = useCart();
  const itemCount = getItemCount();
  
  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-natura-100 rounded-full transition-colors group"
      aria-label="Panier"
    >
      <svg 
        className="w-6 h-6 text-natura-700 group-hover:text-natura-900" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      
      {/* Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-natura-900 text-white text-xs font-medium rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
