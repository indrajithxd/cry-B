
import React from 'react';
import { HistoryItem } from '../types';

interface SummaryWidgetProps {
  history: HistoryItem[];
  isDarkMode: boolean;
}

const SummaryWidget: React.FC<SummaryWidgetProps> = ({ history, isDarkMode }) => {
  const stats = history.reduce((acc, curr) => {
    const reason = curr.reason.toLowerCase();
    if (reason.includes('hungry')) acc.hungry++;
    else if (reason.includes('sleepy')) acc.sleepy++;
    else if (reason.includes('pain')) acc.pain++;
    else if (reason.includes('discomfort')) acc.discomfort++;
    return acc;
  }, { hungry: 0, sleepy: 0, pain: 0, discomfort: 0 });

  return (
    <div className={`p-6 rounded-3xl soft-shadow ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'}`}>
      <h2 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Today's Summary</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Hungry', value: stats.hungry, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Sleepy', value: stats.sleepy, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Pain', value: stats.pain, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Discomfort', value: stats.discomfort, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} p-3 rounded-2xl flex flex-col items-center justify-center transition-transform hover:scale-105`}>
            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            <span className={`text-xs font-medium uppercase tracking-widest opacity-60 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryWidget;
