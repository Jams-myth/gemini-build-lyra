
import React, { useState, useCallback } from 'react';
import { OptimizationResult, DetailOptimizationResult } from '../types';
import { CopyIcon, CheckIcon, SparklesIcon } from './icons';

interface OutputPanelProps {
  result: OptimizationResult;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(result.optimizedPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result.optimizedPrompt]);
  
  const isDetailResult = (res: OptimizationResult): res is DetailOptimizationResult => 'techniquesApplied' in res;

  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-slate-700 space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-3">Your Optimized Prompt:</h2>
        <div className="relative bg-slate-900/70 p-4 rounded-lg border border-slate-700">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-slate-300 hover:text-white"
            aria-label="Copy prompt"
          >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          </button>
          <p className="text-slate-200 whitespace-pre-wrap font-mono text-sm leading-relaxed pr-10">{result.optimizedPrompt}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-3">What Changed:</h2>
        <ul className="space-y-2">
          {result.improvements.map((improvement, index) => (
            <li key={index} className="flex items-start bg-slate-900/50 p-3 rounded-md">
              <CheckIcon className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <span className="text-slate-300">{improvement}</span>
            </li>
          ))}
        </ul>
      </div>

      {isDetailResult(result) && result.techniquesApplied.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-3">Techniques Applied:</h2>
          <div className="flex flex-wrap gap-2">
            {result.techniquesApplied.map((tech, index) => (
                <span key={index} className="bg-brand-purple/20 text-brand-purple-light text-xs font-semibold px-2.5 py-1 rounded-full border border-brand-purple/50">
                    {tech}
                </span>
            ))}
          </div>
        </div>
      )}
      
      {isDetailResult(result) && result.proTip && (
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-3">Pro Tip:</h2>
           <div className="flex items-start bg-sky-900/50 p-4 rounded-lg border border-sky-700">
              <SparklesIcon className="w-6 h-6 text-sky-400 mr-4 mt-1 flex-shrink-0" />
              <p className="text-sky-200">{result.proTip}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
