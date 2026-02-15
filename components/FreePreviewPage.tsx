import React, { useEffect, useState, useRef } from 'react';

interface FreePreviewPageProps {
  onBack: () => void;
}

const FreePreviewPage: React.FC<FreePreviewPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    file: null as File | null,
    fileName: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("Datoteka je prevelika. Največja dovoljena velikost je 10MB.");
        return;
      }
      setFormData({ ...formData, file: file, fileName: file.name });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
       const file = e.dataTransfer.files[0];
       if (file.size > 10 * 1024 * 1024) {
        alert("Datoteka je prevelika. Največja dovoljena velikost je 10MB.");
        return;
       }
       setFormData({ ...formData, file: file, fileName: file.name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Besedilo za avtomatski odgovor
      const autoResponseText = `Spoštovani,

zahvaljujemo se vam za vaše sporočilo in zanimanje za storitve agencije Luksa Ai.

Vaše povpraševanje smo uspešno prejeli. Naša ekipa si bo vzela čas in skrbno pregledala vaše specifične potrebe, saj verjamemo, da vsaka implementacija umetne inteligence zahteva premišljen in strokovno podkovan pristop. Naš cilj je poiskati rešitve, ki bodo vaši organizaciji prinesle največjo dodano vrednost in optimizirale vaše delovne procese.

Na vaše sporočilo bomo odgovorili v najkrajšem možnem času – običajno v roku 24 ur. V kolikor gre za nujno zadevo, nam lahko odgovorite na to e-pošto z dodatnimi podrobnostmi.

Medtem ko čakate na naš odgovor, vas vabimo, da obiščete našo spletno stran in si ogledate naše najnovejše projekte ter vpoglede v prihodnost AI tehnologij.

Z lepimi pozdravi,

Ekipa LUKSA AI`;

      // 1. Priprava za FormSubmit
      const submitData = new FormData();
      submitData.append('ime', formData.name);
      submitData.append('email', formData.email);
      submitData.append('opis_ideje', formData.description);
      submitData.append('_subject', '✨ Zahteva za Brezplačen AI Predogled - LUKSA AI');
      submitData.append('_template', 'table');
      submitData.append('_captcha', 'false');
      submitData.append('_autoresponse', autoResponseText);

      if (formData.file) {
        submitData.append('slika_izdelka', formData.file);
      }

      // 2. Priprava za GHL (Workflow Automation)
      const ghlData = {
        name: formData.name,
        full_name: formData.name,
        email: formData.email,
        description: formData.description,
        source: "Free Preview Form Website",
        tags: ["website-lead", "free-preview"]
      };

      // 3. Pošiljanje - FormSubmit
      const formSubmitPromise = fetch('https://formsubmit.co/luksaaiagencija@gmail.com', {
        method: 'POST',
        body: submitData, 
      });

      // 4. Pošiljanje - GHL Webhook ('no-cors' mode)
      fetch('https://services.leadconnectorhq.com/hooks/fNDNIwFlvmuqwn6vTTdq/webhook-trigger/d4e68b19-c441-44d8-93a5-9144d7e011d0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(ghlData)
      }).catch(err => console.warn("GHL Webhook Warning:", err));

      const response = await formSubmitPromise;

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setFormData({ name: '', email: '', description: '', file: null, fileName: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Napaka pri pošiljanju. Prosimo poskusite ponovno.");
      setStatus('idle');
    }
  };

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

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-12">
             <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
               Brezplačen <span className="text-transparent bg-clip-text bg-gradient-to-r from-luksa-cyan to-luksa-purple">AI Predogled</span>
             </h1>
             <p className="text-gray-400 text-lg leading-relaxed">
               Naložite sliko svojega izdelka, opišite svojo vizijo in dovolite, da vam pokaževa moč LUKSA AI.
             </p>
          </div>

          <div className="bg-luksa-card border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-luksa-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>

             {status === 'success' ? (
                <div className="text-center py-12 animate-pulse">
                   <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-400 mb-6 border border-green-500/30">
                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">Zahtevek uspešno poslan!</h3>
                   <p className="text-gray-400 mb-8">
                     Preverite vaš email predal za potrditev.
                   </p>
                   <button 
                     onClick={() => setStatus('idle')} 
                     className="px-6 py-3 border border-luksa-cyan text-luksa-cyan rounded hover:bg-luksa-cyan hover:text-luksa-dark transition-colors"
                   >
                     Pošlji nov zahtevek
                   </button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${
                      formData.file ? 'border-luksa-cyan bg-luksa-cyan/5' : 'border-white/20 hover:border-luksa-purple/50 hover:bg-white/5'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {formData.file ? (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-luksa-cyan/20 text-luksa-cyan rounded-full flex items-center justify-center mb-3">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-white font-medium">{formData.fileName}</p>
                        <p className="text-xs text-luksa-cyan mt-2">Kliknite za zamenjavo</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-white/10 text-gray-400 rounded-full flex items-center justify-center mb-3 group-hover:text-luksa-purple group-hover:bg-luksa-purple/20 transition-colors">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="text-gray-300 font-medium mb-1">Kliknite za nalaganje ali povlecite sliko sem</p>
                        <p className="text-xs text-gray-500">Podprti formati: JPG, PNG (max 10MB)</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Vaša ideja / Opis želje</label>
                        <textarea 
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full bg-luksa-dark/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-luksa-cyan focus:ring-1 focus:ring-luksa-cyan outline-none transition-all resize-none h-32"
                          placeholder="Npr: Želim, da moj izdelek stoji na površini Marsa..."
                        ></textarea>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">Ime</label>
                           <input 
                             type="text" 
                             required
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             className="w-full bg-luksa-dark/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-luksa-cyan focus:ring-1 focus:ring-luksa-cyan outline-none transition-all"
                             placeholder="Vaše ime"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">E-pošta</label>
                           <input 
                             type="email" 
                             required
                             value={formData.email}
                             onChange={(e) => setFormData({...formData, email: e.target.value})}
                             className="w-full bg-luksa-dark/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-luksa-cyan focus:ring-1 focus:ring-luksa-cyan outline-none transition-all"
                             placeholder="vas@email.com"
                           />
                        </div>
                     </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-luksa-cyan to-luksa-purple text-white font-bold py-4 rounded-lg uppercase tracking-wider hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Obdelava...
                      </>
                    ) : (
                      'Generiraj brezplačen predogled'
                    )}
                  </button>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreePreviewPage;