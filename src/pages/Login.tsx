import { LogIn } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Iniciar Sesión</h2>
            <p className="text-gray-300 mt-2">Accede a tu cuenta ZARPADO FIT</p>
          </div>

          <form className="space-y-6">
            <Input label="Email" type="email" placeholder="tu@email.com" />
            <Input label="Contraseña" type="password" placeholder="••••••••" />
            <Button
              type="submit"
              variant="primary"
              className="w-full transform hover:scale-105"
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800/50 text-gray-300">
                  O continúa con
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="secondary">Google</Button>
              <Button variant="secondary">Facebook</Button>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-300">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
