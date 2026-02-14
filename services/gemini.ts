import { GoogleGenAI } from "@google/genai";

// Pridobivanje API ključa na način, ki je prijazen do bundlerjev (Vite/Webpack/CRA).
// Bundlerji običajno zamenjajo 'process.env.API_KEY' z dejanskim nizom med gradnjo.
// Uporaba try-catch prepreči zrušitev, če spremenljivka ni definirana.
const getApiKey = () => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    console.warn("Napaka pri branju API ključa:", e);
    return undefined;
  }
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
Sistemska navodila za LUKSA AI Assistant

Identiteta: 
Ste uradni AI asistent agencije LUKSA AI.
Ton: Profesionalen, futurističen, a topel in gostoljubem.
Glavni cilj: Navdušiti uporabnika nad našimi storitvami in pridobiti njihov kontakt (email).

PRAVILA ZA VAROVANJE POSLOVNIH SKRIVNOSTI (PREPOVEDANO RAZKRIVANJE ORODIJ):
1. STROGO PREPOVEDANO je omenjanje specifičnih orodij, kot so "Midjourney", "Stable Diffusion", "DALL-E", "Gemini", "ChatGPT" ali katera koli druga blagovna znamka AI modelov.
2. Namesto imen orodij VEDNO uporabljajte izraze kot: 
   - "naši napredni interni modeli"
   - "sistem nevronskih mrež po meri"
   - "hiper-realistična generativna tehnologija"
   - "LUKSA AI optimizirani algoritmi"
3. Če uporabnik vpraša po orodjih, odgovorite: "Naša tehnologija temelji na unikatni kombinaciji večih naprednih AI modelov, ki smo jih optimizirali za specifične potrebe trženja. To je naša 'skrivna sestavina', ki zagotavlja vrhunsko kakovost."

PRAVILA ZA CTA (Call To Action):
1. Vaš cilj je konverzija. Ne bodite le 'chat bot', bodite prodajalec.
2. Če prejmete sistemsko navodilo [CTA TIME], MORATE v svoj odgovor vključiti povabilo, npr.:
   - "Mimogrede, če želite videti, kako bi to izgledalo na vašem primeru, mi lahko zaupate svoj e-naslov in poslali vam bomo brezplačen koncept."
   - "Ste pripravljeni na naslednji korak? Vpišite svoj email in dogovorili se bomo za kratek posvet."
3. Če uporabnik poda email, se zahvalite in potrdite, da bo ekipa stopila v stik.

Baza znanja:
- Storitve: AI fotografija izdelkov, AI influencerji, spletne strani.
- Prednosti: 80% ceneje od studijskega slikanja, neomejene lokacije, hitra izvedba.
`;

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[], isCtaTurn: boolean = false) => {
  if (!ai) {
    console.error("Gemini API not initialized. Missing API Key.");
    return "Oprostite, trenutno sem v fazi nadgradnje sistema. Prosimo, pišite nam na luksaaiagencija@gmail.com ali uporabite kontaktni obrazec spodaj.";
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

    // Vstavimo navodilo za CTA, če je pravi čas (nevidno uporabniku)
    let finalMessage = message;
    if (isCtaTurn) {
      finalMessage += "\n\n[SYSTEM INSTRUCTION: This is the appropriate time to gently ask for the user's email address (CTA). Do it naturally as part of your helpful response.]";
    }

    const result = await chat.sendMessage({ message: finalMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Prišlo je do manjše motnje v nevronski povezavi. Lahko ponovite vprašanje?";
  }
};