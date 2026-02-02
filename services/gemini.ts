
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private static instance: GeminiService;
  
  private constructor() {}

  static getInstance() {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private getClient() {
    /**
     * Always use direct import.meta.env.VITE_GEMINI_API_KEY when initializing.
     */
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY is not set in environment");
    }
    return new GoogleGenerativeAI({ apiKey });
  }

  async generateMarketingVisual(prompt: string, size: '1K' | '2K' | '4K' = '1K') {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `High-end enterprise corporate visual for Falcon Group: ${prompt}. Professional, navy and gold accents, sleek digital transformation aesthetic.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  async editBrandAsset(base64Image: string, instruction: string) {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
          { text: `Apply Falcon Group brand guidelines: ${instruction}. Use navy and gold tones, maintain corporate elegance.` }
        ]
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  async analyzeStrategy(content: string) {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this corporate strategy for Falcon Group International and provide executive improvements: ${content}`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  }

  async fastChat(message: string) {
    const ai = this.getClient();
    /**
     * Correct model name for flash lite as per guidelines.
     */
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `You are a consultant for Falcon Group International. Answer concisely: ${message}`
    });
    return response.text;
  }
}
