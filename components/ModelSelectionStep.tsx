
import React, { useState, useMemo } from 'react';
import { Model, PoseType, BackgroundType, AgeCategory, Gender } from '../types';
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
  const [activeAge, setActiveAge] = useState<AgeCategory>(selectedModel.ageCategory);
  const [activeGender, setActiveGender] = useState<Gender>(selectedModel.gender);

  const filteredModels = useMemo(() => {
    return MODELS.filter(m => m.ageCategory === activeAge && (m.gender === activeGender || activeGender === 'Neutral'));
  }, [activeAge, activeGender]);

  // If active filter renders selectedModel invalid, pick the first available in filter
  React.useEffect(() => {
    if (!filteredModels.find(m => m.id === selectedModel.id)) {
      if (filteredModels.length > 0) {
        onSelectModel(filteredModels[0]);
      }
    }
  }, [filteredModels, selectedModel, onSelectModel]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 pb-24">
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
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Model Customization</h2>
        <p className="text-gray-500">Target your demographic precisely for the best AI generation.</p>
      </div>

      {/* Step 1: Age Category */}
      <div className="mb-10">
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Step 1: Select Age Category</label>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {(['Adult', 'Youth', 'Kids'] as AgeCategory[]).map((age) => (
            <button
              key={age}
              onClick={() => setActiveAge(age)}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
                activeAge === age 
                ? 'border-purple-500 bg-purple-50 shadow-lg scale-105' 
                : 'border-gray-100 bg-white hover:border-purple-200'
              }`}
            >
              <span className="text-3xl">
                {age === 'Adult' ? '👔' : age === 'Youth' ? '🧢' : '🎈'}
              </span>
              <span className={`font-bold ${activeAge === age ? 'text-purple-700' : 'text-gray-600'}`}>{age}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Gender Selection */}
      <div className="mb-10">
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Step 2: Select Gender</label>
        <div className="flex justify-center gap-4">
          {(['Male', 'Female', 'Neutral'] as Gender[]).map((g) => (
            <button
              key={g}
              onClick={() => setActiveGender(g)}
              className={`px-8 py-3 rounded-2xl font-bold text-sm border-2 transition-all ${
                activeGender === g 
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md' 
                : 'border-gray-100 bg-white text-gray-500 hover:border-purple-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Specific Model Select */}
      <div className="mb-12">
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Step 3: Choose Model Persona</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredModels.map((m) => (
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
                <span className="text-4xl group-hover:scale-110 transition-transform">{m.emoji}</span>
                {selectedModel.id === m.id && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1 shadow-lg">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-900 text-sm truncate">{m.name}</h3>
                <p className="text-[8px] text-gray-400 uppercase tracking-widest font-black mt-0.5">{m.ageCategory} • {m.gender}</p>
              </div>
            </button>
          ))}
          {filteredModels.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-400 font-medium">
               No models available for this specific combination. Try a different gender or age group.
             </div>
          )}
        </div>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(['Standing', 'Walking', 'Sitting', 'Playful'] as PoseType[]).map((p) => (
              <button
                key={p}
                onClick={() => onSelectPose(p)}
                className={`py-3 px-2 rounded-2xl font-semibold text-xs border-2 transition-all ${
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
              title="Clean White"
            />
            <button 
              onClick={() => onSelectBackground('gray')}
              className={`w-14 h-14 rounded-2xl border-2 transition-all bg-slate-200 ${selectedBackground === 'gray' ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-purple-200'}`}
              title="Studio Gray"
            />
            <button 
              onClick={() => onSelectBackground('gradient')}
              className={`w-14 h-14 rounded-2xl border-2 transition-all bg-gradient-to-br from-purple-100 to-pink-100 ${selectedBackground === 'gradient' ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-purple-200'}`}
              title="Modern Gradient"
            />
            <button 
              onClick={() => onSelectBackground('warm')}
              className={`w-14 h-14 rounded-2xl border-2 transition-all bg-amber-50 ${selectedBackground === 'warm' ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-100 hover:border-purple-200'}`}
              title="Warm Vibe"
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
          disabled={filteredModels.length === 0}
          className="w-full md:w-auto px-12 py-4 bg-gradient-primary text-white rounded-2xl text-lg font-bold shadow-xl shadow-purple-300/50 transition-all hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
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
