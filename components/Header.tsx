
import React from 'react';
import { APP_NAME } from '../constants.tsx';

interface HeaderProps {
  onHome: () => void;
  onAdmin: () => void;
  onSignIn: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome, onAdmin, onSignIn }) => {
  return (
    <header className="fixed top-0 w-full glass-effect border-b border-gray-100/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={onHome}>
          <div className="bg-gradient-primary p-2 rounded-xl shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gradient">{APP_NAME}</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <button className="hover:text-purple-600 transition-colors">How it Works</button>
          <button className="hover:text-purple-600 transition-colors">Pricing</button>
          <button className="hover:text-purple-600 transition-colors">Examples</button>
        </nav>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onAdmin}
            className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-full text-xs font-semibold hover:border-purple-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin
          </button>
          <button 
            onClick={onSignIn}
            className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
