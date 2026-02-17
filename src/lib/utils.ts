// Traductions français
export const gradeTranslations: Record<string, string> = {
  'Exclusive': 'Prestige',
  'Elegance': 'Élégance',
  'Rustic': 'Rustique',
  'Country': 'Tradition',
};

export const colourTranslations: Record<string, string> = {
  'Raw': 'Naturel',
  'Crema': 'Crème',
  'Honey': 'Miel',
  'Amber': 'Ambre',
  'Gilio': 'Noisette',
  'Nugat': 'Nougat',
  'Smoked Oil': 'Fumé',
  'Multicolored': 'Authentique',
  'Neutral': 'Naturel',
  'Raw Wood': 'Bois Brut',
  'Nugat Dark': 'Nougat Foncé',
  'Fumé': 'Fumé',
};

export const formatTranslations: Record<string, string> = {
  'Herringbone': 'Bâton Rompu',
  'Chevron': 'Point de Hongrie',
  'Plank': 'Lame Large',
  'XL Plank': 'Lame XL',
};

// Générer un slug SEO-friendly
export function generateSlug(format: string, grade: string, colour: string, dimensions: string): string {
  const formatFr = formatTranslations[format] || format;
  const gradeFr = gradeTranslations[grade] || grade;
  const colourFr = colourTranslations[colour] || colour;
  
  return `${formatFr}-${gradeFr}-${colourFr}-${dimensions}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Traduire un nom
export function translateGrade(name: string): string {
  return gradeTranslations[name] || name;
}

export function translateColour(name: string): string {
  return colourTranslations[name] || name;
}

export function translateFormat(name: string): string {
  return formatTranslations[name] || name;
}

// Calculer le nombre de paquets nécessaires
export function calculatePackets(surfaceM2: number, packetM2: number, marginPercent: number = 10): {
  packets: number;
  totalSurface: number;
  actualMargin: number;
} {
  const surfaceWithMargin = surfaceM2 * (1 + marginPercent / 100);
  const packets = Math.ceil(surfaceWithMargin / packetM2);
  const totalSurface = packets * packetM2;
  const actualMargin = ((totalSurface - surfaceM2) / surfaceM2) * 100;
  
  return { packets, totalSurface, actualMargin };
}

// Formater un prix
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(price);
}

// Générer les métadonnées SEO
export function generateProductMeta(product: {
  format: string;
  grade: string;
  colour: string;
  finish: string;
  dimensions: string;
  price: number;
}) {
  const formatFr = translateFormat(product.format);
  const gradeFr = translateGrade(product.grade);
  const colourFr = translateColour(product.colour);
  
  const title = `Parquet ${formatFr} ${gradeFr} ${colourFr} - ${product.dimensions} | Natura Parquets`;
  const description = `Parquet contrecollé ${formatFr} grade ${gradeFr} teinte ${colourFr}. Finition ${product.finish}. Dimensions ${product.dimensions}. Prix: ${formatPrice(product.price)}/m². Livraison France. Devis gratuit.`;
  
  return { title, description };
}
