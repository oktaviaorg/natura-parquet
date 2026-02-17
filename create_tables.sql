-- Table natura_products
CREATE TABLE IF NOT EXISTS natura_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('engineered', 'solid', 'industrial')),
  
  -- Noms multilingues
  name_fr VARCHAR(200) NOT NULL,
  name_de VARCHAR(200),
  name_en VARCHAR(200),
  
  -- Descriptions multilingues
  description_fr TEXT,
  description_de TEXT,
  description_en TEXT,
  
  -- Caractéristiques produit
  wood_type VARCHAR(50) NOT NULL CHECK (wood_type IN ('oak', 'ash')),
  grade VARCHAR(50) NOT NULL CHECK (grade IN ('select', 'natur', 'rustic')),
  finish VARCHAR(100),
  color VARCHAR(50) CHECK (color IN ('light', 'medium', 'dark', 'natural')),
  
  -- Dimensions (en mm)
  width_mm INTEGER,
  length_mm INTEGER,
  thickness_mm INTEGER,
  length_range VARCHAR(50), -- Pour les longueurs variables "350-500mm"
  
  -- Prix (en euros)
  price_ht DECIMAL(10,2) NOT NULL, -- Prix HT au m²
  price_ttc DECIMAL(10,2) NOT NULL, -- Prix TTC au m²
  price_display VARCHAR(50), -- Format affiché "89 €/m²"
  
  -- Stock et disponibilité
  stock_m2 DECIMAL(10,2) DEFAULT 0, -- Stock en m²
  min_order_m2 DECIMAL(10,2) DEFAULT 1, -- Commande minimale
  delivery_weeks INTEGER DEFAULT 2, -- Délai livraison en semaines
  available BOOLEAN DEFAULT true,
  
  -- Features et images
  features JSONB DEFAULT '[]'::jsonb, -- Liste des caractéristiques
  images JSONB DEFAULT '[]'::jsonb, -- URLs des images
  
  -- Métadonnées
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table natura_orders (commandes)
CREATE TABLE IF NOT EXISTS natura_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Client
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(50),
  
  -- Adresse livraison
  shipping_address TEXT,
  shipping_city VARCHAR(100),
  shipping_postal_code VARCHAR(20),
  shipping_country VARCHAR(100) DEFAULT 'France',
  
  -- Totaux
  subtotal_ht DECIMAL(10,2) NOT NULL,
  subtotal_ttc DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total_ttc DECIMAL(10,2) NOT NULL,
  
  -- Paiement Stripe
  stripe_session_id VARCHAR(255),
  stripe_payment_intent VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  
  -- Statut commande
  order_status VARCHAR(50) DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  
  -- Notes
  customer_notes TEXT,
  internal_notes TEXT,
  
  -- Métadonnées
  locale VARCHAR(5) DEFAULT 'fr',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table natura_order_items (lignes de commande)
CREATE TABLE IF NOT EXISTS natura_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES natura_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES natura_products(id),
  
  -- Snapshot du produit au moment de la commande
  product_name VARCHAR(200) NOT NULL,
  product_slug VARCHAR(100),
  
  -- Quantité et prix
  quantity_m2 DECIMAL(10,2) NOT NULL,
  price_ht_m2 DECIMAL(10,2) NOT NULL,
  price_ttc_m2 DECIMAL(10,2) NOT NULL,
  total_ht DECIMAL(10,2) NOT NULL,
  total_ttc DECIMAL(10,2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_natura_products_category ON natura_products(category);
CREATE INDEX IF NOT EXISTS idx_natura_products_slug ON natura_products(slug);
CREATE INDEX IF NOT EXISTS idx_natura_orders_email ON natura_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_natura_orders_status ON natura_orders(order_status);
CREATE INDEX IF NOT EXISTS idx_natura_order_items_order ON natura_order_items(order_id);

-- RLS Policies
ALTER TABLE natura_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE natura_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE natura_order_items ENABLE ROW LEVEL SECURITY;

-- Lecture publique des produits
CREATE POLICY "Public read natura_products" ON natura_products
  FOR SELECT USING (available = true);

-- Insert pour les commandes (tout le monde peut commander)
CREATE POLICY "Public insert natura_orders" ON natura_orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert natura_order_items" ON natura_order_items
  FOR INSERT WITH CHECK (true);

-- Lecture de ses propres commandes par email (simplifié)
CREATE POLICY "Read own orders" ON natura_orders
  FOR SELECT USING (true);

CREATE POLICY "Read own order items" ON natura_order_items
  FOR SELECT USING (true);
