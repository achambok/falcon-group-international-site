/**
 * Groq AI Service - Free AI Integration
 * Uses Groq's free API tier for LLM inference
 * No credit card required, 30 requests/minute
 */

export class GroqService {
  private static instance: GroqService;
  private apiKey: string;
  private apiEndpoint = 'https://api.groq.com/openai/v1/chat/completions';

  private constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
  }

  static getInstance() {
    if (!GroqService.instance) {
      GroqService.instance = new GroqService();
    }
    return GroqService.instance;
  }

  async consultStrategy(message: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Groq API key is not configured. Get your free key at https://console.groq.com');
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Updated to a working model
          messages: [
            {
              role: 'system',
              content: `You are the Elite Strategic AI Advisor for Falcon Group International. Your role represents absolute authority, sophistication, and deep technical expertise. Answer inquiries about Cloud Infrastructure, Cyber Risk, and Digital Transformation with professional brevity and high-level strategic insight. 

RESPONSE FORMAT REQUIREMENTS:
- Maximum 3 bullet points
- Each bullet maximum 2 lines
- Use clear, actionable language
- Structure responses with:
  1. Strategic Assessment (1 bullet)
  2. Key Recommendations (1-2 bullets)
- Use professional C-level executive tone
- Be concise, direct, and actionable
- Format with clear line breaks between bullets
- Avoid technical jargon unless absolutely necessary
- Focus on business impact and ROI`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.3, // Lower temperature for more focused, professional responses
          max_tokens: 512, // Reduced for concise responses
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get response from Groq');
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response generated';
    } catch (error: any) {
      console.error('Groq API Error:', error);
      throw new Error(`Groq Error: ${error.message}`);
    }
  }

  async fastChat(message: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Groq API key is not configured');
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.5,
          max_tokens: 512,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Groq');
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response';
    } catch (error: any) {
      throw new Error(`Groq Error: ${error.message}`);
    }
  }

  /**
   * List available Groq models
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }

      const data = await response.json();
      return data.data?.map((m: any) => m.id) || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      return ['mixtral-8x7b-32768', 'llama2-70b-4096'];
    }
  }
}
