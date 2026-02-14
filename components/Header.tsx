import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  onNavigate: (view: 'home' | 'about' | 'services' | 'preview') => void;
  currentView: 'home' | 'about' | 'services' | 'preview';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '#about-page') {
      onNavigate('about');
      return;
    }

    if (href === '#services-page') {
      onNavigate('services');
      return;
    }

    // Always go to home view first if not there
    if (currentView !== 'home') {
      onNavigate('home');
      // Allow state update to happen before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Just scroll
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Domov', href: '#hero' },
    { name: 'O nas', href: '#about-page' },
    { name: 'Storitve', href: '#services-page' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-luksa-dark/90 backdrop-blur-md border-luksa-purple/20 py-2' : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="hover:opacity-80 transition-opacity"
        >
          <Logo />
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)} 
              className={`text-sm font-medium transition-colors tracking-wide uppercase ${
                (link.href === '#about-page' && currentView === 'about') || 
                (link.href === '#services-page' && currentView === 'services')
                  ? 'text-luksa-cyan' 
                  : 'text-gray-300 hover:text-luksa-cyan'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="px-5 py-2 border border-luksa-cyan text-luksa-cyan hover:bg-luksa-cyan hover:text-luksa-dark transition-all duration-300 rounded-sm font-display text-sm uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]"
          >
            Začni zdaj
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-luksa-dark/95 backdrop-blur-xl border-b border-luksa-purple/30 p-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-lg font-medium hover:text-luksa-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;