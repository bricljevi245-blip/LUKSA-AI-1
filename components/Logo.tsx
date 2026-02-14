import React, { useState } from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center ${className}`}>
      {!imgError ? (
        <img 
          src="/luksa-logo.png" 
          alt="LUKSA AI" 
          className="h-12 md:h-16 w-auto object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Brain/Tech Icon simulation */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#bc13fe" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" stroke="url(#logoGradient)" strokeWidth="4" fill="none" className="opacity-50" />
              <path d="M50 20 C 30 20, 20 40, 20 50 C 20 70, 40 80, 50 80 C 60 80, 80 70, 80 50" stroke="#00f0ff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M50 20 C 70 20, 80 40, 80 50" stroke="#bc13fe" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M35 50 L 65 50" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M50 35 L 50 65" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="50" cy="50" r="5" fill="white" />
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">
            LUKSA <span className="text-transparent bg-clip-text bg-gradient-to-r from-luksa-cyan to-luksa-purple">AI</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;