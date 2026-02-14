import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import FreePreviewPage from './components/FreePreviewPage';

type View = 'home' | 'about' | 'services' | 'preview';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-luksa-cyan selection:text-luksa-dark">
      <Header onNavigate={handleNavigate} currentView={currentView} />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Services />
            <Contact />
          </>
        ) : currentView === 'about' ? (
          <AboutPage onBack={() => handleNavigate('home')} />
        ) : currentView === 'services' ? (
          <ServicesPage onBack={() => handleNavigate('home')} />
        ) : (
          <FreePreviewPage onBack={() => handleNavigate('home')} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <ChatWidget />
    </div>
  );
};

export default App;