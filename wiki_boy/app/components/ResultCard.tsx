// // components/ResultCard.tsx
import FancyLoader from '@/app/components/FancyLoader';

interface ResultCardProps {
  keyword: string;
  gradientFrom: string;
  gradientTo: string;
  isLoading: boolean;
  content?: string;
  error?: string | null;
}

export const ResultCard = ({ 
  keyword, 
  gradientFrom, 
  gradientTo, 
  isLoading,
  content,
  error
}: ResultCardProps) => (
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
      {isLoading ? (
        <FancyLoader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="prose prose-sm max-w-none">
          {content}
        </div>
      )}
    </div>
  </div>
);