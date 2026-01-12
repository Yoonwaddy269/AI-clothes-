
import React, { useState, useEffect } from 'react';

const ProcessingStep: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing clothing fabric...");

  useEffect(() => {
    const statuses = [
      "Analyzing clothing structure...",
      "Matching model anatomy...",
      "Applying physics and drapes...",
      "Rendering high-fidelity textures...",
      "Post-processing lightning...",
      "Finalizing high-res export..."
    ];
    
    let current = 0;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.random() * 10;
        if (p > (current + 1) * (100 / statuses.length)) {
          current++;
          setStatus(statuses[current % statuses.length]);
        }
        return p + step;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 pt-20 text-center">
      <div className="relative w-40 h-40 mx-auto mb-12">
        <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-10 animate-pulse-ring"></div>
        <div className="absolute inset-4 bg-gradient-primary rounded-full opacity-20 animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-50">
          <svg className="w-16 h-16 text-purple-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animationDuration: '3s' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Creating Your Try-On</h2>
      <p className="text-gray-500 mb-10 h-6">{status}</p>

      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-50">
        <div className="flex justify-between text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">
          <span>Processing</span>
          <span className="text-purple-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${progress > 20 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress > 20 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase text-gray-500">Analyze</span>
          </div>
          <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${progress > 55 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress > 55 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase text-gray-500">Fit</span>
          </div>
          <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${progress > 85 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress > 85 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase text-gray-500">Render</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStep;
