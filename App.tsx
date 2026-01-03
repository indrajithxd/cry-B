
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { uploadCryAudio, fetchCryHistory } from './services/api';
import { CryResponse, HistoryItem } from './types';
import { ALERT_SOUND_URL, DEVICE_ID } from './constants';
import AlertBanner from './components/AlertBanner';
import StatusCard from './components/StatusCard';
import HistoryTimeline from './components/HistoryTimeline';
import SummaryWidget from './components/SummaryWidget';

const App: React.FC = () => {
  // Initialized to empty to remove all hardcoded fake data
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastCry, setLastCry] = useState<CryResponse | null>(null);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ALERT_SOUND_URL);
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const data = await fetchCryHistory();
      setHistory(data);
    } catch (err) {
      // Gracefully handle empty state if backend is unreachable
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleStartListening = () => {
    setIsRecording(true);
    // Logic for microphone start will go here
  };

  const handleStopAndAnalyze = () => {
    setIsRecording(false);
    setIsLoading(true);
    // Logic for microphone stop and backend upload will go here
    // For now, it just resets state to simulate processing
    setTimeout(() => setIsLoading(false), 2000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('bg-slate-900', 'text-slate-100');
      document.body.classList.remove('bg-blue-50', 'text-slate-800');
    } else {
      document.body.classList.add('bg-blue-50', 'text-slate-800');
      document.body.classList.remove('bg-slate-900', 'text-slate-100');
    }
  };

  const dismissAlert = () => {
    setActiveAlert(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-blue-50 text-slate-800'}`}>
      {/* Global Alert Area */}
      {activeAlert ? (
        <AlertBanner 
          message={activeAlert} 
          onDismiss={dismissAlert} 
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className={`w-full py-2 px-6 text-center text-[10px] font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-400'}`}>
          No alerts currently
        </div>
      )}

      {/* Header */}
      <header className={`px-6 py-8 flex justify-between items-center ${isDarkMode ? 'border-b border-slate-800' : ''}`}>
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="text-blue-500 mr-2">cry-B</span>
            <span className="text-sm font-normal opacity-50 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-lg ml-2">beta</span>
          </h1>
          <p className="text-sm opacity-60 mt-1">Monitoring your little one</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`p-3 rounded-2xl shadow-sm transition-all ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
            title={isAudioEnabled ? "Mute notifications" : "Enable notifications"}
          >
            {isAudioEnabled ? '🔊' : '🔇'}
          </button>
          <button 
            onClick={toggleDarkMode}
            className={`p-3 rounded-2xl shadow-sm transition-all ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 space-y-6">
        
        {/* Device ID Badge */}
        <div className={`px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center space-x-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-white'} border soft-shadow`}>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="opacity-60">Connected Device:</span>
          <span>{DEVICE_ID}</span>
        </div>

        {/* Status Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusCard lastCry={lastCry} isDarkMode={isDarkMode} />
          <SummaryWidget history={history} isDarkMode={isDarkMode} />
        </div>

        {/* Recording Section (Replacing File Upload) */}
        <div className={`p-8 rounded-[40px] shadow-2xl transition-all border-4 border-dashed ${
          isRecording ? 'border-red-400 bg-red-50/20' : 
          isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-blue-100'
        }`}>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isRecording ? 'bg-red-500 animate-pulse shadow-red-500/30' : 'bg-blue-500 shadow-blue-500/30'
            }`}>
              <span className="text-3xl text-white">{isRecording ? '⏹' : '🎙️'}</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">Record Baby Cry</h3>
              <p className="text-sm opacity-50 mt-1">Recording will use your device microphone</p>
            </div>
            
            <div className="flex flex-col w-full max-w-xs space-y-3">
              {!isRecording ? (
                <button
                  onClick={handleStartListening}
                  className={`w-full px-6 py-4 rounded-3xl font-bold text-center transition-all ${
                    isLoading ? 'bg-slate-300 pointer-events-none' : 'bg-blue-500 hover:bg-blue-600 shadow-xl shadow-blue-500/20 text-white'
                  }`}
                >
                  {isLoading ? 'Analyzing...' : 'Start Listening'}
                </button>
              ) : (
                <button
                  onClick={handleStopAndAnalyze}
                  className="w-full px-6 py-4 rounded-3xl font-bold text-center bg-slate-900 text-white hover:bg-slate-800 shadow-xl transition-all"
                >
                  Stop & Analyze
                </button>
              )}
            </div>
            
            {isRecording && (
              <p className="text-xs text-red-500 font-medium animate-pulse">Monitoring active...</p>
            )}
          </div>
        </div>

        {/* History Section */}
        <HistoryTimeline history={history} isDarkMode={isDarkMode} />
      </main>

      {/* Reassuring Footer */}
      <footer className="mt-12 text-center pb-12 opacity-30 text-xs px-6">
        <p>cry-B uses smart sound analysis to help you understand your baby.</p>
        <p>This is a support tool and does not replace professional medical advice.</p>
      </footer>
    </div>
  );
};

export default App;
