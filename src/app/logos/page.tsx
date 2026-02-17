export default function LogosPage() {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-wood-600">
          Propositions de logos Natura Parquets
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <img src="/natura-logo.svg" alt="Logo V1" className="w-24 h-24 mx-auto mb-4" />
            <p className="font-medium">V1 - Organique</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <img src="/natura-logo-v2.svg" alt="Logo V2" className="w-24 h-24 mx-auto mb-4" />
            <p className="font-medium">V2 - Chêne</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <img src="/natura-logo-v3.svg" alt="Logo V3" className="w-24 h-24 mx-auto mb-4" />
            <p className="font-medium">V3 - Épuré</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <img src="/natura-logo-pixel.svg" alt="Logo Pixel" className="w-24 h-24 mx-auto mb-4" />
            <p className="font-medium">Pixel Art</p>
          </div>
        </div>
        
        <p className="mt-12 text-center text-gray-600">
          Dis-moi lequel tu préfères ou envoie-moi une référence !
        </p>
      </div>
    </div>
  );
}
