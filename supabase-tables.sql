-- =====================================================
-- NATURA PARQUETS - Supabase Tables
-- À exécuter dans Supabase Dashboard > SQL Editor
-- =====================================================

-- Table natura_products (catalogue produits)
CREATE TABLE IF NOT EXISTS natura_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_fr VARCHAR(255) NOT NULL,
  name_de VARCHAR(255),
  name_en VARCHAR(255),
  description_fr TEXT,
  description_de TEXT,
  description_en TEXT,
  gamme VARCHAR(50) NOT NULL, -- 'Exclusive' ou 'Elegance'
  dimensions VARCHAR(100) NOT NULL,
  epaisseur INT,
  largeur INT,
  longueur VARCHAR(50),
  finition VARCHAR(100),
  prix_achat DECIMAL(10,2), -- Prix départ Pologne
  prix_ttc DECIMAL(10,2) NOT NULL, -- Prix public TTC
  prix_ht DECIMAL(10,2),
  delai_livraison VARCHAR(100),
  image_url VARCHAR(500),
  images JSONB DEFAULT '[]',
  specs JSONB DEFAULT '{}',
  stock_status VARCHAR(50) DEFAULT 'sur_commande',
  active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table natura_orders (commandes clients)
CREATE TABLE IF NOT EXISTS natura_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(50) UNIQUE NOT NULL, -- Ex: NP-2601-ABCD
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  customer_company VARCHAR(255),
  shipping_address TEXT NOT NULL,
  shipping_city VARCHAR(100) NOT NULL,
  shipping_postal_code VARCHAR(20) NOT NULL,
  shipping_country VARCHAR(100) DEFAULT 'France',
  delivery_notes TEXT,
  items JSONB NOT NULL, -- Détail des produits commandés
  total_m2 DECIMAL(10,2),
  total_ht DECIMAL(10,2),
  total_tva DECIMAL(10,2),
  total_ttc DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending_payment', -- pending_payment, paid, preparing, shipped, delivered
  payment_received_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  tracking_number VARCHAR(100),
  locale VARCHAR(5) DEFAULT 'fr',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE natura_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE natura_orders ENABLE ROW LEVEL SECURITY;

-- Policy: Lecture publique des produits
DROP POLICY IF EXISTS "natura_products_public_read" ON natura_products;
CREATE POLICY "natura_products_public_read" ON natura_products 
  FOR SELECT USING (true);

-- Policy: Insertion commandes (service role uniquement)
DROP POLICY IF EXISTS "natura_orders_service_insert" ON natura_orders;
CREATE POLICY "natura_orders_service_insert" ON natura_orders 
  FOR INSERT WITH CHECK (true);

-- Policy: Lecture commandes (service role uniquement)
DROP POLICY IF EXISTS "natura_orders_service_read" ON natura_orders;
CREATE POLICY "natura_orders_service_read" ON natura_orders 
  FOR SELECT USING (true);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_natura_products_gamme ON natura_products(gamme);
CREATE INDEX IF NOT EXISTS idx_natura_products_active ON natura_products(active);
CREATE INDEX IF NOT EXISTS idx_natura_orders_reference ON natura_orders(reference);
CREATE INDEX IF NOT EXISTS idx_natura_orders_status ON natura_orders(status);
CREATE INDEX IF NOT EXISTS idx_natura_orders_email ON natura_orders(customer_email);

-- =====================================================
-- DONNÉES INITIALES - Produits
-- =====================================================

INSERT INTO natura_products (slug, name_fr, gamme, dimensions, epaisseur, largeur, longueur, finition, prix_achat, prix_ttc, prix_ht, delai_livraison, stock_status, sort_order) VALUES
-- Gamme Exclusive
('chevron-exclusive-brut', 'Chevron Exclusive Brut', 'Exclusive', '14×100×720mm', 14, 100, '720', 'Brut à finir', 39, 70, 58.33, '2 semaines', 'sur_commande', 1),
('exclusive-compact-vernis', 'Exclusive Compact Vernis', 'Exclusive', '11×70×490mm', 11, 70, '490', 'Vernis UV', 26.4, 48, 40, '2 semaines', 'sur_commande', 2),
('exclusive-compact-huile', 'Exclusive Compact Huilé', 'Exclusive', '11×70×490mm', 11, 70, '490', 'Huile naturelle', 26.4, 48, 40, '2 semaines', 'sur_commande', 3),
('exclusive-large-huile', 'Exclusive Large Huilé', 'Exclusive', '11×120×600mm', 11, 120, '600', 'Huile naturelle', 32, 58, 48.33, '2 semaines', 'sur_commande', 4),
('exclusive-xl-vernis', 'Exclusive XL Vernis', 'Exclusive', '11×150×1200mm', 11, 150, '1200', 'Vernis UV', 37.8, 68, 56.67, '3-4 semaines', 'premier_choix', 5),
('exclusive-xl-huile', 'Exclusive XL Huilé', 'Exclusive', '11×150×1200mm', 11, 150, '1200', 'Huile naturelle', 37.8, 68, 56.67, '3-4 semaines', 'premier_choix', 6),
-- Gamme Elegance
('elegance-compact-vernis', 'Élégance Compact Vernis', 'Elegance', '11×70×490mm', 11, 70, '490', 'Vernis UV', 24.9, 45, 37.50, '2 semaines', 'sur_commande', 7),
('elegance-compact-huile', 'Élégance Compact Huilé', 'Elegance', '11×70×490mm', 11, 70, '490', 'Huile naturelle', 24.9, 45, 37.50, '2 semaines', 'sur_commande', 8),
('elegance-medium', 'Élégance Medium', 'Elegance', '11×120×590mm', 11, 120, '590', 'Vernis ou Huile', 27.9, 50, 41.67, '2 semaines', 'sur_commande', 9),
('elegance-long', 'Élégance Long', 'Elegance', '11×120×1200mm', 11, 120, '1200', 'Vernis ou Huile', 34.5, 62, 51.67, '3-4 semaines', 'premier_choix', 10),
('elegance-xl-brut', 'Élégance XL Brut', 'Elegance', '11×150×1330mm', 11, 150, '1330', 'Brut à finir', 31, 56, 46.67, '3-4 semaines', 'premier_choix', 11)
ON CONFLICT (slug) DO UPDATE SET
  prix_ttc = EXCLUDED.prix_ttc,
  prix_ht = EXCLUDED.prix_ht,
  delai_livraison = EXCLUDED.delai_livraison,
  updated_at = NOW();

-- Afficher confirmation
SELECT 'Tables natura_products et natura_orders créées avec succès !' AS status;
SELECT COUNT(*) AS produits_inseres FROM natura_products;
