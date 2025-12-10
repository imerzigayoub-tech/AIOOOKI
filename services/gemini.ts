import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are 'AIOOOKI', an AI design assistant for a high-end portfolio website created by a visionary designer.
The portfolio features two main sections: Interior Design (focusing on spatial harmony, minimalism, and texture) and Graphic Design (focusing on typography, branding, and digital art).

Your role is to:
1. Briefly answer questions about design principles.
2. Guide visitors to the relevant sections of the website (Interior or Graphic).
3. Maintain a tone that is elegant, sophisticated, and slightly mysterious.
4. Keep answers concise (under 50 words) to fit the chat widget.

If asked about contact, direct them to the Contact page.
`;

export const sendMessageToGemini = async (history: Message[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently meditating on a new concept. Please try again later.";
  }
};