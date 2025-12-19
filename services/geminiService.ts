
import { GoogleGenAI, Type } from "@google/genai";
import { DifficultyLevel, Question, AssessmentResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateNextQuestion(topic: string, currentLevel: DifficultyLevel, previousPerformance: string): Promise<Question> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a multiple choice question in Arabic for the topic "${topic}". 
      The current student level is ${currentLevel}. 
      Previous performance context: ${previousPerformance}.
      Make the question adaptively harder or easier based on the context.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
            difficulty: { type: Type.STRING, enum: Object.values(DifficultyLevel) },
            skillArea: { type: Type.STRING }
          },
          required: ["id", "text", "options", "correctAnswer", "difficulty", "skillArea"]
        }
      }
    });

    return JSON.parse(response.text);
  },

  async analyzeAssessment(topic: string, answers: any[]): Promise<AssessmentResult> {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze these assessment results for topic "${topic}". 
      Answers: ${JSON.stringify(answers)}.
      Based on SFIA and WEF standards, calculate:
      1. Overall Level.
      2. Skill Gaps (Current vs Target vs Market Demand in 3-5 years).
      3. Recommend specific training modules.
      Respond in Arabic for text fields.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            level: { type: Type.STRING, enum: Object.values(DifficultyLevel) },
            skillGaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  currentLevel: { type: Type.NUMBER },
                  targetLevel: { type: Type.NUMBER },
                  marketDemand: { type: Type.NUMBER },
                  futureGrowth: { type: Type.NUMBER }
                },
                required: ["skill", "currentLevel", "targetLevel", "marketDemand", "futureGrowth"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  link: { type: Type.STRING },
                  level: { type: Type.STRING }
                },
                required: ["title", "description", "duration", "link", "level"]
              }
            }
          },
          required: ["score", "level", "skillGaps", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  }
};
