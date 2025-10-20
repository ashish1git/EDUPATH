
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '../constants';
import type { UserInput, RoadmapResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateRoadmap(userInput: UserInput): Promise<RoadmapResponse> {
  try {
    const userPrompt = `
      Generate my personalized AI/ML career path roadmap for the next ${userInput.timeframe_months} months based on my skills.

      User Input:
      ${JSON.stringify(userInput, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });
    
    const jsonText = response.text.trim();
    const roadmapData: RoadmapResponse = JSON.parse(jsonText);

    return roadmapData;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate roadmap from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the roadmap.");
  }
}
