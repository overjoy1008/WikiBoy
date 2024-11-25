// components/SearchBar.tsx
import { Search } from 'lucide-react';

interface SearchBarProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SearchBar = ({ input, onInputChange, onSubmit }: SearchBarProps) => (
  <form onSubmit={onSubmit} className="relative">
    <input
      type="text"
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 border-0 placeholder:text-gray-300 transition-all duration-200 ease-in-out focus:bg-white"
      placeholder="Search keywords..."
    />
    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
      <Search className="w-5 h-5 text-gray-500" />
    </button>
  </form>
);