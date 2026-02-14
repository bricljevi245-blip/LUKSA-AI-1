import React, { useState, Suspense, lazy } from 'react';
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
  children: React.ReactNode;
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
    if (this.state.hasError) return null; // Če komponenta spodleti, preprosto ne prikaži ničesar (namesto črne