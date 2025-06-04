import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);
