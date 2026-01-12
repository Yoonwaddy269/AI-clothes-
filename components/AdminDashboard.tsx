
import React, { useState } from 'react';
import { UploadedImage, HistoryItem } from '../types';

interface AdminDashboardProps {
  uploads: UploadedImage[];
  history: HistoryItem[];
  onDeleteUpload: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ uploads, history, onDeleteUpload }) => {
  const [activeTab, setActiveTab] = useState<'uploads' | 'history'>('uploads');

  return (
    <div className="max-w-7xl mx-auto px-4 pt-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-500">Manage your assets and generation history.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
          <button 
            onClick={() => setActiveTab('uploads')}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'uploads' ? 'bg-gradient-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            My Uploads ({uploads.length})
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-gradient-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            History ({history.length})
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Uploads', value: uploads.length, icon: '📦', color: 'bg-blue-50 text-blue-600' },
          { label: 'Try-Ons Generated', value: history.length, icon: '✨', color: 'bg-purple-50 text-purple-600' },
          { label: 'Avg Success Rate', value: '98%', icon: '📈', color: 'bg-green-50 text-green-600' },
          { label: 'Credits Remaining', value: '1,452', icon: '💎', color: 'bg-amber-50 text-amber-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-100 border border-gray-50">
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-xl mb-4`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 min-h-[400px]">
        {activeTab === 'uploads' ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold text-gray-900">Your Product Library</h3>
              <button className="text-sm font-bold text-purple-600 hover:underline">Download All</button>
            </div>
            
            {uploads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <div className="text-6xl mb-4">📂</div>
                <p className="font-bold">No uploads found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {uploads.map(u => (
                  <div key={u.id} className="group relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                    <div className="aspect-square">
                      <img src={u.dataUrl} alt={u.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-sm font-bold text-gray-800 truncate">{u.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{u.size} • {u.date}</p>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onDeleteUpload(u.id)}
                        className="bg-red-500 text-white p-2 rounded-xl shadow-lg hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extrabold text-gray-900">Generation Logs</h3>
              <button className="text-sm font-bold text-purple-600 hover:underline">Clear History</button>
            </div>
            
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <div className="text-6xl mb-4">⌛</div>
                <p className="font-bold">No history records</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map(h => (
                  <div key={h.id} className="flex items-center gap-6 p-4 rounded-3xl border border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                      <img src={h.resultImage} alt="Result" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{h.modelName} Model</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full tracking-tighter">SUCCESS</span>
                      </div>
                      <p className="text-xs text-gray-500 font-bold uppercase">{h.date}</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-3 bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="p-3 bg-gray-100 text-gray-400 rounded-2xl hover:bg-gray-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
