import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) => {
  const baseClasses =
    "font-semibold py-3 rounded-lg transition-all duration-200";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transform hover:scale-105",
    secondary:
      "bg-gray-700/50 hover:bg-gray-600 text-white border border-gray-600/50 hover:border-gray-500",
    outline:
      "border border-gray-600 hover:border-purple-500 text-white hover:bg-purple-500/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
