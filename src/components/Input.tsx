import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 bg-gray-700/50 border ${
          error ? "border-red-500" : "border-gray-600/50"
        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
