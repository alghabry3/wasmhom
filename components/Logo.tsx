
import React from 'react';

const Logo: React.FC<{ className?: string; dark?: boolean }> = ({ className = "h-12", dark = true }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <svg 
        viewBox="0 0 400 300" 
        className="h-full w-auto"
        fill={dark ? "black" : "white"}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Recreating the geometric logo from the image: 
            A stylized architectural 'H' / 'W' symbol made of sharp, vertical elements. 
        */}
        <path d="M40 80 L90 30 L90 270 L40 270 Z" /> {/* Far Left Bar */}
        <path d="M110 130 L110 270 L150 270 L150 130 L130 110 Z" /> {/* Left-Middle Notch */}
        <path d="M170 30 L220 30 L220 270 L170 270 Z" /> {/* Central Tall Pillar */}
        <path d="M240 100 L240 270 L280 270 L280 100 L260 80 Z" /> {/* Right-Middle Notch */}
        <path d="M300 30 L350 80 L350 270 L300 270 Z" /> {/* Far Right Bar */}
      </svg>
      <div className="flex flex-col">
        <span className={`font-black text-xl leading-tight ${dark ? 'text-gray-900' : 'text-white'}`}>وسم هوم العقارية</span>
        <span className={`text-[11px] uppercase tracking-[0.2em] font-bold ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Wasm Home Real Estate</span>
      </div>
    </div>
  );
};

export default Logo;
