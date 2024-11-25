// app/components/utils/localStorage.ts
export const STORAGE_KEYS = {
    KEYWORDS: 'wiki_keywords',
    TOC_MODE: 'wiki_toc_mode',
    SEARCH_INPUT: 'wiki_search_input'  // 새로운 키 추가
} as const;

export interface StorageKeywords {
    keywords: Array<{
        text: string;
        colors: {
            from: string;
            to: string;
        };
    }>;
}

export const saveToStorage = (key: string, value: any) => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        if (typeof window === 'undefined') return defaultValue;
        
        const stored = localStorage.getItem(key);
        if (!stored) return defaultValue;
        
        return JSON.parse(stored);
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};