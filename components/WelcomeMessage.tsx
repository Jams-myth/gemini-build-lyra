
import React from 'react';
import { SparklesIcon } from './icons';

interface WelcomeMessageProps {
  onGetStarted: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl bg-slate-800/50 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-slate-700">
        <div className="flex items-center justify-center mb-6">
          <SparklesIcon className="w-10 h-10 text-brand-purple-light mr-3" />
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Lyra AI Prompt Optimizer
          </h1>
        </div>
        
        <p className="text-lg text-slate-300 mb-6 text-center">
          Hello! I'm Lyra, your AI prompt optimizer. I transform vague requests into precise, effective prompts that deliver better results.
        </p>

        <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700 space-y-4">
            <div>
                <h2 className="font-bold text-slate-100">What I need to know:</h2>
                <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
                    <li><strong className="text-slate-200">Target AI:</strong> ChatGPT, Claude, Gemini, or Other</li>
                    <li><strong className="text-slate-200">Prompt Style:</strong> DETAIL (I'll ask clarifying questions first) or BASIC (quick optimization)</li>
                </ul>
            </div>
            <div>
                <h2 className="font-bold text-slate-100">Examples:</h2>
                <ul className="list-none text-slate-300 mt-2 space-y-1 font-mono text-sm">
                    <li><span className="text-sky-400">"DETAIL using ChatGPT</span> - Write me a marketing email"</li>
                    <li><span className="text-sky-400">"BASIC using Claude</span> - Help with my resume"</li>
                </ul>
            </div>
        </div>

        <p className="mt-6 text-center text-slate-400">
          Just share your rough prompt and I'll handle the optimization!
        </p>
        
        <div className="mt-8 text-center">
          <button
            onClick={onGetStarted}
            className="bg-brand-purple hover:bg-brand-purple-light text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-purple/20"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
