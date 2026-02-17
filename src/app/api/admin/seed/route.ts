import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { calculatePrixVenteTTC } from '@/lib/types';

const sampleGrades = [
  { code: 'A', name: 'Premium A', description: 'Grade supérieur, bois parfait sans défaut', active: true },
  { code: 'AB', name: 'Classic AB', description: 'Légers nœuds, aspect naturel', active: true },
  { code: 'B', name: 'Rustique B', description: 'Nœuds marqués, caractère authentique', active: true },
  { code: 'C', name: 'Campagne C', description: 'Aspect très rustique, nombreux nœuds', active: true },
];

const sampleColours = [
  { code: 'NAT', name: 'Naturel', hex_color: '#d4bfa3', active: true },
  { code: 'BLA', name: 'Blanchi', hex_color: '#f5f0e6', active: true },
  { code: 'MIE', name: 'Miel', hex_color: '#c9a962', active: true },
  { code: 'NOY', name: 'Noyer', hex_color: '#8b7355', active: true },
  { code: 'GRI', name: 'Gris cérusé', hex_color: '#a8a89e', active: true },
  { code: 'CHO', name: 'Chocolat', hex_color: '#5c4033', active: true },
];

const sampleFinishes = [
  { code: 'HUI', name: 'Huilé naturel', description: 'Huile naturelle, toucher bois', active: true },
  { code: 'VER', name: 'Verni mat', description: 'Vernis mat polyuréthane', active: true },
  { code: 'SAT', name: 'Verni satiné', description: 'Vernis satiné, léger brillant', active: true },
  { code: 'BRO', name: 'Brossé huilé', description: 'Surface brossée puis huilée', active: true },
];

const sampleFormats = [
  { code: '140', name: 'Lame 140mm', width_mm: 140, length_mm: 1800, thickness_mm: 14, active: true },
  { code: '180', name: 'Lame 180mm', width_mm: 180, length_mm: 2000, thickness_mm: 14, active: true },
  { code: '220', name: 'Lame large 220mm', width_mm: 220, length_mm: 2200, thickness_mm: 15, active: true },
  { code: '90', name: 'Lame étroite 90mm', width_mm: 90, length_mm: 1200, thickness_mm: 12, active: true },
];

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Check if data already exists
    const { data: existingGrades } = await supabase.from('natura_grades').select('id').limit(1);
    
    if (existingGrades && existingGrades.length > 0) {
      return NextResponse.json({ message: 'Data already exists', seeded: false });
    }

    // Insert grades
    const { data: grades, error: gradesError } = await supabase
      .from('natura_grades')
      .insert(sampleGrades)
      .select();
    if (gradesError) throw gradesError;

    // Insert colours
    const { data: colours, error: coloursError } = await supabase
      .from('natura_colours')
      .insert(sampleColours)
      .select();
    if (coloursError) throw coloursError;

    // Insert finishes
    const { data: finishes, error: finishesError } = await supabase
      .from('natura_finishes')
      .insert(sampleFinishes)
      .select();
    if (finishesError) throw finishesError;

    // Insert formats
    const { data: formats, error: formatsError } = await supabase
      .from('natura_formats')
      .insert(sampleFormats)
      .select();
    if (formatsError) throw formatsError;

    // Create prices for some combinations
    const prices: any[] = [];
    const basePrices: Record<string, number> = {
      'A': 35, 'AB': 28, 'B': 22, 'C': 18
    };
    const formatMultipliers: Record<string, number> = {
      '90': 0.9, '140': 1.0, '180': 1.15, '220': 1.3
    };
    const colourMultipliers: Record<string, number> = {
      'NAT': 1.0, 'BLA': 1.1, 'MIE': 1.05, 'NOY': 1.15, 'GRI': 1.2, 'CHO': 1.1
    };

    for (const grade of grades || []) {
      for (const colour of colours || []) {
        for (const finish of finishes || []) {
          for (const format of formats || []) {
            // Only create some combinations (not all)
            if (Math.random() > 0.6) continue;

            const basePrice = basePrices[grade.code] || 25;
            const formatMult = formatMultipliers[format.code] || 1;
            const colourMult = colourMultipliers[colour.code] || 1;
            
            const prixAchat = Math.round(basePrice * formatMult * colourMult * 100) / 100;
            const prixVenteTTC = calculatePrixVenteTTC(prixAchat);

            prices.push({
              grade_id: grade.id,
              colour_id: colour.id,
              finish_id: finish.id,
              format_id: format.id,
              prix_achat: prixAchat,
              prix_vente_ttc: prixVenteTTC,
              active: true,
            });
          }
        }
      }
    }

    if (prices.length > 0) {
      const { error: pricesError } = await supabase
        .from('natura_prices')
        .insert(prices);
      if (pricesError) throw pricesError;
    }

    return NextResponse.json({ 
      success: true, 
      seeded: true,
      counts: {
        grades: grades?.length || 0,
        colours: colours?.length || 0,
        finishes: finishes?.length || 0,
        formats: formats?.length || 0,
        prices: prices.length,
      }
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors du seed' },
      { status: 500 }
    );
  }
}
