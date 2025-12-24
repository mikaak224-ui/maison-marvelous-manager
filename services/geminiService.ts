
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketingIdeas = async (topic: string) => {
  try {
    // Fix: Using gemini-3-flash-preview as recommended for basic/complex text tasks in current SDK guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 creative marketing campaign ideas for a luxury wedding and photography business focusing on: ${topic}. Format the output as a clear list with titles and descriptions.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "No ideas generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI marketing ideas.";
  }
};

export const getPerformanceInsights = async (staffData: any) => {
  try {
    // Fix: Using gemini-3-flash-preview for analytical/complex text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following staff performance data and provide a summary of strengths and areas for improvement: ${JSON.stringify(staffData)}`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text || "No insights available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating performance insights.";
  }
};

export const getHashtags = async (description: string) => {
  try {
    // Fix: Using gemini-3-flash-preview for text generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a list of 20 trending and high-conversion hashtags for a luxury wedding/photography post about: ${description}. Group them by category (Niche, Popular, Local).`,
      config: {
        temperature: 0.6,
      }
    });
    return response.text || "No hashtags generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating hashtags.";
  }
};
