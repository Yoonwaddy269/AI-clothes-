
import React, { useState, useEffect, useCallback } from 'react';
import { Step, Model, UploadedImage, HistoryItem, PoseType, BackgroundType } from './types';
import { MODELS, APP_NAME } from './constants.tsx';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import UploadStep from './components/UploadStep';
import ModelSelectionStep from './components/ModelSelectionStep';
import ProcessingStep from './components/ProcessingStep';
import ResultsStep from './components/ResultsStep';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import { generateVirtualTryOn } from './services/geminiService';

const App: React.FC = () => {
  // Navigation & UI State
  const [currentStep, setCurrentStep] = useState<Step>(Step.LANDING);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Functional State
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);
  const [selectedPose, setSelectedPose] = useState<PoseType>('Standing');
  const [selectedBackground, setSelectedBackground] = useState<BackgroundType>('white');
  const [resultImage, setResultImage] = useState<string | null>(null);
  
  // Storage
  const [uploads, setUploads] = useState<UploadedImage[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStart = () => {
    setCurrentStep(Step.UPLOAD);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const newUpload: UploadedImage = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        dataUrl,
        date: new Date().toLocaleDateString()
      };
      setUploadedImage(newUpload);
      setUploads(prev => [newUpload, ...prev]);
      setCurrentStep(Step.MODEL_SELECT);
      showToast("Image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;
    
    setCurrentStep(Step.PROCESSING);
    
    try {
      const generated = await generateVirtualTryOn(
        uploadedImage.dataUrl,
        selectedModel.name,
        selectedPose,
        selectedBackground
      );
      
      setResultImage(generated);
      
      const historyItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        originalImage: uploadedImage.dataUrl,
        resultImage: generated,
        modelName: selectedModel.name,
        date: new Date().toLocaleString(),
        status: 'completed'
      };
      
      setHistory(prev => [historyItem, ...prev]);
      setCurrentStep(Step.RESULTS);
      showToast("Fashion model generated!");
    } catch (error) {
      showToast("Generation failed. Please try again.", "error");
      setCurrentStep(Step.MODEL_SELECT);
    }
  };

  const resetFlow = () => {
    setUploadedImage(null);
    setResultImage(null);
    setCurrentStep(Step.UPLOAD);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-x-hidden">
      <Header 
        onHome={() => setCurrentStep(Step.LANDING)}
        onAdmin={() => {
            if (isAdmin) setCurrentStep(Step.ADMIN);
            else setIsAuthModalOpen(true);
        }}
        onSignIn={() => setIsAuthModalOpen(true)}
      />

      <main className="flex-grow pt-20">
        {currentStep === Step.LANDING && (
          <LandingPage onStart={handleStart} />
        )}

        {currentStep === Step.UPLOAD && (
          <UploadStep onUpload={handleImageUpload} />
        )}

        {currentStep === Step.MODEL_SELECT && (
          <ModelSelectionStep 
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            selectedPose={selectedPose}
            onSelectPose={setSelectedPose}
            selectedBackground={selectedBackground}
            onSelectBackground={setSelectedBackground}
            onGenerate={handleGenerate}
            onBack={() => setCurrentStep(Step.UPLOAD)}
          />
        )}

        {currentStep === Step.PROCESSING && (
          <ProcessingStep />
        )}

        {currentStep === Step.RESULTS && resultImage && (
          <ResultsStep 
            original={uploadedImage?.dataUrl || ''}
            result={resultImage}
            modelName={selectedModel.name}
            onRestart={resetFlow}
          />
        )}

        {currentStep === Step.ADMIN && (
          <AdminDashboard 
            uploads={uploads} 
            history={history}
            onDeleteUpload={(id) => setUploads(prev => prev.filter(u => u.id !== id))}
          />
        )}
      </main>

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={(success, admin) => {
            if (success) {
              setIsAdmin(admin);
              setIsAuthModalOpen(false);
              if (admin) setCurrentStep(Step.ADMIN);
              showToast(admin ? "Admin access granted" : "Successfully signed in");
            }
          }}
        />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default App;
