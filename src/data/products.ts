// Natura Parquets - Catalogue avec prix Axemark 2026
// Formule: Prix HT = (Prix achat × 2) + 2€ | Prix TTC = Prix HT × 1.20

export interface Product {
  id: string;
  slug: string;
  gamme: 'Exclusive' | 'Elegance' | 'Rustic';
  name: { fr: string; de: string; en: string; };
  description: { fr: string; de: string; en: string; };
  dimensions: string;
  epaisseur: number;
  largeur: number;
  longueur: string;
  finition: string;
  pose: 'lame' | 'baton-rompu' | 'chevron-45' | 'chevron-60' | 'point-hongrie';
  woodType: 'oak';
  color: 'light' | 'medium' | 'dark' | 'natural';
  features: string[];
  images: string[];
  price: {
    achat: number;
    ht: number;
    ttc: number;
    display: string;
  };
  refAxemark: string;
  delaiLivraison: string;
  stockStatus: 'disponible' | 'sur_commande';
}

// Helper to calculate prices
const calcPrice = (achat: number) => {
  const ht = (achat * 2) + 2;
  const ttc = Math.round(ht * 1.20 * 100) / 100;
  return { achat, ht, ttc, display: `${ttc.toFixed(0)}€/m²` };
};

// Supabase storage URL
const STORAGE = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets';

export const heroImages = {
  main: `${STORAGE}/ambiance/artisan-chevron-01.jpg`,
  ambiance1: `${STORAGE}/ambiance/artisan-lames-02.jpg`,
  ambiance2: `${STORAGE}/ambiance/escalier-chene-06.jpg`,
  structure: `${STORAGE}/ambiance/coupe-structure-07.jpg`,
  teintes: `${STORAGE}/ambiance/gammes-teintes-05.jpg`,
  usine: `${STORAGE}/ambiance/usine-stock-04.jpg`,
};

export const products: Product[] = [
  // =============================================
  // BÂTON ROMPU 11x70x490mm
  // =============================================
  {
    id: 'br-70-exclusive',
    slug: 'baton-rompu-70-exclusive',
    gamme: 'Exclusive',
    name: { fr: 'Bâton Rompu Exclusive 70mm', de: 'Fischgrät Exclusive 70mm', en: 'Herringbone Exclusive 70mm' },
    description: { 
      fr: 'Parquet bâton rompu chêne premium, grade exclusive sans nœuds. Format 11x70x490mm.',
      de: 'Premium Eichen-Fischgrätparkett, Exclusive-Qualität ohne Äste. Format 11x70x490mm.',
      en: 'Premium oak herringbone parquet, exclusive grade without knots. Format 11x70x490mm.'
    },
    dimensions: '11 × 70 × 490 mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '490mm',
    finition: 'Brut',
    pose: 'baton-rompu',
    woodType: 'oak',
    color: 'natural',
    features: ['Sans nœuds', 'Chêne européen FSC', 'Compatible plancher chauffant'],
    images: [`${STORAGE}/products/herringbone-exclusive-11x70x490-01.jpg`],
    price: calcPrice(26.80),
    refAxemark: 'Axe Exclusive Neutre 11x70x490',
    delaiLivraison: '2-3 semaines',
    stockStatus: 'disponible',
  },
  {
    id: 'br-70-elegance',
    slug: 'baton-rompu-70-elegance',
    gamme: 'Elegance',
    name: { fr: 'Bâton Rompu Élégance 70mm', de: 'Fischgrät Eleganz 70mm', en: 'Herringbone Elegance 70mm' },
    description: { 
      fr: 'Parquet bâton rompu chêne naturel, grade élégance avec petits nœuds discrets. Format 11x70x490mm.',
      de: 'Natürliches Eichen-Fischgrätparkett, Eleganz-Qualität mit kleinen dezenten Ästen. Format 11x70x490mm.',
      en: 'Natural oak herringbone parquet, elegance grade with small discrete knots. Format 11x70x490mm.'
    },
    dimensions: '11 × 70 × 490 mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '490mm',
    finition: 'Brut',
    pose: 'baton-rompu',
    woodType: 'oak',
    color: 'natural',
    features: ['Petits nœuds discrets', 'Chêne européen FSC', 'Compatible plancher chauffant'],
    images: [`${STORAGE}/products/herringbone-elegance-neutral-11x70x490-01.jpg`],
    price: calcPrice(25.40),
    refAxemark: 'Axe Elegance Neutre 11x70x490',
    delaiLivraison: '2-3 semaines',
    stockStatus: 'disponible',
  },
  {
    id: 'br-70-rustic',
    slug: 'baton-rompu-70-rustic',
    gamme: 'Rustic',
    name: { fr: 'Bâton Rompu Rustique 70mm', de: 'Fischgrät Rustikal 70mm', en: 'Herringbone Rustic 70mm' },
    description: { 
      fr: 'Parquet bâton rompu chêne caractère, grade rustique avec nœuds apparents. Format 11x70x490mm.',
      de: 'Charakter Eichen-Fischgrätparkett, rustikale Qualität mit sichtbaren Ästen. Format 11x70x490mm.',
      en: 'Character oak herringbone parquet, rustic grade with visible knots. Format 11x70x490mm.'
    },
    dimensions: '11 × 70 × 490 mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '490mm',
    finition: 'Brut',
    pose: 'baton-rompu',
    woodType: 'oak',
    color: 'natural',
    features: ['Nœuds apparents', 'Chêne européen FSC', 'Compatible plancher chauffant'],
    images: [`${STORAGE}/products/herringbone-elegance-neutral-11x70x490-02.jpg`],
    price: calcPrice(24.46),
    refAxemark: 'Axe Rustic Neutre 11x70x490',
    delaiLivraison: '2-3 semaines',
    stockStatus: 'disponible',
  },

  // =============================================
  // BÂTON ROMPU 11x120x600mm
  // =============================================
  {
    id: 'br-120-exclusive',
    slug: 'baton-rompu-120-exclusive',
    gamme: 'Exclusive',
    name: { fr: 'Bâton Rompu Exclusive 120mm', de: 'Fischgrät Exclusive 120mm', en: 'Herringbone Exclusive 120mm' },
    description: { 
      fr: 'Parquet bâton rompu chêne premium grand format, grade exclusive. Format 11x120x600mm.',
      de: 'Premium Großformat Eichen-Fischgrätparkett, Exclusive-Qualität. Format 11x120x600mm.',
      en: 'Premium large format oak herringbone parquet, exclusive grade. Format 11x120x600mm.'
    },
    dimensions: '11 × 120 × 600 mm',
    epaisseur: 11,
    largeur: 120,
    longueur: '600mm',
    finition: 'Brut',
    pose: 'baton-rompu',
    woodType: 'oak',
    color: 'natural',
    features: ['Sans nœuds', 'Grand format', 'Chêne européen FSC'],
    images: [`${STORAGE}/products/herringbone-exclusive-neutral-11x120x600-01.jpg`],
    price: calcPrice(33.20),
    refAxemark: 'Axe Exclusive Neutre 11x120x600',
    delaiLivraison: '2-3 semaines',
    stockStatus: 'disponible',
  },
  {
    id: 'br-120-elegance',
    slug: 'baton-rompu-120-elegance',
    gamme: 'Elegance',
    name: { fr: 'Bâton Rompu Élégance 120mm', de: 'Fischgrät Eleganz 120mm', en: 'Herringbone Elegance 120mm' },
    description: { 
      fr: 'Parquet bâton rompu chêne grand format, grade élégance. Format 11x120x600mm.',
      de: 'Großformat Eichen-Fischgrätparkett, Eleganz-Qualität. Format 11x120x600mm.',
      en: 'Large format oak herringbone parquet, elegance grade. Format 11x120x600mm.'
    },
    dimensions: '11 × 120 × 600 mm',
    epaisseur: 11,
    largeur: 120,
    longueur: '600mm',
    finition: 'Brut',
    pose: 'baton-rompu',
    woodType: 'oak',
    color: 'natural',
    features: ['Petits nœuds', 'Grand format', 'Chêne européen FSC'],
    images: [`${STORAGE}/products/herringbone-elegance-neutral-11x120x600-01.jpg`],
    price: calcPrice(29.40),
    refAxemark: 'Axe Elegance 11x120x600 Neutre',
    delaiLivraison: '2-3 semaines',
    stockStatus: 'disponible',
  },

  // =============================================
  // CHEVRON 45°
  // =============================================
  {
    id: 'chevron45-exclusive',
    slug: 'chevron-45-exclusive',
    gamme: 'Exclusive',
    name: { fr: 'Chevron 45° Exclusive', de: 'Chevron 45° Exclusive', en: 'Chevron 45° Exclusive' },
    description: { 
      fr: 'Parquet chevron 45° chêne premium laqué, grade exclusive. Format 11x70x410mm.',
      de: 'Premium lackiertes Eichen-Chevronparkett 45°, Exclusive-Qualität. Format 11x70x410mm.',
      en: 'Premium lacquered oak chevron 45° parquet, exclusive grade. Format 11x70x410mm.'
    },
    dimensions: '11 × 70 × 410 mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '410mm',
    finition: 'Verni',
    pose: 'chevron-45',
    woodType: 'oak',
    color: 'natural',
    features: ['Sans nœuds', 'Vernis usine', 'Pose chevron classique'],
    images: [`${STORAGE}/products/chevron-45-exclusive-lacquer-neutral-01.jpg`],
    price: calcPrice(42.36),
    refAxemark: 'Axe Chevron45 Exclusive laque Neutre',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },
  {
    id: 'chevron45-elegance',
    slug: 'chevron-45-elegance',
    gamme: 'Elegance',
    name: { fr: 'Chevron 45° Élégance', de: 'Chevron 45° Eleganz', en: 'Chevron 45° Elegance' },
    description: { 
      fr: 'Parquet chevron 45° chêne laqué, grade élégance. Format 11x70x410mm.',
      de: 'Lackiertes Eichen-Chevronparkett 45°, Eleganz-Qualität. Format 11x70x410mm.',
      en: 'Lacquered oak chevron 45° parquet, elegance grade. Format 11x70x410mm.'
    },
    dimensions: '11 × 70 × 410 mm',
    epaisseur: 11,
    largeur: 70,
    longueur: '410mm',
    finition: 'Verni',
    pose: 'chevron-45',
    woodType: 'oak',
    color: 'natural',
    features: ['Petits nœuds', 'Vernis usine', 'Pose chevron classique'],
    images: [`${STORAGE}/products/axe-chevron-45-elegance-lacquer-neutral-01.jpg`],
    price: calcPrice(40.50),
    refAxemark: 'Axe Chevron 45 Laque Élégance Neutre',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },

  // =============================================
  // CHEVRON 60°
  // =============================================
  {
    id: 'chevron60-exclusive',
    slug: 'chevron-60-exclusive',
    gamme: 'Exclusive',
    name: { fr: 'Chevron 60° Exclusive', de: 'Chevron 60° Exclusive', en: 'Chevron 60° Exclusive' },
    description: { 
      fr: 'Parquet chevron 60° chêne premium laqué, grade exclusive. Format 11x100x600mm.',
      de: 'Premium lackiertes Eichen-Chevronparkett 60°, Exclusive-Qualität. Format 11x100x600mm.',
      en: 'Premium lacquered oak chevron 60° parquet, exclusive grade. Format 11x100x600mm.'
    },
    dimensions: '11 × 100 × 600 mm',
    epaisseur: 11,
    largeur: 100,
    longueur: '600mm',
    finition: 'Verni',
    pose: 'chevron-60',
    woodType: 'oak',
    color: 'natural',
    features: ['Sans nœuds', 'Vernis usine', 'Grand format'],
    images: [`${STORAGE}/products/chevron-60-exclusive-11x100x600-01.jpg`],
    price: calcPrice(47.50),
    refAxemark: 'Axe Chevron60 Exclusive laque Neutre',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },
  {
    id: 'chevron60-elegance',
    slug: 'chevron-60-elegance',
    gamme: 'Elegance',
    name: { fr: 'Chevron 60° Élégance', de: 'Chevron 60° Eleganz', en: 'Chevron 60° Elegance' },
    description: { 
      fr: 'Parquet chevron 60° chêne laqué, grade élégance. Format 11x100x600mm.',
      de: 'Lackiertes Eichen-Chevronparkett 60°, Eleganz-Qualität. Format 11x100x600mm.',
      en: 'Lacquered oak chevron 60° parquet, elegance grade. Format 11x100x600mm.'
    },
    dimensions: '11 × 100 × 600 mm',
    epaisseur: 11,
    largeur: 100,
    longueur: '600mm',
    finition: 'Verni',
    pose: 'chevron-60',
    woodType: 'oak',
    color: 'natural',
    features: ['Petits nœuds', 'Vernis usine', 'Grand format'],
    images: [`${STORAGE}/products/axe-chevron60-elegance-lacquer-neutral-01.jpg`],
    price: calcPrice(44.10),
    refAxemark: 'Axe Chevron60 Laque Élégance Neutre',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },

  // =============================================
  // LAMES 11x150mm
  // =============================================
  {
    id: 'lame-150-exclusive',
    slug: 'lame-150-exclusive',
    gamme: 'Exclusive',
    name: { fr: 'Lame Exclusive 150mm', de: 'Diele Exclusive 150mm', en: 'Plank Exclusive 150mm' },
    description: { 
      fr: 'Lame parquet chêne premium, grade exclusive. Format 11x150x1330mm.',
      de: 'Premium Eichen-Parkettdiele, Exclusive-Qualität. Format 11x150x1330mm.',
      en: 'Premium oak parquet plank, exclusive grade. Format 11x150x1330mm.'
    },
    dimensions: '11 × 150 × 1330 mm',
    epaisseur: 11,
    largeur: 150,
    longueur: '1330mm',
    finition: 'Brut',
    pose: 'lame',
    woodType: 'oak',
    color: 'natural',
    features: ['Sans nœuds', 'Longueur standard', 'Chêne européen FSC'],
    images: [`${STORAGE}/products/herringbone-11x150x665-01.jpg`],
    price: calcPrice(29.82), // Prix estimé basé sur le tableau
    refAxemark: 'Axe Exclusif 11x150x1330 Neutre',
    delaiLivraison: '2-3 semaines',
    stockStatus: 'disponible',
  },
  {
    id: 'lame-150-elegance',
    slug: 'lame-150-elegance',
    gamme: 'Elegance',
    name: { fr: 'Lame Élégance 150mm', de: 'Diele Eleganz 150mm', en: 'Plank Elegance 150mm' },
    description: { 
      fr: 'Lame parquet chêne naturel, grade élégance. Format 11x150x1330mm.',
      de: 'Natürliche Eichen-Parkettdiele, Eleganz-Qualität. Format 11x150x1330mm.',
      en: 'Natural oak parquet plank, elegance grade. Format 11x150x1330mm.'
    },
    dimensions: '11 × 150 × 1330 mm',
    epaisseur: 11,
    largeur: 150,
    longueur: '1330mm',
    finition: 'Brut',
    pose: 'lame',
    woodType: 'oak',
    color: 'natural',
    features: ['Petits nœuds', 'Longueur standard', 'Chêne européen FSC'],
    images: [`${STORAGE}/products/herringbone-11x150x665-01.jpg`],
    price: calcPrice(27.35),
    refAxemark: 'Axe Élégance 11x150x1330 Neutre',
    delaiLivraison: '2-3 semaines',
    stockStatus: 'disponible',
  },

  // =============================================
  // LAMES 11x190mm (grandes lames)
  // =============================================
  {
    id: 'lame-190-exclusive',
    slug: 'lame-190-exclusive',
    gamme: 'Exclusive',
    name: { fr: 'Grande Lame Exclusive 190mm', de: 'Große Diele Exclusive 190mm', en: 'Wide Plank Exclusive 190mm' },
    description: { 
      fr: 'Grande lame parquet chêne premium, grade exclusive. Format 11x190x1800-2000mm.',
      de: 'Große Premium Eichen-Parkettdiele, Exclusive-Qualität. Format 11x190x1800-2000mm.',
      en: 'Wide premium oak parquet plank, exclusive grade. Format 11x190x1800-2000mm.'
    },
    dimensions: '11 × 190 × 1800-2000 mm',
    epaisseur: 11,
    largeur: 190,
    longueur: '1800-2000mm',
    finition: 'Brut',
    pose: 'lame',
    woodType: 'oak',
    color: 'natural',
    features: ['Sans nœuds', 'Extra large', 'Longueurs variables'],
    images: [`${STORAGE}/products/formpark-exclusive-11x190x570-01.jpg`],
    price: calcPrice(38.50), // Prix estimé
    refAxemark: 'Axe Exclusive Neutre 11x190x1800-2000',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },
  {
    id: 'lame-190-elegance',
    slug: 'lame-190-elegance',
    gamme: 'Elegance',
    name: { fr: 'Grande Lame Élégance 190mm', de: 'Große Diele Eleganz 190mm', en: 'Wide Plank Elegance 190mm' },
    description: { 
      fr: 'Grande lame parquet chêne, grade élégance. Format 11x190x1800-2000mm.',
      de: 'Große Eichen-Parkettdiele, Eleganz-Qualität. Format 11x190x1800-2000mm.',
      en: 'Wide oak parquet plank, elegance grade. Format 11x190x1800-2000mm.'
    },
    dimensions: '11 × 190 × 1800-2000 mm',
    epaisseur: 11,
    largeur: 190,
    longueur: '1800-2000mm',
    finition: 'Brut',
    pose: 'lame',
    woodType: 'oak',
    color: 'natural',
    features: ['Petits nœuds', 'Extra large', 'Longueurs variables'],
    images: [`${STORAGE}/products/formpark-exclusive-11x190x570-02.jpg`],
    price: calcPrice(34.50),
    refAxemark: 'Axe Elegance 11x190x1800-2000 Neutre',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },

  // =============================================
  // POINT DE HONGRIE 11x100x480mm
  // =============================================
  {
    id: 'ph-100-exclusive',
    slug: 'point-hongrie-100-exclusive',
    gamme: 'Exclusive',
    name: { fr: 'Point de Hongrie Exclusive 100mm', de: 'Ungarischer Punkt Exclusive 100mm', en: 'Hungarian Point Exclusive 100mm' },
    description: { 
      fr: 'Parquet point de Hongrie chêne premium, grade exclusive. Format 11x100x480mm.',
      de: 'Premium Eichen-Ungarischer-Punkt-Parkett, Exclusive-Qualität. Format 11x100x480mm.',
      en: 'Premium oak Hungarian point parquet, exclusive grade. Format 11x100x480mm.'
    },
    dimensions: '11 × 100 × 480 mm',
    epaisseur: 11,
    largeur: 100,
    longueur: '480mm',
    finition: 'Brut',
    pose: 'point-hongrie',
    woodType: 'oak',
    color: 'natural',
    features: ['Sans nœuds', 'Pose traditionnelle', 'Effet visuel unique'],
    images: [`${STORAGE}/products/chevron-60-exclusive-11x100x600-02.jpg`],
    price: calcPrice(47.50),
    refAxemark: '11x100x480mm Point de Hongrie 45/60 Exclusive',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },
  {
    id: 'ph-100-elegance',
    slug: 'point-hongrie-100-elegance',
    gamme: 'Elegance',
    name: { fr: 'Point de Hongrie Élégance 100mm', de: 'Ungarischer Punkt Eleganz 100mm', en: 'Hungarian Point Elegance 100mm' },
    description: { 
      fr: 'Parquet point de Hongrie chêne, grade élégance. Format 11x100x480mm.',
      de: 'Eichen-Ungarischer-Punkt-Parkett, Eleganz-Qualität. Format 11x100x480mm.',
      en: 'Oak Hungarian point parquet, elegance grade. Format 11x100x480mm.'
    },
    dimensions: '11 × 100 × 480 mm',
    epaisseur: 11,
    largeur: 100,
    longueur: '480mm',
    finition: 'Brut',
    pose: 'point-hongrie',
    woodType: 'oak',
    color: 'natural',
    features: ['Petits nœuds', 'Pose traditionnelle', 'Effet visuel unique'],
    images: [`${STORAGE}/products/axe-chevron60-elegance-lacquer-neutral-02.jpg`],
    price: calcPrice(44.10),
    refAxemark: '11x100x480mm Point de Hongrie 45/60 Elegance',
    delaiLivraison: '3-4 semaines',
    stockStatus: 'sur_commande',
  },
];

export default products;
