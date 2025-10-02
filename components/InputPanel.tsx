
import React from 'react';
import { TargetAI, OptimizationMode } from '../types';
import { AI_OPTIONS, MODE_OPTIONS } from '../constants';

interface InputPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  targetAI: TargetAI;
  setTargetAI: (ai: TargetAI) => void;
  mode: OptimizationMode;
  setMode: (mode: OptimizationMode) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ prompt, setPrompt, targetAI, setTargetAI, mode, setMode, onSubmit, isProcessing }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt-input" className="block text-lg font-semibold text-slate-100 mb-2">
            Your Prompt
          </label>
          <textarea
            id="prompt-input"
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your vague or ineffective prompt here..."
            className="w-full bg-slate-900/70 border border-slate-600 rounded-lg p-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-brand-purple-light focus:border-brand-purple-light transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="target-ai" className="block text-lg font-semibold text-slate-100 mb-2">
              Target AI
            </label>
            <select
              id="target-ai"
              value={targetAI}
              onChange={(e) => setTargetAI(e.target.value as TargetAI)}
              className="w-full bg-slate-900/70 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-brand-purple-light focus:border-brand-purple-light transition-colors"
            >
              {AI_OPTIONS.map((ai) => (
                <option key={ai} value={ai}>
                  {ai}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Mode</h3>
            <div className="flex bg-slate-900/70 rounded-lg p-1 border border-slate-600">
              {MODE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMode(option.value)}
                  className={`w-1/2 py-2 text-sm font-bold rounded-md transition-colors ${
                    mode === option.value
                      ? 'bg-brand-purple text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                  title={option.description}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isProcessing}
          className="w-full bg-brand-purple hover:bg-brand-purple-light text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg shadow-brand-purple/20"
        >
          {isProcessing ? 'Optimizing...' : 'Optimize Prompt'}
        </button>
      </form>
    </div>
  );
};

export default InputPanel;
