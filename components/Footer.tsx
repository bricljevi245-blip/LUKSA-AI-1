import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: 'home' | 'about' | 'services' | 'preview') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === '#about-page') {
      onNavigate('about');
    } else if (href === '#services-page') {
      onNavigate('services');
    } else {
      onNavigate('home');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-luksa-card border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-6" />
            <p className="text-gray-400 max-w-sm mb-6">
               Izkoriščanje moči naprednih AI modelov za preoblikovanje vaših izdelkov v hiper-realistične vizualije.
            </p>
            <div className="flex space-x-4">
               {/* Social Icons Placeholders */}
               {['twitter', 'instagram', 'linkedin'].map((social) => (
                 <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-luksa-cyan hover:text-luksa-dark transition-all">
                   <span className="capitalize sr-only">{social}</span>
                   <div className="w-4 h-4 bg-current rounded-sm"></div>
                 </a>
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Storitve</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a 
                    href="#services-page" 
                    onClick={(e) => handleLinkClick(e, '#services-page')}
                    className="hover:text-luksa-cyan transition-colors"
                >
                    Fotorealistične kampanje
                </a>
              </li>
              <li>
                <a 
                    href="#services-page" 
                    onClick={(e) => handleLinkClick(e, '#services-page')}
                    className="hover:text-luksa-cyan transition-colors"
                >
                    AI Influencerji
                </a>
              </li>
              <li>
                <a 
                    href="#services-page" 
                    onClick={(e) => handleLinkClick(e, '#services-page')}
                    className="hover:text-luksa-cyan transition-colors"
                >
                    Spletne rešitve
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Podjetje</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a 
                  href="#about-page" 
                  onClick={(e) => handleLinkClick(e, '#about-page')}
                  className="hover:text-luksa-cyan transition-colors"
                >
                  O nas
                </a>
              </li>
              <li>
                <a 
                  href="#services-page" 
                  onClick={(e) => handleLinkClick(e, '#services-page')}
                  className="hover:text-luksa-cyan transition-colors"
                >
                  Storitve
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="hover:text-luksa-cyan transition-colors"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} LUKSA AI Agencija. Vse pravice pridržane.</p>
          <div className="mt-4 md:mt-0">
            <span className="italic">Ostanite futuristični.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;