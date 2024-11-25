// app/wiki/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResultCard } from '../components/ResultCard';
import { KeywordData } from '@/app/components/utils/types';
import { loadFromStorage, STORAGE_KEYS } from '../components/utils/localStorage';

export default function WikiPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const tocMode = searchParams.get('tocMode') === 'true';
  
  const [keywords, setKeywords] = useState<KeywordData[]>(() => {
    if (dataParam) {
      try {
        return JSON.parse(decodeURIComponent(dataParam));
      } catch {
        return [];
      }
    }
    return [];
  });

  const [results, setResults] = useState<{[key: string]: {content: string, error: string | null}}>({});
  const [processedKeywords] = useState(new Set());

  useEffect(() => {
    // URL 파라미터가 없는 경우 localStorage에서 데이터를 불러옵니다
    if (!dataParam) {
      const storedKeywords = loadFromStorage<KeywordData[]>(STORAGE_KEYS.KEYWORDS, []);
      const storedTocMode = loadFromStorage<boolean>(STORAGE_KEYS.TOC_MODE, false);
      
      if (storedKeywords.length > 0) {
        const keywordsData = encodeURIComponent(JSON.stringify(storedKeywords));
        router.replace(`/wiki?data=${keywordsData}&tocMode=${storedTocMode}`);
      } else {
        router.replace('/');
      }
    }
  }, [dataParam, router]);

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
            body: JSON.stringify({ keyword, tocMode })
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
  }, [keywords, tocMode, processedKeywords]);

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