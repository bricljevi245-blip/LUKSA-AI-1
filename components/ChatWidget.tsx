import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Pozdravljeni! 👋 Sem LUKSA AI. Želite videti, kako lahko vaš izdelek postavim na luno ali v pariški atelje? Vprašajte me karkoli." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  // Regex for basic email validation
  const containsEmail = (text: string) => {
    return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    setHasInteracted(true);
    
    // Optimistic UI update
    const newMessages = [...messages, { role: 'user', text: userMsg } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    // Email Capture Logic
    if (containsEmail(userMsg) && !emailCaptured) {
      setEmailCaptured(true);
      setShowEmailSuccess(true);
      // In a real app, you would send this to your backend here
      console.log("🎯 LEAD CAPTURED:", userMsg);
      setTimeout(() => setShowEmailSuccess(false), 3000);
    }

    try {
      // CTA Logic: Trigger every 3rd message if we don't have an email yet
      const userMsgCount = newMessages.filter(m => m.role === 'user').length;
      const isCtaTurn = !emailCaptured && (userMsgCount > 0) && (userMsgCount % 3 === 0);

      // Prepare history (excluding the message we are about to send via the turn)
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userMsg, history, isCtaTurn);
      
      setMessages(prev => [...prev, { role: 'model', text: responseText || "Napaka pri povezavi." }]);
    } catch (e) {
      console.error("Chat Error:", e);
      setMessages(prev => [...prev, { role: 'model', text: "Oprostite, trenutno ne morem vzpostaviti povezave." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end font-sans print:hidden">
      
      {/* Email Success Notification */}
      {showEmailSuccess && (
        <div className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="text-sm font-bold">Email uspešno shranjen!</span>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-[380px] h-[500px] md:h-[600px] bg-luksa-dark/95 backdrop-blur-xl border border-luksa-cyan/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right transition-all">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-luksa-card to-black/80 border-b border-white/10 p-4 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-luksa-cyan/5 animate-pulse"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 absolute right-0 bottom-0 border border-luksa-dark shadow-[0_0_8px_#4ade80]"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luksa-cyan to-luksa-purple p-[1px]">
                  <div className="w-full h-full rounded-full bg-luksa-dark flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                </div>
              </div>
              <div>
                 <h3 className="font-display font-bold text-white tracking-wide">LUKSA AI</h3>
                 <p className="text-[10px] text-luksa-cyan uppercase tracking-wider font-semibold">Virtualni Asistent</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-luksa-purple/30 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                {msg.role === 'model' && (
                   <div className="w-6 h-6 rounded-full bg-luksa-purple/20 flex-shrink-0 mr-2 mt-2 flex items-center justify-center border border-luksa-purple/30">
                      <span className="text-[10px] text-luksa-purple font-bold">AI</span>
                   </div>
                )}
                <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-md backdrop-blur-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-luksa-cyan to-blue-600 text-white font-medium rounded-br-none shadow-[0_4px_15px_rgba(0,240,255,0.2)]' 
                    : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                 <div className="w-6 h-6 mr-2"></div>
                 <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-none p-4 flex gap-1.5 items-center w-16">
                  <div className="w-1.5 h-1.5 bg-luksa-cyan rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-luksa-cyan rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-luksa-cyan rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-luksa-dark border-t border-white/10">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={emailCaptured ? "Vpišite sporočilo..." : "Vpišite sporočilo (ali vaš email)..."}
                className="w-full bg-luksa-card border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-luksa-cyan/50 focus:ring-1 focus:ring-luksa-cyan/50 transition-all placeholder-gray-500 shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 p-2 bg-gradient-to-r from-luksa-cyan to-blue-500 rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              >
                <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
            <div className="text-center mt-3">
                <span className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-luksa-cyan animate-pulse"></span>
                  LUKSA Neural Network
                </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
         {!isOpen && (
            <div className="absolute -top-14 right-0 bg-white text-luksa-dark text-xs font-bold px-4 py-2 rounded-xl shadow-xl mb-2 whitespace-nowrap animate-bounce origin-bottom-right z-50">
               <span className="relative z-10">Tukaj sem za vprašanja! 👋</span>
               <div className="absolute bottom-[-6px] right-5 w-4 h-4 bg-white rotate-45 transform skew-x-12"></div>
            </div>
         )}
        <button 
            onClick={() => {
                setIsOpen(!isOpen);
                setHasInteracted(true);
            }}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 z-[100] ${isOpen ? 'bg-luksa-dark border border-luksa-cyan rotate-90' : 'bg-gradient-to-br from-luksa-cyan to-luksa-purple hover:scale-110 animate-pulse-slow'}`}
        >
            {isOpen ? (
            <svg className="w-6 h-6 text-luksa-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
            <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;