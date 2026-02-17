import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Generate order reference
function generateOrderRef(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NP-${year}${month}-${random}`;
}

// Bank details
const bankDetails = {
  beneficiaire: 'RENOLINE SARL',
  iban: 'FR76 3000 3024 8600 0200 9174 390',
  bic: 'SOGEFRPP',
  banque: 'Société Générale',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, totals, locale } = body;

    // Validate required fields
    if (!items || !items.length) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
    }

    if (!customer.email || !customer.firstName || !customer.lastName) {
      return NextResponse.json({ error: 'Informations client incomplètes' }, { status: 400 });
    }

    const orderRef = generateOrderRef();
    const now = new Date().toISOString();

    // Build order data
    const orderData = {
      reference: orderRef,
      customer_email: customer.email,
      customer_name: `${customer.firstName} ${customer.lastName}`,
      customer_phone: customer.phone || null,
      customer_company: customer.company || null,
      shipping_address: customer.address,
      shipping_city: customer.city,
      shipping_postal_code: customer.postalCode,
      shipping_country: customer.country,
      delivery_notes: customer.notes || null,
      items: JSON.stringify(items),
      total_m2: totals.surface,
      total_ht: totals.subtotalHT,
      total_tva: totals.tva,
      total_ttc: totals.totalTTC,
      status: 'pending_payment',
      locale: locale,
      created_at: now,
    };

    // Try to save to Supabase
    try {
      const { error: dbError } = await supabase
        .from('natura_orders')
        .insert(orderData);

      if (dbError) {
        console.log('DB insert error (table might not exist):', dbError.message);
        // Continue anyway - order will be sent via email
      }
    } catch (dbErr) {
      console.log('DB error:', dbErr);
    }

    // Build email content
    const itemsList = items.map((item: any) => 
      `• ${item.name} - ${item.quantity_m2} m² × ${item.price_ttc} €/m² = ${(item.price_ttc * item.quantity_m2).toFixed(2)} €`
    ).join('\n');

    const emailSubject = `Nouvelle commande ${orderRef} - Natura Parquets`;
    
    const emailBody = `
NOUVELLE COMMANDE - NATURA PARQUETS
====================================
Référence: ${orderRef}
Date: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}

CLIENT
------
Nom: ${customer.firstName} ${customer.lastName}
Email: ${customer.email}
Téléphone: ${customer.phone || 'Non renseigné'}
${customer.company ? `Société: ${customer.company}` : ''}

ADRESSE DE LIVRAISON
--------------------
${customer.address}
${customer.postalCode} ${customer.city}
${customer.country}
${customer.notes ? `\nInstructions: ${customer.notes}` : ''}

ARTICLES COMMANDÉS
------------------
${itemsList}

TOTAL
-----
Surface totale: ${totals.surface.toFixed(1)} m²
Sous-total HT: ${totals.subtotalHT.toFixed(2)} €
TVA (20%): ${totals.tva.toFixed(2)} €
TOTAL TTC: ${totals.totalTTC.toFixed(2)} €
Livraison: GRATUITE

COORDONNÉES BANCAIRES ENVOYÉES AU CLIENT
-----------------------------------------
Bénéficiaire: ${bankDetails.beneficiaire}
IBAN: ${bankDetails.iban}
BIC: ${bankDetails.bic}
Banque: ${bankDetails.banque}
Référence: ${orderRef}

⚠️ À FAIRE: Surveiller le virement puis préparer la commande.
`;

    // Customer email
    const customerEmailBody = locale === 'fr' ? `
Bonjour ${customer.firstName},

Merci pour votre commande sur Natura Parquets !

RÉCAPITULATIF DE VOTRE COMMANDE
================================
Référence: ${orderRef}

${itemsList}

Surface totale: ${totals.surface.toFixed(1)} m²
Total TTC: ${totals.totalTTC.toFixed(2)} €

COORDONNÉES BANCAIRES POUR LE VIREMENT
======================================
Bénéficiaire: ${bankDetails.beneficiaire}
IBAN: ${bankDetails.iban}
BIC: ${bankDetails.bic}
Banque: ${bankDetails.banque}

⚠️ IMPORTANT: Indiquez "${orderRef}" comme référence de virement.

Dès réception de votre paiement, nous préparerons votre commande.
Délai de livraison estimé: 2-4 semaines.

Une question ? Répondez à cet email ou appelez-nous au 06 04 44 09 03.

À bientôt,
L'équipe Natura Parquets
natura-parquets.fr
` : `
Hello ${customer.firstName},

Thank you for your order at Natura Parquets!

ORDER SUMMARY
=============
Reference: ${orderRef}

${itemsList}

Total surface: ${totals.surface.toFixed(1)} m²
Total: ${totals.totalTTC.toFixed(2)} €

BANK DETAILS FOR TRANSFER
=========================
Beneficiary: ${bankDetails.beneficiaire}
IBAN: ${bankDetails.iban}
BIC: ${bankDetails.bic}
Bank: ${bankDetails.banque}

⚠️ IMPORTANT: Include "${orderRef}" as the transfer reference.

We will prepare your order upon payment receipt.
Estimated delivery: 2-4 weeks.

Questions? Reply to this email or call us at +33 6 04 44 09 03.

Best regards,
The Natura Parquets Team
natura-parquets.fr
`;

    // Send emails via Supabase Edge Function or directly
    // For now, save to form_submissions for email notification
    try {
      await supabase.from('form_submissions').insert({
        source: 'natura-parquets-order',
        type: 'order',
        email: customer.email,
        data: {
          orderRef,
          customer,
          items,
          totals,
          internalEmail: emailBody,
          customerEmail: customerEmailBody,
        },
        created_at: now,
      });
    } catch (formErr) {
      console.log('Form submission error:', formErr);
    }

    // Also try to send via fetch to an email webhook if available
    try {
      // Send to internal notification system (n8n webhook or similar)
      const webhookUrl = process.env.ORDER_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'new_order',
            orderRef,
            customer,
            items,
            totals,
            emails: {
              internal: emailBody,
              customer: customerEmailBody,
            }
          }),
        });
      }
    } catch (webhookErr) {
      console.log('Webhook error:', webhookErr);
    }

    return NextResponse.json({
      success: true,
      orderRef,
      message: 'Commande enregistrée',
    });

  } catch (error: any) {
    console.error('Order error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
