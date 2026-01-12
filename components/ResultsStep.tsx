
import React from 'react';

interface ResultsStepProps {
  original: string;
  result: string;
  modelName: string;
  onRestart: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ original, result, modelName, onRestart }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-24">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Generation Complete
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Your Try-On is Ready!</h2>
        <p className="text-gray-500">Professional AI model photography for your store.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Original */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-gray-100 border border-gray-100 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Original Product</span>
            <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-500 border border-gray-100">SOURCE</span>
          </div>
          <div className="aspect-[3/4] bg-gray-50 rounded-3xl overflow-hidden relative">
            <img src={original} alt="Original" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          </div>
        </div>

        {/* Result */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl shadow-purple-200/50 border border-purple-100 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-purple-600 uppercase tracking-widest">AI Result</span>
            <span className="px-3 py-1 bg-gradient-primary rounded-full text-[10px] font-bold text-white shadow-lg">HIGH FIDELITY</span>
          </div>
          <div className="aspect-[3/4] bg-purple-50 rounded-3xl overflow-hidden relative group">
            <img src={result} alt="Result" className="w-full h-full object-cover animate-fade-in" />
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800">{modelName} Model</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={() => {
            const link = document.createElement('a');
            link.href = result;
            link.download = `vogueai-${Date.now()}.png`;
            link.click();
          }}
          className="w-full sm:w-auto px-10 py-5 bg-gradient-primary text-white rounded-2xl text-lg font-bold shadow-2xl shadow-purple-300 transition-all hover:scale-105 flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download HD Result
        </button>
        <button 
          onClick={onRestart}
          className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl text-lg font-bold hover:border-purple-300 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Try Another Product
        </button>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-gray-100 pt-12">
        <div className="text-center">
          <div className="text-3xl font-black text-gradient">2.3s</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Render Time</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-gradient">4K</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Resolution</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-gradient">98%</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Realism Score</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;
