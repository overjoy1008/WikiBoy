// components/SearchButton.tsx
import { useRouter } from 'next/navigation';

interface SearchButtonProps {
  onClick: () => void;
  keywords: string[];
}

export const SearchButton = ({ onClick, keywords }: SearchButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    if (keywords.length > 0) {
      router.push('/wiki?keywords=' + encodeURIComponent(JSON.stringify(keywords)));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 px-12 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, #60A5FA, #3B82F6, #2563EB)',
        color: 'white'
      }}
    >
      Search!
    </button>
  );
};