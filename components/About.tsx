import React, { useMemo } from 'react';

const About: React.FC = () => {
  const rawImages = [
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

  // Randomize images on mount so they appear in different order
  const shuffledImages = useMemo(() => {
    return [...rawImages].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <section id="about" className="py-24 relative bg-luksa-card/30 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Image Projection Grid */}
          <div className="lg:w-1/2 relative h-[600px] w-full">
            <div className="absolute -inset-4 bg-gradient-to-r from-luksa-cyan to-luksa-purple opacity-30 blur-2xl rounded-xl"></div>
            
            <div className="relative border border-white/10 rounded-xl overflow-hidden bg-luksa-dark p-2 h-full">
                 
                 {/* Masonry Grid of Images */}
                 <div className="columns-2 gap-2 h-full overflow-hidden relative">
                    {shuffledImages.map((src, index) => (
                      <div key={index} className="mb-2 break-inside-avoid">
                        <img 
                          src={src} 
                          alt={`LUKSA AI Project ${index + 1}`} 
                          className="w-full rounded-md object-cover hover:scale-105 transition-transform duration-700 opacity-80 hover:opacity-100"
                          loading="lazy"
                        />
                      </div>
                    ))}
                 </div>

                 {/* Gradient Overlay for Text Readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-luksa-dark via-luksa-dark/60 to-transparent pointer-events-none"></div>

                 {/* Overlay Text */}
                 <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="bg-luksa-dark/80 backdrop-blur-md p-4 border-l-4 border-luksa-purple shadow-2xl rounded-r-lg">
                        <p className="text-white font-display text-sm leading-relaxed">
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