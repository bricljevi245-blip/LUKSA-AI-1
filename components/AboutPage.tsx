import React, { useEffect } from 'react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-luksa-dark pt-24 pb-20">
      
      {/* Navigation Back */}
      <div className="container mx-auto px-6 mb-12">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-luksa-cyan transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-display text-sm uppercase tracking-widest">Nazaj na domačo stran</span>
        </button>
      </div>

      {/* Hero Section of About Page */}
      <div className="container mx-auto px-6 mb-24 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luksa-purple/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
          Več kot Agencija. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-luksa-cyan to-luksa-purple">Družinska Vizija.</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          LUKSA AI je rezultat ljubezni do tehnologije in drug do drugega. Sva Luka in Sandra, mož in žena, ki sva svojo skupno življenjsko pot prepletla z vizijo digitalne prihodnosti. Dihava kot eno, kjer se binarna koda sreča z umetniškim navdihom.
        </p>
      </div>

      {/* Founders Section */}
      <div className="container mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-display text-luksa-cyan uppercase tracking-widest inline-block border-b border-white/10 pb-4">Partnerja v življenju & poslu</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          
          {/* Luka */}
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-luksa-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
            <div className="relative bg-luksa-card border border-white/10 p-8 rounded-2xl overflow-hidden hover:border-luksa-cyan/50 transition-colors h-full flex flex-col">
              <div className="mb-6 relative">
                 {/* Placeholder for Luka's Image */}
                 <div className="h-64 w-full bg-luksa-dark rounded-xl overflow-hidden relative flex items-center justify-center border border-white/5">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <svg className="w-24 h-24 text-luksa-cyan opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                 </div>
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-2">Luka</h3>
              <p className="text-luksa-cyan font-medium mb-6 text-sm uppercase tracking-wider">Tehnični Direktor & AI Strateg</p>
              
              <div className="flex-grow space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Kot mož in tehnični vodja, Luka predstavlja <strong>logično hrbtenico</strong> najinega dua. Njegov um vidi svet v vzorcih in kodi, vedno iščoč način, kako Sandrine sanje spremeniti v digitalno resničnost.
                </p>
                <p>
                  On je tisti, ki postavlja temelje in gradi platno. Njegova strast je krotiti kompleksnost umetne inteligence, da lahko ta služi ustvarjalnemu namenu. Za Luko tehnologija ni le orodje, ampak jezik, s katerim izraža svojo predanost inovacijam.
                </p>
              </div>
            </div>
          </div>

          {/* Sandra */}
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-luksa-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
            <div className="relative bg-luksa-card border border-white/10 p-8 rounded-2xl overflow-hidden hover:border-luksa-purple/50 transition-colors h-full flex flex-col">
              <div className="mb-6 relative">
                 {/* Placeholder for Sandra's Image */}
                 <div className="h-64 w-full bg-luksa-dark rounded-xl overflow-hidden relative flex items-center justify-center border border-white/5">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <svg className="w-24 h-24 text-luksa-purple opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                 </div>
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-2">Sandra</h3>
              <p className="text-luksa-purple font-medium mb-6 text-sm uppercase tracking-wider">Kreativna Direktorica & Vizionarka</p>
              
              <div className="flex-grow space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Kot žena in kreativna sila, Sandra vnese <strong>dušo</strong> v Lukove vrstice kode. Ona razume, da tehnologija brez čustev ne pomeni nič. S svojim estetskim čutom "udomači" algoritme in poskrbi, da vsak projekt diha.
                </p>
                <p>
                  Njena intuicija mehča tehnološke robove. Sandra vidi barve tam, kjer drugi vidijo podatke. Ona je tista, ki poskrbi, da končni izdelek ne le deluje, ampak očara in pripoveduje toplo, človeško zgodbo.
                </p>
              </div>
            </div>
          </div>

        </div>
        
        {/* Unity Statement */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-lg text-white font-light italic opacity-80">
                "Skupaj ustvarjava harmonijo med strojnim in človeškim. En um, dve perspektivi, neskončno možnosti."
            </p>
        </div>
      </div>

      {/* Work Process Section */}
      <div className="container mx-auto px-6 mb-24">
        <h2 className="text-2xl font-display text-white mb-16 text-center uppercase tracking-widest">Naš Delovni <span className="text-luksa-cyan">Proces</span></h2>
        
        <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-luksa-purple/50 to-transparent -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
                {[
                    { step: "01", title: "Sinergija", desc: "Najin pogovor se začne ob jutranji kavi. Vašo vizijo analizirava skozi tehnično in estetsko prizmo hkrati." },
                    { step: "02", title: "Koncept & Prompting", desc: "Luka pripravi tehnični okvir, Sandra pa določi stil in čustveni ton. Skupaj inženirava popoln 'prompt'." },
                    { step: "03", title: "AI Generacija", desc: "Združiva moči z najsodobnejšimi modeli. Tehnologija postane podaljšek najine skupne kreativnosti." },
                    { step: "04", title: "Finesa", desc: "Sandra ročno izpopolni detajle, Luka zagotovi tehnično brezhibnost. Rezultat je popolna harmonija." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-luksa-dark border border-white/10 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                        <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-luksa-cyan to-luksa-purple mb-4">
                            {item.step}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* CTA Footer in About Page */}
      <div className="container mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-luksa-cyan/10 to-luksa-purple/10 border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Postanite del najine <span className="text-luksa-purple">zgodbe</span></h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Vaš projekt si zasluži osebno obravnavo. Dovolite, da Luka in Sandra preučita vašo vizijo.
            </p>
            <button 
                onClick={onBack} 
                className="px-8 py-4 bg-white text-luksa-dark font-bold rounded-full hover:bg-luksa-cyan transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
                Kontaktirajte naju
            </button>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;