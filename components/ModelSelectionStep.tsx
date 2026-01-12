
import React from 'react';
import { Model, PoseType, BackgroundType } from '../types';
import { MODELS } from '../constants.tsx';

interface ModelSelectionStepProps {
  selectedModel: Model;
  onSelectModel: (m: Model) => void;
  selectedPose: PoseType;
  onSelectPose: (p: PoseType) => void;
  selectedBackground: BackgroundType;
  onSelectBackground: (b: BackgroundType) => void;
  onGenerate: () => void;
  onBack: () => void;
}

const ModelSelectionStep: React.FC<ModelSelectionStepProps> = ({
  selectedModel,
  onSelectModel,
  selectedPose,
  onSelectPose,
  selectedBackground,
  onSelectBackground,
  onGenerate,
  onBack
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-12 pb-24">
      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="w-16 h-1 bg-gradient-primary rounded-full"></div>
        <div className="w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold">2</div>
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold">3</div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Model</h2>
        <p className="text-gray-500">Select an AI model that best represents your brand's style.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {MODELS.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelectModel(m)}
            className={`group rounded-3xl overflow-hidden border-2 transition-all text-left bg-white ${
              selectedModel.id === m.id 
              ? 'border-purple-500 shadow-xl shadow-purple-100 ring-2 ring-purple-500/20' 
              : 'border-gray-100 hover:border-purple-200 shadow-sm'
            }`}
          >
            <div className={`aspect-[3/4] bg-gradient-to-br ${m.gradient} flex items-center justify-center relative`}>
              <span className="text-7xl group-hover:scale-110 transition-transform">{m.emoji}</span>
              {selectedModel.id === m.id && (
                <div className="absolute top-3 right-3 bg-purple-600 text-white rounded-full p-1 shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900">{m.name}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{m.category}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Pose Selection */}
        <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-100 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Select Pose
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {(['Standing', 'Walking', 'Sitting'] as PoseType[]).map((p) => (
              <button
                key={p}
                onClick={() => onSelectPose(p)}
                className={`py-3 px-4 rounded-2xl font-semibold text-sm border-2 transition-all ${
                  selectedPose === p 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-purple-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Background Selection */}
        <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-100 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Background
          </h3>
          <div className="flex gap-4">
            <button 
              onClick={() => onSelectBackground('white')}
              className={`w-14 h-14 rounded-2xl border-2 transition-all bg-white ${selectedBackground === 'white' ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-purple-200'}`}
            />
            <button 
              onClick={() => onSelectBackground('gray')}
              className={`w-14 h-14 rounded-2xl border-2 transition-all bg-slate-200 ${selectedBackground === 'gray' ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-purple-200'}`}
            />
            <button 
              onClick={() => onSelectBackground('gradient')}
              className={`w-14 h-14 rounded-2xl border-2 transition-all bg-gradient-to-br from-purple-100 to-pink-100 ${selectedBackground === 'gradient' ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-purple-200'}`}
            />
            <button 
              onClick={() => onSelectBackground('warm')}
              className={`w-14 h-14 rounded-2xl border-2 transition-all bg-amber-50 ${selectedBackground === 'warm' ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-purple-200'}`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button 
          onClick={onBack}
          className="w-full md:w-auto px-10 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:border-purple-300 transition-all"
        >
          Back
        </button>
        <button 
          onClick={onGenerate}
          className="w-full md:w-auto px-12 py-4 bg-gradient-primary text-white rounded-2xl text-lg font-bold shadow-xl shadow-purple-300/50 transition-all hover:scale-105 flex items-center justify-center gap-3"
        >
          Generate Try-On
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModelSelectionStep;
