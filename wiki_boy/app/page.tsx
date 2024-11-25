// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { KeywordTag } from './components/KeywordTag';
import { SearchButton } from './components/SearchButton';
import { ErrorMessage } from './components/ErrorMessage';

export default function Home() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput && keywords.includes(trimmedInput)) {
      setError('This keyword already exists!');
      setTimeout(() => setError(''), 2500);
      return;
    }
    if (trimmedInput) {
      setKeywords(prev => [...prev, trimmedInput]);
      setInput('');
    }
  };

  const handleSearch = () => {
    if (keywords.length > 0) {
      console.log('Searching with keywords:', keywords);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8 relative pb-24">
      {error && <ErrorMessage message={error} onClose={() => setError('')} />}
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <SearchBar
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="flex flex-wrap gap-2 p-4">
          {keywords.map((keyword, index) => (
            <KeywordTag
              key={index}
              keyword={keyword}
              onRemove={() => {
                setKeywords(prev => prev.filter((_, i) => i !== index));
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 text-gray-600">
        {keywords.length} filters selected
      </div>

      <SearchButton onClick={handleSearch} keywords={keywords} />
    </div>
  );
}