import React, { useState } from 'react';

// Bazen vseh slik
const rawImages = [
  // 🟢 NOVO: Vaše nove slike
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6995da6a905d47d3e4ab0aa7.jpeg",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6995dab2dde40bc381e3e007.png",

  // 🟢 NOVO: Vaša Hulk Mass Extreme slika
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6993492154da0410bb4f0e2d.webp",
  
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990301b899b88538f7e742f.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990301b899b882c0d7e7430.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990301bc086656144c88f4f.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990301bc086650718c88f50.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990301b772de98117f7bd00.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990301bc086651e4dc88f51.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990303724813c500c6f04a0.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990303724813c60616f049e.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6990301b00849878cc64d807.webp",
  "https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/699031e9899b885d3a7e91ce.webp"
];

const About: React.FC = () => {
  // Initialize images with a random shuffle on mount
  const [images] = useState(() => {
    return [...rawImages].sort(() => Math.random() - 0.5);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 2; // Prikazujemo samo 2 sliki

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    setCurrentIndex((prev) => (prev + itemsPerPage) % images.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    setCurrentIndex((prev) => (prev - itemsPerPage + images.length) % images.length);
  };

  // Get current set of images from the shuffled array
  const visibleImages = Array.from({ length: itemsPerPage }).map((_, i) => {
    return images[(currentIndex + i) % images.length];
  });

  return (
    <section id="about" className="py-24 relative bg-luksa-card/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Interactive Gallery */}
          <div className="lg:w-1/2 relative h-[500px] w-full group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-luksa-cyan to-luksa-purple opacity-20 blur-3xl rounded-xl"></div>
            
            <div className="relative border border-white/10 rounded-xl overflow-hidden bg-luksa-dark p-3 h-full shadow-2xl">
                 
                 {/* Navigation Arrows */}
                 <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-luksa-dark/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-luksa-cyan hover:text-luksa-dark hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0"
                    aria-label="Previous images"
                 >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>

                 <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-luksa-dark/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-luksa-cyan hover:text-luksa-dark hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[20px] group-hover:translate-x-0"
                    aria-label="Next images"
                 >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </button>

                 {/* Grid Layout - 2 large images */}
                 <div className={`grid grid-cols-2 gap-3 h-full transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    {visibleImages.map((src, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden border border-white/5 bg-luksa-card h-full">
                            <img 
                                src={src} 
                                alt={`LUKSA AI Project ${index + 1}`} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                    ))}
                 </div>

                 {/* Gradient Overlay for Text Readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-luksa-dark via-transparent to-transparent pointer-events-none"></div>

                 {/* Overlay Text */}
                 <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                    <div className="bg-luksa-dark/90 backdrop-blur-xl p-4 md:p-6 border-l-4 border-luksa-purple shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-r-xl border-y border-r border-white/5">
                        <p className="text-white font-display text-sm md:text-base leading-relaxed tracking-wide">
                          "Vsak projekt je edinstvena sinteza naprednih algoritmov in kreativnega vodenja."
                        </p>
                    </div>
                 </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-luksa-cyan font-display text-lg mb-2 uppercase tracking-widest">O LUKSA AI</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Kjer tehnologija sreča <br/>
              <span className="text-luksa-purple">kreativno vizijo.</span>
            </h3>
            
            <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed">
              <p>
                V svetu, ki se premika s svetlobno hitrostjo, tradicionalno ustvarjanje vsebin ne dohaja tempa. Pri 
                <strong className="text-white font-semibold"> LUKSA AI</strong> premoščamo vrzel med surovo umetno inteligenco in človeško umetniško natančnostjo.
              </p>
              <p>
                Specializirani smo za najsodobnejša generativna orodja in postavljamo vaše izdelke v okolja, ki so bila nekoč omejena le z domišljijo.
              </p>
              <p>
                Naše poslanstvo ni le generiranje slik; gradimo vizualno identiteto, ki ustavi drsenje po zaslonu (scrolling). Vsak projekt je edinstvena sinteza naprednih algoritmov in kreativnega vodenja, prilagojena vašim specifičnim tržnim ciljem.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;