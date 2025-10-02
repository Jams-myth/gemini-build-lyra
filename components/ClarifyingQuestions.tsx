
import React, { useState } from 'react';

interface ClarifyingQuestionsProps {
  questions: string[];
  onSubmit: (answers: string[]) => void;
}

const ClarifyingQuestions: React.FC<ClarifyingQuestionsProps> = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const allAnswersFilled = answers.every(answer => answer.trim() !== '');

  return (
    <div className="w-full max-w-2xl bg-slate-800/50 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-slate-700 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">Just a few questions...</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`} className="block text-md font-medium text-slate-300 mb-2">
              {question}
            </label>
            <textarea
              id={`question-${index}`}
              rows={2}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full bg-slate-900/70 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-brand-purple-light focus:border-brand-purple-light transition-colors"
              placeholder="Your answer..."
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={!allAnswersFilled}
          className="w-full bg-brand-purple hover:bg-brand-purple-light text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105"
        >
          Submit Answers & Optimize
        </button>
      </form>
    </div>
  );
};

export default ClarifyingQuestions;
