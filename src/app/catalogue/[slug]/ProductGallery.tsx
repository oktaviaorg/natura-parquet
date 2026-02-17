'use client';

import { useState } from 'react';

interface Props {
  colour: {
    name: string;
    hex_color?: string;
    code?: string;
  } | null;
  productName: string;
}

export default function ProductGallery({ colour, productName }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Placeholder images - in production, these would come from Supabase storage
  const images = [
    { id: 1, type: 'main', label: 'Vue principale' },
    { id: 2, type: 'detail', label: 'Détail grain' },
    { id: 3, type: 'room', label: 'Ambiance salon' },
    { id: 4, type: 'close', label: 'Gros plan' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <div 
          className={`w-full h-full transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`}
          style={{ 
            backgroundColor: colour?.hex_color || '#d4bfa3',
            backgroundImage: `
              linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)
            `,
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[180px] opacity-20 select-none">🪵</span>
          </div>
        </div>
        
        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
          🔍 {isZoomed ? 'Cliquez pour réduire' : 'Survolez pour zoomer'}
        </div>

        {/* Image counter */}
        <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
              selectedImage === index 
                ? 'ring-2 ring-gold-400 ring-offset-2' 
                : 'opacity-70 hover:opacity-100'
            }`}
            aria-label={image.label}
          >
            <div 
              className="w-full h-full"
              style={{ 
                backgroundColor: colour?.hex_color || '#d4bfa3',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl opacity-30">🪵</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Color Swatch */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-cream-200">
        <div 
          className="w-16 h-16 rounded-lg shadow-inner border border-cream-200"
          style={{ backgroundColor: colour?.hex_color || '#d4bfa3' }}
        />
        <div>
          <p className="font-semibold text-wood-600">Teinte: {colour?.name}</p>
          <p className="text-sm text-gray-500">{colour?.hex_color}</p>
        </div>
      </div>
    </div>
  );
}
