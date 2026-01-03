
export enum CryReason {
  HUNGRY = 'Hungry',
  SLEEPY = 'Sleepy',
  PAIN = 'Pain',
  DISCOMFORT = 'Discomfort'
}

export enum Urgency {
  NORMAL = 'Normal',
  ATTENTION = 'Needs Attention',
  IMMEDIATE = 'Immediate Attention'
}

export interface CryResponse {
  reason: string;
  confidence: string;
  urgency: string;
  message: string;
  alert: boolean;
  timestamp?: string;
  device_id?: string;
}

export interface HistoryItem extends CryResponse {
  id: string;
  created_at: string;
}

export interface DailyStats {
  hungry: number;
  sleepy: number;
  pain: number;
  discomfort: number;
}
