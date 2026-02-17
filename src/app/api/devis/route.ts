import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, surface, message, products, total } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Nom, email et téléphone sont requis' },
        { status: 400 }
      );
    }

    // Create admin client for server-side operations
    const supabase = createAdminClient();

    // Store the quote request in a table (you'd create this table in Supabase)
    // For now, we'll just log it and return success
    // You could also send an email notification here

    console.log('New quote request:', {
      name,
      email,
      phone,
      address,
      surface,
      message,
      products,
      total,
      createdAt: new Date().toISOString(),
    });

    // If you want to store in Supabase, create a natura_quotes table:
    /*
    const { error } = await supabase
      .from('natura_quotes')
      .insert({
        name,
        email,
        phone,
        address,
        surface,
        message,
        products: JSON.stringify(products),
        total,
      });

    if (error) throw error;
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la demande' },
      { status: 500 }
    );
  }
}
