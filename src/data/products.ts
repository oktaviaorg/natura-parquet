// Product data based on Axemark specifications
export interface Product {
  id: string;
  slug: string;
  category: 'engineered' | 'solid' | 'industrial';
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
  grade: 'select' | 'natur' | 'rustic';
  finish: string;
  color: 'light' | 'medium' | 'dark' | 'natural';
  dimensions: {
    width: string;
    length: string;
    thickness: string;
  };
  features: string[];
  images: string[];
  price?: string;
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
}

// Premium Unsplash images for parquet
export const heroImages = {
  main: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
  engineered: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
  solid: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=85',
  industrial: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85',
  ambiance1: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
  ambiance2: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=85',
  ambiance3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
};

export const productImages = {
  // Light oak variations
  oakLight1: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=85',
  oakLight2: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85',
  oakLight3: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
  // Medium oak
  oakMedium1: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=85',
  oakMedium2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
  // Dark oak
  oakDark1: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=85',
  oakDark2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
  // Herringbone pattern
  herringbone1: 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=800&q=85',
  herringbone2: 'https://images.unsplash.com/photo-1600566752547-33e5e4a05a0e?w=800&q=85',
};

export const collections: Collection[] = [
  {
    id: 'kashmir',
    name: { fr: 'Kashmir', de: 'Kashmir', en: 'Kashmir' },
    description: {
      fr: 'Teinte claire et chaleureuse, finition huilée naturelle',
      de: 'Helle und warme Tönung, natürliche Ölbeschichtung',
      en: 'Light and warm tone, natural oil finish'
    },
    color: '#e8dcc4',
    image: productImages.oakLight1,
  },
  {
    id: 'raw',
    name: { fr: 'Raw', de: 'Raw', en: 'Raw' },
    description: {
      fr: "L'authenticité du bois brut, aspect naturel préservé",
      de: 'Authentizität von rohem Holz, natürliches Aussehen',
      en: 'Raw wood authenticity, preserved natural look'
    },
    color: '#d4c4a8',
    image: productImages.oakLight2,
  },
  {
    id: 'julia',
    name: { fr: 'Julia', de: 'Julia', en: 'Julia' },
    description: {
      fr: 'Élégance classique, tons dorés et lumineux',
      de: 'Klassische Eleganz, goldene und helle Töne',
      en: 'Classic elegance, golden and luminous tones'
    },
    color: '#c9b896',
    image: productImages.oakMedium1,
  },
  {
    id: 'brown',
    name: { fr: 'Brown', de: 'Brown', en: 'Brown' },
    description: {
      fr: 'Teinte profonde et chaleureuse, caractère affirmé',
      de: 'Tiefe und warme Tönung, ausgeprägter Charakter',
      en: 'Deep and warm tone, bold character'
    },
    color: '#8b7355',
    image: productImages.oakDark1,
  },
  {
    id: 'nude',
    name: { fr: 'Nude', de: 'Nude', en: 'Nude' },
    description: {
      fr: 'Sobriété scandinave, tons clairs et épurés',
      de: 'Skandinavische Schlichtheit, helle und klare Töne',
      en: 'Scandinavian simplicity, light and clean tones'
    },
    color: '#f5efe6',
    image: productImages.oakLight3,
  },
  {
    id: 'natural-oil',
    name: { fr: 'Natural Oil', de: 'Naturöl', en: 'Natural Oil' },
    description: {
      fr: 'Protection naturelle, beauté authentique du bois',
      de: 'Natürlicher Schutz, authentische Holzschönheit',
      en: 'Natural protection, authentic wood beauty'
    },
    color: '#b8a07a',
    image: productImages.oakMedium2,
  },
];

export const products: Product[] = [
  // Engineered Parquet - Contrecollé
  {
    id: 'eng-oak-kashmir-190',
    slug: 'aurore',
    category: 'engineered',
    name: {
      fr: 'Aurore',
      de: 'Aurore',
      en: 'Aurore'
    },
    description: {
      fr: 'Parquet contrecollé chêne européen, finition huilée Kashmir. Lames larges pour un rendu contemporain et lumineux.',
      de: 'Mehrschichtparkett europäische Eiche, Kashmir Ölfinish. Breite Dielen für ein zeitgenössisches und helles Erscheinungsbild.',
      en: 'Engineered European oak parquet, Kashmir oil finish. Wide planks for a contemporary and luminous look.'
    },
    woodType: 'oak',
    grade: 'natur',
    finish: 'Kashmir Oil',
    color: 'light',
    dimensions: { width: '190mm', length: '1900mm', thickness: '14mm' },
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Click system'],
    images: [productImages.oakLight1, productImages.oakLight2, heroImages.ambiance1],
  },
  {
    id: 'eng-oak-raw-220',
    slug: 'ecorce',
    category: 'engineered',
    name: {
      fr: 'Écorce',
      de: 'Écorce',
      en: 'Écorce'
    },
    description: {
      fr: 'Parquet contrecollé aspect brut, finition invisible pour révéler la beauté naturelle du chêne européen.',
      de: 'Mehrschichtparkett mit rohem Aussehen, unsichtbare Oberfläche zur Betonung der natürlichen Schönheit.',
      en: 'Engineered parquet with raw look, invisible finish to reveal natural European oak beauty.'
    },
    woodType: 'oak',
    grade: 'select',
    finish: 'Raw Invisible',
    color: 'natural',
    dimensions: { width: '220mm', length: '2200mm', thickness: '16mm' },
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Brossé légèrement'],
    images: [productImages.oakLight2, productImages.oakLight3, heroImages.ambiance2],
  },
  {
    id: 'eng-oak-julia-180',
    slug: 'vendange',
    category: 'engineered',
    name: {
      fr: 'Vendange',
      de: 'Vendange',
      en: 'Vendange'
    },
    description: {
      fr: 'Parquet contrecollé aux tons dorés, finition huilée pour une ambiance chaleureuse et classique.',
      de: 'Mehrschichtparkett mit goldenen Tönen, Ölfinish für eine warme und klassische Atmosphäre.',
      en: 'Engineered parquet with golden tones, oil finish for a warm and classic ambiance.'
    },
    woodType: 'oak',
    grade: 'natur',
    finish: 'Julia Gold Oil',
    color: 'medium',
    dimensions: { width: '180mm', length: '1800mm', thickness: '14mm' },
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Chanfreins 4 côtés'],
    images: [productImages.oakMedium1, productImages.oakMedium2, heroImages.ambiance3],
  },
  {
    id: 'eng-oak-brown-200',
    slug: 'automne',
    category: 'engineered',
    name: {
      fr: 'Automne',
      de: 'Automne',
      en: 'Automne'
    },
    description: {
      fr: 'Parquet contrecollé teinte profonde, finition huilée pour un caractère affirmé et élégant.',
      de: 'Mehrschichtparkett mit tiefer Färbung, Ölfinish für einen ausgeprägten und eleganten Charakter.',
      en: 'Engineered parquet deep tone, oil finish for a bold and elegant character.'
    },
    woodType: 'oak',
    grade: 'rustic',
    finish: 'Brown Deep Oil',
    color: 'dark',
    dimensions: { width: '200mm', length: '2000mm', thickness: '14mm' },
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Brossé'],
    images: [productImages.oakDark1, productImages.oakDark2, heroImages.ambiance1],
  },
  {
    id: 'eng-oak-herringbone',
    slug: 'haussmann',
    category: 'engineered',
    name: {
      fr: 'Haussmann',
      de: 'Eiche Klassisches Fischgrät',
      en: 'Haussmann'
    },
    description: {
      fr: 'Parquet contrecollé pose chevron, finition huilée naturelle pour un style parisien intemporel.',
      de: 'Mehrschichtparkett Fischgrätmuster, natürliches Ölfinish für zeitlosen Pariser Stil.',
      en: 'Engineered herringbone parquet, natural oil finish for timeless Parisian style.'
    },
    woodType: 'oak',
    grade: 'select',
    finish: 'Natural Oil',
    color: 'medium',
    dimensions: { width: '90mm', length: '600mm', thickness: '14mm' },
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Pose chevron'],
    images: [productImages.herringbone1, productImages.herringbone2, heroImages.ambiance2],
  },

  // Solid Parquet - Massif
  {
    id: 'solid-oak-natur-70',
    slug: 'racine',
    category: 'solid',
    name: {
      fr: 'Racine',
      de: 'Racine',
      en: 'Racine'
    },
    description: {
      fr: 'Parquet massif chêne européen, sélection Natur. Traditionnelle lame à coller, durabilité exceptionnelle.',
      de: 'Massivparkett europäische Eiche, Natur Auswahl. Traditionelle Klebediele, außergewöhnliche Haltbarkeit.',
      en: 'Solid European oak parquet, Natur grade. Traditional glue-down plank, exceptional durability.'
    },
    woodType: 'oak',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'natural',
    dimensions: { width: '70mm', length: '350-500mm', thickness: '22mm' },
    features: ['Pose collée', 'Rénovation multiple possible', 'Microchanfrein 4 côtés'],
    images: [productImages.oakMedium1, productImages.oakLight1, heroImages.ambiance3],
  },
  {
    id: 'solid-oak-rustic-60',
    slug: 'heritage',
    category: 'solid',
    name: {
      fr: 'Héritage',
      de: 'Héritage',
      en: 'Héritage'
    },
    description: {
      fr: 'Parquet massif chêne sélection Rustic, nœuds apparents pour un caractère authentique et chaleureux.',
      de: 'Massivparkett Eiche Rustikal, sichtbare Äste für authentischen und warmen Charakter.',
      en: 'Solid oak parquet Rustic grade, visible knots for authentic and warm character.'
    },
    woodType: 'oak',
    grade: 'rustic',
    finish: 'Brut à finir',
    color: 'natural',
    dimensions: { width: '60mm', length: '350-500mm', thickness: '16mm' },
    features: ['Pose collée', 'Rénovation multiple possible', 'Sans chanfrein'],
    images: [productImages.oakDark1, productImages.oakMedium2, heroImages.ambiance1],
  },
  {
    id: 'solid-ash-natur-70',
    slug: 'nordic',
    category: 'solid',
    name: {
      fr: 'Nordic',
      de: 'Nordic',
      en: 'Nordic'
    },
    description: {
      fr: 'Parquet massif frêne européen, sélection Natur. Grain distinctif et teinte claire naturelle.',
      de: 'Massivparkett europäische Esche, Natur Auswahl. Markante Maserung und natürlich helle Färbung.',
      en: 'Solid European ash parquet, Natur grade. Distinctive grain and natural light tone.'
    },
    woodType: 'ash',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'light',
    dimensions: { width: '70mm', length: '350-500mm', thickness: '22mm' },
    features: ['Pose collée', 'Rénovation multiple possible', 'Microchanfrein 4 côtés'],
    images: [productImages.oakLight3, productImages.oakLight2, heroImages.ambiance2],
  },

  // Industrial Parquet
  {
    id: 'ind-oak-natur-160',
    slug: 'atelier',
    category: 'industrial',
    name: {
      fr: 'Atelier',
      de: 'Atelier',
      en: 'Atelier'
    },
    description: {
      fr: 'Parquet industriel chêne en lamelles, haute résistance au trafic. Idéal espaces professionnels et lofts.',
      de: 'Industrieparkett Eiche in Lamellen, hohe Verkehrsbeständigkeit. Ideal für Gewerbe und Lofts.',
      en: 'Industrial oak strip parquet, high traffic resistance. Ideal for commercial spaces and lofts.'
    },
    woodType: 'oak',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'natural',
    dimensions: { width: '8mm', length: '160mm', thickness: '10mm' },
    features: ['Haute résistance', 'Pose mosaïque', 'Idéal fort passage'],
    images: [productImages.herringbone1, productImages.oakMedium1, heroImages.ambiance3],
  },
  {
    id: 'ind-oak-standard-250',
    slug: 'loft',
    category: 'industrial',
    name: {
      fr: 'Loft',
      de: 'Loft',
      en: 'Loft'
    },
    description: {
      fr: 'Parquet industriel chêne lamelles longues, motif contemporain pour intérieurs design.',
      de: 'Industrieparkett Eiche lange Lamellen, zeitgenössisches Muster für Design-Interieurs.',
      en: 'Industrial oak long strip parquet, contemporary pattern for design interiors.'
    },
    woodType: 'oak',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'natural',
    dimensions: { width: '8mm', length: '250mm', thickness: '10mm' },
    features: ['Haute résistance', 'Pose mosaïque', 'Rendu contemporain'],
    images: [productImages.oakDark2, productImages.herringbone2, heroImages.ambiance1],
  },
  {
    id: 'ind-ash-natur-160',
    slug: 'manufacture',
    category: 'industrial',
    name: {
      fr: 'Manufacture',
      de: 'Manufacture',
      en: 'Manufacture'
    },
    description: {
      fr: 'Parquet industriel frêne européen, teinte claire et motifs de pose variés possibles.',
      de: 'Industrieparkett europäische Esche, helle Tönung und vielfältige Verlegemuster möglich.',
      en: 'Industrial European ash parquet, light tone with various laying pattern options.'
    },
    woodType: 'ash',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'light',
    dimensions: { width: '8mm', length: '160mm', thickness: '23mm' },
    features: ['Haute résistance', 'Pose mosaïque', 'Épaisseur max'],
    images: [productImages.oakLight1, productImages.oakLight3, heroImages.ambiance2],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const filterProducts = (filters: {
  category?: Product['category'];
  color?: Product['color'];
  woodType?: Product['woodType'];
  grade?: Product['grade'];
}): Product[] => {
  return products.filter(p => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.color && p.color !== filters.color) return false;
    if (filters.woodType && p.woodType !== filters.woodType) return false;
    if (filters.grade && p.grade !== filters.grade) return false;
    return true;
  });
};
