// components/ToggleSwitch.tsx
import React from 'react';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

export const ToggleSwitch: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base font-semibold text-gray-700">목차 모드</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
          isOn ? 'bg-green-400' : 'bg-gray-200'
        }`}
      >
        <span
          className={`${
            isOn ? 'translate-x-8' : 'translate-x-1'
          } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
        />
      </button>
    </div>
  );
};