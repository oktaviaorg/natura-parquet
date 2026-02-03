import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Article {
  id: string;
  slug: string;
  locale: 'fr' | 'de' | 'en';
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: 'inspiration' | 'conseil' | 'actualite';
  published: boolean;
  published_at: string;
  created_at: string;
}

export interface Product {
  id: string;
  slug: string;
  category: 'engineered' | 'solid' | 'industrial' | 'lamella';
  name_fr: string;
  name_de: string;
  name_en: string;
  description_fr: string;
  description_de: string;
  description_en: string;
  specs: Record<string, any>;
  images: string[];
  collections: string[];
  wood_grades: string[];
  active: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description_fr: string;
  description_de: string;
  description_en: string;
  image_url: string;
  finish: string;
}

export interface PartnerApplication {
  company?: string;
  contact_name: string;
  email: string;
  phone?: string;
  territory?: string;
  profile_type: 'reseller' | 'agent' | 'installer';
  experience?: string;
  estimated_volume?: string;
  message?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  locale: string;
}

// API Functions
export async function getArticles(locale: string, limit = 10) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('locale', locale)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data as Article[];
}

export async function getArticleBySlug(slug: string, locale: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('published', true)
    .single();
  
  if (error) throw error;
  return data as Article;
}

export async function getProducts(category?: string) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('sort_order');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as Product[];
}

export async function getCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('active', true)
    .order('sort_order');
  
  if (error) throw error;
  return data as Collection[];
}

export async function submitPartnerApplication(application: PartnerApplication) {
  const { data, error } = await supabase
    .from('partner_applications')
    .insert(application)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function submitContactMessage(message: ContactMessage) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(message)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function submitCatalogDownload(email: string, locale: string, company?: string, name?: string) {
  const { data, error } = await supabase
    .from('catalog_downloads')
    .insert({ email, locale, company, name, source: 'website' })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
