// Setup Natura Parquet Database
// Run: node scripts/setup-database.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mjuzyqhxifyvebtnlrra.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdXp5cWh4aWZ5dmVidG5scnJhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjgxOTMzMywiZXhwIjoyMDU4Mzk1MzMzfQ.MifUYblRmRAEIHVF1Z7aohfvR99rjVXee_-16Fvt5sY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Produits basés sur les données existantes + structure prix
const products = [
  // Contrecollé (Engineered)
  {
    slug: 'aurore',
    category: 'engineered',
    name_fr: 'Aurore',
    name_de: 'Aurore',
    name_en: 'Aurore',
    description_fr: 'Parquet contrecollé chêne européen, finition huilée Kashmir. Lames larges pour un rendu contemporain et lumineux.',
    description_de: 'Mehrschichtparkett europäische Eiche, Kashmir Ölfinish. Breite Dielen für ein zeitgenössisches und helles Erscheinungsbild.',
    description_en: 'Engineered European oak parquet, Kashmir oil finish. Wide planks for a contemporary and luminous look.',
    wood_type: 'oak',
    grade: 'natur',
    finish: 'Kashmir Oil',
    color: 'light',
    width_mm: 190,
    length_mm: 1900,
    thickness_mm: 14,
    price_ht: 73.40,
    price_ttc: 89,
    price_display: '89 €/m²',
    delivery_weeks: 3,
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Click system'],
    images: ['/images/products/kashmir.jpg', '/images/products/kashmir-detail.jpg'],
    available: true,
    sort_order: 1
  },
  {
    slug: 'ecorce',
    category: 'engineered',
    name_fr: 'Écorce',
    name_de: 'Écorce',
    name_en: 'Écorce',
    description_fr: 'Parquet contrecollé aspect brut, finition invisible pour révéler la beauté naturelle du chêne européen.',
    description_de: 'Mehrschichtparkett mit rohem Aussehen, unsichtbare Oberfläche zur Betonung der natürlichen Schönheit.',
    description_en: 'Engineered parquet with raw look, invisible finish to reveal natural European oak beauty.',
    wood_type: 'oak',
    grade: 'select',
    finish: 'Raw Invisible',
    color: 'natural',
    width_mm: 220,
    length_mm: 2200,
    thickness_mm: 16,
    price_ht: 101.40,
    price_ttc: 122,
    price_display: '122 €/m²',
    delivery_weeks: 4,
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Brossé légèrement'],
    images: ['/images/products/raw.jpg', '/images/products/raw-detail.jpg'],
    available: true,
    sort_order: 2
  },
  {
    slug: 'vendange',
    category: 'engineered',
    name_fr: 'Vendange',
    name_de: 'Vendange',
    name_en: 'Vendange',
    description_fr: 'Parquet contrecollé aux tons dorés, finition huilée pour une ambiance chaleureuse et classique.',
    description_de: 'Mehrschichtparkett mit goldenen Tönen, Ölfinish für eine warme und klassische Atmosphäre.',
    description_en: 'Engineered parquet with golden tones, oil finish for a warm and classic ambiance.',
    wood_type: 'oak',
    grade: 'natur',
    finish: 'Julia Gold Oil',
    color: 'medium',
    width_mm: 180,
    length_mm: 1800,
    thickness_mm: 14,
    price_ht: 73.40,
    price_ttc: 89,
    price_display: '89 €/m²',
    delivery_weeks: 3,
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Chanfreins 4 côtés'],
    images: ['/images/products/julia.jpg', '/images/products/julia-detail.jpg'],
    available: true,
    sort_order: 3
  },
  {
    slug: 'automne',
    category: 'engineered',
    name_fr: 'Automne',
    name_de: 'Automne',
    name_en: 'Automne',
    description_fr: 'Parquet contrecollé teinte profonde, finition huilée pour un caractère affirmé et élégant.',
    description_de: 'Mehrschichtparkett mit tiefer Färbung, Ölfinish für einen ausgeprägten und eleganten Charakter.',
    description_en: 'Engineered parquet deep tone, oil finish for a bold and elegant character.',
    wood_type: 'oak',
    grade: 'rustic',
    finish: 'Brown Deep Oil',
    color: 'dark',
    width_mm: 200,
    length_mm: 2000,
    thickness_mm: 14,
    price_ht: 61.40,
    price_ttc: 74,
    price_display: '74 €/m²',
    delivery_weeks: 2,
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Brossé'],
    images: ['/images/products/brown.jpg', '/images/products/brown-detail.jpg'],
    available: true,
    sort_order: 4
  },
  {
    slug: 'haussmann',
    category: 'engineered',
    name_fr: 'Haussmann',
    name_de: 'Haussmann Fischgrät',
    name_en: 'Haussmann',
    description_fr: 'Parquet contrecollé pose chevron, finition huilée naturelle pour un style parisien intemporel.',
    description_de: 'Mehrschichtparkett Fischgrätmuster, natürliches Ölfinish für zeitlosen Pariser Stil.',
    description_en: 'Engineered herringbone parquet, natural oil finish for timeless Parisian style.',
    wood_type: 'oak',
    grade: 'select',
    finish: 'Natural Oil',
    color: 'medium',
    width_mm: 90,
    length_mm: 600,
    thickness_mm: 14,
    price_ht: 81.20,
    price_ttc: 98,
    price_display: '98 €/m²',
    delivery_weeks: 4,
    features: ['Chauffage au sol compatible', 'Couche noble 3.5mm', 'Pose chevron'],
    images: ['/images/products/chevron.jpg', '/images/products/chevron-detail.jpg'],
    available: true,
    sort_order: 5
  },
  
  // Massif (Solid)
  {
    slug: 'racine',
    category: 'solid',
    name_fr: 'Racine',
    name_de: 'Racine',
    name_en: 'Racine',
    description_fr: 'Parquet massif chêne européen, sélection Natur. Traditionnelle lame à coller, durabilité exceptionnelle.',
    description_de: 'Massivparkett europäische Eiche, Natur Auswahl. Traditionelle Klebediele, außergewöhnliche Haltbarkeit.',
    description_en: 'Solid European oak parquet, Natur grade. Traditional glue-down plank, exceptional durability.',
    wood_type: 'oak',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'natural',
    width_mm: 70,
    thickness_mm: 22,
    length_range: '350-500mm',
    price_ht: 75.80,
    price_ttc: 91,
    price_display: '91 €/m²',
    delivery_weeks: 3,
    features: ['Pose collée', 'Rénovation multiple possible', 'Microchanfrein 4 côtés'],
    images: ['/images/products/julia.jpg', '/images/products/kashmir.jpg'],
    available: true,
    sort_order: 10
  },
  {
    slug: 'heritage',
    category: 'solid',
    name_fr: 'Héritage',
    name_de: 'Héritage',
    name_en: 'Héritage',
    description_fr: 'Parquet massif chêne sélection Rustic, nœuds apparents pour un caractère authentique et chaleureux.',
    description_de: 'Massivparkett Eiche Rustikal, sichtbare Äste für authentischen und warmen Charakter.',
    description_en: 'Solid oak parquet Rustic grade, visible knots for authentic and warm character.',
    wood_type: 'oak',
    grade: 'rustic',
    finish: 'Brut à finir',
    color: 'natural',
    width_mm: 60,
    thickness_mm: 16,
    length_range: '350-500mm',
    price_ht: 59.80,
    price_ttc: 72,
    price_display: '72 €/m²',
    delivery_weeks: 2,
    features: ['Pose collée', 'Rénovation multiple possible', 'Sans chanfrein'],
    images: ['/images/products/brown.jpg', '/images/products/natural-oil.jpg'],
    available: true,
    sort_order: 11
  },
  {
    slug: 'nordic',
    category: 'solid',
    name_fr: 'Nordic',
    name_de: 'Nordic',
    name_en: 'Nordic',
    description_fr: 'Parquet massif frêne européen, sélection Natur. Grain distinctif et teinte claire naturelle.',
    description_de: 'Massivparkett europäische Esche, Natur Auswahl. Markante Maserung und natürlich helle Färbung.',
    description_en: 'Solid European ash parquet, Natur grade. Distinctive grain and natural light tone.',
    wood_type: 'ash',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'light',
    width_mm: 70,
    thickness_mm: 22,
    length_range: '350-500mm',
    price_ht: 75.80,
    price_ttc: 91,
    price_display: '91 €/m²',
    delivery_weeks: 4,
    features: ['Pose collée', 'Rénovation multiple possible', 'Microchanfrein 4 côtés'],
    images: ['/images/products/nude.jpg', '/images/products/raw.jpg'],
    available: true,
    sort_order: 12
  },
  
  // Industriel
  {
    slug: 'atelier',
    category: 'industrial',
    name_fr: 'Atelier',
    name_de: 'Atelier',
    name_en: 'Atelier',
    description_fr: 'Parquet industriel chêne en lamelles, haute résistance au trafic. Idéal espaces professionnels et lofts.',
    description_de: 'Industrieparkett Eiche in Lamellen, hohe Verkehrsbeständigkeit. Ideal für Gewerbe und Lofts.',
    description_en: 'Industrial oak strip parquet, high traffic resistance. Ideal for commercial spaces and lofts.',
    wood_type: 'oak',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'natural',
    width_mm: 8,
    length_mm: 160,
    thickness_mm: 10,
    price_ht: 52.00,
    price_ttc: 63,
    price_display: '63 €/m²',
    delivery_weeks: 2,
    features: ['Haute résistance', 'Pose mosaïque', 'Idéal fort passage'],
    images: ['/images/products/chevron.jpg', '/images/products/julia.jpg'],
    available: true,
    sort_order: 20
  },
  {
    slug: 'loft',
    category: 'industrial',
    name_fr: 'Loft',
    name_de: 'Loft',
    name_en: 'Loft',
    description_fr: 'Parquet industriel chêne lamelles longues, motif contemporain pour intérieurs design.',
    description_de: 'Industrieparkett Eiche lange Lamellen, zeitgenössisches Muster für Design-Interieurs.',
    description_en: 'Industrial oak long strip parquet, contemporary pattern for design interiors.',
    wood_type: 'oak',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'natural',
    width_mm: 8,
    length_mm: 250,
    thickness_mm: 10,
    price_ht: 55.00,
    price_ttc: 66,
    price_display: '66 €/m²',
    delivery_weeks: 2,
    features: ['Haute résistance', 'Pose mosaïque', 'Rendu contemporain'],
    images: ['/images/products/brown-detail.jpg', '/images/products/chevron-detail.jpg'],
    available: true,
    sort_order: 21
  },
  {
    slug: 'manufacture',
    category: 'industrial',
    name_fr: 'Manufacture',
    name_de: 'Manufacture',
    name_en: 'Manufacture',
    description_fr: 'Parquet industriel frêne européen, teinte claire et motifs de pose variés possibles.',
    description_de: 'Industrieparkett europäische Esche, helle Tönung und vielfältige Verlegemuster möglich.',
    description_en: 'Industrial European ash parquet, light tone with various laying pattern options.',
    wood_type: 'ash',
    grade: 'natur',
    finish: 'Brut à finir',
    color: 'light',
    width_mm: 8,
    length_mm: 160,
    thickness_mm: 23,
    price_ht: 58.00,
    price_ttc: 70,
    price_display: '70 €/m²',
    delivery_weeks: 3,
    features: ['Haute résistance', 'Pose mosaïque', 'Épaisseur max'],
    images: ['/images/products/kashmir.jpg', '/images/products/nude.jpg'],
    available: true,
    sort_order: 22
  }
];

async function setup() {
  console.log('🚀 Setting up Natura Parquet database...\n');
  
  // Check if table exists by trying to select
  const { data: existingProducts, error: checkError } = await supabase
    .from('natura_products')
    .select('id')
    .limit(1);
  
  if (checkError && checkError.code === '42P01') {
    console.log('❌ Table natura_products does not exist.');
    console.log('📋 Please run the SQL in create_tables.sql via Supabase Dashboard:\n');
    console.log('   1. Go to https://supabase.com/dashboard/project/mjuzyqhxifyvebtnlrra');
    console.log('   2. SQL Editor → New Query');
    console.log('   3. Paste content from create_tables.sql');
    console.log('   4. Run the query\n');
    process.exit(1);
  }
  
  // Insert products
  console.log('📦 Inserting products...');
  
  for (const product of products) {
    const { data, error } = await supabase
      .from('natura_products')
      .upsert(product, { onConflict: 'slug' })
      .select();
    
    if (error) {
      console.error(`   ❌ Error inserting ${product.slug}:`, error.message);
    } else {
      console.log(`   ✅ ${product.name_fr} (${product.slug})`);
    }
  }
  
  console.log('\n✨ Database setup complete!');
}

setup().catch(console.error);
