import google from '@google/generative-ai';
import { TTS } from '@xenova/transformers';

// Configure the Google AI API
google.configure({ apiKey: process.env.GOOGLE_AI_API_KEY });

export async function generateResponse(text: string): Promise<string> {
  if (!text) {
    return "Sorry, I didn't catch that. Can you repeat?";
  }

  try {
    const model = google.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(text);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return "I'm sorry, but I couldn't generate a response at this time.";
  }
}

export async function speak(text: string): Promise<string> {
  const tts = await TTS.from_pretrained('Xenova/speecht5_tts');
  const audioBuffer = await tts(text);
  return Buffer.from(audioBuffer).toString('base64');
}

