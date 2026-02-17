import { Suspense } from 'react';
import DevisForm from './DevisForm';

export default function DevisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-50 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-wood-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <DevisForm />
    </Suspense>
  );
}
