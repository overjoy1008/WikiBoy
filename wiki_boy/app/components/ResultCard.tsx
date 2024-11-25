// components/ResultCard.tsx

import FancyLoader from './FancyLoader';

interface ResultCardProps {
  keyword: string;
  gradientFrom: string;
  gradientTo: string;
  similarKeywords?: string[];
  isLoading: boolean;
}

export const ResultCard = ({ keyword, gradientFrom, gradientTo, similarKeywords = [], isLoading }: ResultCardProps) => (
  <div className="relative w-full p-6 rounded-xl mb-4 min-h-[200px] bg-white" 
    style={{
      border: '3px solid transparent',
      backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    }}>
    <div className="absolute -top-4 left-6 px-2"
      style={{
        background: 'linear-gradient(to bottom, #f8f9fa 50%, white 50%)'
      }}>
      <h3 className="text-gray-800 text-lg font-semibold">{keyword}</h3>
    </div>
    <div className="mt-4">
      {isLoading ? <FancyLoader /> : (
        <div className="flex flex-wrap gap-2">
          {similarKeywords.map((similar, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              {similar}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

