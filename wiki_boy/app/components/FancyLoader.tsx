import React from 'react';

const FancyLoader = () => (
    <div className="flex items-center justify-center h-24">
    <div className="relative w-12 h-16 border-[3px] border-gray-200 rounded-lg overflow-visible">
      {/* Scanning line effect */}
      <div className="absolute w-[150%] -left-[25%] h-1 bg-gray-100 rounded-lg top-0 animate-scan-line" style={{animationDelay: '0ms'}} />
      
      {/* Document lines */}
      <div className="mt-3 space-y-2 px-2">
        <div className="h-0.5 w-0 bg-gray-200 animate-line-grow" style={{animationDelay: '400ms'}} />
        <div className="h-0.5 w-0 bg-gray-200 animate-line-grow-full" style={{animationDelay: '400ms'}} />
        <div className="h-0.5 w-0 bg-gray-200 animate-line-grow-partial" style={{animationDelay: '400ms'}} />
      </div>
    </div>
  </div>
);

export default FancyLoader;