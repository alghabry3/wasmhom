
import React from 'react';

const Logo: React.FC<{ className?: string; dark?: boolean }> = ({ className = "h-12", dark = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto fill-current"
        style={{ color: dark ? 'black' : 'white' }}
      >
        {/* Recreating the stylized vertical block logo from the image */}
        <path d="M20 30 L40 10 L40 90 L20 90 Z" />
        <path d="M50 40 L50 90 L70 90 L70 30 L50 30 Z" />
        <path d="M50 10 L70 10 L70 20 L50 20 Z" />
        <path d="M10 50 L10 90 L15 90 L15 55 L20 50 Z" />
      </svg>
      <div className="flex flex-col">
        <span className={`font-black text-xl leading-none ${dark ? 'text-black' : 'text-white'}`}>وسم هوم العقارية</span>
        <span className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Wasm Home Real Estate</span>
      </div>
    </div>
  );
};

export default Logo;
