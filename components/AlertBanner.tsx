
import React from 'react';

interface AlertBannerProps {
  message: string;
  onDismiss: () => void;
  isDarkMode: boolean;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ message, onDismiss, isDarkMode }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-bounce-subtle">
      <div className={`mx-4 mt-4 p-4 rounded-2xl flex items-center justify-between shadow-xl border-2 border-red-400 ${
        isDarkMode ? 'bg-red-900/90 text-white' : 'bg-red-500 text-white'
      }`}>
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className="font-bold text-lg">Immediate Attention Required</p>
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-semibold transition-colors text-sm whitespace-nowrap"
        >
          I've checked the baby
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
