import { supabase } from '@/lib/supabase';
import CatalogueClient from './CatalogueClient';

export const revalidate = 60; // Revalidate every 60 seconds

async function getFilters() {
  const [grades, colours, finishes, formats] = await Promise.all([
    supabase.from('natura_grades').select('*').eq('active', true).order('name'),
    supabase.from('natura_colours').select('*').eq('active', true).order('name'),
    supabase.from('natura_finishes').select('*').eq('active', true).order('name'),
    supabase.from('natura_formats').select('*').eq('active', true).order('name'),
  ]);

  return {
    grades: grades.data || [],
    colours: colours.data || [],
    finishes: finishes.data || [],
    formats: formats.data || [],
  };
}

async function getProducts() {
  const { data } = await supabase
    .from('natura_prices')
    .select(`
      *,
      grade:natura_grades(*),
      colour:natura_colours(*),
      finish:natura_finishes(*),
      format:natura_formats(*)
    `)
    .eq('active', true)
    .order('prix_vente_ttc', { ascending: true });

  return data || [];
}

export default async function CataloguePage() {
  const [filters, products] = await Promise.all([
    getFilters(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-wood-600 font-serif mb-4">
            Notre Catalogue
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de parquets européens premium. 
            Filtrez par format, couleur, grade ou finition.
          </p>
        </div>

        <CatalogueClient 
          initialProducts={products} 
          filters={filters}
        />
      </div>
    </div>
  );
}
