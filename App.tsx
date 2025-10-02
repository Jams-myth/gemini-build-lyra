
import React, { useState, useCallback } from 'react';
import { TargetAI, OptimizationMode, OptimizationResult } from './types';
import { getBasicOptimization, getClarifyingQuestions, getDetailOptimization } from './services/geminiService';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import Loader from './components/Loader';
import ClarifyingQuestions from './components/ClarifyingQuestions';
import WelcomeMessage from './components/WelcomeMessage';
import { SparklesIcon } from './components/icons';

type ViewState = 'welcome' | 'input' | 'clarifying' | 'loading' | 'result' | 'error';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [targetAI, setTargetAI] = useState<TargetAI>(TargetAI.Gemini);
  const [mode, setMode] = useState<OptimizationMode>(OptimizationMode.BASIC);

  const [viewState, setViewState] = useState<ViewState>('welcome');
  const [error, setError] = useState<string | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [clarifyingQuestions, setClarifyingQuestions] = useState<string[] | null>(null);

  const handleOptimize = useCallback(async () => {
    setError(null);
    setViewState('loading');

    try {
      if (mode === OptimizationMode.BASIC) {
        const result = await getBasicOptimization(prompt, targetAI);
        setOptimizationResult(result);
        setViewState('result');
      } else {
        const questionsResult = await getClarifyingQuestions(prompt);
        if (questionsResult && questionsResult.questions.length > 0) {
          setClarifyingQuestions(questionsResult.questions);
          setViewState('clarifying');
        } else {
            // Fallback to basic if no questions are generated
            const result = await getBasicOptimization(prompt, targetAI);
            setOptimizationResult(result);
            setViewState('result');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setViewState('error');
    }
  }, [prompt, targetAI, mode]);
  
  const handleAnswersSubmit = useCallback(async (answers: string[]) => {
      if (!clarifyingQuestions) return;
      
      setError(null);
      setViewState('loading');

      try {
          const result = await getDetailOptimization(prompt, targetAI, clarifyingQuestions, answers);
          setOptimizationResult(result);
          setViewState('result');
      } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
          setViewState('error');
      }
  }, [prompt, targetAI, clarifyingQuestions]);

  const handleStartOver = () => {
    setPrompt('');
    setOptimizationResult(null);
    setError(null);
    setClarifyingQuestions(null);
    setViewState('input');
  }

  const renderContent = () => {
    switch(viewState) {
        case 'welcome':
            return <WelcomeMessage onGetStarted={() => setViewState('input')} />;
        case 'clarifying':
            return <ClarifyingQuestions questions={clarifyingQuestions!} onSubmit={handleAnswersSubmit} />;
        case 'loading':
            return <Loader text="Lyra is thinking..." />;
        case 'result':
            return <OutputPanel result={optimizationResult!} />;
        case 'error':
             return (
                <div className="text-center p-8 bg-red-900/50 rounded-lg border border-red-700">
                    <h2 className="text-2xl font-bold text-red-300 mb-4">Optimization Failed</h2>
                    <p className="text-red-200">{error}</p>
                </div>
            );
        case 'input':
        default:
            return (
                <InputPanel
                    prompt={prompt}
                    setPrompt={setPrompt}
                    targetAI={targetAI}
                    setTargetAI={setTargetAI}
                    mode={mode}
                    setMode={setMode}
                    onSubmit={handleOptimize}
                    isProcessing={viewState === 'loading'}
                />
            );
    }
  }

  if (viewState === 'welcome') {
      return <div className="min-h-screen bg-slate-900">{renderContent()}</div>
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
            <SparklesIcon className="w-8 h-8 text-brand-purple-light mr-2" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Lyra AI Prompt Optimizer
            </h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={viewState !== 'result' ? 'lg:col-span-2' : ''}>
                {(viewState === 'input' || viewState === 'result' || viewState === 'error') && (
                    <InputPanel
                        prompt={prompt}
                        setPrompt={setPrompt}
                        targetAI={targetAI}
                        setTargetAI={setTargetAI}
                        mode={mode}
                        setMode={setMode}
                        onSubmit={handleOptimize}
                        isProcessing={viewState === 'loading'}
                    />
                )}
            </div>
            
            {(viewState !== 'input' && viewState !== 'welcome') && (
                <div className={viewState !== 'result' ? 'lg:col-span-2 flex justify-center' : ''}>
                    {renderContent()}
                </div>
            )}
        </div>
        {(viewState === 'result' || viewState === 'error') && (
            <div className="text-center">
                <button
                    onClick={handleStartOver}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Optimize Another Prompt
                </button>
            </div>
        )}
      </main>
      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>Powered by Gemini. Built for clarity and precision.</p>
      </footer>
    </div>
  );
};

export default App;
