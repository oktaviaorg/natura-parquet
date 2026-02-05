// Catalogue Natura Parquet - Données réelles Axemark
// Prix avec marge 35% sur prix fournisseur + TVA 20%

export interface Product {
  id: string;
  slug: string;
  category: 'engineered' | 'solid' | 'industrial';
  subcategory?: 'lame' | 'herringbone' | 'chevron' | 'formpark';
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
  woodType: 'oak' | 'ash';
  grade: 'exclusive' | 'elegance' | 'rustic' | 'country';
  finish: string;
  color: 'light' | 'medium' | 'dark' | 'natural';
  colorName?: string;
  dimensions: {
    width: string;
    length: string;
    thickness: string;
  };
  structure: '2-plis' | '3-plis' | 'massif';
  features: string[];
  images: string[];
  price: {
    ht: number;
    ttc: number;
    display: string;
  };
  packaging?: {
    m2PerBox: number;
    boxesPerPallet: number;
  };
}

export interface Collection {
  id: string;
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
  color: string;
  image: string;
  thickness: '11mm' | '14mm';
}

// Images hero et ambiances
export const heroImages = {
  main: '/images/showroom/hero-formpark.jpg',
  engineered: '/images/products/lame-exclusive-190.jpg',
  solid: '/images/products/herringbone-exclusive-70.jpg',
  industrial: '/images/products/formpark-exclusive.jpg',
  ambiance1: '/images/products/lame-elegance-150.jpg',
  ambiance2: '/images/products/chevron-60-elegance.jpg',
  ambiance3: '/images/products/lame-country-150.jpg',
};

// Images produits Axemark
export const productImages = {
  // Couleurs 11mm
  colorNeutral: '/images/products/lame-exclusive-150.jpg',
  colorHoney: '/images/products/color-honey.jpg',
  colorCrema: '/images/products/color-crema.jpg',
  colorNugat: '/images/products/color-nugat.jpg',
  colorRaw: '/images/products/color-raw.jpg',
  colorAmber: '/images/products/color-amber.jpg',
  colorGilio: '/images/products/color-gilio.jpg',
  colorMulti: '/images/products/color-multicolored.jpg',
  
  // Bâtons rompus (Herringbone)
  herringboneExclusive70: '/images/products/herringbone-exclusive-70.jpg',
  herringboneExclusive70Detail: '/images/products/herringbone-exclusive-70-detail.jpg',
  herringboneElegance70: '/images/products/herringbone-elegance-70.jpg',
  herringboneElegance70Detail: '/images/products/herringbone-elegance-70-detail.jpg',
  herringboneRustic70: '/images/products/herringbone-rustic-70.jpg',
  herringboneRustic70Detail: '/images/products/herringbone-rustic-70-detail.jpg',
  herringboneElegance120: '/images/products/herringbone-elegance-120.jpg',
  herringboneElegance120Detail: '/images/products/herringbone-elegance-120-detail.jpg',
  
  // Lames
  lameExclusive150: '/images/products/lame-exclusive-150.jpg',
  lameExclusive150Detail: '/images/products/lame-exclusive-150-detail.jpg',
  lameElegance150: '/images/products/lame-elegance-150.jpg',
  lameElegance150Detail: '/images/products/lame-elegance-150-detail.jpg',
  lameRustic150: '/images/products/lame-rustic-150.jpg',
  lameRustic150Detail: '/images/products/lame-rustic-150-detail.jpg',
  lameCountry150: '/images/products/lame-country-150.jpg',
  lameCountry150Detail: '/images/products/lame-country-150-detail.jpg',
  lameExclusive190: '/images/products/lame-exclusive-190.jpg',
  lameExclusive190Detail: '/images/products/lame-exclusive-190-detail.jpg',
  lameElegance190: '/images/products/lame-elegance-190.jpg',
  lameElegance190Detail: '/images/products/lame-elegance-190-detail.jpg',
  lameRustic190: '/images/products/lame-rustic-190.jpg',
  lameRustic190Detail: '/images/products/lame-rustic-190-detail.jpg',
  
  // Point de Hongrie (Chevron)
  chevron45Exclusive: '/images/products/chevron-45-exclusive.jpg',
  chevron45ExclusiveDetail: '/images/products/chevron-45-exclusive-detail.jpg',
  chevron45Elegance: '/images/products/chevron-45-elegance.jpg',
  chevron45EleganceDetail: '/images/products/chevron-45-elegance-detail.jpg',
  chevron60Exclusive: '/images/products/chevron-60-exclusive.jpg',
  chevron60ExclusiveDetail: '/images/products/chevron-60-exclusive-detail.jpg',
  chevron60Elegance: '/images/products/chevron-60-elegance.jpg',
  chevron60EleganceDetail: '/images/products/chevron-60-elegance-detail.jpg',
  
  // Formpark
  formparkExclusive: '/images/products/formpark-exclusive.jpg',
  formparkExclusiveDetail: '/images/products/formpark-exclusive-detail.jpg',
  
  // Legacy - pour compatibilité
  kashmir: '/images/products/lame-exclusive-150.jpg',
  kashmirDetail: '/images/products/lame-exclusive-150-detail.jpg',
  raw: '/images/products/color-raw.jpg',
  rawDetail: '/images/products/lame-elegance-150.jpg',
  julia: '/images/products/color-gilio.jpg',
  juliaDetail: '/images/products/lame-elegance-190.jpg',
  brown: '/images/products/color-nugat.jpg',
  brownDetail: '/images/products/lame-rustic-150.jpg',
  nude: '/images/products/lame-elegance-190.jpg',
  nudeDetail: '/images/products/lame-elegance-190-detail.jpg',
  naturalOil: '/images/products/color-honey.jpg',
  naturalOilDetail: '/images/products/lame-country-150.jpg',
  chevron: '/images/products/chevron-60-elegance.jpg',
  chevronDetail: '/images/products/chevron-60-elegance-detail.jpg',
  herringbone1: '/images/products/herringbone-exclusive-70.jpg',
  herringbone2: '/images/products/herringbone-exclusive-70-detail.jpg',
  showroom1: '/images/showroom/lames-sol-1.jpg',
  showroom2: '/images/showroom/showroom-complet.jpg',
  oakLight1: '/images/products/lame-exclusive-150.jpg',
  oakLight2: '/images/products/lame-elegance-150.jpg',
  oakLight3: '/images/products/lame-elegance-190.jpg',
  oakMedium1: '/images/products/lame-country-150.jpg',
  oakMedium2: '/images/products/color-honey.jpg',
  oakDark1: '/images/products/lame-rustic-150.jpg',
  oakDark2: '/images/products/lame-rustic-190.jpg',
};

// Collections de couleurs 11mm
export const collections11mm: Collection[] = [
  {
    id: 'neutral',
    name: { fr: 'Neutral', de: 'Neutral', en: 'Neutral' },
    description: {
      fr: 'Finition naturelle, beauté authentique du chêne préservée',
      de: 'Natürliches Finish, authentische Eichenschönheit bewahrt',
      en: 'Natural finish, authentic oak beauty preserved'
    },
    color: '#d4c4a8',
    image: productImages.colorNeutral,
    thickness: '11mm',
  },
  {
    id: 'honey',
    name: { fr: 'Honey', de: 'Honig', en: 'Honey' },
    description: {
      fr: 'Teinte miel chaleureuse, finition huilée dorée',
      de: 'Warmer Honigton, goldenes Ölfinish',
      en: 'Warm honey tone, golden oil finish'
    },
    color: '#c9a868',
    image: productImages.colorHoney,
    thickness: '11mm',
  },
  {
    id: 'crema',
    name: { fr: 'Crema', de: 'Crema', en: 'Crema' },
    description: {
      fr: 'Teinte crème délicate, ambiance scandinave',
      de: 'Zarter Cremeton, skandinavische Atmosphäre',
      en: 'Delicate cream tone, Scandinavian ambiance'
    },
    color: '#e8dcc4',
    image: productImages.colorCrema,
    thickness: '11mm',
  },
  {
    id: 'nugat',
    name: { fr: 'Nugat', de: 'Nugat', en: 'Nugat' },
    description: {
      fr: 'Teinte nougat profonde, caractère chaleureux',
      de: 'Tiefe Nugatfarbe, warmer Charakter',
      en: 'Deep nougat tone, warm character'
    },
    color: '#a88960',
    image: productImages.colorNugat,
    thickness: '11mm',
  },
  {
    id: 'raw-wood',
    name: { fr: 'Raw Wood', de: 'Rohholz', en: 'Raw Wood' },
    description: {
      fr: 'Aspect bois brut, finition invisible',
      de: 'Rohholzoptik, unsichtbares Finish',
      en: 'Raw wood look, invisible finish'
    },
    color: '#c4b896',
    image: productImages.colorRaw,
    thickness: '11mm',
  },
  {
    id: 'amber',
    name: { fr: 'Amber', de: 'Bernstein', en: 'Amber' },
    description: {
      fr: "Teinte ambrée lumineuse, reflets d'or",
      de: 'Leuchtender Bernsteinton, goldene Reflexe',
      en: 'Luminous amber tone, golden reflections'
    },
    color: '#b8956a',
    image: productImages.colorAmber,
    thickness: '11mm',
  },
];

// Collections de couleurs 14mm
export const collections14mm: Collection[] = [
  {
    id: 'julia',
    name: { fr: 'Julia', de: 'Julia', en: 'Julia' },
    description: {
      fr: 'Élégance classique, tons dorés et lumineux',
      de: 'Klassische Eleganz, goldene und helle Töne',
      en: 'Classic elegance, golden and luminous tones'
    },
    color: '#c9b896',
    image: productImages.colorGilio,
    thickness: '14mm',
  },
  {
    id: 'white',
    name: { fr: 'White', de: 'Weiß', en: 'White' },
    description: {
      fr: 'Blanc pur, style contemporain épuré',
      de: 'Reines Weiß, klarer zeitgenössischer Stil',
      en: 'Pure white, clean contemporary style'
    },
    color: '#f5efe6',
    image: productImages.colorCrema,
    thickness: '14mm',
  },
  {
    id: 'stone-grey',
    name: { fr: 'Stone Grey', de: 'Steingrau', en: 'Stone Grey' },
    description: {
      fr: 'Gris pierre élégant, ambiance moderne',
      de: 'Elegantes Steingrau, moderne Atmosphäre',
      en: 'Elegant stone grey, modern ambiance'
    },
    color: '#9a9590',
    image: productImages.lameElegance190,
    thickness: '14mm',
  },
  {
    id: 'warm-cotton',
    name: { fr: 'Warm Cotton', de: 'Warme Baumwolle', en: 'Warm Cotton' },
    description: {
      fr: 'Blanc coton chaleureux, douceur naturelle',
      de: 'Warmes Baumwollweiß, natürliche Weichheit',
      en: 'Warm cotton white, natural softness'
    },
    color: '#ece5d8',
    image: productImages.lameExclusive190,
    thickness: '14mm',
  },
];

// Export combiné des collections
export const collections = [...collections11mm, ...collections14mm];

// ========================================
// PRODUITS - PARQUET CONTRECOLLÉ 11MM (2 PLIS)
// ========================================

export const products: Product[] = [
  // --- BÂTON ROMPU 11x70x490 ---
  {
    id: 'herringbone-11-70-exclusive',
    slug: 'baton-rompu-exclusive-70',
    category: 'engineered',
    subcategory: 'herringbone',
    name: {
      fr: 'Bâton Rompu Exclusive 70',
      de: 'Fischgrät Exclusive 70',
      en: 'Herringbone Exclusive 70'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, qualité Exclusive (Select). Pose bâton rompu classique pour un style haussmannien intemporel. Couche noble 3,5mm.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Exclusive Qualität (Select). Klassisches Fischgrätmuster für zeitlosen Haussmann-Stil. 3,5mm Nutzschicht.',
      en: 'Engineered oak parquet 2-ply, Exclusive grade (Select). Classic herringbone pattern for timeless Haussmann style. 3.5mm wear layer.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Neutral - Vernis mat',
    color: 'light',
    colorName: 'Neutral',
    dimensions: { width: '70mm', length: '490mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Chanfreins 4 côtés', 'Compatible chauffage au sol', 'Pose collée recommandée'],
    images: [productImages.herringboneExclusive70, productImages.herringboneExclusive70Detail],
    price: { ht: 72.50, ttc: 87, display: '87 €/m²' },
    packaging: { m2PerBox: 2.06, boxesPerPallet: 48 },
  },
  {
    id: 'herringbone-11-70-elegance',
    slug: 'baton-rompu-elegance-70',
    category: 'engineered',
    subcategory: 'herringbone',
    name: {
      fr: 'Bâton Rompu Elegance 70',
      de: 'Fischgrät Elegance 70',
      en: 'Herringbone Elegance 70'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, qualité Elegance (Natur). Nœuds légers et variations naturelles pour un caractère authentique.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Elegance Qualität (Natur). Leichte Äste und natürliche Variationen für authentischen Charakter.',
      en: 'Engineered oak parquet 2-ply, Elegance grade (Natur). Light knots and natural variations for authentic character.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Neutral - Vernis mat',
    color: 'natural',
    colorName: 'Neutral',
    dimensions: { width: '70mm', length: '490mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Chanfreins 4 côtés', 'Compatible chauffage au sol', 'Pose collée recommandée'],
    images: [productImages.herringboneElegance70, productImages.herringboneElegance70Detail],
    price: { ht: 64.20, ttc: 77, display: '77 €/m²' },
    packaging: { m2PerBox: 2.06, boxesPerPallet: 48 },
  },
  {
    id: 'herringbone-11-70-rustic',
    slug: 'baton-rompu-rustic-70',
    category: 'engineered',
    subcategory: 'herringbone',
    name: {
      fr: 'Bâton Rompu Rustic 70',
      de: 'Fischgrät Rustic 70',
      en: 'Herringbone Rustic 70'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, qualité Rustic. Nœuds prononcés et variations marquées pour un cachet campagnard authentique.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Rustic Qualität. Ausgeprägte Äste und markante Variationen für authentischen Landhauscharakter.',
      en: 'Engineered oak parquet 2-ply, Rustic grade. Pronounced knots and marked variations for authentic country charm.'
    },
    woodType: 'oak',
    grade: 'rustic',
    finish: 'Neutral - Vernis mat',
    color: 'medium',
    colorName: 'Neutral',
    dimensions: { width: '70mm', length: '490mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Chanfreins 4 côtés', 'Compatible chauffage au sol', 'Pose collée recommandée'],
    images: [productImages.herringboneRustic70, productImages.herringboneRustic70Detail],
    price: { ht: 55.80, ttc: 67, display: '67 €/m²' },
    packaging: { m2PerBox: 2.06, boxesPerPallet: 48 },
  },

  // --- BÂTON ROMPU 11x120x600 ---
  {
    id: 'herringbone-11-120-elegance',
    slug: 'baton-rompu-elegance-120',
    category: 'engineered',
    subcategory: 'herringbone',
    name: {
      fr: 'Bâton Rompu Elegance 120',
      de: 'Fischgrät Elegance 120',
      en: 'Herringbone Elegance 120'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, format large 120mm. Qualité Elegance pour un bâton rompu contemporain et élégant.',
      de: 'Mehrschichtparkett Eiche 2-lagig, breites Format 120mm. Elegance Qualität für zeitgenössisches und elegantes Fischgrätmuster.',
      en: 'Engineered oak parquet 2-ply, wide format 120mm. Elegance grade for contemporary and elegant herringbone.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Neutral - Vernis mat',
    color: 'natural',
    colorName: 'Neutral',
    dimensions: { width: '120mm', length: '600mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Format large contemporain', 'Compatible chauffage au sol', 'Pose collée recommandée'],
    images: [productImages.herringboneElegance120, productImages.herringboneElegance120Detail],
    price: { ht: 68.30, ttc: 82, display: '82 €/m²' },
    packaging: { m2PerBox: 1.44, boxesPerPallet: 70 },
  },

  // --- LAMES 11x150x1330 ---
  {
    id: 'lame-11-150-exclusive',
    slug: 'lame-exclusive-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Exclusive 150',
      de: 'Diele Exclusive 150',
      en: 'Plank Exclusive 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, qualité Exclusive premium. Lame classique 150mm, idéale pour tous types d\'intérieurs.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Premium Exclusive Qualität. Klassische 150mm Diele, ideal für alle Interieurs.',
      en: 'Engineered oak parquet 2-ply, premium Exclusive grade. Classic 150mm plank, ideal for all interiors.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Neutral - Vernis mat',
    color: 'light',
    colorName: 'Neutral',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Chanfreins 4 côtés', 'Compatible chauffage au sol', 'Système clic ou R&L'],
    images: [productImages.lameExclusive150, productImages.lameExclusive150Detail],
    price: { ht: 66.60, ttc: 80, display: '80 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-elegance',
    slug: 'lame-elegance-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Elegance 150',
      de: 'Diele Elegance 150',
      en: 'Plank Elegance 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, qualité Elegance naturelle. Aspect authentique avec nœuds légers, excellent rapport qualité-prix.',
      de: 'Mehrschichtparkett Eiche 2-lagig, natürliche Elegance Qualität. Authentisches Aussehen mit leichten Ästen, ausgezeichnetes Preis-Leistungs-Verhältnis.',
      en: 'Engineered oak parquet 2-ply, natural Elegance grade. Authentic look with light knots, excellent value.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Neutral - Vernis mat',
    color: 'natural',
    colorName: 'Neutral',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Chanfreins 4 côtés', 'Compatible chauffage au sol', 'Système clic ou R&L'],
    images: [productImages.lameElegance150, productImages.lameElegance150Detail],
    price: { ht: 58.30, ttc: 70, display: '70 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-rustic',
    slug: 'lame-rustic-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Rustic 150',
      de: 'Diele Rustic 150',
      en: 'Plank Rustic 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, qualité Rustic. Caractère affirmé avec nœuds et variations de couleur pour un style campagne chic.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Rustic Qualität. Ausgeprägter Charakter mit Ästen und Farbvariationen für Landhausstil.',
      en: 'Engineered oak parquet 2-ply, Rustic grade. Bold character with knots and color variations for country chic style.'
    },
    woodType: 'oak',
    grade: 'rustic',
    finish: 'Neutral - Vernis mat',
    color: 'medium',
    colorName: 'Neutral',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Chanfreins 4 côtés', 'Compatible chauffage au sol', 'Système clic ou R&L'],
    images: [productImages.lameRustic150, productImages.lameRustic150Detail],
    price: { ht: 50.00, ttc: 60, display: '60 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-country',
    slug: 'lame-country-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Country 150',
      de: 'Diele Country 150',
      en: 'Plank Country 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, qualité Country. Aspect naturel prononcé, idéal pour ambiances chaleureuses et authentiques.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Country Qualität. Ausgeprägtes natürliches Aussehen, ideal für warme und authentische Atmosphären.',
      en: 'Engineered oak parquet 2-ply, Country grade. Pronounced natural look, ideal for warm and authentic atmospheres.'
    },
    woodType: 'oak',
    grade: 'country',
    finish: 'Neutral - Vernis mat',
    color: 'medium',
    colorName: 'Neutral',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Chanfreins 4 côtés', 'Compatible chauffage au sol', 'Système clic ou R&L'],
    images: [productImages.lameCountry150, productImages.lameCountry150Detail],
    price: { ht: 45.80, ttc: 55, display: '55 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },

  // --- LAMES 11x190x1800/2000 (GRAND FORMAT) ---
  {
    id: 'lame-11-190-exclusive',
    slug: 'lame-exclusive-190',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Exclusive 190 Grand Format',
      de: 'Diele Exclusive 190 Großformat',
      en: 'Plank Exclusive 190 Large Format'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis grand format, qualité Exclusive. Lames larges et longues pour un rendu spectaculaire et contemporain.',
      de: 'Mehrschichtparkett Eiche 2-lagig Großformat, Exclusive Qualität. Breite und lange Dielen für spektakuläre und zeitgenössische Optik.',
      en: 'Large format engineered oak parquet 2-ply, Exclusive grade. Wide and long planks for spectacular contemporary look.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Neutral - Vernis mat',
    color: 'light',
    colorName: 'Neutral',
    dimensions: { width: '190mm', length: '1800-2000mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Grand format premium', 'Compatible chauffage au sol', 'Effet moins de joints'],
    images: [productImages.lameExclusive190, productImages.lameExclusive190Detail],
    price: { ht: 78.30, ttc: 94, display: '94 €/m²' },
    packaging: { m2PerBox: 3.76, boxesPerPallet: 25 },
  },
  {
    id: 'lame-11-190-elegance',
    slug: 'lame-elegance-190',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Elegance 190 Grand Format',
      de: 'Diele Elegance 190 Großformat',
      en: 'Plank Elegance 190 Large Format'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis grand format, qualité Elegance. Lames généreuses avec caractère naturel modéré.',
      de: 'Mehrschichtparkett Eiche 2-lagig Großformat, Elegance Qualität. Großzügige Dielen mit moderatem natürlichem Charakter.',
      en: 'Large format engineered oak parquet 2-ply, Elegance grade. Generous planks with moderate natural character.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Neutral - Vernis mat',
    color: 'natural',
    colorName: 'Neutral',
    dimensions: { width: '190mm', length: '1800-2000mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Grand format premium', 'Compatible chauffage au sol', 'Effet moins de joints'],
    images: [productImages.lameElegance190, productImages.lameElegance190Detail],
    price: { ht: 70.00, ttc: 84, display: '84 €/m²' },
    packaging: { m2PerBox: 3.76, boxesPerPallet: 25 },
  },
  {
    id: 'lame-11-190-rustic',
    slug: 'lame-rustic-190',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Rustic 190 Grand Format',
      de: 'Diele Rustic 190 Großformat',
      en: 'Plank Rustic 190 Large Format'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis grand format, qualité Rustic. Grandes lames au caractère authentique prononcé.',
      de: 'Mehrschichtparkett Eiche 2-lagig Großformat, Rustic Qualität. Große Dielen mit ausgeprägtem authentischem Charakter.',
      en: 'Large format engineered oak parquet 2-ply, Rustic grade. Large planks with pronounced authentic character.'
    },
    woodType: 'oak',
    grade: 'rustic',
    finish: 'Neutral - Vernis mat',
    color: 'medium',
    colorName: 'Neutral',
    dimensions: { width: '190mm', length: '1800-2000mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Grand format premium', 'Compatible chauffage au sol', 'Effet moins de joints'],
    images: [productImages.lameRustic190, productImages.lameRustic190Detail],
    price: { ht: 61.60, ttc: 74, display: '74 €/m²' },
    packaging: { m2PerBox: 3.76, boxesPerPallet: 25 },
  },

  // --- POINT DE HONGRIE 45° ---
  {
    id: 'chevron-45-11-exclusive',
    slug: 'chevron-45-exclusive',
    category: 'engineered',
    subcategory: 'chevron',
    name: {
      fr: 'Point de Hongrie 45° Exclusive',
      de: 'Ungarisches Fischgrät 45° Exclusive',
      en: 'Hungarian Herringbone 45° Exclusive'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, pose Point de Hongrie 45°. Qualité Exclusive pour un rendu luxueux et raffiné.',
      de: 'Mehrschichtparkett Eiche 2-lagig, ungarisches Fischgrät 45°. Exclusive Qualität für luxuriöses und raffiniertes Erscheinungsbild.',
      en: 'Engineered oak parquet 2-ply, Hungarian herringbone 45°. Exclusive grade for luxurious and refined look.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Neutral - Vernis mat',
    color: 'light',
    colorName: 'Neutral',
    dimensions: { width: '100mm', length: '480mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Angle 45°', 'Compatible chauffage au sol', 'Pose géométrique élégante'],
    images: [productImages.chevron45Exclusive, productImages.chevron45ExclusiveDetail],
    price: { ht: 82.50, ttc: 99, display: '99 €/m²' },
    packaging: { m2PerBox: 1.15, boxesPerPallet: 60 },
  },
  {
    id: 'chevron-45-11-elegance',
    slug: 'chevron-45-elegance',
    category: 'engineered',
    subcategory: 'chevron',
    name: {
      fr: 'Point de Hongrie 45° Elegance',
      de: 'Ungarisches Fischgrät 45° Elegance',
      en: 'Hungarian Herringbone 45° Elegance'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, pose Point de Hongrie 45°. Qualité Elegance avec caractère naturel.',
      de: 'Mehrschichtparkett Eiche 2-lagig, ungarisches Fischgrät 45°. Elegance Qualität mit natürlichem Charakter.',
      en: 'Engineered oak parquet 2-ply, Hungarian herringbone 45°. Elegance grade with natural character.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Neutral - Vernis mat',
    color: 'natural',
    colorName: 'Neutral',
    dimensions: { width: '100mm', length: '480mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Angle 45°', 'Compatible chauffage au sol', 'Pose géométrique élégante'],
    images: [productImages.chevron45Elegance, productImages.chevron45EleganceDetail],
    price: { ht: 74.20, ttc: 89, display: '89 €/m²' },
    packaging: { m2PerBox: 1.15, boxesPerPallet: 60 },
  },

  // --- POINT DE HONGRIE 60° ---
  {
    id: 'chevron-60-11-exclusive',
    slug: 'chevron-60-exclusive',
    category: 'engineered',
    subcategory: 'chevron',
    name: {
      fr: 'Point de Hongrie 60° Exclusive',
      de: 'Ungarisches Fischgrät 60° Exclusive',
      en: 'Hungarian Herringbone 60° Exclusive'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, pose Point de Hongrie 60°. Angle classique pour un style traditionnel élégant.',
      de: 'Mehrschichtparkett Eiche 2-lagig, ungarisches Fischgrät 60°. Klassischer Winkel für traditionell eleganten Stil.',
      en: 'Engineered oak parquet 2-ply, Hungarian herringbone 60°. Classic angle for traditional elegant style.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Neutral - Vernis mat',
    color: 'light',
    colorName: 'Neutral',
    dimensions: { width: '100mm', length: '480mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Angle 60°', 'Compatible chauffage au sol', 'Style traditionnel'],
    images: [productImages.chevron60Exclusive, productImages.chevron60ExclusiveDetail],
    price: { ht: 82.50, ttc: 99, display: '99 €/m²' },
    packaging: { m2PerBox: 1.15, boxesPerPallet: 60 },
  },
  {
    id: 'chevron-60-11-elegance',
    slug: 'chevron-60-elegance',
    category: 'engineered',
    subcategory: 'chevron',
    name: {
      fr: 'Point de Hongrie 60° Elegance',
      de: 'Ungarisches Fischgrät 60° Elegance',
      en: 'Hungarian Herringbone 60° Elegance'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, pose Point de Hongrie 60°. Qualité Elegance pour un rendu naturel et élégant.',
      de: 'Mehrschichtparkett Eiche 2-lagig, ungarisches Fischgrät 60°. Elegance Qualität für natürliches und elegantes Erscheinungsbild.',
      en: 'Engineered oak parquet 2-ply, Hungarian herringbone 60°. Elegance grade for natural and elegant look.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Neutral - Vernis mat',
    color: 'natural',
    colorName: 'Neutral',
    dimensions: { width: '100mm', length: '480mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Angle 60°', 'Compatible chauffage au sol', 'Style traditionnel'],
    images: [productImages.chevron60Elegance, productImages.chevron60EleganceDetail],
    price: { ht: 74.20, ttc: 89, display: '89 €/m²' },
    packaging: { m2PerBox: 1.15, boxesPerPallet: 60 },
  },

  // --- FORMPARK ---
  {
    id: 'formpark-11-190-exclusive',
    slug: 'formpark-exclusive',
    category: 'engineered',
    subcategory: 'formpark',
    name: {
      fr: 'Formpark Exclusive',
      de: 'Formpark Exclusive',
      en: 'Formpark Exclusive'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis format Formpark. Lames courtes pour pose créative en motifs variés : damier, décalé, puzzle.',
      de: 'Mehrschichtparkett Eiche 2-lagig Formpark-Format. Kurze Dielen für kreative Verlegung in verschiedenen Mustern: Schachbrett, versetzt, Puzzle.',
      en: 'Engineered oak parquet 2-ply Formpark format. Short planks for creative laying in various patterns: checkerboard, staggered, puzzle.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Neutral - Vernis mat',
    color: 'light',
    colorName: 'Neutral',
    dimensions: { width: '190mm', length: '380-570mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Poses créatives multiples', 'Compatible chauffage au sol', 'Design personnalisable'],
    images: [productImages.formparkExclusive, productImages.formparkExclusiveDetail],
    price: { ht: 70.80, ttc: 85, display: '85 €/m²' },
    packaging: { m2PerBox: 1.3, boxesPerPallet: 64 },
  },

  // ========================================
  // PRODUITS - PARQUET CONTRECOLLÉ 14MM (3 PLIS)
  // ========================================

  // --- LAMES 14x145 ---
  {
    id: 'lame-14-145-exclusive',
    slug: 'lame-3plis-exclusive-145',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame 3 Plis Exclusive 145',
      de: 'Diele 3-lagig Exclusive 145',
      en: 'Plank 3-Ply Exclusive 145'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis premium, qualité Exclusive. Structure renforcée pour une stabilité maximale, idéal chauffage au sol.',
      de: 'Premium Mehrschichtparkett Eiche 3-lagig, Exclusive Qualität. Verstärkte Struktur für maximale Stabilität, ideal für Fußbodenheizung.',
      en: 'Premium 3-ply engineered oak parquet, Exclusive grade. Reinforced structure for maximum stability, ideal for underfloor heating.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Julia - Huilé',
    color: 'medium',
    colorName: 'Julia',
    dimensions: { width: '145mm', length: '1830-2230mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Structure 3 plis stabilisée', 'Idéal chauffage au sol', 'Système clic 5G'],
    images: [productImages.colorGilio, productImages.lameExclusive190],
    price: { ht: 87.50, ttc: 105, display: '105 €/m²' },
    packaging: { m2PerBox: 1.86, boxesPerPallet: 49 },
  },
  {
    id: 'lame-14-145-elegance',
    slug: 'lame-3plis-elegance-145',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame 3 Plis Elegance 145',
      de: 'Diele 3-lagig Elegance 145',
      en: 'Plank 3-Ply Elegance 145'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis, qualité Elegance. Excellent compromis stabilité et caractère naturel.',
      de: 'Mehrschichtparkett Eiche 3-lagig, Elegance Qualität. Ausgezeichneter Kompromiss zwischen Stabilität und natürlichem Charakter.',
      en: '3-ply engineered oak parquet, Elegance grade. Excellent balance of stability and natural character.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Warm Cotton - Huilé',
    color: 'light',
    colorName: 'Warm Cotton',
    dimensions: { width: '145mm', length: '1830-2230mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Structure 3 plis stabilisée', 'Idéal chauffage au sol', 'Système clic 5G'],
    images: [productImages.lameElegance190, productImages.lameElegance190Detail],
    price: { ht: 79.20, ttc: 95, display: '95 €/m²' },
    packaging: { m2PerBox: 1.86, boxesPerPallet: 49 },
  },
  {
    id: 'lame-14-145-rustic',
    slug: 'lame-3plis-rustic-145',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame 3 Plis Rustic 145',
      de: 'Diele 3-lagig Rustic 145',
      en: 'Plank 3-Ply Rustic 145'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis, qualité Rustic. Caractère authentique avec la stabilité renforcée du 3 plis.',
      de: 'Mehrschichtparkett Eiche 3-lagig, Rustic Qualität. Authentischer Charakter mit verstärkter 3-lagiger Stabilität.',
      en: '3-ply engineered oak parquet, Rustic grade. Authentic character with reinforced 3-ply stability.'
    },
    woodType: 'oak',
    grade: 'rustic',
    finish: 'Raw Wood - Huilé',
    color: 'natural',
    colorName: 'Raw Wood',
    dimensions: { width: '145mm', length: '1830-2230mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Structure 3 plis stabilisée', 'Idéal chauffage au sol', 'Système clic 5G'],
    images: [productImages.colorRaw, productImages.lameRustic190],
    price: { ht: 70.80, ttc: 85, display: '85 €/m²' },
    packaging: { m2PerBox: 1.86, boxesPerPallet: 49 },
  },
  {
    id: 'lame-14-145-country',
    slug: 'lame-3plis-country-145',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame 3 Plis Country 145',
      de: 'Diele 3-lagig Country 145',
      en: 'Plank 3-Ply Country 145'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis, qualité Country. Aspect campagnard chaleureux, très bon rapport qualité-prix.',
      de: 'Mehrschichtparkett Eiche 3-lagig, Country Qualität. Warmes Landhausaussehen, sehr gutes Preis-Leistungs-Verhältnis.',
      en: '3-ply engineered oak parquet, Country grade. Warm country look, very good value.'
    },
    woodType: 'oak',
    grade: 'country',
    finish: 'Banana Song - Huilé',
    color: 'medium',
    colorName: 'Banana Song',
    dimensions: { width: '145mm', length: '1830-2230mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Structure 3 plis stabilisée', 'Idéal chauffage au sol', 'Système clic 5G'],
    images: [productImages.colorHoney, productImages.lameCountry150],
    price: { ht: 62.50, ttc: 75, display: '75 €/m²' },
    packaging: { m2PerBox: 1.86, boxesPerPallet: 49 },
  },

  // --- LAMES 14x194 GRAND FORMAT ---
  {
    id: 'lame-14-194-exclusive',
    slug: 'lame-3plis-exclusive-194',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame 3 Plis Exclusive 194 XL',
      de: 'Diele 3-lagig Exclusive 194 XL',
      en: 'Plank 3-Ply Exclusive 194 XL'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis extra-large 194mm, qualité Exclusive. Format généreux pour grands espaces contemporains.',
      de: 'Mehrschichtparkett Eiche 3-lagig extra-breit 194mm, Exclusive Qualität. Großzügiges Format für große zeitgenössische Räume.',
      en: 'Extra-wide 194mm 3-ply engineered oak parquet, Exclusive grade. Generous format for large contemporary spaces.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'White - Huilé',
    color: 'light',
    colorName: 'White',
    dimensions: { width: '194mm', length: '1830-2430mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Format XL premium', 'Compatible chauffage au sol', 'Effet grands espaces'],
    images: [productImages.lameExclusive190, productImages.lameExclusive190Detail],
    price: { ht: 99.20, ttc: 119, display: '119 €/m²' },
    packaging: { m2PerBox: 2.49, boxesPerPallet: 35 },
  },
  {
    id: 'lame-14-194-elegance',
    slug: 'lame-3plis-elegance-194',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame 3 Plis Elegance 194 XL',
      de: 'Diele 3-lagig Elegance 194 XL',
      en: 'Plank 3-Ply Elegance 194 XL'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis extra-large 194mm, qualité Elegance. Grand format avec caractère naturel modéré.',
      de: 'Mehrschichtparkett Eiche 3-lagig extra-breit 194mm, Elegance Qualität. Großformat mit moderatem natürlichem Charakter.',
      en: 'Extra-wide 194mm 3-ply engineered oak parquet, Elegance grade. Large format with moderate natural character.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Stone Grey - Huilé',
    color: 'medium',
    colorName: 'Stone Grey',
    dimensions: { width: '194mm', length: '1830-2430mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Format XL premium', 'Compatible chauffage au sol', 'Effet grands espaces'],
    images: [productImages.lameElegance190, productImages.lameElegance190Detail],
    price: { ht: 90.80, ttc: 109, display: '109 €/m²' },
    packaging: { m2PerBox: 2.49, boxesPerPallet: 35 },
  },

  // --- LAMES 14x234 MAXI FORMAT ---
  {
    id: 'lame-14-234-exclusive',
    slug: 'lame-3plis-exclusive-234',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame 3 Plis Exclusive 234 XXL',
      de: 'Diele 3-lagig Exclusive 234 XXL',
      en: 'Plank 3-Ply Exclusive 234 XXL'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis maxi-format 234mm, qualité Exclusive. Le plus grand format pour un effet spectaculaire.',
      de: 'Mehrschichtparkett Eiche 3-lagig Maxi-Format 234mm, Exclusive Qualität. Das größte Format für spektakuläre Wirkung.',
      en: 'Maxi-format 234mm 3-ply engineered oak parquet, Exclusive grade. Largest format for spectacular effect.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Matera - Huilé',
    color: 'medium',
    colorName: 'Matera',
    dimensions: { width: '234mm', length: '1830-2430mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Format XXL spectaculaire', 'Compatible chauffage au sol', 'Effet luxe'],
    images: [productImages.lameExclusive190, productImages.formparkExclusive],
    price: { ht: 115.80, ttc: 139, display: '139 €/m²' },
    packaging: { m2PerBox: 3.0, boxesPerPallet: 28 },
  },

  // --- BÂTON ROMPU 14mm ---
  {
    id: 'herringbone-14-120-exclusive',
    slug: 'baton-rompu-3plis-exclusive',
    category: 'engineered',
    subcategory: 'herringbone',
    name: {
      fr: 'Bâton Rompu 3 Plis Exclusive',
      de: 'Fischgrät 3-lagig Exclusive',
      en: 'Herringbone 3-Ply Exclusive'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis en bâton rompu, qualité Exclusive. La stabilité du 3 plis pour une pose traditionnelle.',
      de: 'Mehrschichtparkett Eiche 3-lagig Fischgrät, Exclusive Qualität. Die Stabilität des 3-lagigen für traditionelle Verlegung.',
      en: '3-ply engineered oak parquet herringbone, Exclusive grade. 3-ply stability for traditional laying.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Andante - Huilé',
    color: 'medium',
    colorName: 'Andante',
    dimensions: { width: '120mm', length: '600mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Structure 3 plis', 'Compatible chauffage au sol', 'Pose traditionnelle'],
    images: [productImages.herringboneExclusive70, productImages.herringboneElegance120],
    price: { ht: 95.80, ttc: 115, display: '115 €/m²' },
    packaging: { m2PerBox: 1.01, boxesPerPallet: 84 },
  },
  {
    id: 'herringbone-14-145-exclusive',
    slug: 'baton-rompu-3plis-exclusive-145',
    category: 'engineered',
    subcategory: 'herringbone',
    name: {
      fr: 'Bâton Rompu 3 Plis Exclusive 145',
      de: 'Fischgrät 3-lagig Exclusive 145',
      en: 'Herringbone 3-Ply Exclusive 145'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis bâton rompu large 145mm, qualité Exclusive. Format généreux pour bâton rompu contemporain.',
      de: 'Mehrschichtparkett Eiche 3-lagig breites Fischgrät 145mm, Exclusive Qualität. Großzügiges Format für zeitgenössisches Fischgrät.',
      en: '3-ply engineered oak parquet wide herringbone 145mm, Exclusive grade. Generous format for contemporary herringbone.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Julia - Huilé',
    color: 'medium',
    colorName: 'Julia',
    dimensions: { width: '145mm', length: '725mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Format large', 'Compatible chauffage au sol', 'Style contemporain'],
    images: [productImages.colorGilio, productImages.herringboneElegance70],
    price: { ht: 103.30, ttc: 124, display: '124 €/m²' },
    packaging: { m2PerBox: 1.47, boxesPerPallet: 63 },
  },

  // --- POINT DE HONGRIE 14mm ---
  {
    id: 'chevron-45-14-exclusive',
    slug: 'chevron-45-3plis-exclusive',
    category: 'engineered',
    subcategory: 'chevron',
    name: {
      fr: 'Point de Hongrie 45° 3 Plis Exclusive',
      de: 'Ungarisches Fischgrät 45° 3-lagig Exclusive',
      en: 'Hungarian Herringbone 45° 3-Ply Exclusive'
    },
    description: {
      fr: 'Parquet contrecollé chêne 3 plis, Point de Hongrie 45°, qualité Exclusive. Structure premium pour pose géométrique luxueuse.',
      de: 'Mehrschichtparkett Eiche 3-lagig, ungarisches Fischgrät 45°, Exclusive Qualität. Premium-Struktur für luxuriöse geometrische Verlegung.',
      en: '3-ply engineered oak parquet, Hungarian herringbone 45°, Exclusive grade. Premium structure for luxurious geometric laying.'
    },
    woodType: 'oak',
    grade: 'exclusive',
    finish: 'Warm Cotton - Huilé',
    color: 'light',
    colorName: 'Warm Cotton',
    dimensions: { width: '120mm', length: '600mm', thickness: '14mm' },
    structure: '3-plis',
    features: ['Couche noble 3,5mm', 'Structure 3 plis', 'Angle 45°', 'Rendu luxueux'],
    images: [productImages.chevron45Exclusive, productImages.chevron45ExclusiveDetail],
    price: { ht: 107.50, ttc: 129, display: '129 €/m²' },
    packaging: { m2PerBox: 1.01, boxesPerPallet: 84 },
  },

  // ========================================
  // PRODUITS COULEURS SPÉCIALES 11mm
  // ========================================
  {
    id: 'lame-11-150-honey',
    slug: 'lame-honey-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Elegance Honey 150',
      de: 'Diele Elegance Honig 150',
      en: 'Plank Elegance Honey 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, finition Honey. Teinte miel dorée pour une ambiance chaleureuse et accueillante.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Honig-Finish. Goldener Honigton für eine warme und einladende Atmosphäre.',
      en: 'Engineered oak parquet 2-ply, Honey finish. Golden honey tone for a warm and welcoming ambiance.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Honey - Huilé',
    color: 'medium',
    colorName: 'Honey',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Teinte miel dorée', 'Compatible chauffage au sol', 'Ambiance chaleureuse'],
    images: [productImages.colorHoney, productImages.lameElegance150],
    price: { ht: 62.50, ttc: 75, display: '75 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-crema',
    slug: 'lame-crema-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Elegance Crema 150',
      de: 'Diele Elegance Crema 150',
      en: 'Plank Elegance Crema 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, finition Crema. Teinte crème délicate pour un style scandinave lumineux.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Crema-Finish. Zarter Cremeton für einen hellen skandinavischen Stil.',
      en: 'Engineered oak parquet 2-ply, Crema finish. Delicate cream tone for a bright Scandinavian style.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Crema - Huilé',
    color: 'light',
    colorName: 'Crema',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Teinte crème claire', 'Compatible chauffage au sol', 'Style scandinave'],
    images: [productImages.colorCrema, productImages.lameExclusive150],
    price: { ht: 62.50, ttc: 75, display: '75 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-nugat',
    slug: 'lame-nugat-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Elegance Nugat 150',
      de: 'Diele Elegance Nugat 150',
      en: 'Plank Elegance Nugat 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, finition Nugat. Teinte nougat profonde pour un caractère affirmé et élégant.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Nugat-Finish. Tiefe Nugatfarbe für ausgeprägten und eleganten Charakter.',
      en: 'Engineered oak parquet 2-ply, Nugat finish. Deep nougat tone for bold and elegant character.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Nugat - Huilé',
    color: 'dark',
    colorName: 'Nugat',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Teinte nougat profonde', 'Compatible chauffage au sol', 'Caractère affirmé'],
    images: [productImages.colorNugat, productImages.lameRustic150],
    price: { ht: 62.50, ttc: 75, display: '75 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-amber',
    slug: 'lame-amber-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Elegance Amber 150',
      de: 'Diele Elegance Bernstein 150',
      en: 'Plank Elegance Amber 150'
    },
    description: {
      fr: "Parquet contrecollé chêne 2 plis, finition Amber. Teinte ambrée lumineuse aux reflets d'or pour une atmosphère précieuse.",
      de: 'Mehrschichtparkett Eiche 2-lagig, Bernstein-Finish. Leuchtender Bernsteinton mit goldenen Reflexen für kostbare Atmosphäre.',
      en: 'Engineered oak parquet 2-ply, Amber finish. Luminous amber tone with golden reflections for precious atmosphere.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Amber - Huilé',
    color: 'medium',
    colorName: 'Amber',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Teinte ambrée lumineuse', 'Compatible chauffage au sol', 'Reflets dorés'],
    images: [productImages.colorAmber, productImages.lameCountry150],
    price: { ht: 62.50, ttc: 75, display: '75 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-raw',
    slug: 'lame-raw-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Elegance Raw Wood 150',
      de: 'Diele Elegance Rohholz 150',
      en: 'Plank Elegance Raw Wood 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, finition Raw Wood. Aspect bois brut authentique, finition invisible qui préserve le naturel.',
      de: 'Mehrschichtparkett Eiche 2-lagig, Rohholz-Finish. Authentisches Rohholz-Aussehen, unsichtbares Finish bewahrt das Natürliche.',
      en: 'Engineered oak parquet 2-ply, Raw Wood finish. Authentic raw wood look, invisible finish preserves natural beauty.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Raw Wood - Huile invisible',
    color: 'natural',
    colorName: 'Raw Wood',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Aspect bois brut', 'Compatible chauffage au sol', 'Finition invisible'],
    images: [productImages.colorRaw, productImages.lameElegance150],
    price: { ht: 62.50, ttc: 75, display: '75 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
  {
    id: 'lame-11-150-multicolored',
    slug: 'lame-multicolored-150',
    category: 'engineered',
    subcategory: 'lame',
    name: {
      fr: 'Lame Multicolore 150',
      de: 'Diele Mehrfarbig 150',
      en: 'Plank Multicolored 150'
    },
    description: {
      fr: 'Parquet contrecollé chêne 2 plis, mélange multicolore unique. Chaque lame présente une teinte différente pour un effet artistique.',
      de: 'Mehrschichtparkett Eiche 2-lagig, einzigartige Mehrfarbmischung. Jede Diele zeigt eine andere Färbung für künstlerischen Effekt.',
      en: 'Engineered oak parquet 2-ply, unique multicolored mix. Each plank shows a different tone for artistic effect.'
    },
    woodType: 'oak',
    grade: 'elegance',
    finish: 'Multicolore - Huilé',
    color: 'medium',
    colorName: 'Multicolored',
    dimensions: { width: '150mm', length: '1330mm', thickness: '11mm' },
    structure: '2-plis',
    features: ['Couche noble 3,5mm', 'Mix de teintes unique', 'Compatible chauffage au sol', 'Effet artistique'],
    images: [productImages.colorMulti, productImages.lameCountry150],
    price: { ht: 66.60, ttc: 80, display: '80 €/m²' },
    packaging: { m2PerBox: 2.39, boxesPerPallet: 40 },
  },
];

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductsBySubcategory = (subcategory: Product['subcategory']): Product[] => {
  return products.filter(p => p.subcategory === subcategory);
};

export const getProductsByGrade = (grade: Product['grade']): Product[] => {
  return products.filter(p => p.grade === grade);
};

export const getProductsByStructure = (structure: Product['structure']): Product[] => {
  return products.filter(p => p.structure === structure);
};

export const filterProducts = (filters: {
  category?: Product['category'];
  subcategory?: Product['subcategory'];
  color?: Product['color'];
  woodType?: Product['woodType'];
  grade?: Product['grade'];
  structure?: Product['structure'];
  maxPrice?: number;
  minPrice?: number;
}): Product[] => {
  return products.filter(p => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.subcategory && p.subcategory !== filters.subcategory) return false;
    if (filters.color && p.color !== filters.color) return false;
    if (filters.woodType && p.woodType !== filters.woodType) return false;
    if (filters.grade && p.grade !== filters.grade) return false;
    if (filters.structure && p.structure !== filters.structure) return false;
    if (filters.maxPrice && p.price.ttc > filters.maxPrice) return false;
    if (filters.minPrice && p.price.ttc < filters.minPrice) return false;
    return true;
  });
};

// Statistiques du catalogue
export const catalogStats = {
  totalProducts: products.length,
  priceRange: {
    min: Math.min(...products.map(p => p.price.ttc)),
    max: Math.max(...products.map(p => p.price.ttc)),
  },
  grades: ['exclusive', 'elegance', 'rustic', 'country'],
  structures: ['2-plis', '3-plis'],
  subcategories: ['lame', 'herringbone', 'chevron', 'formpark'],
};
