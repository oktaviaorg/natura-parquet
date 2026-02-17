// Natura Parquets - Catalogue Axemark
// Parquets contrecollés chêne - FSC certifié

// ============================================
// TYPES & INTERFACES
// ============================================

export type Thickness = '11mm' | '14mm';
export type Grade = 'exclusive' | 'elegance' | 'rustic' | 'country';
export type PoseType = 'baton-rompu' | 'lames' | 'point-hongrie-45' | 'point-hongrie-60' | 'formpark';
export type Finish = 'brut' | 'verni' | 'huile';
export type Surface = 'brosse' | 'lisse';

export interface ProductFormat {
  width: number;      // mm
  length: number;     // mm
  thickness: Thickness;
  grades: Grade[];
  packaging: {
    colisPerPalette: number;
    m2PerColis: number;
    kgPerColis: number;
  };
}

export interface ProductCategory {
  id: string;
  slug: string;
  poseType: PoseType;
  name: {
    fr: string;
    de: string;
    en: string;
  };
  description: {
    fr: string;
    de: string;
    en: string;
  };
  formats: ProductFormat[];
  images: string[];
}

export interface Color {
  id: string;
  name: {
    fr: string;
    de: string;
    en: string;
  };
  hex: string;
  thickness: Thickness[];  // Disponible pour quelles épaisseurs
  image?: string;
}

// ============================================
// GRADES
// ============================================

export const grades: Record<Grade, { 
  name: { fr: string; de: string; en: string }; 
  description: { fr: string; de: string; en: string };
}> = {
  exclusive: {
    name: { fr: 'Exclusive', de: 'Exclusive', en: 'Exclusive' },
    description: {
      fr: 'Grade premium sans nœuds, veinure régulière, aspect épuré haut de gamme',
      de: 'Premium-Qualität ohne Äste, gleichmäßige Maserung, hochwertiges puristisches Aussehen',
      en: 'Premium grade without knots, regular grain, high-end refined look'
    }
  },
  elegance: {
    name: { fr: 'Elegance', de: 'Eleganz', en: 'Elegance' },
    description: {
      fr: 'Grade nature avec quelques petits nœuds discrets, bel équilibre',
      de: 'Natürliche Qualität mit einigen kleinen dezenten Ästen, schöne Balance',
      en: 'Natural grade with few small discrete knots, beautiful balance'
    }
  },
  rustic: {
    name: { fr: 'Rustic', de: 'Rustikal', en: 'Rustic' },
    description: {
      fr: 'Grade caractère avec nœuds apparents, aspect authentique et chaleureux',
      de: 'Charakterqualität mit sichtbaren Ästen, authentisches und warmes Aussehen',
      en: 'Character grade with visible knots, authentic and warm look'
    }
  },
  country: {
    name: { fr: 'Country', de: 'Ländlich', en: 'Country' },
    description: {
      fr: 'Grade campagne très rustique, nœuds prononcés, maximum de caractère',
      de: 'Sehr rustikale Landqualität, ausgeprägte Äste, maximaler Charakter',
      en: 'Very rustic country grade, pronounced knots, maximum character'
    }
  }
};

// ============================================
// COLORIS 11mm
// ============================================

export const colors11mm: Color[] = [
  {
    id: 'neutral',
    name: { fr: 'Neutral', de: 'Neutral', en: 'Neutral' },
    hex: '#f0e6d3',
    thickness: ['11mm']
  },
  {
    id: 'honey',
    name: { fr: 'Honey', de: 'Honig', en: 'Honey' },
    hex: '#d4a84b',
    thickness: ['11mm']
  },
  {
    id: 'crema',
    name: { fr: 'Crema', de: 'Crema', en: 'Crema' },
    hex: '#e8d9c0',
    thickness: ['11mm']
  },
  {
    id: 'nugat',
    name: { fr: 'Nugat', de: 'Nougat', en: 'Nougat' },
    hex: '#c4a67c',
    thickness: ['11mm']
  },
  {
    id: 'raw-wood',
    name: { fr: 'Raw Wood', de: 'Rohholz', en: 'Raw Wood' },
    hex: '#ddd0b8',
    thickness: ['11mm', '14mm']
  },
  {
    id: 'nugat-dark',
    name: { fr: 'Nugat Dark', de: 'Nougat Dunkel', en: 'Nougat Dark' },
    hex: '#8b7355',
    thickness: ['11mm']
  },
  {
    id: 'amber',
    name: { fr: 'Amber', de: 'Bernstein', en: 'Amber' },
    hex: '#c9853a',
    thickness: ['11mm']
  },
  {
    id: 'fume',
    name: { fr: 'Fumé', de: 'Geräuchert', en: 'Smoked' },
    hex: '#5c4a3d',
    thickness: ['11mm']
  },
  {
    id: 'multicolore',
    name: { fr: 'Multicolore', de: 'Mehrfarbig', en: 'Multicolor' },
    hex: '#b8a07a',
    thickness: ['11mm']
  }
];

// ============================================
// COLORIS 14mm
// ============================================

export const colors14mm: Color[] = [
  {
    id: 'stone-grey',
    name: { fr: 'Stone Grey', de: 'Steingrau', en: 'Stone Grey' },
    hex: '#9a9590',
    thickness: ['14mm']
  },
  {
    id: 'julia-white',
    name: { fr: 'Julia White', de: 'Julia Weiß', en: 'Julia White' },
    hex: '#f5efe6',
    thickness: ['14mm']
  },
  {
    id: 'matera',
    name: { fr: 'Matera', de: 'Matera', en: 'Matera' },
    hex: '#a89078',
    thickness: ['14mm']
  },
  {
    id: 'andante',
    name: { fr: 'Andante', de: 'Andante', en: 'Andante' },
    hex: '#c4b090',
    thickness: ['14mm']
  },
  {
    id: 'warm-cotton',
    name: { fr: 'Warm Cotton', de: 'Warme Baumwolle', en: 'Warm Cotton' },
    hex: '#e8dcc8',
    thickness: ['14mm']
  },
  {
    id: 'raw-wood',
    name: { fr: 'Raw Wood', de: 'Rohholz', en: 'Raw Wood' },
    hex: '#ddd0b8',
    thickness: ['11mm', '14mm']
  },
  {
    id: 'banana-song',
    name: { fr: 'Banana Song', de: 'Banana Song', en: 'Banana Song' },
    hex: '#e0c890',
    thickness: ['14mm']
  }
];

export const allColors = [...colors11mm, ...colors14mm.filter(c => c.id !== 'raw-wood')];

// ============================================
// PRODUITS - BÂTON ROMPU (CHEVRON)
// ============================================

export const batonRompu: ProductCategory[] = [
  // 11mm
  {
    id: 'br-11-70x490',
    slug: 'baton-rompu-11mm-70x490',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 70×490',
      de: 'Fischgrät 70×490',
      en: 'Herringbone 70×490'
    },
    description: {
      fr: 'Chevron classique format traditionnel, idéal pour les espaces de caractère',
      de: 'Klassisches Fischgrätmuster im traditionellen Format, ideal für charaktervolle Räume',
      en: 'Classic herringbone traditional format, ideal for characterful spaces'
    },
    formats: [{
      width: 70,
      length: 490,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 48, m2PerColis: 2.06, kgPerColis: 13.38 }
    }],
    images: []
  },
  {
    id: 'br-11-100x600',
    slug: 'baton-rompu-11mm-100x600',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 100×600',
      de: 'Fischgrät 100×600',
      en: 'Herringbone 100×600'
    },
    description: {
      fr: 'Chevron format intermédiaire, parfait équilibre entre tradition et modernité',
      de: 'Fischgrät Mittelformat, perfekte Balance zwischen Tradition und Moderne',
      en: 'Herringbone intermediate format, perfect balance between tradition and modernity'
    },
    formats: [{
      width: 100,
      length: 600,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 80, m2PerColis: 1.2, kgPerColis: 7.80 }
    }],
    images: []
  },
  {
    id: 'br-11-100x1000',
    slug: 'baton-rompu-11mm-100x1000',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 100×1000',
      de: 'Fischgrät 100×1000',
      en: 'Herringbone 100×1000'
    },
    description: {
      fr: 'Chevron lames longues pour un effet visuel spectaculaire',
      de: 'Fischgrät mit langen Dielen für einen spektakulären visuellen Effekt',
      en: 'Herringbone long planks for a spectacular visual effect'
    },
    formats: [{
      width: 100,
      length: 1000,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 32, m2PerColis: 3, kgPerColis: 19.50 }
    }],
    images: []
  },
  {
    id: 'br-11-120x600',
    slug: 'baton-rompu-11mm-120x600',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 120×600',
      de: 'Fischgrät 120×600',
      en: 'Herringbone 120×600'
    },
    description: {
      fr: 'Chevron lames larges, rendu contemporain et élégant',
      de: 'Fischgrät mit breiten Dielen, zeitgenössisches und elegantes Erscheinungsbild',
      en: 'Herringbone wide planks, contemporary and elegant look'
    },
    formats: [{
      width: 120,
      length: 600,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 70, m2PerColis: 1.44, kgPerColis: 9.36 }
    }],
    images: []
  },
  {
    id: 'br-11-150x665',
    slug: 'baton-rompu-11mm-150x665',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 150×665',
      de: 'Fischgrät 150×665',
      en: 'Herringbone 150×665'
    },
    description: {
      fr: 'Chevron grand format premium, exclusivement en grade Exclusive',
      de: 'Premium-Fischgrät im Großformat, ausschließlich in Exclusive-Qualität',
      en: 'Premium large format herringbone, exclusively in Exclusive grade'
    },
    formats: [{
      width: 150,
      length: 665,
      thickness: '11mm',
      grades: ['exclusive'],
      packaging: { colisPerPalette: 80, m2PerColis: 1.2, kgPerColis: 7.78 }
    }],
    images: []
  },
  // 14mm
  {
    id: 'br-14-100x600',
    slug: 'baton-rompu-14mm-100x600',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 100×600 Premium',
      de: 'Fischgrät 100×600 Premium',
      en: 'Herringbone 100×600 Premium'
    },
    description: {
      fr: 'Chevron 3 plis haute performance, compatible système clic 5G',
      de: 'Hochleistungs-3-Schicht-Fischgrät, kompatibel mit 5G-Klicksystem',
      en: 'High performance 3-ply herringbone, compatible with 5G click system'
    },
    formats: [{
      width: 100,
      length: 600,
      thickness: '14mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 105, m2PerColis: 0.84, kgPerColis: 6.13 }
    }],
    images: []
  },
  {
    id: 'br-14-120x600',
    slug: 'baton-rompu-14mm-120x600',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 120×600 Premium',
      de: 'Fischgrät 120×600 Premium',
      en: 'Herringbone 120×600 Premium'
    },
    description: {
      fr: 'Chevron 3 plis lames larges, le meilleur des deux mondes',
      de: '3-Schicht-Fischgrät mit breiten Dielen, das Beste aus beiden Welten',
      en: '3-ply herringbone wide planks, the best of both worlds'
    },
    formats: [{
      width: 120,
      length: 600,
      thickness: '14mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 84, m2PerColis: 1.01, kgPerColis: 7.36 }
    }],
    images: []
  },
  {
    id: 'br-14-145x725',
    slug: 'baton-rompu-14mm-145x725',
    poseType: 'baton-rompu',
    name: {
      fr: 'Bâton Rompu 145×725 Premium',
      de: 'Fischgrät 145×725 Premium',
      en: 'Herringbone 145×725 Premium'
    },
    description: {
      fr: 'Chevron grand format 3 plis, présence maximale dans les grands espaces',
      de: '3-Schicht-Fischgrät im Großformat, maximale Präsenz in großen Räumen',
      en: 'Large format 3-ply herringbone, maximum presence in large spaces'
    },
    formats: [{
      width: 145,
      length: 725,
      thickness: '14mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 63, m2PerColis: 1.47, kgPerColis: 10.74 }
    }],
    images: []
  }
];

// ============================================
// PRODUITS - LAMES
// ============================================

export const lames: ProductCategory[] = [
  // 11mm
  {
    id: 'lames-11-120x1200',
    slug: 'lames-11mm-120x1200',
    poseType: 'lames',
    name: {
      fr: 'Lames 120×1200',
      de: 'Dielen 120×1200',
      en: 'Planks 120×1200'
    },
    description: {
      fr: 'Lames classiques, format polyvalent pour tous les intérieurs',
      de: 'Klassische Dielen, vielseitiges Format für alle Innenräume',
      en: 'Classic planks, versatile format for all interiors'
    },
    formats: [{
      width: 120,
      length: 1200,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 33, m2PerColis: 2.88, kgPerColis: 18.72 }
    }],
    images: []
  },
  {
    id: 'lames-11-150x1330',
    slug: 'lames-11mm-150x1330',
    poseType: 'lames',
    name: {
      fr: 'Lames 150×1330',
      de: 'Dielen 150×1330',
      en: 'Planks 150×1330'
    },
    description: {
      fr: 'Lames larges, élégance naturelle pour espaces de vie',
      de: 'Breite Dielen, natürliche Eleganz für Wohnräume',
      en: 'Wide planks, natural elegance for living spaces'
    },
    formats: [{
      width: 150,
      length: 1330,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic', 'country'],
      packaging: { colisPerPalette: 40, m2PerColis: 2.39, kgPerColis: 15.56 }
    }],
    images: []
  },
  {
    id: 'lames-11-150x1800',
    slug: 'lames-11mm-150x1800',
    poseType: 'lames',
    name: {
      fr: 'Lames 150×1800',
      de: 'Dielen 150×1800',
      en: 'Planks 150×1800'
    },
    description: {
      fr: 'Lames longues pour une continuité visuelle remarquable',
      de: 'Lange Dielen für bemerkenswerte visuelle Kontinuität',
      en: 'Long planks for remarkable visual continuity'
    },
    formats: [{
      width: 150,
      length: 1800,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic', 'country'],
      packaging: { colisPerPalette: 30, m2PerColis: 2.97, kgPerColis: 19.31 }
    }],
    images: []
  },
  {
    id: 'lames-11-190x1800',
    slug: 'lames-11mm-190x1800',
    poseType: 'lames',
    name: {
      fr: 'Lames XL 190×1800',
      de: 'XL-Dielen 190×1800',
      en: 'XL Planks 190×1800'
    },
    description: {
      fr: 'Lames extra-larges, présence affirmée et contemporaine',
      de: 'Extra-breite Dielen, ausgeprägte und zeitgenössische Präsenz',
      en: 'Extra-wide planks, bold and contemporary presence'
    },
    formats: [{
      width: 190,
      length: 1800,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 25, m2PerColis: 3.76, kgPerColis: 24.45 }
    }],
    images: []
  },
  {
    id: 'lames-11-190x2000',
    slug: 'lames-11mm-190x2000',
    poseType: 'lames',
    name: {
      fr: 'Lames XL 190×2000',
      de: 'XL-Dielen 190×2000',
      en: 'XL Planks 190×2000'
    },
    description: {
      fr: 'Lames extra-longues, le summum de l\'élégance contemporaine',
      de: 'Extra-lange Dielen, der Gipfel zeitgenössischer Eleganz',
      en: 'Extra-long planks, the pinnacle of contemporary elegance'
    },
    formats: [{
      width: 190,
      length: 2000,
      thickness: '11mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 25, m2PerColis: 4.18, kgPerColis: 27.17 }
    }],
    images: []
  },
  // 14mm - multiples largeurs et longueurs
  {
    id: 'lames-14-145',
    slug: 'lames-14mm-145',
    poseType: 'lames',
    name: {
      fr: 'Lames Premium 145mm',
      de: 'Premium-Dielen 145mm',
      en: 'Premium Planks 145mm'
    },
    description: {
      fr: 'Lames 3 plis largeur 145mm, disponibles en 1830 et 2230mm',
      de: '3-Schicht-Dielen Breite 145mm, erhältlich in 1830 und 2230mm',
      en: '3-ply planks width 145mm, available in 1830 and 2230mm'
    },
    formats: [
      { width: 145, length: 1830, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 49, m2PerColis: 1.86, kgPerColis: 13.56 } },
      { width: 145, length: 2230, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 49, m2PerColis: 2.26, kgPerColis: 16.52 } }
    ],
    images: []
  },
  {
    id: 'lames-14-164',
    slug: 'lames-14mm-164',
    poseType: 'lames',
    name: {
      fr: 'Lames Premium 164mm',
      de: 'Premium-Dielen 164mm',
      en: 'Premium Planks 164mm'
    },
    description: {
      fr: 'Lames 3 plis largeur 164mm, disponibles en 1830 et 2230mm',
      de: '3-Schicht-Dielen Breite 164mm, erhältlich in 1830 und 2230mm',
      en: '3-ply planks width 164mm, available in 1830 and 2230mm'
    },
    formats: [
      { width: 164, length: 1830, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 42, m2PerColis: 2.10, kgPerColis: 15.33 } },
      { width: 164, length: 2230, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 42, m2PerColis: 2.56, kgPerColis: 18.69 } }
    ],
    images: []
  },
  {
    id: 'lames-14-194',
    slug: 'lames-14mm-194',
    poseType: 'lames',
    name: {
      fr: 'Lames Premium XL 194mm',
      de: 'Premium XL-Dielen 194mm',
      en: 'Premium XL Planks 194mm'
    },
    description: {
      fr: 'Lames 3 plis largeur 194mm, disponibles en 1830, 2230 et 2430mm',
      de: '3-Schicht-Dielen Breite 194mm, erhältlich in 1830, 2230 und 2430mm',
      en: '3-ply planks width 194mm, available in 1830, 2230 and 2430mm'
    },
    formats: [
      { width: 194, length: 1830, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 35, m2PerColis: 2.49, kgPerColis: 18.14 } },
      { width: 194, length: 2230, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 35, m2PerColis: 3.03, kgPerColis: 22.10 } },
      { width: 194, length: 2430, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 35, m2PerColis: 3.30, kgPerColis: 24.08 } }
    ],
    images: []
  },
  {
    id: 'lames-14-234',
    slug: 'lames-14mm-234',
    poseType: 'lames',
    name: {
      fr: 'Lames Premium XXL 234mm',
      de: 'Premium XXL-Dielen 234mm',
      en: 'Premium XXL Planks 234mm'
    },
    description: {
      fr: 'Lames 3 plis extra-larges 234mm, le format le plus généreux',
      de: 'Extra-breite 3-Schicht-Dielen 234mm, das großzügigste Format',
      en: 'Extra-wide 3-ply planks 234mm, the most generous format'
    },
    formats: [
      { width: 234, length: 1830, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 28, m2PerColis: 3.00, kgPerColis: 21.88 } },
      { width: 234, length: 2230, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 28, m2PerColis: 3.65, kgPerColis: 26.66 } },
      { width: 234, length: 2430, thickness: '14mm', grades: ['exclusive', 'elegance', 'rustic', 'country'], packaging: { colisPerPalette: 28, m2PerColis: 3.98, kgPerColis: 29.05 } }
    ],
    images: []
  }
];

// ============================================
// PRODUITS - POINT DE HONGRIE
// ============================================

export const pointHongrie: ProductCategory[] = [
  // 11mm - 45°
  {
    id: 'ph45-11-70x410',
    slug: 'point-hongrie-45-11mm-70x410',
    poseType: 'point-hongrie-45',
    name: {
      fr: 'Point de Hongrie 45° 70×410',
      de: 'Ungarisches Muster 45° 70×410',
      en: 'Hungarian Point 45° 70×410'
    },
    description: {
      fr: 'Le classique français par excellence, coupe en biseau à 45°',
      de: 'Der französische Klassiker schlechthin, 45° Schrägschnitt',
      en: 'The quintessential French classic, 45° beveled cut'
    },
    formats: [{
      width: 70,
      length: 410,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 48, m2PerColis: 1.73, kgPerColis: 11.37 }
    }],
    images: []
  },
  {
    id: 'ph45-11-100x480',
    slug: 'point-hongrie-45-11mm-100x480',
    poseType: 'point-hongrie-45',
    name: {
      fr: 'Point de Hongrie 45° 100×480',
      de: 'Ungarisches Muster 45° 100×480',
      en: 'Hungarian Point 45° 100×480'
    },
    description: {
      fr: 'Point de Hongrie format intermédiaire, élégance intemporelle',
      de: 'Ungarisches Muster Mittelformat, zeitlose Eleganz',
      en: 'Hungarian Point intermediate format, timeless elegance'
    },
    formats: [{
      width: 100,
      length: 480,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 60, m2PerColis: 1.15, kgPerColis: 7.60 }
    }],
    images: []
  },
  {
    id: 'ph45-11-120x600',
    slug: 'point-hongrie-45-11mm-120x600',
    poseType: 'point-hongrie-45',
    name: {
      fr: 'Point de Hongrie 45° 120×600',
      de: 'Ungarisches Muster 45° 120×600',
      en: 'Hungarian Point 45° 120×600'
    },
    description: {
      fr: 'Point de Hongrie grand format, majestueux et contemporain',
      de: 'Ungarisches Muster Großformat, majestätisch und zeitgenössisch',
      en: 'Hungarian Point large format, majestic and contemporary'
    },
    formats: [{
      width: 120,
      length: 600,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 62, m2PerColis: 1.72, kgPerColis: 11.23 }
    }],
    images: []
  },
  // 11mm - 60°
  {
    id: 'ph60-11-70x410',
    slug: 'point-hongrie-60-11mm-70x410',
    poseType: 'point-hongrie-60',
    name: {
      fr: 'Point de Hongrie 60° 70×410',
      de: 'Ungarisches Muster 60° 70×410',
      en: 'Hungarian Point 60° 70×410'
    },
    description: {
      fr: 'Point de Hongrie angle 60°, motif plus ouvert et aéré',
      de: 'Ungarisches Muster 60° Winkel, offeneres und luftigeres Muster',
      en: 'Hungarian Point 60° angle, more open and airy pattern'
    },
    formats: [{
      width: 70,
      length: 410,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 48, m2PerColis: 1.73, kgPerColis: 11.37 }
    }],
    images: []
  },
  {
    id: 'ph60-11-100x480',
    slug: 'point-hongrie-60-11mm-100x480',
    poseType: 'point-hongrie-60',
    name: {
      fr: 'Point de Hongrie 60° 100×480',
      de: 'Ungarisches Muster 60° 100×480',
      en: 'Hungarian Point 60° 100×480'
    },
    description: {
      fr: 'Point de Hongrie 60° format intermédiaire',
      de: 'Ungarisches Muster 60° Mittelformat',
      en: 'Hungarian Point 60° intermediate format'
    },
    formats: [{
      width: 100,
      length: 480,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 60, m2PerColis: 1.15, kgPerColis: 7.60 }
    }],
    images: []
  },
  {
    id: 'ph60-11-120x600',
    slug: 'point-hongrie-60-11mm-120x600',
    poseType: 'point-hongrie-60',
    name: {
      fr: 'Point de Hongrie 60° 120×600',
      de: 'Ungarisches Muster 60° 120×600',
      en: 'Hungarian Point 60° 120×600'
    },
    description: {
      fr: 'Point de Hongrie 60° grand format',
      de: 'Ungarisches Muster 60° Großformat',
      en: 'Hungarian Point 60° large format'
    },
    formats: [{
      width: 120,
      length: 600,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 62, m2PerColis: 1.72, kgPerColis: 11.23 }
    }],
    images: []
  },
  // 14mm - 45°
  {
    id: 'ph45-14-120x460',
    slug: 'point-hongrie-45-14mm-120x460',
    poseType: 'point-hongrie-45',
    name: {
      fr: 'Point de Hongrie 45° Premium 120×460',
      de: 'Ungarisches Muster 45° Premium 120×460',
      en: 'Hungarian Point 45° Premium 120×460'
    },
    description: {
      fr: 'Point de Hongrie 3 plis, performance et noblesse',
      de: '3-Schicht Ungarisches Muster, Leistung und Eleganz',
      en: '3-ply Hungarian Point, performance and nobility'
    },
    formats: [{
      width: 120,
      length: 460,
      thickness: '14mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 84, m2PerColis: 0.77, kgPerColis: 5.64 }
    }],
    images: []
  },
  {
    id: 'ph45-14-120x600',
    slug: 'point-hongrie-45-14mm-120x600',
    poseType: 'point-hongrie-45',
    name: {
      fr: 'Point de Hongrie 45° Premium 120×600',
      de: 'Ungarisches Muster 45° Premium 120×600',
      en: 'Hungarian Point 45° Premium 120×600'
    },
    description: {
      fr: 'Point de Hongrie 3 plis format généreux',
      de: '3-Schicht Ungarisches Muster großzügiges Format',
      en: '3-ply Hungarian Point generous format'
    },
    formats: [{
      width: 120,
      length: 600,
      thickness: '14mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 84, m2PerColis: 1.01, kgPerColis: 7.36 }
    }],
    images: []
  },
  {
    id: 'ph45-14-145x560',
    slug: 'point-hongrie-45-14mm-145x560',
    poseType: 'point-hongrie-45',
    name: {
      fr: 'Point de Hongrie 45° Premium 145×560',
      de: 'Ungarisches Muster 45° Premium 145×560',
      en: 'Hungarian Point 45° Premium 145×560'
    },
    description: {
      fr: 'Point de Hongrie 3 plis lames larges',
      de: '3-Schicht Ungarisches Muster breite Dielen',
      en: '3-ply Hungarian Point wide planks'
    },
    formats: [{
      width: 145,
      length: 560,
      thickness: '14mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 63, m2PerColis: 1.14, kgPerColis: 8.29 }
    }],
    images: []
  },
  {
    id: 'ph45-14-145x750',
    slug: 'point-hongrie-45-14mm-145x750',
    poseType: 'point-hongrie-45',
    name: {
      fr: 'Point de Hongrie 45° Premium XL 145×750',
      de: 'Ungarisches Muster 45° Premium XL 145×750',
      en: 'Hungarian Point 45° Premium XL 145×750'
    },
    description: {
      fr: 'Point de Hongrie 3 plis grand format, le plus prestigieux',
      de: '3-Schicht Ungarisches Muster Großformat, das prestigeträchtigste',
      en: '3-ply Hungarian Point large format, the most prestigious'
    },
    formats: [{
      width: 145,
      length: 750,
      thickness: '14mm',
      grades: ['exclusive', 'elegance', 'rustic'],
      packaging: { colisPerPalette: 42, m2PerColis: 1.52, kgPerColis: 11.11 }
    }],
    images: []
  }
];

// ============================================
// PRODUITS - FORMPARK (VANNERIE)
// ============================================

export const formpark: ProductCategory[] = [
  {
    id: 'formpark-11-190x380',
    slug: 'formpark-11mm-190x380',
    poseType: 'formpark',
    name: {
      fr: 'Formpark 190×380',
      de: 'Formpark 190×380',
      en: 'Formpark 190×380'
    },
    description: {
      fr: 'Motif vannerie/tressé, design unique et contemporain',
      de: 'Flechtmuster, einzigartiges und zeitgenössisches Design',
      en: 'Basket weave pattern, unique and contemporary design'
    },
    formats: [{
      width: 190,
      length: 380,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 96, m2PerColis: 0.87, kgPerColis: 5.63 }
    }],
    images: []
  },
  {
    id: 'formpark-11-190x570',
    slug: 'formpark-11mm-190x570',
    poseType: 'formpark',
    name: {
      fr: 'Formpark 190×570',
      de: 'Formpark 190×570',
      en: 'Formpark 190×570'
    },
    description: {
      fr: 'Motif vannerie format allongé, effet décoratif renforcé',
      de: 'Flechtmuster verlängertes Format, verstärkter dekorativer Effekt',
      en: 'Basket weave elongated format, enhanced decorative effect'
    },
    formats: [{
      width: 190,
      length: 570,
      thickness: '11mm',
      grades: ['exclusive', 'elegance'],
      packaging: { colisPerPalette: 64, m2PerColis: 1.3, kgPerColis: 8.45 }
    }],
    images: []
  }
];

// ============================================
// EXPORT GLOBAL
// ============================================

export const allProducts: ProductCategory[] = [
  ...batonRompu,
  ...lames,
  ...pointHongrie,
  ...formpark
];

// Fonction utilitaire pour trouver un produit par slug
export function getProductBySlug(slug: string): ProductCategory | undefined {
  return allProducts.find(p => p.slug === slug);
}

// Fonction utilitaire pour filtrer par type de pose
export function getProductsByPoseType(poseType: PoseType): ProductCategory[] {
  return allProducts.filter(p => p.poseType === poseType);
}

// Fonction utilitaire pour filtrer par épaisseur
export function getProductsByThickness(thickness: Thickness): ProductCategory[] {
  return allProducts.filter(p => p.formats.some(f => f.thickness === thickness));
}

// Caractéristiques communes à tous les produits
export const productFeatures = {
  fr: [
    'Couche d\'usure chêne 3,5mm',
    'Compatible chauffage au sol',
    'Certifié FSC',
    'Sans formaldéhyde',
    'Fabriqué en Europe'
  ],
  de: [
    '3,5mm Eiche Nutzschicht',
    'Fußbodenheizung geeignet',
    'FSC-zertifiziert',
    'Formaldehydfrei',
    'In Europa hergestellt'
  ],
  en: [
    '3.5mm oak wear layer',
    'Underfloor heating compatible',
    'FSC certified',
    'Formaldehyde-free',
    'Made in Europe'
  ]
};
