import { Sparkles, Image, Download, Share2 } from "lucide-react";
import { Button } from "../components/Button";

export const VirtualTryOn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Probador Virtual
          </h1>
          <p className="text-xl text-gray-300">
            Selecciona la prenda que quieres probar
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Photo */}
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">Tu Foto</h3>
            <div className="aspect-[3/4] bg-gray-700/50 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300">Sube tu foto para comenzar</p>
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => (window.location.href = "/upload-photo")}
                >
                  Subir Foto
                </Button>
              </div>
            </div>
          </div>

          {/* Clothing Options */}
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">
              Seleccionar Prenda
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-gray-700/50 rounded-lg border border-gray-600 hover:border-purple-500 cursor-pointer transition-all duration-200 flex items-center justify-center"
                >
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
              ))}
            </div>
            <Button variant="primary" className="w-full mt-4">
              Procesar con IA
            </Button>
          </div>

          {/* Result */}
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">Resultado</h3>
            <div className="aspect-[3/4] bg-gray-700/50 rounded-xl border border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300">El resultado aparecerá aquí</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <Button variant="secondary" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
              <Button variant="secondary" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
