
export enum TargetAI {
  ChatGPT = "ChatGPT",
  Claude = "Claude",
  Gemini = "Gemini",
  Other = "Other",
}

export enum OptimizationMode {
  BASIC = "BASIC",
  DETAIL = "DETAIL",
}

export interface BasicOptimizationResult {
  optimizedPrompt: string;
  improvements: string[];
}

export interface DetailOptimizationResult {
  optimizedPrompt: string;
  improvements: string[];
  techniquesApplied: string[];
  proTip: string;
}

export type OptimizationResult = BasicOptimizationResult | DetailOptimizationResult;

export interface ClarifyingQuestionsResult {
    questions: string[];
}
