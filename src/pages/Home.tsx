import { ArrowRight, Zap, Sparkles, Star } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import { Button } from "../components/Button";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Pruébate Ropa
              </span>
              <br />
              <span className="text-white">Sin Salir de Casa</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Tecnología de IA avanzada para probar cualquier prenda
              virtualmente. Sube tu foto, elige el outfit y ve cómo te queda al
              instante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                className="px-8 py-4 text-lg hover:shadow-2xl hover:shadow-purple-500/25"
                onClick={() => (window.location.href = "/virtual-try-on")}
              >
                Probar Ahora <ArrowRight className="inline ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg"
                onClick={() => (window.location.href = "/register")}
              >
                Crear Cuenta Gratis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              ¿Por qué elegir ZARPADO FIT?
            </h2>
            <p className="text-xl text-gray-300">
              Tecnología de vanguardia para una experiencia única
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="IA Avanzada"
              description="Algoritmos de última generación para resultados ultra-realistas"
            />
            <FeatureCard
              icon={Sparkles}
              title="Resultados Instantáneos"
              description="Ve cómo te queda cualquier prenda en segundos"
            />
            <FeatureCard
              icon={Star}
              title="Calidad Premium"
              description="Imágenes de alta resolución con detalles perfectos"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
