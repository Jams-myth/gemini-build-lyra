
import { GoogleGenAI, Type } from "@google/genai";
import { TargetAI, OptimizationMode, ClarifyingQuestionsResult, BasicOptimizationResult, DetailOptimizationResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `You are Lyra, an expert AI prompt optimizer. Your goal is to transform vague or ineffective prompts into precise, structured prompts that yield better AI responses. You follow a proven 4D framework: DECONSTRUCT, DIAGNOSE, DEVELOP, DELIVER. You will always respond in the JSON format specified.`;

const basicResponseSchema = {
    type: Type.OBJECT,
    properties: {
        optimizedPrompt: { type: Type.STRING, description: "The fully optimized, ready-to-use prompt." },
        improvements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key improvements made to the original prompt." },
    },
    required: ["optimizedPrompt", "improvements"],
};

const detailResponseSchema = {
    type: Type.OBJECT,
    properties: {
        optimizedPrompt: { type: Type.STRING, description: "The comprehensively optimized, ready-to-use prompt." },
        improvements: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of primary changes and their benefits." },
        techniquesApplied: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of specific optimization techniques that were used." },
        proTip: { type: Type.STRING, description: "A professional tip for using the optimized prompt or for future prompt crafting." },
    },
    required: ["optimizedPrompt", "improvements", "techniquesApplied", "proTip"],
};

const questionsResponseSchema = {
    type: Type.OBJECT,
    properties: {
        questions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 2-3 targeted, clarifying questions for the user." },
    },
    required: ["questions"],
};


export const getClarifyingQuestions = async (prompt: string): Promise<ClarifyingQuestionsResult> => {
    const userMessage = `I am in DETAIL mode. My prompt is: "${prompt}". To provide a comprehensive optimization, I need more context. Generate 2-3 targeted, clarifying questions to ask me.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: userMessage,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: questionsResponseSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as ClarifyingQuestionsResult;
    } catch (e) {
        console.error("Failed to parse clarifying questions JSON:", e);
        throw new Error("Could not get clarifying questions from the AI.");
    }
};

export const getBasicOptimization = async (prompt: string, targetAI: TargetAI): Promise<BasicOptimizationResult> => {
    const userMessage = `My prompt is: "${prompt}". The target AI is ${targetAI}. Optimize this prompt in BASIC mode (quick fixes, core improvements).`;
    
    const response = await ai.models.generateContent({
        model,
        contents: userMessage,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: basicResponseSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as BasicOptimizationResult;
    } catch (e) {
        console.error("Failed to parse basic optimization JSON:", e);
        throw new Error("Could not get basic optimization from the AI.");
    }
};

export const getDetailOptimization = async (prompt: string, targetAI: TargetAI, questions: string[], answers: string[]): Promise<DetailOptimizationResult> => {
    const qaPairs = questions.map((q, i) => `Question: ${q}\nAnswer: ${answers[i]}`).join('\n\n');
    const userMessage = `My original prompt was: "${prompt}".\n\nYou asked me the following questions and I provided these answers:\n${qaPairs}\n\nThe target AI is ${targetAI}. Now, perform a comprehensive optimization using the 4D framework. Provide detailed explanations, mention techniques applied, and give a pro tip.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: userMessage,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: detailResponseSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as DetailOptimizationResult;
    } catch (e) {
        console.error("Failed to parse detail optimization JSON:", e);
        throw new Error("Could not get detailed optimization from the AI.");
    }
};
