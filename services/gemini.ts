import { GoogleGenAI } from "@google/genai";

// ---------------------------------------------------------------------------
// NAVODILA ZA NAMESTITEV API KLJUČA (HOSTINGER / STATIC HOSTING):
// Če vaše okoljske spremenljivke ne delujejo, prilepite svoj Gemini API ključ
// neposredno spodaj med narekovaje.
// Primer: const HARDCODED_KEY = "AIzaSy...";
// ---------------------------------------------------------------------------
const HARDCODED_KEY: string = ""; 

// Varno pridobivanje API ključa za različna okolja
const getApiKey = (): string | undefined => {
  // 1. Prednost ima ročno vnesen ključ (najhitrejša rešitev za uporabnika)
  if (HARDCODED_KEY && HARDCODED_KEY.length > 10) {
    return HARDCODED_KEY;
  }

  try {
    // 2. Preverjanje Vite / Modern Frontend standarda (import.meta.env)
    // Uporabimo 'as any', da TypeScript ne javlja napak, če types niso nastavljeni
    const meta = (import.meta as any);
    if (meta && meta.env) {
      if (meta.env.VITE_API_KEY) return meta.env.VITE_API_KEY;
      if (meta.env.API_KEY) return meta.env.API_KEY;
    }
    
    // 3. Preverjanje Node / Webpack standarda (process.env)
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.API_KEY) return process.env.API_KEY;
      if (process.env.REACT_APP_API_KEY) return process.env.REACT_APP_API_KEY;
    }
  } catch (e) {
    console.warn("Napaka pri branju okoljskih spremenljivk:", e);
  }

  // Če nič od zgoraj ne deluje, vrnemo undefined
  return undefined;
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Sistemska navodila za AI
const SYSTEM_INSTRUCTION = `
VLOGA: Ste "LUKSA AI Asistent", napreden AI prodajni svetovalec za agencijo LUKSA AI.
CILJ: Vaša primarna naloga je navdušiti obiskovalca in PRIDOBITI NJEGOV E-MAIL NASLOV za pošiljanje ponudbe ali primera.

TON KOMUNIKACIJE:
- Futurističen, a prijazen.
- Kratek, jedrnat in usmerjen v akcijo.
- Uporabljajte emojije zmerno (🚀, ✨, 🤖).

PRAVILA:
1. Ne omenjajte tehničnih imen modelov (Gemini, GPT, itd.). Recite "naši nevro-algoritmi".
2. ČE UPORABNIK VPIŠE EMAIL: Se toplo zahvalite in potrdite, da je shranjen.
3. ČE UPORABNIK VPRAŠA ZA CENO: Povejte okvirno ("do 80% ceneje od studia"), a poudarite, da za točen izračun potrebujete opis projekta in kontakt.
4. "CTA TIME": Ko sistem javi, da je čas za CTA, recite nekaj takega: "Da vam lahko pošljem ta koncept, mi prosim zaupajte vaš e-naslov."

STORITVE:
- AI Produktna fotografija (brez pošiljanja izdelkov).
- AI Influencerji (konsistentni liki).
- Spletne strani prihodnosti.
`;

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[], isCtaTurn: boolean = false) => {
  // Preverjanje inicializacije
  if (!ai) {
    console.error("Gemini API Key missing.");
    return "Oprostite, povezava z AI jedrom ni vzpostavljena. (Manjka API Ključ - preverite services/gemini.ts)";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: h.parts
      }))
    });

    // Dodajanje skritega navodila za CTA, če je pravi čas
    let finalPrompt = message;
    if (isCtaTurn) {
      finalPrompt += "\n\n[SYSTEM INSTRUCTION: Now is the perfect moment to ask for the user's email address naturally. Do it.]";
    }

    const result = await chat.sendMessage({ message: finalPrompt });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Zaznal sem motnjo v komunikaciji. Prosim, poskusite ponovno.";
  }
};
