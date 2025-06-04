import { User, History } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
              <p className="text-gray-300">Gestiona tu información personal</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Input label="Nombre completo" defaultValue="Usuario de Prueba" />
              <Input
                label="Email"
                type="email"
                defaultValue="usuario@ejemplo.com"
              />
              <Button variant="primary">Guardar Cambios</Button>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Historial Reciente</span>
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Prueba #{item}</span>
                      <span className="text-gray-400 text-sm">Hace 2 días</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
