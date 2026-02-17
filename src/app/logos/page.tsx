export default function LogosPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-wood-600">
          Propositions de logos Natura Parquets
        </h1>
        
        {/* Nouvelles versions - Plus grosses et sympathiques */}
        <h2 className="text-xl font-semibold text-center mb-6 text-gold-500">
          ⭐ Nouvelles versions (V4 & V5)
        </h2>
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-gold-300">
            <img src="/natura-logo-v4.svg" alt="Logo V4" className="w-40 h-40 mx-auto mb-4" />
            <p className="font-bold text-lg">V4 - Épuré Gros</p>
            <p className="text-sm text-gray-500">Plus grand, racines sympas</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-gold-300">
            <img src="/natura-logo-v5.svg" alt="Logo V5" className="w-40 h-40 mx-auto mb-4" />
            <p className="font-bold text-lg">V5 - Nuage Doux</p>
            <p className="text-sm text-gray-500">Courbes douces, accueillant</p>
          </div>
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        <h2 className="text-lg font-semibold text-center mb-6 text-gray-500">
          Versions précédentes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src="/natura-logo.svg" alt="Logo V1" className="w-20 h-20 mx-auto mb-3" />
            <p className="text-sm font-medium">V1 - Organique</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src="/natura-logo-v2.svg" alt="Logo V2" className="w-20 h-20 mx-auto mb-3" />
            <p className="text-sm font-medium">V2 - Chêne</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src="/natura-logo-v3.svg" alt="Logo V3" className="w-20 h-20 mx-auto mb-3" />
            <p className="text-sm font-medium">V3 - Épuré</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src="/natura-logo-pixel.svg" alt="Logo Pixel" className="w-20 h-20 mx-auto mb-3" />
            <p className="text-sm font-medium">Pixel Art</p>
          </div>
        </div>
        
        <p className="mt-12 text-center text-gray-600">
          Dis-moi lequel tu préfères ! V4 ou V5 ? Ou des ajustements ?
        </p>
      </div>
    </div>
  );
}
