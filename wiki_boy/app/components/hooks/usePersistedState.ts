// app/components/hooks/usePersistedState.ts
import { useState, useEffect, useRef } from 'react';
import { saveToStorage, loadFromStorage } from '../utils/localStorage';

export function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    // 초기값을 가져오는 로직을 useState의 초기화 함수로 이동
    if (typeof window !== 'undefined') {
      return loadFromStorage(key, defaultValue);
    }
    return defaultValue;
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // 첫 렌더링이 아닐 때만 저장
    saveToStorage(key, state);
  }, [key, state]);

  return [state, setState] as const;
}