// components/ResultCard.tsx
import React, { useState, useEffect } from 'react';
import FancyLoader from '@/app/components/FancyLoader';
interface KeywordItemProps {
  text: string;
  index: number;
}

interface ResultCardProps {
  keyword: string;
  gradientFrom: string;
  gradientTo: string;
  isLoading: boolean;
  content?: string;
  error?: string | null;
}

const KeywordItem: React.FC<{ text: string; index: number }> = ({ text, index }) => (
  <span 
    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-2"
    style={{
      animation: `fadeIn 0.3s ease-in forwards`,
      animationDelay: `${index * 0.15}s`,
      opacity: 0
    }}
  >
    {text}
  </span>
);

const ContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const [cachedKeywords, setCachedKeywords] = useState<string[]>([]);

  useEffect(() => {
    try {
      const lastCompleteQuote = content.lastIndexOf('"');
      if (lastCompleteQuote !== -1) {
        const fixedContent = content.substring(0, lastCompleteQuote + 1) + ']}';
        const parsed = JSON.parse(fixedContent);
        
        if (parsed.keyword && Array.isArray(parsed.keyword)) {
          setCachedKeywords(prev => {
            const newKeywords = parsed.keyword.filter(
              (word: string) => !prev.includes(word)
            );
            return [...prev, ...newKeywords];
          });
        }
      }
    } catch {}
  }, [content]);

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <div className="flex flex-wrap">
        {cachedKeywords.map((word, index) => (
          <KeywordItem key={index} text={word} index={index} />
        ))}
      </div>
    </>
  );
};

export const ResultCard: React.FC<ResultCardProps> = ({ 
  keyword, 
  gradientFrom, 
  gradientTo, 
  isLoading,
  content,
  error
}) => (
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
      ) : content ? (
        <div className="prose prose-sm max-w-none">
          <ContentRenderer content={content} />
        </div>
      ) : null}
    </div>
  </div>
);

export default ResultCard;