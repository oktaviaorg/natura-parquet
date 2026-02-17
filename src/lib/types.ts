export interface Grade {
  id: number;
  code: string;
  name: string;
  description?: string;
  active: boolean;
}

export interface Colour {
  id: number;
  code: string;
  name: string;
  hex_color?: string;
  active: boolean;
}

export interface Finish {
  id: number;
  code: string;
  name: string;
  description?: string;
  active: boolean;
}

export interface Format {
  id: number;
  code: string;
  name: string;
  width_mm: number;
  length_mm: number;
  thickness_mm: number;
  active: boolean;
}

export interface Price {
  id: number;
  grade_id: number;
  colour_id: number;
  finish_id: number;
  format_id: number;
  prix_achat: number;
  prix_vente_ttc: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  // Relations
  grade?: Grade;
  colour?: Colour;
  finish?: Finish;
  format?: Format;
}

export interface Product extends Price {
  grade: Grade;
  colour: Colour;
  finish: Finish;
  format: Format;
}

export interface Settings {
  id: number;
  key: string;
  value: string;
  description?: string;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  products: {
    productId: number;
    quantity: number;
  }[];
}

// Calcul prix vente TTC = prix achat × 2 × 1.20
export function calculatePrixVenteTTC(prixAchat: number): number {
  return Math.round(prixAchat * 2 * 1.20 * 100) / 100;
}
