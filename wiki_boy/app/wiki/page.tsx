// app/wiki/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ResultCard } from '../components/ResultCard';
import { KeywordData } from '@/app/components/utils/types';

export default function WikiPage() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const keywords: KeywordData[] = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : [];
  const [results, setResults] = useState<{[key: string]: {content: string, error: string | null}}>({});
  const [processedKeywords] = useState(new Set());

  useEffect(() => {
    const fetchResults = async () => {
      for (const keywordData of keywords) {
        const keyword = keywordData.text;
        if (processedKeywords.has(keyword)) continue;
        processedKeywords.add(keyword);

        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyword })
          });

          if (!response.ok) throw new Error('Network response was not ok');
          if (!response.body) throw new Error('No response body');
          
          const reader = response.body.getReader();
          let content = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = new TextDecoder().decode(value);
            const dataChunks = chunk.split('~~data~~').filter(Boolean);

            for (const dataChunk of dataChunks) {
              if (dataChunk === '[~~DONE~~]') break;
              content += dataChunk;
              setResults(prev => ({
                ...prev,
                [keyword]: { 
                  content: content,
                  error: null
                }
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setResults(prev => ({
            ...prev,
            [keyword]: { 
              content: '', 
              error: error instanceof Error ? error.message : 'Failed to fetch data'
            }
          }));
        }
      }
    };

    fetchResults();
  }, [keywords]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      <div className="max-w-4xl mx-auto grid gap-6">
        {keywords.map((keywordData, index) => (
          <ResultCard 
            key={index}
            keyword={keywordData.text}
            gradientFrom={keywordData.colors.from}
            gradientTo={keywordData.colors.to}
            isLoading={!results[keywordData.text]}
            content={results[keywordData.text]?.content}
            error={results[keywordData.text]?.error}
          />
        ))}
      </div>
    </div>
  );
}