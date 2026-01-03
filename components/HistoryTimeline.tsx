
import React from 'react';
import { HistoryItem } from '../types';
import { URGENCY_COLORS, REASON_EMOJIS } from '../constants';

interface HistoryTimelineProps {
  history: HistoryItem[];
  isDarkMode: boolean;
}

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ history, isDarkMode }) => {
  return (
    <div className={`mt-8 p-6 rounded-3xl soft-shadow ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}>
      <h2 className={`font-semibold text-lg mb-6 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Recent Events</h2>
      
      {history.length === 0 ? (
        <div className="py-12 text-center">
          <p className="opacity-40 italic text-sm">No history recorded yet</p>
        </div>
      ) : (
        <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-700">
          {history.map((item) => (
            <div key={item.id} className="relative pl-12">
              <div className={`absolute left-4 top-2 w-4 h-4 rounded-full border-4 ${
                item.alert ? 'bg-red-500 border-red-200' : 'bg-blue-400 border-blue-100'
              } z-10 shadow-sm transition-all`}></div>
              <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
                isDarkMode ? 'bg-slate-700/30 border-slate-700' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{REASON_EMOJIS[item.reason] || '👶'}</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{item.reason}</span>
                  </div>
                  <span className="text-xs opacity-50 font-medium">
                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="mt-2">
                   <span className={`text-[10px] uppercase tracking-tighter px-2 py-0.5 rounded font-bold border ${URGENCY_COLORS[item.urgency as keyof typeof URGENCY_COLORS] || 'bg-slate-100 border-slate-200'}`}>
                    {item.urgency}
                  </span>
                </div>
                <p className={`mt-2 text-sm italic ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTimeline;
