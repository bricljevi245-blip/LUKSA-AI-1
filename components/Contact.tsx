import React, { useState, useRef } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null as File | null,
    fileName: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // 1. Priprava podatkov za FormSubmit (Email lastniku + AUTO RESPONSE stranki)
      const submitData = new FormData();
      submitData.append('ime', formData.name);
      submitData.append('email', formData.email); // To polje FormSubmit uporabi za odgovor
      submitData.append('sporocilo', formData.message);
      
      // KONFIGURACIJA ZA LASTNIKA
      submitData.append('_subject', '🚀 Novo sporočilo - LUKSA AI Kontakt');
      submitData.append('_template', 'table');
      submitData.append('_captcha', 'false');
      
      // KONFIGURACIJA ZA STRANKO (Auto-Response)
      // To zagotovi, da stranka dobi mail, tudi če GHL zataji
      submitData.append('_autoresponse', 'Vaše sporočilo je bilo uspešno prejeto! Luka in Sandra bosta vašo vizijo pregledala v najkrajšem možnem času.');
      
      if (formData.file) {
        submitData.append('priponka', formData.file);
      }

      // 2. Priprava podatkov za Go High Level (Avtomatizacija)
      const ghlData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: "Contact Form Website"
      };

      // 3. Pošiljanje zahtevkov
      const formSubmitPromise = fetch('https://formsubmit.co/luksaaiagencija@gmail.com', {
        method: 'POST',
        body: submitData,
      });

      // GHL Webhook - pošljemo asinhrono
      fetch('https://services.leadconnectorhq.com/hooks/fNDNIwFlvmuqwn6vTTdq/webhook-trigger/d4e68b19-c441-44d8-93a5-9144d7e011d0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ghlData)
      }).catch(err => console.warn("GHL Webhook Warning:", err));

      const response = await formSubmitPromise;

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', file: null, fileName: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Napaka pri pošiljanju. Preverite internetno povezavo.");
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-24 bg-luksa-dark relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-luksa-card border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-luksa-purple/20 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ste pripravljeni na digitalno <span className="text-luksa-purple">preobrazbo?</span>
            </h2>
            <p className="text-gray-400">
              Izpolnite obrazec spodaj. Odgovoriva v roku 24 ur.
            </p>
          </div>

          {status === 'success' ? (
             <div className="text-center py-12 animate-pulse">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Zahtevek prejet!</h3>
                <p className="text-gray-400">Hvala za zaupanje. Na vaš email smo poslali potrditev prejema.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-luksa-cyan underline hover:text-white">Pošlji novo sporočilo</button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Ime</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-luksa-dark/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-luksa-cyan focus:ring-1 focus:ring-luksa-cyan outline-none transition-all"
                    placeholder="Vaše ime"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">E-pošta</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-luksa-dark/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-luksa-cyan focus:ring-1 focus:ring-luksa-cyan outline-none transition-all"
                    placeholder="janez@podjetje.si"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Sporočilo</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-luksa-dark/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-luksa-cyan focus:ring-1 focus:ring-luksa-cyan outline-none transition-all resize-none"
                  placeholder="Povejte nam o svojem projektu..."
                ></textarea>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300 ml-1">Naloži fotografijo (Opcijsko, max 10MB)</label>
                 <div 
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer group ${
                      formData.file ? 'border-luksa-cyan bg-luksa-cyan/5' : 'border-white/20 hover:border-luksa-purple/50 hover:bg-white/5'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {formData.file ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 bg-luksa-cyan/20 text-luksa-cyan rounded-full flex items-center justify-center">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div className="text-left">
                            <p className="text-white font-medium text-sm">{formData.fileName}</p>
                            <p className="text-xs text-luksa-cyan">Kliknite za zamenjavo</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-2">
                        <svg className="w-8 h-8 text-gray-400 mb-2 group-hover:text-luksa-purple transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-gray-400 text-sm">Kliknite za nalaganje slike ali jo povlecite sem</p>
                      </div>
                    )}
                  </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-luksa-cyan to-luksa-purple text-white font-bold py-4 rounded-lg uppercase tracking-wider hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(188,19,254,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  'Zaženi moj projekt'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;