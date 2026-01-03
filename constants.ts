
export const API_BASE_URL = 'http://127.0.0.1:8000/api';
export const DEVICE_ID = 'browser_parent_dashboard';
export const ALERT_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

// Terminology aligned with backend response keys
export const UI_LABELS = {
  REASON: 'Cry Reason',
  URGENCY: 'Urgency',
  CONFIDENCE: 'Confidence',
  MESSAGE: 'Message'
};

export const URGENCY_COLORS = {
  'Normal': 'bg-green-100 text-green-700 border-green-200',
  'Needs Attention': 'bg-amber-100 text-amber-700 border-amber-200',
  'Immediate Attention': 'bg-red-100 text-red-700 border-red-200'
};

export const REASON_EMOJIS: Record<string, string> = {
  'Hungry': '🍼',
  'Sleepy': '😴',
  'Pain': '🩹',
  'Discomfort': '☁️'
};
