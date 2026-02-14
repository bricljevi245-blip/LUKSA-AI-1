import React from 'react';

const Services: React.FC = () => {
  const features = [
    {
      title: "Fotorealistične kampanje",
      desc: "Vaš izdelek v katerem koli okolju, kjer koli na svetu.",
      icon: (
        <svg className="w-8 h-8 text-luksa-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      )
    },
    {
      title: "Futuristične vizualizacije",
      desc: "Nemogoči posnetki postanejo mogoči z AI.",
      icon: (
        <svg className="w-8 h-8 text-luksa-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
      )
    },
    {
      title: "Vsebine za družbena omrežja",
      desc: "Visoko učinkovite vizualije, dostavljene v urah, ne tednih.",
      icon: (
        <svg className="w-8 h-8 text-luksa-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      )
    },
    {
      title: "Izdelava Spletnih Strani",
      desc: "Od naprednega urejanja obstoječih strani do postavljanja popolnoma novih, digitalnih arhitektur, ki dominirajo na spletu.",
      icon: (
        <svg className="w-8 h-8 text-luksa-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.15)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Zakaj izbrati <span className="text-luksa-cyan">LUKSA AI?</span></h2>
          <p className="text-gray-400 text-lg">
             Pozabite na drage studie in tedne čakanja. Tradicionalna produkcija zahteva logistiko, iskanje lokacij in ogromne proračune. Pri LUKSA AI potrebujemo le fotografijo vašega izdelka.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-2xl bg-luksa-card border border-white/5 hover:border-luksa-cyan/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {feature.icon}
              </div>
              
              <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block group-hover:bg-luksa-cyan/10 transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-luksa-cyan transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;