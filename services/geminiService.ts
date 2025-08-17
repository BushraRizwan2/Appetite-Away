import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getMealSuggestion = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable.";
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Based on the following craving: "${prompt}", suggest a single, specific type of food or cuisine. Be creative and concise. For example, if the craving is 'spicy and cheesy', suggest 'Spicy jalapeño pizza'. Only return the name of the food.`,
        config: {
            temperature: 0.8,
            maxOutputTokens: 20,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error getting meal suggestion from Gemini:", error);
    return "Could not get a suggestion at this time.";
  }
};

export const generateMenuItemDescription = async (name: string, category: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured.";
  }
  try {
    const prompt = `Generate a short, delicious-sounding menu item description for a dish named "${name}" in the "${category}" category. The description should be one sentence and enticing for a customer on a food delivery app.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.8,
            maxOutputTokens: 50,
        }
    });
    // Clean up the response by trimming whitespace and removing potential quotation marks
    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Error generating menu description from Gemini:", error);
    return "Could not generate a description at this time.";
  }
};