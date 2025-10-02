
import React from 'react';

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-800/50 rounded-lg">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-brand-purple-light border-t-transparent"></div>
      <p className="text-slate-300 text-lg font-medium">{text}</p>
    </div>
  );
};

export default Loader;
