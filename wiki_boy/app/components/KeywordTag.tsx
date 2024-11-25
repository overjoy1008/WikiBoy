// components/KeywordTag.tsx
import { X } from 'lucide-react';
import { GradientColors } from '@/app/components/utils/types';

interface KeywordTagProps {
  keyword: string;
  gradientColors: GradientColors;
  onRemove: () => void;
}

export const KeywordTag = ({ keyword, gradientColors, onRemove }: KeywordTagProps) => {
  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white transition-transform hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <span className="text-sm">{keyword}</span>
      <button onClick={onRemove} className="hover:bg-white/20 rounded-full p-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};