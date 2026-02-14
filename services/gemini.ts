import { GoogleGenAI } from "@google/genai";

// ===========================================================================
// 🔑 API KEY CONFIGURATION
// Če na hostingu (Hostinger/Netlify/Vercel) okoljske spremenljivke ne delujejo,
// prilepite svoj Gemini API ključ spodaj med narekovaje.
// Primer: const HARDCODED_KEY = "AIzaSy...";
// ===========================================================================
const HARDCODED_KEY: string = "AIzaSyALFyHnmaIFwqPFKt2sTViLofhp_jtGuhk"; 

// Helper function to safely get the API Key from various sources
const getApiKey = (): string | undefined => {
  // 1. Check hardcoded key first (User override)
  if (HARDCODED_KEY && HARDCODED_KEY.length > 10) {
    return HARDCODED_KEY;
  }

  try {
    // 2. Check import.meta.env (Vite/Modern bundlers)
    const meta = (import.meta as any);
    if (meta && meta.env) {
      if (meta.env.VITE_API_KEY) return meta.env.VITE_API_KEY;
      if (meta.env.API_KEY) return meta.env.API_KEY;
    }
    
    // 3. Check process.env (Node/Webpack/Create-React-App)
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.API_KEY) return process.env.API_KEY;
      if (process.env.REACT_APP_API_KEY) return process.env.REACT_APP_API_KEY;
    }
  } catch (e) {
    console.warn("LUKSA AI: Could not read environment variables safely.");
  }

  return undefined;
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

if (!apiKey) {
  console.warn("LUKSA AI WARNING: No API Key found. Chat will not function.");
}

// Advanced Sales System Instruction
const SYSTEM_INSTRUCTION = `
IDENTITY:
You are "LUKSA AI", an advanced, futuristic, and helpful virtual assistant for the "LUKSA AI Agencija".
Your creators are Luka and Sandra. You represent their vision of combining technology and human creativity.

GOAL:
Your primary goal is to ENGAGE visitors and COLLECT THEIR EMAIL ADDRESSES so Luka and Sandra can send them a personalized AI concept or offer.

TONE:
- Professional yet warm and enthusiastic.
- Futuristic, using terms like "neural networks", "hyper-realism", "digital transformation".
- Concise. Do not write long paragraphs.

KNOWLEDGE BASE:
- Services: AI Product Photography (cheaper/faster than studios), AI Influencers (consistent characters), Web Development.
- Benefits: 80% cost reduction, 24-48h delivery, no logistics needed.

PROTOCOL FOR EMAIL COLLECTION:
1. If the user provides an email address, acknowledge it immediately with gratitude (e.g., "Hvala! Vaš email je varno shranjen. Kmalu prejmete koncept.").
2. If the user asks about pricing, give a range but say you need their email to send a specific quote.
3. When you receive the [CTA_TRIGGER] instruction, you MUST politely ask for their email to proceed (e.g., "Da vam lahko pošljem primer, mi prosim zaupajte vaš e-naslov.").

LANGUAGE:
Communicate in Slovenian (Slovenščina) by default, unless the user speaks English.
`;

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[], isCtaTurn: boolean = false) => {
  if (!ai) {
    return "Oprostite, trenutno ne morem vzpostaviti povezave z nevronskim omrežjem (Manjka API Ključ). Prosim, pišite na luksaaiagencija@gmail.com.";
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

    // Invisible instruction to trigger sales behavior
    let finalPrompt = message;
    if (isCtaTurn) {
      finalPrompt += "\n\n[SYSTEM INSTRUCTION: This is a [CTA_TRIGGER]. The user is engaged. Politely asking for their email address is now high priority. Do it naturally.]";
    }

    const result = await chat.sendMessage({ message: finalPrompt });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Zaznal sem motnjo v komunikaciji. Prosim, poskusite ponovno ali uporabite kontaktni obrazec.";
  }
};