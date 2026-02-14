import React, { useState } from 'react';

interface HeroProps {
  onNavigate: (view: 'home' | 'about' | 'services' | 'preview') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-luksa-cyan/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luksa-purple/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(5,5,16,0)_1px,transparent_1px),linear-gradient(90deg,rgba(5,5,16,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Main Logo Image */}
        <div className="flex justify-center mb-8 relative">
           <div className="absolute inset-0 bg-gradient-to-r from-luksa-cyan/20 to-luksa-purple/20 blur-[60px] rounded-full pointer-events-none transform scale-75"></div>
           {!imgError ? (
            <img 
              src="https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/698e0d2a008498301187d8e0.webp" 
              alt="LUKSA AI Logo" 
              onError={() => setImgError(true)}
              className="relative z-10 w-72 md:w-[28rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(188,19,254,0.5)] hover:drop-shadow-[0_0_50px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-500"
            />
           ) : (
            // Premium Fallback Visualization (prikaže se, če slika ni dostopna)
             <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
               <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
                  <defs>
                    <linearGradient id="heroLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f0ff" />
                      <stop offset="100%" stopColor="#bc13fe" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Abstract Tech Circle */}
                  <circle cx="50" cy="50" r="42" stroke="url(#heroLogoGradient)" strokeWidth="1.5" fill="none" className="opacity-80" />
                  <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="3 3" className="opacity-30 animate-[spin_10s_linear_infinite]" />
                  
                  {/* Central Elements */}
                  <path d="M50 15 C 25 15, 15 40, 15 50 C 15 75, 40 85, 50 85" stroke="#00f0ff" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)" />
                  <path d="M50 15 C 75 15, 85 40, 85 50" stroke="#bc13fe" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)" />
                  
                  {/* Tech Lines */}
                  <path d="M15 50 L 25 50" stroke="#00f0ff" strokeWidth="1" />
                  <path d="M75 50 L 85 50" stroke="#bc13fe" strokeWidth="1" />
                  <circle cx="50" cy="50" r="4" fill="white" filter="url(#glow)" />
                  
                  {/* Text */}
                  <text x="50" y="65" fontFamily="Orbitron" fontSize="10" fill="white" textAnchor="middle" letterSpacing="3" filter="url(#glow)">LUKSA AI</text>
               </svg>
             </div>
           )}
        </div>

        <div className="inline-block mb-6 px-4 py-1.5 border border-luksa-purple/50 rounded-full bg-luksa-purple/10 backdrop-blur-sm">
          <span className="text-xs md:text-sm font-display tracking-widest text-luksa-purple uppercase">
            Marketing nove generacije
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-6 neon-text">
          Povzdignite svojo znamko <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-luksa-cyan to-luksa-purple">
            v AI dimenzijo.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Onkraj tradicionalne fotografije. Z uporabo naprednih AI modelov 
          preoblikujemo vaše izdelke v hiper-realistične vizualije, ki pritegnejo pozornost in povečajo prodajo.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => onNavigate('preview')}
            className="group relative px-8 py-4 bg-luksa-cyan text-luksa-dark font-display font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">Želim brezplačen AI predogled</span>
            <div className="absolute inset-0 bg-luksa-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button 
            onClick={() => onNavigate('about')}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-widest bg-transparent border-none cursor-pointer"
          >
            Več o tem <span className="text-luksa-purple">→</span>
          </button>
        </div>
      </div>
      
      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-luksa-dark to-transparent"></div>
    </section>
  );
};

export default Hero;