import React, { useEffect } from 'react';

interface ServicesPageProps {
  onBack: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      id: "01",
      title: "Brand DNA Analiza & Svetovanje",
      content: "Vsak projekt začneva z globokim razumevanjem vaše blagovne znamke. Analizirava vašo barvno paleto, tipografijo in vizualni arhetip. Svetujeva vam, kako AI integrirati v vašo obstoječo strategijo, da dosežete maksimalen ROI in ohranite avtentičnost."
    },
    {
      id: "02",
      title: "Razvoj personaliziranega AI Influencerja",
      content: "Ustvariva unikatnega digitalnega ambasadorja, ki je obraz vaše znamke. Ne gre le za sliko, temveč za razvoj doslednega lika (Character Consistency), ki vašo znamko predstavlja 24/7, brez stroškov licenc, potovanj ali snemalnih dni."
    },
    {
      id: "03",
      title: "AI Generiranje & Napredni Koncepti",
      content: "Z uporabo modelov zadnje generacije vizualizirava scenarije, ki bi bili v fizičnem svetu logistično nemogoči ali stroškovno nedostopni. Ustvarjava vsebino, ki je hiper-realistična in tehnično brezhibna."
    },
    {
      id: "04",
      title: "Implementacija AI v vaše procese",
      content: "Podjetjem ne ponujava le končnih izdelkov, temveč pomagava pri sistemski transformaciji. Implementirava AI orodja neposredno v vaše delovne tokove, s čimer vaši ekipi omogočiva hitrejše ustvarjanje vsebin in avtomatizacijo ponavljajočih se nalog."
    },
    {
      id: "05",
      title: "Spletne rešitve (Web Development)",
      content: "Vaša digitalna izložba mora odražati vašo naprednost. Postaviva vam sodobno spletno stran po meri ali pa izvedeva celovito osvežitev (redesign) stare strani, da bo vizualno in tehnično optimizirana za današnje uporabnike."
    },
    {
      id: "06",
      title: "Human-in-the-Loop Finalizacija",
      content: "Tukaj se zgodi kakovostni preskok. Vsak izdelek gre skozi ročno obdelavo: Korekcija anomalij, High-End Upscaling (povečava za tisk/4K) in profesionalna retuša svetlobe in barv."
    },
    {
      id: "07",
      title: "Agilna dostava",
      content: "Rezultate prejmete v roku 24–48 ur (odvisno od kompleksnosti). Vsebina je pripravljena za takojšnjo uporabo na vseh kanalih, od socialnih omrežij do tiskanih medijev."
    }
  ];

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

      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-20 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luksa-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
          Prihodnost produkcije je <span className="text-luksa-cyan">digitalna.</span><br />
          Vaš prihranek je <span className="text-luksa-purple">realen.</span>
        </h1>
        
        <div className="p-6 border border-white/10 rounded-2xl bg-luksa-card/50 backdrop-blur-sm max-w-4xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-luksa-cyan to-luksa-purple"></div>
            <h3 className="text-xl font-bold text-white mb-2">Luka & Sandra | AI Agencija</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
                Podjetjem pomagava zamenjati drago in zamudno fizično produkcijo za AI agilnost. Ustvarjava hiper-realistične vizuale, digitalne ambasadorje in napredne spletne rešitve, ki zmanjšajo stroške za do 80 %.
            </p>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="container mx-auto px-6 mb-24">
        <div className="mb-12">
            <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-4">
                🛠 Najin delovni proces
            </h2>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-6">
                Od strateške analize do digitalne perfekcije
            </h3>
            <p className="text-gray-400 max-w-3xl leading-relaxed">
                Najin pristop presega zgolj uporabo tehnologije; združuje strateški marketing, napredno inženirstvo pozivov (prompt engineering) in vrhunsko post-produkcijo. Zagotavljava, da končni rezultati niso le "AI generirani", temveč prilagojeni vašim poslovnim ciljem.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* Background connection line for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/5 -z-10"></div>

            {steps.map((step, idx) => (
                <div key={idx} className={`relative group ${idx === steps.length - 1 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}>
                    <div className="bg-luksa-card border border-white/10 p-8 rounded-xl h-full hover:border-luksa-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <div className="text-5xl font-display font-black text-white/5 absolute top-4 right-4 group-hover:text-luksa-cyan/10 transition-colors">
                            {step.id}
                        </div>
                        <h4 className="text-xl font-bold text-luksa-cyan mb-4 pr-8">{step.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                            {step.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-luksa-card border-y border-white/5 py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl font-display text-center text-white mb-16">
                🚀 Kaj prinašava vaši <span className="text-luksa-purple">blagovni znamki?</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "AI Stock po meri", desc: "Unikatna knjižnica slik, ki je nima nobena druga znamka na svetu." },
                    { title: "Social Media Creative", desc: "Dinamično generiranje oglasov za hitro A/B testiranje in optimizacijo konverzij." },
                    { title: "Digitalni Ambasadorji", desc: "Trajna vizualna identiteta brez omejitev klasične produkcije." },
                    { title: "Tehnična Optimizacija", desc: "Spletne strani in procesi, ki delujejo z vašo hitrostjo." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-luksa-dark/50 p-6 rounded-lg border border-luksa-purple/20 text-center hover:bg-luksa-purple/10 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Pricing Section (CENIK) */}
      <div className="container mx-auto px-6 py-24">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
               Transparenten <span className="text-luksa-cyan">Cenik</span>
            </h2>
            <p className="text-gray-400 text-lg">
               Investicija v vašo digitalno prihodnost. Brez skritih stroškov.
            </p>
         </div>
         
         <div className="max-w-5xl mx-auto relative group">
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-luksa-cyan to-luksa-purple opacity-20 blur-2xl rounded-2xl group-hover:opacity-40 transition duration-700"></div>
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-luksa-dark shadow-2xl">
               <img 
                 src="https://storage.googleapis.com/msgsndr/fNDNIwFlvmuqwn6vTTdq/media/6995dc64d614c92d47511064.webp" 
                 alt="LUKSA AI Cenik Storitev" 
                 className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-700"
               />
               
               {/* Overlay gradient at bottom for smooth integration */}
               <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-luksa-dark to-transparent opacity-50 pointer-events-none"></div>
            </div>
         </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Ste pripravljeni na <span className="text-luksa-cyan">80% prihranek</span> in <span className="text-luksa-purple">100% inovacijo?</span>
        </h2>
        <button 
            onClick={onBack} 
            className="px-10 py-4 bg-gradient-to-r from-luksa-cyan to-luksa-purple text-white font-bold rounded-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] transition-all transform hover:scale-105"
        >
            Začnimo projekt
        </button>
      </div>

    </div>
  );
};

export default ServicesPage;