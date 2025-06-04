import {
  Home,
  User,
  Upload,
  Camera,
  LogIn,
  UserPlus,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isMobile?: boolean;
}

const NavLink = ({ icon: Icon, label, to, isMobile = false }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses =
    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200";
  const activeClasses =
    "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400 border border-purple-500/30";
  const inactiveClasses = "text-gray-300 hover:text-white hover:bg-gray-800/50";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${isMobile ? "w-full px-3 py-3 space-x-3" : ""}`}
    >
      <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
      <span className={isMobile ? "font-medium" : ""}>{label}</span>
    </Link>
  );
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              ZARPADO FIT
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink icon={Home} label="Inicio" to="/" />
            <NavLink icon={Camera} label="Probador" to="/virtual-try-on" />
            <NavLink icon={Upload} label="Subir Foto" to="/upload-photo" />
            <NavLink icon={User} label="Perfil" to="/profile" />
            <NavLink icon={LogIn} label="Iniciar Sesión" to="/login" />
            <NavLink icon={UserPlus} label="Registrarse" to="/register" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink icon={Home} label="Inicio" to="/" isMobile />
            <NavLink
              icon={Camera}
              label="Probador"
              to="/virtual-try-on"
              isMobile
            />
            <NavLink
              icon={Upload}
              label="Subir Foto"
              to="/upload-photo"
              isMobile
            />
            <NavLink icon={User} label="Perfil" to="/profile" isMobile />
            <NavLink icon={LogIn} label="Iniciar Sesión" to="/login" isMobile />
            <NavLink
              icon={UserPlus}
              label="Registrarse"
              to="/register"
              isMobile
            />
          </div>
        </div>
      )}
    </nav>
  );
};
