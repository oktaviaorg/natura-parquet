// Natura Parquets - Catalogue COMPLET Axemark 2026
// Formule: Prix HT = (Prix achat × 2) + 2€ | Prix TTC = Prix HT × 1.20

export interface Product {
  id: string;
  slug: string;
  gamme: 'Exclusive' | 'Elegance' | 'Rustic' | 'Country';
  name: { fr: string; de: string; en: string; };
  description: { fr: string; de: string; en: string; };
  dimensions: string;
  epaisseur: number;
  largeur: number;
  longueur: string;
  finition: string;
  pose: 'lame' | 'baton-rompu' | 'chevron-45' | 'chevron-60' | 'point-hongrie';
  aubier: boolean;
  woodType: 'oak';
  color: 'natural';
  features: string[];
  images: string[];
  price: { achat: number; ht: number; ttc: number; display: string; };
  refAxemark: string;
  delaiLivraison: string;
  stockStatus: 'disponible' | 'sur_commande';
}

const calcPrice = (achat: number) => {
  const ht = (achat * 2) + 2;
  const ttc = Math.round(ht * 1.20 * 100) / 100;
  return { achat, ht, ttc, display: `${ttc.toFixed(0)}€` };
};

const STORAGE = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets';

export const heroImages = {
  main: `${STORAGE}/ambiance/artisan-chevron-01.jpg`,
  ambiance1: `${STORAGE}/ambiance/artisan-lames-02.jpg`,
  ambiance2: `${STORAGE}/ambiance/escalier-chene-06.jpg`,
};

const gradeDesc = {
  Exclusive: { fr: 'Grade premium sans nœuds', de: 'Premium ohne Äste', en: 'Premium without knots' },
  Elegance: { fr: 'Grade naturel petits nœuds', de: 'Natürlich kleine Äste', en: 'Natural small knots' },
  Rustic: { fr: 'Grade caractère nœuds apparents', de: 'Charakter sichtbare Äste', en: 'Character visible knots' },
  Country: { fr: 'Grade campagne très rustique', de: 'Sehr rustikal', en: 'Very rustic' },
};

const gradeFeatures = {
  Exclusive: ['Sans nœuds', 'Aspect épuré'],
  Elegance: ['Petits nœuds discrets', 'Équilibre naturel'],
  Rustic: ['Nœuds apparents', 'Caractère authentique'],
  Country: ['Nœuds prononcés', 'Maximum de caractère'],
};

export const products: Product[] = [
  // =============================================
  // BÂTON ROMPU 11x70x490mm
  // =============================================
  {
    id: 'br-70-exclusive', slug: 'baton-rompu-70-exclusive', gamme: 'Exclusive',
    name: { fr: 'Bâton Rompu 70mm Exclusive', de: 'Fischgrät 70mm Exclusive', en: 'Herringbone 70mm Exclusive' },
    description: { fr: gradeDesc.Exclusive.fr, de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 70 × 490 mm', epaisseur: 11, largeur: 70, longueur: '490mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: gradeFeatures.Exclusive, images: [`${STORAGE}/products/herringbone-exclusive-11x70x490-01.jpg`],
    price: calcPrice(26.80), refAxemark: 'Axe Exclusive Neutre 11x70x490',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },
  {
    id: 'br-70-elegance', slug: 'baton-rompu-70-elegance', gamme: 'Elegance',
    name: { fr: 'Bâton Rompu 70mm Élégance', de: 'Fischgrät 70mm Eleganz', en: 'Herringbone 70mm Elegance' },
    description: { fr: gradeDesc.Elegance.fr, de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 70 × 490 mm', epaisseur: 11, largeur: 70, longueur: '490mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: gradeFeatures.Elegance, images: [`${STORAGE}/products/herringbone-elegance-neutral-11x70x490-01.jpg`],
    price: calcPrice(25.40), refAxemark: 'Axe Elegance Neutre 11x70x490',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },
  {
    id: 'br-70-rustic', slug: 'baton-rompu-70-rustic', gamme: 'Rustic',
    name: { fr: 'Bâton Rompu 70mm Rustique', de: 'Fischgrät 70mm Rustikal', en: 'Herringbone 70mm Rustic' },
    description: { fr: gradeDesc.Rustic.fr, de: gradeDesc.Rustic.de, en: gradeDesc.Rustic.en },
    dimensions: '11 × 70 × 490 mm', epaisseur: 11, largeur: 70, longueur: '490mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: gradeFeatures.Rustic, images: [`${STORAGE}/products/herringbone-elegance-neutral-11x70x490-02.jpg`],
    price: calcPrice(24.46), refAxemark: 'Axe Rustic Neutre 11x70x490',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },

  // =============================================
  // BÂTON ROMPU 11x120x600mm
  // =============================================
  {
    id: 'br-120-600-exclusive', slug: 'baton-rompu-120-600-exclusive', gamme: 'Exclusive',
    name: { fr: 'Bâton Rompu 120mm Exclusive', de: 'Fischgrät 120mm Exclusive', en: 'Herringbone 120mm Exclusive' },
    description: { fr: 'Grand format ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 120 × 600 mm', epaisseur: 11, largeur: 120, longueur: '600mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Grand format'], images: [`${STORAGE}/products/herringbone-exclusive-neutral-11x120x600-01.jpg`],
    price: calcPrice(33.20), refAxemark: 'Axe Exclusive Neutre 11x120x600',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },
  {
    id: 'br-120-600-elegance', slug: 'baton-rompu-120-600-elegance', gamme: 'Elegance',
    name: { fr: 'Bâton Rompu 120mm Élégance', de: 'Fischgrät 120mm Eleganz', en: 'Herringbone 120mm Elegance' },
    description: { fr: 'Grand format ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 120 × 600 mm', epaisseur: 11, largeur: 120, longueur: '600mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Grand format'], images: [`${STORAGE}/products/herringbone-elegance-neutral-11x120x600-01.jpg`],
    price: calcPrice(29.40), refAxemark: 'Axe Elegance 11x120x600 Neutre',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },
  {
    id: 'br-120-600-rustic', slug: 'baton-rompu-120-600-rustic', gamme: 'Rustic',
    name: { fr: 'Bâton Rompu 120mm Rustique', de: 'Fischgrät 120mm Rustikal', en: 'Herringbone 120mm Rustic' },
    description: { fr: 'Grand format ' + gradeDesc.Rustic.fr.toLowerCase(), de: gradeDesc.Rustic.de, en: gradeDesc.Rustic.en },
    dimensions: '11 × 120 × 600 mm', epaisseur: 11, largeur: 120, longueur: '600mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Rustic, 'Grand format'], images: [`${STORAGE}/products/herringbone-rustic-neutral-11x120x600-01.jpg`],
    price: calcPrice(28.30), refAxemark: 'Axe Rustic Neutre 11x120x600',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },

  // =============================================
  // BÂTON ROMPU 11x120x1200mm (long)
  // =============================================
  {
    id: 'br-120-1200-exclusive', slug: 'baton-rompu-120-1200-exclusive', gamme: 'Exclusive',
    name: { fr: 'Bâton Rompu 120mm Long Exclusive', de: 'Fischgrät 120mm Lang Exclusive', en: 'Herringbone 120mm Long Exclusive' },
    description: { fr: 'Extra long ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 120 × 1200 mm', epaisseur: 11, largeur: 120, longueur: '1200mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Extra long'], images: [`${STORAGE}/products/herringbone-exclusive-neutral-11x120x600-02.jpg`],
    price: calcPrice(36.68), refAxemark: 'Axe Exclusive Neutre 11x120x1200',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'br-120-1200-elegance', slug: 'baton-rompu-120-1200-elegance', gamme: 'Elegance',
    name: { fr: 'Bâton Rompu 120mm Long Élégance', de: 'Fischgrät 120mm Lang Eleganz', en: 'Herringbone 120mm Long Elegance' },
    description: { fr: 'Extra long ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 120 × 1200 mm', epaisseur: 11, largeur: 120, longueur: '1200mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Extra long'], images: [`${STORAGE}/products/herringbone-elegance-neutral-11x120x600-02.jpg`],
    price: calcPrice(32.37), refAxemark: 'Axe Elegance 11x120x1200 Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'br-120-1200-rustic', slug: 'baton-rompu-120-1200-rustic', gamme: 'Rustic',
    name: { fr: 'Bâton Rompu 120mm Long Rustique', de: 'Fischgrät 120mm Lang Rustikal', en: 'Herringbone 120mm Long Rustic' },
    description: { fr: 'Extra long ' + gradeDesc.Rustic.fr.toLowerCase(), de: gradeDesc.Rustic.de, en: gradeDesc.Rustic.en },
    dimensions: '11 × 120 × 1200 mm', epaisseur: 11, largeur: 120, longueur: '1200mm',
    finition: 'Brut', pose: 'baton-rompu', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Rustic, 'Extra long'], images: [`${STORAGE}/products/herringbone-rustic-neutral-11x120x600-01.jpg`],
    price: calcPrice(30.76), refAxemark: 'Axe Rustic Neutre 11x120x1200',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // CHEVRON 45°
  // =============================================
  {
    id: 'chevron45-exclusive', slug: 'chevron-45-exclusive', gamme: 'Exclusive',
    name: { fr: 'Chevron 45° Exclusive', de: 'Chevron 45° Exclusive', en: 'Chevron 45° Exclusive' },
    description: { fr: 'Chevron classique ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 70 × 410 mm', epaisseur: 11, largeur: 70, longueur: '410mm',
    finition: 'Verni', pose: 'chevron-45', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Vernis usine'], images: [`${STORAGE}/products/chevron-45-exclusive-lacquer-neutral-01.jpg`],
    price: calcPrice(42.36), refAxemark: 'Axe Chevron45 Exclusive laque Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'chevron45-elegance', slug: 'chevron-45-elegance', gamme: 'Elegance',
    name: { fr: 'Chevron 45° Élégance', de: 'Chevron 45° Eleganz', en: 'Chevron 45° Elegance' },
    description: { fr: 'Chevron classique ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 70 × 410 mm', epaisseur: 11, largeur: 70, longueur: '410mm',
    finition: 'Verni', pose: 'chevron-45', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Vernis usine'], images: [`${STORAGE}/products/axe-chevron-45-elegance-lacquer-neutral-01.jpg`],
    price: calcPrice(40.50), refAxemark: 'Axe Chevron 45 Laque Élégance Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // CHEVRON 60°
  // =============================================
  {
    id: 'chevron60-exclusive', slug: 'chevron-60-exclusive', gamme: 'Exclusive',
    name: { fr: 'Chevron 60° Exclusive', de: 'Chevron 60° Exclusive', en: 'Chevron 60° Exclusive' },
    description: { fr: 'Chevron allongé ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 100 × 600 mm', epaisseur: 11, largeur: 100, longueur: '600mm',
    finition: 'Verni', pose: 'chevron-60', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Vernis usine', 'Grand format'], images: [`${STORAGE}/products/chevron-60-exclusive-11x100x600-01.jpg`],
    price: calcPrice(47.50), refAxemark: 'Axe Chevron60 Exclusive laque Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'chevron60-elegance', slug: 'chevron-60-elegance', gamme: 'Elegance',
    name: { fr: 'Chevron 60° Élégance', de: 'Chevron 60° Eleganz', en: 'Chevron 60° Elegance' },
    description: { fr: 'Chevron allongé ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 100 × 600 mm', epaisseur: 11, largeur: 100, longueur: '600mm',
    finition: 'Verni', pose: 'chevron-60', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Vernis usine', 'Grand format'], images: [`${STORAGE}/products/axe-chevron60-elegance-lacquer-neutral-01.jpg`],
    price: calcPrice(44.10), refAxemark: 'Axe Chevron60 Laque Élégance Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // POINT DE HONGRIE 11x70x410mm
  // =============================================
  {
    id: 'ph-70-exclusive', slug: 'point-hongrie-70-exclusive', gamme: 'Exclusive',
    name: { fr: 'Point de Hongrie 70mm Exclusive', de: 'Ungarisch 70mm Exclusive', en: 'Hungarian 70mm Exclusive' },
    description: { fr: 'Point de Hongrie ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 70 × 410 mm', epaisseur: 11, largeur: 70, longueur: '410mm',
    finition: 'Brut', pose: 'point-hongrie', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Pose traditionnelle'], images: [`${STORAGE}/products/chevron-45-exclusive-lacquer-neutral-02.jpg`],
    price: calcPrice(42.36), refAxemark: '11x70x410 Point de Hongrie Exclusive',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'ph-70-elegance', slug: 'point-hongrie-70-elegance', gamme: 'Elegance',
    name: { fr: 'Point de Hongrie 70mm Élégance', de: 'Ungarisch 70mm Eleganz', en: 'Hungarian 70mm Elegance' },
    description: { fr: 'Point de Hongrie ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 70 × 410 mm', epaisseur: 11, largeur: 70, longueur: '410mm',
    finition: 'Brut', pose: 'point-hongrie', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Pose traditionnelle'], images: [`${STORAGE}/products/axe-chevron-45-elegance-lacquer-neutral-02.jpg`],
    price: calcPrice(40.50), refAxemark: '11x70x410 Point de Hongrie Elegance',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // POINT DE HONGRIE 11x100x480mm
  // =============================================
  {
    id: 'ph-100-exclusive', slug: 'point-hongrie-100-exclusive', gamme: 'Exclusive',
    name: { fr: 'Point de Hongrie 100mm Exclusive', de: 'Ungarisch 100mm Exclusive', en: 'Hungarian 100mm Exclusive' },
    description: { fr: 'Point de Hongrie grand format ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 100 × 480 mm', epaisseur: 11, largeur: 100, longueur: '480mm',
    finition: 'Brut', pose: 'point-hongrie', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Grand format'], images: [`${STORAGE}/products/chevron-60-exclusive-11x100x600-02.jpg`],
    price: calcPrice(47.50), refAxemark: '11x100x480 Point de Hongrie Exclusive',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'ph-100-elegance', slug: 'point-hongrie-100-elegance', gamme: 'Elegance',
    name: { fr: 'Point de Hongrie 100mm Élégance', de: 'Ungarisch 100mm Eleganz', en: 'Hungarian 100mm Elegance' },
    description: { fr: 'Point de Hongrie grand format ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 100 × 480 mm', epaisseur: 11, largeur: 100, longueur: '480mm',
    finition: 'Brut', pose: 'point-hongrie', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Grand format'], images: [`${STORAGE}/products/axe-chevron60-elegance-lacquer-neutral-02.jpg`],
    price: calcPrice(44.10), refAxemark: '11x100x480 Point de Hongrie Elegance',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // POINT DE HONGRIE 11x120x600mm
  // =============================================
  {
    id: 'ph-120-exclusive', slug: 'point-hongrie-120-exclusive', gamme: 'Exclusive',
    name: { fr: 'Point de Hongrie 120mm Exclusive', de: 'Ungarisch 120mm Exclusive', en: 'Hungarian 120mm Exclusive' },
    description: { fr: 'Point de Hongrie extra large ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 120 × 600 mm', epaisseur: 11, largeur: 120, longueur: '600mm',
    finition: 'Brut', pose: 'point-hongrie', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Extra large'], images: [`${STORAGE}/products/chevron-60-exclusive-11x100x600-01.jpg`],
    price: calcPrice(49.00), refAxemark: '11x120x600 Point de Hongrie Exclusive',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'ph-120-elegance', slug: 'point-hongrie-120-elegance', gamme: 'Elegance',
    name: { fr: 'Point de Hongrie 120mm Élégance', de: 'Ungarisch 120mm Eleganz', en: 'Hungarian 120mm Elegance' },
    description: { fr: 'Point de Hongrie extra large ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 120 × 600 mm', epaisseur: 11, largeur: 120, longueur: '600mm',
    finition: 'Brut', pose: 'point-hongrie', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Extra large'], images: [`${STORAGE}/products/axe-chevron60-elegance-lacquer-neutral-01.jpg`],
    price: calcPrice(44.40), refAxemark: '11x120x600 Point de Hongrie Elegance',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // LAMES 11x150x1330mm
  // =============================================
  {
    id: 'lame-150-1330-exclusive', slug: 'lame-150-1330-exclusive', gamme: 'Exclusive',
    name: { fr: 'Lame 150mm Exclusive', de: 'Diele 150mm Exclusive', en: 'Plank 150mm Exclusive' },
    description: { fr: 'Lame standard ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 150 × 1330 mm', epaisseur: 11, largeur: 150, longueur: '1330mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: gradeFeatures.Exclusive, images: [`${STORAGE}/products/formpark-exclusive-11x190x570-01.jpg`],
    price: calcPrice(38.87), refAxemark: 'Axe Exclusif 11x150x1330 Neutre',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },
  {
    id: 'lame-150-1330-elegance', slug: 'lame-150-1330-elegance', gamme: 'Elegance',
    name: { fr: 'Lame 150mm Élégance', de: 'Diele 150mm Eleganz', en: 'Plank 150mm Elegance' },
    description: { fr: 'Lame standard ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 150 × 1330 mm', epaisseur: 11, largeur: 150, longueur: '1330mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: gradeFeatures.Elegance, images: [`${STORAGE}/products/formpark-exclusive-11x190x570-02.jpg`],
    price: calcPrice(34.06), refAxemark: 'Axe Élégance 11x150x1330 Neutre',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },
  {
    id: 'lame-150-1330-rustic', slug: 'lame-150-1330-rustic', gamme: 'Rustic',
    name: { fr: 'Lame 150mm Rustique', de: 'Diele 150mm Rustikal', en: 'Plank 150mm Rustic' },
    description: { fr: 'Lame standard ' + gradeDesc.Rustic.fr.toLowerCase(), de: gradeDesc.Rustic.de, en: gradeDesc.Rustic.en },
    dimensions: '11 × 150 × 1330 mm', epaisseur: 11, largeur: 150, longueur: '1330mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: gradeFeatures.Rustic, images: [`${STORAGE}/products/herringbone-11x150x665-01.jpg`],
    price: calcPrice(31.95), refAxemark: 'Axe Rustique Neutre 11x150x1330',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },
  {
    id: 'lame-150-1330-country', slug: 'lame-150-1330-country', gamme: 'Country',
    name: { fr: 'Lame 150mm Country', de: 'Diele 150mm Country', en: 'Plank 150mm Country' },
    description: { fr: 'Lame standard ' + gradeDesc.Country.fr.toLowerCase(), de: gradeDesc.Country.de, en: gradeDesc.Country.en },
    dimensions: '11 × 150 × 1330 mm', epaisseur: 11, largeur: 150, longueur: '1330mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: gradeFeatures.Country, images: [`${STORAGE}/products/herringbone-11x150x665-01.jpg`],
    price: calcPrice(24.73), refAxemark: 'Axe Country Neutre 11x150x1330',
    delaiLivraison: '2-3 semaines', stockStatus: 'disponible',
  },

  // =============================================
  // LAMES 11x150x1800mm (longues)
  // =============================================
  {
    id: 'lame-150-1800-exclusive', slug: 'lame-150-1800-exclusive', gamme: 'Exclusive',
    name: { fr: 'Lame Longue 150mm Exclusive', de: 'Lange Diele 150mm Exclusive', en: 'Long Plank 150mm Exclusive' },
    description: { fr: 'Lame longue ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 150 × 1800 mm', epaisseur: 11, largeur: 150, longueur: '1800mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Extra long'], images: [`${STORAGE}/products/formpark-exclusive-11x190x570-01.jpg`],
    price: calcPrice(43.93), refAxemark: 'Axe Exclusive 11x150x1800 Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'lame-150-1800-elegance', slug: 'lame-150-1800-elegance', gamme: 'Elegance',
    name: { fr: 'Lame Longue 150mm Élégance', de: 'Lange Diele 150mm Eleganz', en: 'Long Plank 150mm Elegance' },
    description: { fr: 'Lame longue ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 150 × 1800 mm', epaisseur: 11, largeur: 150, longueur: '1800mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Extra long'], images: [`${STORAGE}/products/formpark-exclusive-11x190x570-02.jpg`],
    price: calcPrice(36.20), refAxemark: 'Axe Elegance 11x150x1800 Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'lame-150-1800-rustic', slug: 'lame-150-1800-rustic', gamme: 'Rustic',
    name: { fr: 'Lame Longue 150mm Rustique', de: 'Lange Diele 150mm Rustikal', en: 'Long Plank 150mm Rustic' },
    description: { fr: 'Lame longue ' + gradeDesc.Rustic.fr.toLowerCase(), de: gradeDesc.Rustic.de, en: gradeDesc.Rustic.en },
    dimensions: '11 × 150 × 1800 mm', epaisseur: 11, largeur: 150, longueur: '1800mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Rustic, 'Extra long'], images: [`${STORAGE}/products/herringbone-11x150x665-01.jpg`],
    price: calcPrice(33.00), refAxemark: 'Axe Rustic 11x150x1800 Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // GRANDES LAMES 11x190mm
  // =============================================
  {
    id: 'lame-190-exclusive', slug: 'grande-lame-190-exclusive', gamme: 'Exclusive',
    name: { fr: 'Grande Lame 190mm Exclusive', de: 'Große Diele 190mm Exclusive', en: 'Wide Plank 190mm Exclusive' },
    description: { fr: 'Grande lame premium ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 190 × 1800-2000 mm', epaisseur: 11, largeur: 190, longueur: '1800-2000mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Extra large', 'Longueurs variables'], images: [`${STORAGE}/products/formpark-exclusive-11x190x570-01.jpg`],
    price: calcPrice(51.30), refAxemark: 'Axe Exclusive Neutre 11x190x1800-2000',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'lame-190-elegance', slug: 'grande-lame-190-elegance', gamme: 'Elegance',
    name: { fr: 'Grande Lame 190mm Élégance', de: 'Große Diele 190mm Eleganz', en: 'Wide Plank 190mm Elegance' },
    description: { fr: 'Grande lame ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 190 × 1800-2000 mm', epaisseur: 11, largeur: 190, longueur: '1800-2000mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Extra large', 'Longueurs variables'], images: [`${STORAGE}/products/formpark-exclusive-11x190x570-02.jpg`],
    price: calcPrice(39.70), refAxemark: 'Axe Elegance 11x190x1800-2000 Neutre',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'lame-190-rustic', slug: 'grande-lame-190-rustic', gamme: 'Rustic',
    name: { fr: 'Grande Lame 190mm Rustique', de: 'Große Diele 190mm Rustikal', en: 'Wide Plank 190mm Rustic' },
    description: { fr: 'Grande lame ' + gradeDesc.Rustic.fr.toLowerCase(), de: gradeDesc.Rustic.de, en: gradeDesc.Rustic.en },
    dimensions: '11 × 190 × 1800-2000 mm', epaisseur: 11, largeur: 190, longueur: '1800-2000mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Rustic, 'Extra large', 'Longueurs variables'], images: [`${STORAGE}/products/herringbone-11x150x665-01.jpg`],
    price: calcPrice(34.00), refAxemark: 'Axe Rustic Neutre 11x190x1800-2000',
    delaiLivraison: '3-4 semaines', stockStatus: 'sur_commande',
  },

  // =============================================
  // GRANDES LAMES 11x190x2200mm (extra long)
  // =============================================
  {
    id: 'lame-190-2200-exclusive', slug: 'grande-lame-190-2200-exclusive', gamme: 'Exclusive',
    name: { fr: 'Grande Lame 190×2200 Exclusive', de: 'Große Diele 190×2200 Exclusive', en: 'Wide Plank 190×2200 Exclusive' },
    description: { fr: 'Lame XL ' + gradeDesc.Exclusive.fr.toLowerCase(), de: gradeDesc.Exclusive.de, en: gradeDesc.Exclusive.en },
    dimensions: '11 × 190 × 2200 mm', epaisseur: 11, largeur: 190, longueur: '2200mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Exclusive, 'Format XL'], images: [`${STORAGE}/products/formpark-exclusive-11x190x570-01.jpg`],
    price: calcPrice(50.78), refAxemark: 'Axe Exclusive 11x190x2200 Neutre',
    delaiLivraison: '4-6 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'lame-190-2200-elegance', slug: 'grande-lame-190-2200-elegance', gamme: 'Elegance',
    name: { fr: 'Grande Lame 190×2200 Élégance', de: 'Große Diele 190×2200 Eleganz', en: 'Wide Plank 190×2200 Elegance' },
    description: { fr: 'Lame XL ' + gradeDesc.Elegance.fr.toLowerCase(), de: gradeDesc.Elegance.de, en: gradeDesc.Elegance.en },
    dimensions: '11 × 190 × 2200 mm', epaisseur: 11, largeur: 190, longueur: '2200mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Elegance, 'Format XL'], images: [`${STORAGE}/products/formpark-exclusive-11x190x570-02.jpg`],
    price: calcPrice(40.31), refAxemark: 'Axe Elegance 11x190x2200 Neutre',
    delaiLivraison: '4-6 semaines', stockStatus: 'sur_commande',
  },
  {
    id: 'lame-190-2200-rustic', slug: 'grande-lame-190-2200-rustic', gamme: 'Rustic',
    name: { fr: 'Grande Lame 190×2200 Rustique', de: 'Große Diele 190×2200 Rustikal', en: 'Wide Plank 190×2200 Rustic' },
    description: { fr: 'Lame XL ' + gradeDesc.Rustic.fr.toLowerCase(), de: gradeDesc.Rustic.de, en: gradeDesc.Rustic.en },
    dimensions: '11 × 190 × 2200 mm', epaisseur: 11, largeur: 190, longueur: '2200mm',
    finition: 'Brut', pose: 'lame', aubier: false, woodType: 'oak', color: 'natural',
    features: [...gradeFeatures.Rustic, 'Format XL'], images: [`${STORAGE}/products/herringbone-11x150x665-01.jpg`],
    price: calcPrice(34.55), refAxemark: 'Axe Rustic 11x190x2200 Neutre',
    delaiLivraison: '4-6 semaines', stockStatus: 'sur_commande',
  },
];

export default products;
