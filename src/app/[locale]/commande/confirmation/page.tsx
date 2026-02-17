'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { bankDetails } from '@/data/products';

export default function ConfirmationPage() {
  const locale = useLocale() as 'fr' | 'de' | 'en';
  const searchParams = useSearchParams();
  const orderRef = searchParams.get('ref') || 'NP-XXXX';

  const content = {
    fr: {
      title: 'Commande confirmée !',
      subtitle: 'Merci pour votre commande',
      orderRef: 'Référence de commande',
      nextSteps: 'Prochaines étapes',
      step1: 'Effectuez le virement bancaire avec les coordonnées ci-dessous',
      step2: 'Indiquez votre référence de commande en motif de virement',
      step3: 'Nous préparons votre commande dès réception du paiement',
      step4: 'Vous recevez un email de confirmation d\'expédition',
      bankTitle: 'Coordonnées bancaires',
      beneficiaire: 'Bénéficiaire',
      iban: 'IBAN',
      bic: 'BIC',
      banque: 'Banque',
      reference: 'Référence à indiquer',
      emailSent: 'Un récapitulatif a été envoyé à votre adresse email.',
      deliveryInfo: 'Délai de livraison estimé : 2-4 semaines après réception du paiement.',
      questions: 'Des questions ?',
      contactUs: 'Contactez-nous',
      continueShopping: 'Continuer mes achats',
      copyIban: 'Copier l\'IBAN',
      copied: 'Copié !',
    },
    de: {
      title: 'Bestellung bestätigt!',
      subtitle: 'Vielen Dank für Ihre Bestellung',
      orderRef: 'Bestellreferenz',
      nextSteps: 'Nächste Schritte',
      step1: 'Überweisen Sie den Betrag mit den unten angegebenen Bankdaten',
      step2: 'Geben Sie Ihre Bestellreferenz als Verwendungszweck an',
      step3: 'Wir bereiten Ihre Bestellung nach Zahlungseingang vor',
      step4: 'Sie erhalten eine Versandbestätigung per E-Mail',
      bankTitle: 'Bankverbindung',
      beneficiaire: 'Empfänger',
      iban: 'IBAN',
      bic: 'BIC',
      banque: 'Bank',
      reference: 'Verwendungszweck',
      emailSent: 'Eine Zusammenfassung wurde an Ihre E-Mail-Adresse gesendet.',
      deliveryInfo: 'Geschätzte Lieferzeit: 2-4 Wochen nach Zahlungseingang.',
      questions: 'Fragen?',
      contactUs: 'Kontaktieren Sie uns',
      continueShopping: 'Weiter einkaufen',
      copyIban: 'IBAN kopieren',
      copied: 'Kopiert!',
    },
    en: {
      title: 'Order confirmed!',
      subtitle: 'Thank you for your order',
      orderRef: 'Order reference',
      nextSteps: 'Next steps',
      step1: 'Make the bank transfer with the details below',
      step2: 'Include your order reference in the transfer description',
      step3: 'We prepare your order upon payment receipt',
      step4: 'You will receive a shipping confirmation email',
      bankTitle: 'Bank details',
      beneficiaire: 'Beneficiary',
      iban: 'IBAN',
      bic: 'BIC',
      banque: 'Bank',
      reference: 'Reference to include',
      emailSent: 'A summary has been sent to your email address.',
      deliveryInfo: 'Estimated delivery: 2-4 weeks after payment receipt.',
      questions: 'Questions?',
      contactUs: 'Contact us',
      continueShopping: 'Continue shopping',
      copyIban: 'Copy IBAN',
      copied: 'Copied!',
    }
  };

  const t = content[locale];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    // Could add a toast notification here
  };

  return (
    <main className="min-h-screen bg-natura-50">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display text-4xl text-natura-900 mb-2">
              {t.title}
            </h1>
            <p className="text-lg text-natura-600">
              {t.subtitle}
            </p>
          </div>

          {/* Order Reference */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="text-center">
              <p className="text-sm text-natura-600 mb-1">{t.orderRef}</p>
              <p className="font-display text-3xl text-natura-900 tracking-wider">
                {orderRef}
              </p>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h2 className="font-display text-2xl text-natura-900 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-natura-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              {t.bankTitle}
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-natura-100">
                <span className="text-natura-600 font-medium">{t.beneficiaire}</span>
                <span className="text-natura-900 font-semibold">{bankDetails.beneficiaire}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-natura-100">
                <span className="text-natura-600 font-medium">{t.iban}</span>
                <div className="flex items-center gap-2">
                  <span className="text-natura-900 font-mono font-semibold tracking-wider">
                    {bankDetails.iban}
                  </span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.iban)}
                    className="p-2 hover:bg-natura-100 rounded-lg transition-colors"
                    title={t.copyIban}
                  >
                    <svg className="w-5 h-5 text-natura-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-natura-100">
                <span className="text-natura-600 font-medium">{t.bic}</span>
                <span className="text-natura-900 font-mono font-semibold">{bankDetails.bic}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-natura-100">
                <span className="text-natura-600 font-medium">{t.banque}</span>
                <span className="text-natura-900">{bankDetails.banque}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 bg-amber-50 -mx-4 px-4 rounded-lg">
                <span className="text-amber-800 font-medium">{t.reference}</span>
                <span className="text-amber-900 font-semibold">{orderRef}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h2 className="font-display text-xl text-natura-900 mb-6">
              {t.nextSteps}
            </h2>
            <ol className="space-y-4">
              {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-natura-100 rounded-full flex items-center justify-center text-natura-700 font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-natura-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Info */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-green-800 font-medium">{t.emailSent}</p>
                <p className="text-green-700 text-sm mt-1">{t.deliveryInfo}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-natura-300 text-natura-700 rounded-lg hover:bg-natura-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t.questions} {t.contactUs}
            </Link>
            <Link
              href={`/${locale}/produits`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-natura-900 text-white rounded-lg hover:bg-natura-800 transition-colors"
            >
              {t.continueShopping}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
