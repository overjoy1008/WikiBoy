'use client';

import { useSearchParams } from 'next/navigation';
import { ResultCard } from '../components/ResultCard';
import { getRandomColor } from '../components/utils/colors';

interface WikiPageProps {}

export default function WikiPage({}: WikiPageProps) {
  const searchParams = useSearchParams();
  const keywordsParam = searchParams.get('keywords');
  const keywords: string[] = keywordsParam ? JSON.parse(decodeURIComponent(keywordsParam)) : [];

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      <div className="max-w-4xl mx-auto grid gap-6">
        {keywords.map((keyword: string, index: number) => (
          <ResultCard 
            key={index}
            keyword={keyword}
            gradientFrom={getRandomColor()}
            gradientTo={getRandomColor()}
          />
        ))}
      </div>
    </div>
  );
}