
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-12 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center animate-[slide-up_0.6s_ease-out]">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 text-purple-700 text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Next Gen Virtual Try-On
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Virtual Models for <br />
          <span className="text-gradient">Online Stores</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Transform your clothing photos into realistic model photoshoots instantly. 
          Boost conversions by up to 40% with high-fidelity AI-generated try-ons.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-primary hover:opacity-90 text-white rounded-2xl text-lg font-bold shadow-xl shadow-purple-300/50 transition-all hover:scale-105 flex items-center justify-center gap-3"
          >
            Try for Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 rounded-2xl text-lg font-semibold transition-all hover:border-purple-300">
            Watch Demo
          </button>
        </div>
        
        <div className="flex justify-center items-center gap-8 md:gap-16 opacity-40 mb-24">
          <span className="font-bold text-lg md:text-xl text-gray-500 tracking-wider">SHOPIFY</span>
          <span className="font-bold text-lg md:text-xl text-gray-500 tracking-wider">WOOCOMMERCE</span>
          <span className="font-bold text-lg md:text-xl text-gray-500 tracking-wider">WIX</span>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-100 hover:shadow-xl transition-shadow group">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Product</h3>
          <p className="text-gray-600 leading-relaxed">Simply upload flat-lay or ghost mannequin photos. AI handles the lighting and shadows.</p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-100 hover:shadow-xl transition-shadow group">
          <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Target Audience</h3>
          <p className="text-gray-600 leading-relaxed">Choose from a diverse library of models to match your brand's demographic and style.</p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-100 hover:shadow-xl transition-shadow group">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Ready-to-Use</h3>
          <p className="text-gray-600 leading-relaxed">Receive high-resolution images ready for Shopify, Instagram, and marketing campaigns.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
