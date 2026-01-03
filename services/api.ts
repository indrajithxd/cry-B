
import { API_BASE_URL, DEVICE_ID } from '../constants';
import { CryResponse, HistoryItem } from '../types';

export async function uploadCryAudio(file: File): Promise<CryResponse> {
  const formData = new FormData();
  formData.append('audio', file);
  formData.append('device_id', DEVICE_ID);

  const response = await fetch(`${API_BASE_URL}/upload/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload audio');
  }

  return response.json();
}

export async function fetchCryHistory(): Promise<HistoryItem[]> {
  const response = await fetch(`${API_BASE_URL}/history/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  return response.json();
}
