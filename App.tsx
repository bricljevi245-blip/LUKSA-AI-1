import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load komponent, ki niso takoj vidne na zaslonu.
// To pospeši začetno nalaganje, saj brskalniku ni treba prenesti vse kode naenkrat.
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));
const Footer = lazy(() => import('./components/Footer'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const FreePreviewPage = lazy(() => import('./components/FreePreviewPage'));

type View = 'home' | 'about' | 'services' | 'preview';

// Preprost nalagalnik za posamezne sekcije (če se še nalagajo)
const SectionLoader = () => <div className="py-24 flex justify-center"><div className="w-8 h-8 border-2 border-luksa-cyan border-t-transparent rounded-full animate-spin"></div></div>;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-luksa-cyan selection:text-luksa-dark">
      {/* Header in Hero sta kritična za prvi vtis, zato nista lazy-loaded */}
      <Header onNavigate={handleNavigate} currentView={currentView} />
      
      <main className="flex-grow">
        <Suspense fallback={<SectionLoader />}>
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
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer onNavigate={handleNavigate} />
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default App;