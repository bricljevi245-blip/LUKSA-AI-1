import React, { useState, Suspense, lazy, type ReactNode } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy load komponent
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));
const Footer = lazy(() => import('./components/Footer'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const FreePreviewPage = lazy(() => import('./components/FreePreviewPage'));

type View = 'home' | 'about' | 'services' | 'preview';

// Loader
const SectionLoader = () => <div className="py-24 flex justify-center"><div className="w-8 h-8 border-2 border-luksa-cyan border-t-transparent rounded-full animate-spin"></div></div>;

interface SafeComponentProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface SafeComponentState {
  hasError: boolean;
}

// Error Boundary Component za izolacijo napak
class SafeComponent extends React.Component<SafeComponentProps, SafeComponentState> {
  constructor(props: SafeComponentProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Component failed to load:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const MainErrorFallback = (
    <div className="py-24 text-center text-gray-400">
      <p>Nalaganje vsebine ni uspelo. Prosimo osvežite stran.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-luksa-cyan selection:text-luksa-dark">
      {/* Header ni znotraj SafeComponent, ker je ključen za navigacijo. Če header pade, je bolje da cela stran pade. */}
      <Header onNavigate={handleNavigate} currentView={currentView} />
      
      <main className="flex-grow">
        <SafeComponent fallback={MainErrorFallback}>
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
        </SafeComponent>
      </main>

      <SafeComponent>
        <Suspense fallback={null}>
          <Footer onNavigate={handleNavigate} />
          {/* ChatWidget je ovit v SafeComponent. Če spodleti (npr. zaradi API ključa), se preprosto ne prikaže. */}
          <ChatWidget />
        </Suspense>
      </SafeComponent>
    </div>
  );
};

export default App;