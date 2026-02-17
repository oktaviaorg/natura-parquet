// Product data - Natura Parquets B2C
// Prix = Départ Pologne × 1.8 = Prix public TTC

export interface Product {
  id: string;
  slug: string;
  gamme: 'Exclusive' | 'Elegance';
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
  dimensions: string;
  epaisseur: number;
  largeur: number;
  longueur: string;
  finition: string;
  woodType: 'oak';
  color: 'light' | 'medium' | 'dark' | 'natural';
  features: string[];
  images: string[];
  price: {
    achat: number; // Prix d'achat départ Pologne
    ht: number;    // Prix vente HT
    ttc: number;   // Prix vente TTC (TVA 20%)
    display: string;
  };
  delaiLivraison: string;
  stockStatus: 'disponible' | 'sur_commande' | 'premier_choix' | 'sur_mesure';
}

// Images showroom et ambiance
export const heroImages = {
  main: '/images/showroom/mosaique-echantillons.jpg',
  engineered: '/images/showroom/structure-couches.jpg',
  solid: '/images/showroom/artisan-atelier-1.jpg',
  industrial: '/images/showroom/usine-palettes.jpg',
  ambiance1: '/images/showroom/assemblage-chevron.jpg',
  ambiance2: '/images/showroom/parquet-escalier.jpg',
  ambiance3: '/images/showroom/artisan-atelier-2.jpg',
  mosaique: '/images/showroom/mosaique-echantillons.jpg',
  usine: '/images/showroom/usine-palettes.jpg',
  artisan1: '/images/showroom/artisan-atelier-1.jpg',
  artisan2: '/images/showroom/artisan-atelier-2.jpg',
  structure: '/images/showroom/structure-couches.jpg',
  escalier: '/images/showroom/parquet-escalier.jpg',
  chevron: '/images/showroom/assemblage-chevron.jpg',
};

export const productImages = {
  kashmir: '/images/products/kashmir.jpg',
  kashmirDetail: '/images/products/kashmir-detail.jpg',
  raw: '/images/products/raw.jpg',
  rawDetail: '/images/products/raw-detail.jpg',
  julia: '/images/products/julia.jpg',
  juliaDetail: '/images/products/julia-detail.jpg',
  brown: '/images/products/brown.jpg',
  brownDetail: '/images/products/brown-detail.jpg',
  nude: '/images/products/nude.jpg',
  nudeDetail: '/images/products/nude-detail.jpg',
  naturalOil: '/images/products/natural-oil.jpg',
  naturalOilDetail: '/images/products/natural-oil-detail.jpg',
  chevron: '/images/products/chevron.jpg',
  chevronDetail: '/images/products/chevron-detail.jpg',
  showroom1: '/images/showroom/lames-sol-1.jpg',
  showroom2: '/images/showroom/showroom-complet.jpg',
};

// Délais de livraison
export const delaisLivraison = {
  standard: '2 semaines',
  premier_choix: '3-4 semaines',
  sur_mesure: '6-8 semaines',
};

// PRODUITS - Grille tarifaire officielle
export const products: Product[] = [
  // === GAMME EXCLUSIVE ===
  {
    id: 'chevron-exclusive-14x100x720-brut',
    slug: 'chevron-exclusive-brut',
    gamme: 'Exclusive',
    name: {
      fr: 'Chevron Exclusive Brut',
      de: 'Chevron Exclusive Roh',
      en: 'Chevron Exclusive Raw'
    },
    description: {
      fr: 'Parquet chevron en chêne européen premium, qualité Exclusive. Idéal pour une pose en point de Hongrie traditionnelle. Livré brut pour une finition personnalisée sur place.',
      de: 'Premium europäisches Eichenparkett im Fischgrätmuster, Exclusive Qualität. Ideal für traditionelle ungarische Spitzmusterverlegung. Roh geliefert für individuelle Oberflächenbehandlung.',
      en: 'Premium European oak chevron parquet, Exclusive quality. Ideal for traditional Hungarian point pattern. Delivered raw for custom on-site finishing.'
    },
    dimensions: '14×100×720mm',
    epaisseur: 14,
    largeur: 100,
    longueur: '720',
    finition: 'Brut à finir',
    woodType: 'oak',
    color: 'natural',
    features: ['Pose chevron/point de Hongrie', 'Chauffage au sol compatible', 'Couche noble 4mm', 'Chanfreins 4 côtés'],
    images: [productImages.chevron, productImages.chevronDetail, heroImages.ambiance1],
    price: { achat: 39, ht: 58.33, ttc: 70, display: '70 €/m²' },
    delaiLivraison: delaisLivraison.standard,
    stockStatus: 'sur_commande'
  },
  {
    id: 'exclusive-11x70x490-vernis',
    slug: 'exclusive-compact-vernis',
    gamme: 'Exclusive',
    name: {
      fr: 'Exclusive Compact Vernis',
      de: 'Exclusive Kompakt Lackiert',
      en: 'Exclusive Compact Varnished'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Exclusive, format compact 70×490mm. Finition vernie UV ultra-résistante, idéale pour les pièces à fort passage.',
      de: 'Mehrschichtparkett europäische Eiche, Exclusive Linie, Kompaktformat 70×490mm. UV-lackierte Oberfläche, extrem strapazierfähig, ideal für stark frequentierte Räume.',
      en: 'Engineered European oak parquet, Exclusive range, compact format 70×490mm. UV varnish finish, ultra-resistant, ideal for high-traffic areas.'
    },
    dimensions: '11×70×490mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '490',
    finition: 'Vernis UV',
    woodType: 'oak',
    color: 'light',
    features: ['Vernis UV ultra-résistant', 'Chauffage au sol compatible', 'Couche noble 3.5mm', 'Pose clipsable'],
    images: [productImages.kashmir, productImages.kashmirDetail, heroImages.ambiance2],
    price: { achat: 26.4, ht: 40, ttc: 48, display: '48 €/m²' },
    delaiLivraison: delaisLivraison.standard,
    stockStatus: 'sur_commande'
  },
  {
    id: 'exclusive-11x70x490-huile',
    slug: 'exclusive-compact-huile',
    gamme: 'Exclusive',
    name: {
      fr: 'Exclusive Compact Huilé',
      de: 'Exclusive Kompakt Geölt',
      en: 'Exclusive Compact Oiled'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Exclusive, format compact 70×490mm. Finition huilée naturelle pour un toucher authentique du bois et une rénovation facile.',
      de: 'Mehrschichtparkett europäische Eiche, Exclusive Linie, Kompaktformat 70×490mm. Natürliche Ölbehandlung für authentisches Holzgefühl und einfache Renovierung.',
      en: 'Engineered European oak parquet, Exclusive range, compact format 70×490mm. Natural oil finish for authentic wood feel and easy renovation.'
    },
    dimensions: '11×70×490mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '490',
    finition: 'Huile naturelle',
    woodType: 'oak',
    color: 'medium',
    features: ['Huile naturelle', 'Rénovation locale possible', 'Chauffage au sol compatible', 'Couche noble 3.5mm'],
    images: [productImages.naturalOil, productImages.naturalOilDetail, heroImages.ambiance3],
    price: { achat: 26.4, ht: 40, ttc: 48, display: '48 €/m²' },
    delaiLivraison: delaisLivraison.standard,
    stockStatus: 'sur_commande'
  },
  {
    id: 'exclusive-11x120x600-huile',
    slug: 'exclusive-large-huile',
    gamme: 'Exclusive',
    name: {
      fr: 'Exclusive Large Huilé',
      de: 'Exclusive Breit Geölt',
      en: 'Exclusive Wide Oiled'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Exclusive, lame large 120mm. Finition huilée pour un rendu naturel et chaleureux, parfait pour les intérieurs contemporains.',
      de: 'Mehrschichtparkett europäische Eiche, Exclusive Linie, breite Diele 120mm. Ölfinish für natürliche und warme Optik, perfekt für zeitgenössische Innenräume.',
      en: 'Engineered European oak parquet, Exclusive range, wide plank 120mm. Oil finish for natural and warm look, perfect for contemporary interiors.'
    },
    dimensions: '11×120×600mm',
    epaisseur: 11,
    largeur: 120,
    longueur: '600',
    finition: 'Huile naturelle',
    woodType: 'oak',
    color: 'medium',
    features: ['Lame large 120mm', 'Huile naturelle', 'Chauffage au sol compatible', 'Couche noble 3.5mm'],
    images: [productImages.julia, productImages.juliaDetail, heroImages.ambiance1],
    price: { achat: 32, ht: 48.33, ttc: 58, display: '58 €/m²' },
    delaiLivraison: delaisLivraison.standard,
    stockStatus: 'sur_commande'
  },
  {
    id: 'exclusive-11x150x1200-vernis',
    slug: 'exclusive-xl-vernis',
    gamme: 'Exclusive',
    name: {
      fr: 'Exclusive XL Vernis',
      de: 'Exclusive XL Lackiert',
      en: 'Exclusive XL Varnished'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Exclusive, grande lame 150×1200mm. Finition vernie UV pour espaces contemporains d\'exception.',
      de: 'Mehrschichtparkett europäische Eiche, Exclusive Linie, große Diele 150×1200mm. UV-Lackfinish für außergewöhnliche zeitgenössische Räume.',
      en: 'Engineered European oak parquet, Exclusive range, large plank 150×1200mm. UV varnish finish for exceptional contemporary spaces.'
    },
    dimensions: '11×150×1200mm',
    epaisseur: 11,
    largeur: 150,
    longueur: '1200',
    finition: 'Vernis UV',
    woodType: 'oak',
    color: 'light',
    features: ['Grande lame XL', 'Vernis UV premium', 'Chauffage au sol compatible', 'Couche noble 3.5mm'],
    images: [productImages.raw, productImages.rawDetail, heroImages.ambiance2],
    price: { achat: 37.8, ht: 56.67, ttc: 68, display: '68 €/m²' },
    delaiLivraison: delaisLivraison.premier_choix,
    stockStatus: 'premier_choix'
  },
  {
    id: 'exclusive-11x150x1200-huile',
    slug: 'exclusive-xl-huile',
    gamme: 'Exclusive',
    name: {
      fr: 'Exclusive XL Huilé',
      de: 'Exclusive XL Geölt',
      en: 'Exclusive XL Oiled'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Exclusive, grande lame 150×1200mm. Finition huilée naturelle luxueuse pour intérieurs haut de gamme.',
      de: 'Mehrschichtparkett europäische Eiche, Exclusive Linie, große Diele 150×1200mm. Luxuriöse natürliche Ölbehandlung für gehobene Innenräume.',
      en: 'Engineered European oak parquet, Exclusive range, large plank 150×1200mm. Luxurious natural oil finish for high-end interiors.'
    },
    dimensions: '11×150×1200mm',
    epaisseur: 11,
    largeur: 150,
    longueur: '1200',
    finition: 'Huile naturelle',
    woodType: 'oak',
    color: 'medium',
    features: ['Grande lame XL', 'Huile naturelle premium', 'Chauffage au sol compatible', 'Couche noble 3.5mm'],
    images: [productImages.nude, productImages.nudeDetail, heroImages.ambiance3],
    price: { achat: 37.8, ht: 56.67, ttc: 68, display: '68 €/m²' },
    delaiLivraison: delaisLivraison.premier_choix,
    stockStatus: 'premier_choix'
  },

  // === GAMME ELEGANCE ===
  {
    id: 'elegance-11x70x490-vernis',
    slug: 'elegance-compact-vernis',
    gamme: 'Elegance',
    name: {
      fr: 'Élégance Compact Vernis',
      de: 'Eleganz Kompakt Lackiert',
      en: 'Elegance Compact Varnished'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Élégance, excellent rapport qualité-prix. Format compact 70×490mm avec finition vernie durable.',
      de: 'Mehrschichtparkett europäische Eiche, Eleganz Linie, hervorragendes Preis-Leistungs-Verhältnis. Kompaktformat 70×490mm mit strapazierfähiger Lackierung.',
      en: 'Engineered European oak parquet, Elegance range, excellent value for money. Compact format 70×490mm with durable varnish finish.'
    },
    dimensions: '11×70×490mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '490',
    finition: 'Vernis UV',
    woodType: 'oak',
    color: 'light',
    features: ['Excellent rapport qualité-prix', 'Vernis UV résistant', 'Chauffage au sol compatible', 'Couche noble 2.5mm'],
    images: [productImages.brown, productImages.brownDetail, heroImages.ambiance1],
    price: { achat: 24.9, ht: 37.50, ttc: 45, display: '45 €/m²' },
    delaiLivraison: delaisLivraison.standard,
    stockStatus: 'sur_commande'
  },
  {
    id: 'elegance-11x70x490-huile',
    slug: 'elegance-compact-huile',
    gamme: 'Elegance',
    name: {
      fr: 'Élégance Compact Huilé',
      de: 'Eleganz Kompakt Geölt',
      en: 'Elegance Compact Oiled'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Élégance, excellent rapport qualité-prix. Format compact 70×490mm avec finition huilée naturelle.',
      de: 'Mehrschichtparkett europäische Eiche, Eleganz Linie, hervorragendes Preis-Leistungs-Verhältnis. Kompaktformat 70×490mm mit natürlicher Ölbehandlung.',
      en: 'Engineered European oak parquet, Elegance range, excellent value for money. Compact format 70×490mm with natural oil finish.'
    },
    dimensions: '11×70×490mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '490',
    finition: 'Huile naturelle',
    woodType: 'oak',
    color: 'medium',
    features: ['Excellent rapport qualité-prix', 'Huile naturelle', 'Chauffage au sol compatible', 'Couche noble 2.5mm'],
    images: [productImages.naturalOil, heroImages.ambiance2],
    price: { achat: 24.9, ht: 37.50, ttc: 45, display: '45 €/m²' },
    delaiLivraison: delaisLivraison.standard,
    stockStatus: 'sur_commande'
  },
  {
    id: 'elegance-11x120x590',
    slug: 'elegance-medium',
    gamme: 'Elegance',
    name: {
      fr: 'Élégance Medium',
      de: 'Eleganz Medium',
      en: 'Elegance Medium'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Élégance, format intermédiaire 120×590mm. Polyvalent et élégant, parfait pour tout type d\'intérieur.',
      de: 'Mehrschichtparkett europäische Eiche, Eleganz Linie, mittleres Format 120×590mm. Vielseitig und elegant, perfekt für jeden Innenraum.',
      en: 'Engineered European oak parquet, Elegance range, medium format 120×590mm. Versatile and elegant, perfect for any interior.'
    },
    dimensions: '11×120×590mm',
    epaisseur: 11,
    largeur: 120,
    longueur: '590',
    finition: 'Vernis ou Huile',
    woodType: 'oak',
    color: 'light',
    features: ['Format polyvalent', 'Choix vernis ou huile', 'Chauffage au sol compatible', 'Couche noble 2.5mm'],
    images: [productImages.kashmir, productImages.kashmirDetail, heroImages.ambiance3],
    price: { achat: 27.9, ht: 41.67, ttc: 50, display: '50 €/m²' },
    delaiLivraison: delaisLivraison.standard,
    stockStatus: 'sur_commande'
  },
  {
    id: 'elegance-11x120x1200',
    slug: 'elegance-long',
    gamme: 'Elegance',
    name: {
      fr: 'Élégance Long',
      de: 'Eleganz Lang',
      en: 'Elegance Long'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Élégance, grande longueur 1200mm pour espaces généreux. Effet visuel allongé et moderne.',
      de: 'Mehrschichtparkett europäische Eiche, Eleganz Linie, lange Dielen 1200mm für großzügige Räume. Verlängernde und moderne Optik.',
      en: 'Engineered European oak parquet, Elegance range, long plank 1200mm for spacious rooms. Elongating and modern visual effect.'
    },
    dimensions: '11×120×1200mm',
    epaisseur: 11,
    largeur: 120,
    longueur: '1200',
    finition: 'Vernis ou Huile',
    woodType: 'oak',
    color: 'medium',
    features: ['Grande longueur 1200mm', 'Choix vernis ou huile', 'Chauffage au sol compatible', 'Couche noble 2.5mm'],
    images: [productImages.julia, productImages.juliaDetail, heroImages.ambiance1],
    price: { achat: 34.5, ht: 51.67, ttc: 62, display: '62 €/m²' },
    delaiLivraison: delaisLivraison.premier_choix,
    stockStatus: 'premier_choix'
  },
  {
    id: 'elegance-11x150x1330-brut',
    slug: 'elegance-xl-brut',
    gamme: 'Elegance',
    name: {
      fr: 'Élégance XL Brut',
      de: 'Eleganz XL Roh',
      en: 'Elegance XL Raw'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen gamme Élégance, très grande lame 150×1330mm. Brut à finir sur place selon vos envies : huile, vernis, ou teinture.',
      de: 'Mehrschichtparkett europäische Eiche, Eleganz Linie, sehr große Diele 150×1330mm. Roh für individuelle Oberflächenbehandlung vor Ort: Öl, Lack oder Beize.',
      en: 'Engineered European oak parquet, Elegance range, extra-large plank 150×1330mm. Raw for custom on-site finishing: oil, varnish, or stain.'
    },
    dimensions: '11×150×1330mm',
    epaisseur: 11,
    largeur: 150,
    longueur: '1330',
    finition: 'Brut à finir',
    woodType: 'oak',
    color: 'natural',
    features: ['Très grande lame XL', 'Finition personnalisable', 'Chauffage au sol compatible', 'Couche noble 2.5mm'],
    images: [productImages.raw, productImages.rawDetail, heroImages.ambiance2],
    price: { achat: 31, ht: 46.67, ttc: 56, display: '56 €/m²' },
    delaiLivraison: delaisLivraison.premier_choix,
    stockStatus: 'premier_choix'
  },
];

// Fonctions utilitaires
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByGamme = (gamme: Product['gamme']): Product[] => {
  return products.filter(p => p.gamme === gamme);
};

export const filterProducts = (filters: {
  gamme?: Product['gamme'];
  finition?: string;
  largeur?: number;
  priceMax?: number;
}): Product[] => {
  return products.filter(p => {
    if (filters.gamme && p.gamme !== filters.gamme) return false;
    if (filters.finition && !p.finition.toLowerCase().includes(filters.finition.toLowerCase())) return false;
    if (filters.largeur && p.largeur !== filters.largeur) return false;
    if (filters.priceMax && p.price.ttc > filters.priceMax) return false;
    return true;
  });
};

// Informations bancaires pour virement
export const bankDetails = {
  beneficiaire: 'RENOLINE SARL',
  iban: 'FR76 3000 3024 8600 0200 9174 390',
  bic: 'SOGEFRPP',
  banque: 'Société Générale',
};
