import { ArrowRight, Upload } from "lucide-react";
import { Button } from "../components/Button";

export const UploadPhoto = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Sube tu Foto</h1>
          <p className="text-xl text-gray-300">
            Para mejores resultados, usa una foto de cuerpo completo con buena
            iluminación
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50">
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center hover:border-purple-500 transition-all duration-300">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Arrastra tu foto aquí
              </h3>
              <p className="text-gray-300 mb-6">
                O haz clic para seleccionar desde tu dispositivo
              </p>
              <Button variant="primary">Seleccionar Foto</Button>
            </div>
            <div className="mt-6 text-sm text-gray-400">
              <p>• Formatos soportados: JPG, PNG, WebP</p>
              <p>• Tamaño máximo: 10MB</p>
              <p>• Resolución recomendada: 1080x1920px</p>
            </div>
          </div>

          {/* Tips */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">
                Consejos para mejores resultados
              </h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Usa ropa ajustada para mejor detección corporal",
                  "Asegúrate de tener buena iluminación",
                  "Colócate frente a un fondo liso y uniforme",
                  "Mantén los brazos ligeramente separados del cuerpo",
                ].map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="primary"
              className="w-full py-4 text-lg transform hover:scale-105"
              onClick={() => (window.location.href = "/virtual-try-on")}
            >
              Continuar al Probador{" "}
              <ArrowRight className="inline ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
