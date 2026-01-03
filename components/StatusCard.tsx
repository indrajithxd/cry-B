
import React from 'react';
import { CryResponse } from '../types';
import { URGENCY_COLORS, REASON_EMOJIS, UI_LABELS } from '../constants';

interface StatusCardProps {
  lastCry: CryResponse | null;
  isDarkMode: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ lastCry, isDarkMode }) => {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!lastCry) {
    return (
      <div className={`p-6 rounded-3xl soft-shadow transition-all ${
        isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`font-semibold text-lg ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Current Status</h2>
          <span className="text-sm opacity-50">Last updated: {now}</span>
        </div>
        <div className="flex flex-col items-center py-8">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">💤</span>
          </div>
          <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Waiting for cry input...</p>
          <p className="text-sm opacity-50 mt-1 text-center">Baby is currently unmonitored or quiet</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-3xl soft-shadow transition-all animate-fade-in ${
      isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`font-semibold text-lg ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Current Status</h2>
        <span className="text-sm opacity-50">Just now</span>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
          {REASON_EMOJIS[lastCry.reason] || '👶'}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-1">{UI_LABELS.REASON}</p>
          <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{lastCry.reason}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 border ${URGENCY_COLORS[lastCry.urgency as keyof typeof URGENCY_COLORS] || 'bg-slate-100 border-slate-200'}`}>
            {lastCry.urgency}
          </span>
        </div>
      </div>

      <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-blue-50/50'} border border-blue-100/20`}>
        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-2">{UI_LABELS.MESSAGE}</p>
        <p className={`text-sm italic ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          "{lastCry.message}"
        </p>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider opacity-40">{UI_LABELS.CONFIDENCE}</span>
        <span className={`text-xs font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{lastCry.confidence} certainty</span>
      </div>
    </div>
  );
};

export default StatusCard;
