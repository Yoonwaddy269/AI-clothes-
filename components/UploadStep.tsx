
import React, { useCallback, useState } from 'react';

interface UploadStepProps {
  onUpload: (file: File) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12">
      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold">1</div>
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold">2</div>
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold">3</div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Upload Your Product</h2>
        <p className="text-gray-500">Supports PNG, JPG (up to 10MB). Flat lay photos work best.</p>
      </div>

      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group border-3 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer ${
          isDragging ? 'border-purple-500 bg-purple-50 shadow-2xl' : 'border-gray-200 hover:border-purple-300 hover:bg-slate-50'
        }`}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileSelect}
        />
        
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors ${
          isDragging ? 'bg-purple-200' : 'bg-purple-50 group-hover:bg-purple-100'
        }`}>
          <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <p className="text-xl font-semibold text-gray-700 mb-2">Drag and drop your image here</p>
        <p className="text-gray-400 mb-6">or click to browse files</p>
        
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Commercial Use
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            HD Resolution
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadStep;
