// Natura Parquets - Catalogue COMPLET Axemark 2026
// TOUTES les combinaisons format × grade × finition × chanfrein

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
  chanfrein: boolean;
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
  badge?: 'bestseller' | 'nouveau' | 'promo';
  featured?: boolean;
}

// Prix de base (achat) + suppléments finition
const FINITION_SUPPLEMENT: Record<string, number> = {
  'Brut': 0,
  'Verni': 2.5,
  'Huile': 2,
  'Huile blanche': 3,
  '2x Huile': 4,
};

const calcPrice = (achat: number, finition: string = 'Brut') => {
  const supplement = FINITION_SUPPLEMENT[finition] || 0;
  const achatTotal = achat + supplement;
  const ht = (achatTotal * 2) + 2;
  const ttc = Math.round(ht * 1.20 * 100) / 100;
  return { achat: achatTotal, ht, ttc, display: `${ttc.toFixed(0)}€` };
};

const STORAGE = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/natura-parquets';

export const heroImages = {
  main: `${STORAGE}/ambiance/artisan-chevron-01.jpg`,
  ambiance1: `${STORAGE}/ambiance/artisan-lames-02.jpg`,
  ambiance2: `${STORAGE}/ambiance/escalier-chene-06.jpg`,
};

// Descriptions par grade
const gradeDesc = {
  Exclusive: { fr: 'Grade premium sans nœuds, aspect épuré haut de gamme', de: 'Premium ohne Äste', en: 'Premium without knots' },
  Elegance: { fr: 'Grade naturel avec petits nœuds discrets', de: 'Natürlich kleine Äste', en: 'Natural small knots' },
  Rustic: { fr: 'Grade caractère avec nœuds apparents', de: 'Charakter sichtbare Äste', en: 'Character visible knots' },
  Country: { fr: 'Grade campagne très rustique, maximum de caractère', de: 'Sehr rustikal', en: 'Very rustic country' },
};

// Finitions labels
const finitionLabels: Record<string, { fr: string; de: string; en: string }> = {
  'Brut': { fr: 'Brut (à finir sur place)', de: 'Roh', en: 'Raw' },
  'Verni': { fr: 'Verni usine', de: 'Werkslackiert', en: 'Factory lacquered' },
  'Huile': { fr: 'Huilé naturel', de: 'Geölt', en: 'Oiled' },
  'Huile blanche': { fr: 'Huile blanche', de: 'Weiß geölt', en: 'White oiled' },
  '2x Huile': { fr: 'Double huilage', de: 'Doppelt geölt', en: 'Double oiled' },
};

// Images par type de pose
const poseImages: Record<string, string[]> = {
  'baton-rompu': [
    `${STORAGE}/products/herringbone-exclusive-11x70x490-01.jpg`,
    `${STORAGE}/products/herringbone-elegance-neutral-11x70x490-01.jpg`,
    `${STORAGE}/products/herringbone-exclusive-neutral-11x120x600-01.jpg`,
  ],
  'chevron-45': [
    `${STORAGE}/products/chevron-45-exclusive-lacquer-neutral-01.jpg`,
    `${STORAGE}/products/axe-chevron-45-elegance-lacquer-neutral-01.jpg`,
  ],
  'chevron-60': [
    `${STORAGE}/products/chevron-60-exclusive-11x100x600-01.jpg`,
    `${STORAGE}/products/axe-chevron60-elegance-lacquer-neutral-01.jpg`,
  ],
  'point-hongrie': [
    `${STORAGE}/products/chevron-60-exclusive-11x100x600-02.jpg`,
    `${STORAGE}/products/axe-chevron60-elegance-lacquer-neutral-02.jpg`,
  ],
  'lame': [
    `${STORAGE}/products/formpark-exclusive-11x190x570-01.jpg`,
    `${STORAGE}/products/formpark-exclusive-11x190x570-02.jpg`,
    `${STORAGE}/products/herringbone-11x150x665-01.jpg`,
  ],
};

// Base formats avec prix d'achat
interface BaseFormat {
  pose: Product['pose'];
  largeur: number;
  longueur: string;
  dimensions: string;
  grades: { grade: Product['gamme']; prixAchat: number }[];
  finitions: string[];
  delai: string;
  stock: Product['stockStatus'];
}

const baseFormats: BaseFormat[] = [
  // BÂTON ROMPU 70mm
  {
    pose: 'baton-rompu', largeur: 70, longueur: '490mm', dimensions: '11 × 70 × 490 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 26.80 },
      { grade: 'Elegance', prixAchat: 25.40 },
      { grade: 'Rustic', prixAchat: 24.46 },
    ],
    finitions: ['Brut', 'Verni', 'Huile'],
    delai: '2-3 semaines', stock: 'disponible',
  },
  // BÂTON ROMPU 120mm court
  {
    pose: 'baton-rompu', largeur: 120, longueur: '600mm', dimensions: '11 × 120 × 600 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 33.20 },
      { grade: 'Elegance', prixAchat: 29.40 },
      { grade: 'Rustic', prixAchat: 28.30 },
    ],
    finitions: ['Brut', 'Verni', 'Huile', 'Huile blanche'],
    delai: '2-3 semaines', stock: 'disponible',
  },
  // BÂTON ROMPU 120mm long
  {
    pose: 'baton-rompu', largeur: 120, longueur: '1200mm', dimensions: '11 × 120 × 1200 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 36.68 },
      { grade: 'Elegance', prixAchat: 32.37 },
      { grade: 'Rustic', prixAchat: 30.76 },
    ],
    finitions: ['Brut', 'Verni', 'Huile', 'Huile blanche'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // CHEVRON 45°
  {
    pose: 'chevron-45', largeur: 70, longueur: '410mm', dimensions: '11 × 70 × 410 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 42.36 },
      { grade: 'Elegance', prixAchat: 40.50 },
    ],
    finitions: ['Verni', 'Huile'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // CHEVRON 60°
  {
    pose: 'chevron-60', largeur: 100, longueur: '600mm', dimensions: '11 × 100 × 600 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 47.50 },
      { grade: 'Elegance', prixAchat: 44.10 },
    ],
    finitions: ['Verni', 'Huile'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // POINT DE HONGRIE 70mm
  {
    pose: 'point-hongrie', largeur: 70, longueur: '410mm', dimensions: '11 × 70 × 410 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 42.36 },
      { grade: 'Elegance', prixAchat: 40.50 },
    ],
    finitions: ['Brut', 'Verni', 'Huile'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // POINT DE HONGRIE 100mm
  {
    pose: 'point-hongrie', largeur: 100, longueur: '480mm', dimensions: '11 × 100 × 480 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 47.50 },
      { grade: 'Elegance', prixAchat: 44.10 },
    ],
    finitions: ['Brut', 'Verni', 'Huile'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // POINT DE HONGRIE 120mm
  {
    pose: 'point-hongrie', largeur: 120, longueur: '600mm', dimensions: '11 × 120 × 600 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 49.00 },
      { grade: 'Elegance', prixAchat: 44.40 },
    ],
    finitions: ['Brut', 'Verni', 'Huile'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // LAMES 150mm standard
  {
    pose: 'lame', largeur: 150, longueur: '1330mm', dimensions: '11 × 150 × 1330 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 38.87 },
      { grade: 'Elegance', prixAchat: 34.06 },
      { grade: 'Rustic', prixAchat: 31.95 },
      { grade: 'Country', prixAchat: 24.73 },
    ],
    finitions: ['Brut', 'Verni', 'Huile', 'Huile blanche', '2x Huile'],
    delai: '2-3 semaines', stock: 'disponible',
  },
  // LAMES 150mm long
  {
    pose: 'lame', largeur: 150, longueur: '1800mm', dimensions: '11 × 150 × 1800 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 43.93 },
      { grade: 'Elegance', prixAchat: 36.20 },
      { grade: 'Rustic', prixAchat: 33.00 },
      { grade: 'Country', prixAchat: 24.72 },
    ],
    finitions: ['Brut', 'Verni', 'Huile', 'Huile blanche', '2x Huile'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // GRANDES LAMES 190mm
  {
    pose: 'lame', largeur: 190, longueur: '1800-2000mm', dimensions: '11 × 190 × 1800-2000 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 51.30 },
      { grade: 'Elegance', prixAchat: 39.70 },
      { grade: 'Rustic', prixAchat: 34.00 },
    ],
    finitions: ['Brut', 'Verni', 'Huile', 'Huile blanche', '2x Huile'],
    delai: '3-4 semaines', stock: 'sur_commande',
  },
  // GRANDES LAMES 190mm XL
  {
    pose: 'lame', largeur: 190, longueur: '2200mm', dimensions: '11 × 190 × 2200 mm',
    grades: [
      { grade: 'Exclusive', prixAchat: 50.78 },
      { grade: 'Elegance', prixAchat: 40.31 },
      { grade: 'Rustic', prixAchat: 34.55 },
    ],
    finitions: ['Brut', 'Verni', 'Huile', 'Huile blanche', '2x Huile'],
    delai: '4-6 semaines', stock: 'sur_commande',
  },
];

// Noms de pose
const poseNames: Record<string, { fr: string; de: string; en: string }> = {
  'baton-rompu': { fr: 'Bâton Rompu', de: 'Fischgrät', en: 'Herringbone' },
  'chevron-45': { fr: 'Chevron 45°', de: 'Chevron 45°', en: 'Chevron 45°' },
  'chevron-60': { fr: 'Chevron 60°', de: 'Chevron 60°', en: 'Chevron 60°' },
  'point-hongrie': { fr: 'Point de Hongrie', de: 'Ungarischer Punkt', en: 'Hungarian Point' },
  'lame': { fr: 'Lame', de: 'Diele', en: 'Plank' },
};

// Produits best-sellers (combinaisons populaires)
const BESTSELLERS = [
  'baton-rompu-70-elegance-huile-chanfrein',
  'baton-rompu-120-exclusive-verni-chanfrein',
  'chevron-45-90-elegance-huile-chanfrein',
  'lame-120-rustic-huile-chanfrein',
  'lame-150-elegance-verni-chanfrein',
];

// Produits nouveaux (nouveautés 2026)
const NOUVEAUX = [
  'chevron-60-90-exclusive-huile-blanche-chanfrein',
  'point-hongrie-90-elegance-2x-huile-chanfrein',
  'lame-190-exclusive-huile-chanfrein',
];

// Produits en promo (à afficher avec badge promo)
const PROMOS = [
  'lame-120-country-brut-chanfrein',
  'baton-rompu-70-rustic-brut-chanfrein',
];

// Produits à mettre en avant sur la page d'accueil
const FEATURED_PRODUCTS = [
  'baton-rompu-70-elegance-huile-chanfrein',
  'baton-rompu-120-exclusive-verni-chanfrein',
  'chevron-45-90-elegance-huile-chanfrein',
  'lame-120-rustic-huile-chanfrein',
  'chevron-60-90-exclusive-huile-blanche-chanfrein',
  'point-hongrie-90-elegance-2x-huile-chanfrein',
];

// Générer tous les produits
function generateProducts(): Product[] {
  const products: Product[] = [];
  let counter = 0;

  for (const format of baseFormats) {
    for (const gradeInfo of format.grades) {
      for (const finition of format.finitions) {
        // Avec chanfrein
        counter++;
        const baseId = `${format.pose}-${format.largeur}-${gradeInfo.grade.toLowerCase()}-${finition.toLowerCase().replace(/\s+/g, '-')}`;
        const productId = `${baseId}-chanfrein`;
        
        const poseName = poseNames[format.pose];
        const finLabel = finitionLabels[finition];
        
        // Déterminer le badge
        let badge: 'bestseller' | 'nouveau' | 'promo' | undefined;
        if (BESTSELLERS.includes(productId)) badge = 'bestseller';
        else if (NOUVEAUX.includes(productId)) badge = 'nouveau';
        else if (PROMOS.includes(productId)) badge = 'promo';
        
        const featured = FEATURED_PRODUCTS.includes(productId);
        
        products.push({
          id: productId,
          slug: productId,
          gamme: gradeInfo.grade,
          name: {
            fr: `${poseName.fr} ${format.largeur}mm ${gradeInfo.grade} ${finLabel.fr}`,
            de: `${poseName.de} ${format.largeur}mm ${gradeInfo.grade} ${finLabel.de}`,
            en: `${poseName.en} ${format.largeur}mm ${gradeInfo.grade} ${finLabel.en}`,
          },
          description: {
            fr: `${gradeDesc[gradeInfo.grade].fr}. Finition ${finLabel.fr.toLowerCase()}. Avec chanfrein 4 côtés.`,
            de: `${gradeDesc[gradeInfo.grade].de}. ${finLabel.de}. Mit 4-seitiger Fase.`,
            en: `${gradeDesc[gradeInfo.grade].en}. ${finLabel.en}. With 4-sided bevel.`,
          },
          dimensions: format.dimensions,
          epaisseur: 11,
          largeur: format.largeur,
          longueur: format.longueur,
          finition: finition,
          chanfrein: true,
          pose: format.pose,
          aubier: false,
          woodType: 'oak',
          color: 'natural',
          features: [
            finition === 'Brut' ? 'À finir sur place' : `Finition ${finition}`,
            'Chanfrein 4 côtés',
            'Chêne européen FSC',
          ],
          images: poseImages[format.pose] || poseImages['lame'],
          price: calcPrice(gradeInfo.prixAchat, finition),
          refAxemark: `Axe ${gradeInfo.grade} ${format.dimensions.replace(/\s/g, '')} ${finition}`,
          delaiLivraison: format.delai,
          stockStatus: format.stock,
          badge,
          featured,
        });

        // Sans chanfrein (seulement pour certaines finitions)
        if (finition === 'Brut' || finition === 'Verni') {
          counter++;
          products.push({
            id: `${baseId}-sans-chanfrein`,
            slug: `${baseId}-sans-chanfrein`,
            gamme: gradeInfo.grade,
            name: {
              fr: `${poseName.fr} ${format.largeur}mm ${gradeInfo.grade} ${finLabel.fr} Sans chanfrein`,
              de: `${poseName.de} ${format.largeur}mm ${gradeInfo.grade} ${finLabel.de} Ohne Fase`,
              en: `${poseName.en} ${format.largeur}mm ${gradeInfo.grade} ${finLabel.en} No bevel`,
            },
            description: {
              fr: `${gradeDesc[gradeInfo.grade].fr}. Finition ${finLabel.fr.toLowerCase()}. Sans chanfrein.`,
              de: `${gradeDesc[gradeInfo.grade].de}. ${finLabel.de}. Ohne Fase.`,
              en: `${gradeDesc[gradeInfo.grade].en}. ${finLabel.en}. No bevel.`,
            },
            dimensions: format.dimensions,
            epaisseur: 11,
            largeur: format.largeur,
            longueur: format.longueur,
            finition: finition,
            chanfrein: false,
            pose: format.pose,
            aubier: false,
            woodType: 'oak',
            color: 'natural',
            features: [
              finition === 'Brut' ? 'À finir sur place' : `Finition ${finition}`,
              'Sans chanfrein',
              'Chêne européen FSC',
            ],
            images: poseImages[format.pose] || poseImages['lame'],
            price: calcPrice(gradeInfo.prixAchat, finition),
            refAxemark: `Axe ${gradeInfo.grade} ${format.dimensions.replace(/\s/g, '')} ${finition} sans chanfrein`,
            delaiLivraison: format.delai,
            stockStatus: format.stock,
          });
        }
      }
    }
  }

  return products;
}

export const products: Product[] = generateProducts();
export default products;

// Helper: Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

// Bank details for payment
export const bankDetails = {
  bankName: 'Crédit Mutuel',
  banque: 'Crédit Mutuel',
  iban: 'FR76 1027 8060 0000 0206 4640 127',
  bic: 'CMCIFR2A',
  accountHolder: 'RENO\'LINE SARL',
  beneficiaire: 'RENO\'LINE SARL',
  address: '6 rue du Commerce, 68420 Herrlisheim-près-Colmar',
};

// Stats
console.log(`Catalogue généré: ${products.length} produits`);
