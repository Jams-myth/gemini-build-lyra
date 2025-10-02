
import { TargetAI, OptimizationMode } from './types';

export const AI_OPTIONS: TargetAI[] = [
  TargetAI.Gemini,
  TargetAI.ChatGPT,
  TargetAI.Claude,
  TargetAI.Other,
];

export const MODE_OPTIONS: { value: OptimizationMode; label: string; description: string }[] = [
  {
    value: OptimizationMode.BASIC,
    label: 'Basic',
    description: 'Quick fixes and core improvements.',
  },
  {
    value: OptimizationMode.DETAIL,
    label: 'Detail',
    description: 'Asks clarifying questions for a comprehensive optimization.',
  },
];
