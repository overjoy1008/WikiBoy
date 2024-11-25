// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { KeywordTag } from './components/KeywordTag';
import { SearchButton } from './components/SearchButton';
import { ErrorMessage } from './components/ErrorMessage';
import { KeywordData } from '@/app/components/utils/types';
import { getRandomColor } from '@/app/components/utils/colors';
import { ToggleSwitch } from './components/ToggleSwitch';
import { usePersistedState } from './components/hooks/usePersistedState';
import { STORAGE_KEYS } from './components/utils/localStorage';

export default function Home() {
    const [keywords, setKeywords] = usePersistedState<KeywordData[]>(STORAGE_KEYS.KEYWORDS, []);
    const [tocMode, setTocMode] = usePersistedState<boolean>(STORAGE_KEYS.TOC_MODE, false);
    const [input, setInput] = usePersistedState<string>(STORAGE_KEYS.SEARCH_INPUT, '');
    const [error, setError] = useState('');

    const addKeyword = (text: string) => {
        const trimmedText = text.trim();
        if (trimmedText && !keywords.some(k => k.text === trimmedText)) {
            setKeywords(prev => [...prev, {
                text: trimmedText,
                colors: {
                    from: getRandomColor(),
                    to: getRandomColor()
                }
            }]);
            return true;
        }
        return false;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (trimmedInput && keywords.some(k => k.text === trimmedInput)) {
            setError('This keyword already exists!');
            setTimeout(() => setError(''), 2500);
            return;
        }
        if (addKeyword(trimmedInput)) {
            setInput('');  // 입력 후 input 초기화
        }
    };

    const handleSearch = () => {
        // SearchBar에 입력된 값이 있다면 keywords에 추가
        const trimmedInput = input.trim();
        let finalKeywords = [...keywords];
        
        if (trimmedInput && !keywords.some(k => k.text === trimmedInput)) {
            // 새로운 키워드와 색상을 생성
            const newKeyword: KeywordData = {
                text: trimmedInput,
                colors: {
                    from: getRandomColor(),
                    to: getRandomColor()
                }
            };
            finalKeywords = [...keywords, newKeyword];
            setKeywords(finalKeywords); // 상태 업데이트
            setInput(''); // input 초기화
        }

        // 키워드가 하나라도 있다면 검색 페이지로 이동
        if (finalKeywords.length > 0) {
            const keywordsData = encodeURIComponent(JSON.stringify(finalKeywords));
            window.location.href = `/wiki?data=${keywordsData}&tocMode=${tocMode}`;
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
                            keyword={keyword.text}
                            gradientColors={keyword.colors}
                            onRemove={() => {
                                setKeywords(prev => prev.filter((_, i) => i !== index));
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-6 flex justify-between items-center">
                <ToggleSwitch isOn={tocMode} onToggle={() => setTocMode(!tocMode)} />
                <div className="text-gray-600 font-bold">
                    {keywords.length} keywords selected
                </div>
            </div>

            <SearchButton onClick={handleSearch} keywords={keywords.map(k => k.text)} />
        </div>
    );
}