// app/components/ErrorMessage.tsx
import { useEffect } from 'react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade">
      {message}
    </div>
  );
};