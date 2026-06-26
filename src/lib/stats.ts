import { apiFetch } from './api';

export interface Stats {
  visits: number;
  downloads: number;
}

export async function getStats(): Promise<Stats> {
  return apiFetch<Stats>('/api/stats');
}

export async function recordVisit(): Promise<Stats> {
  return apiFetch<Stats>('/api/stats/visit', { method: 'POST' });
}

export async function recordDownload(): Promise<Stats> {
  return apiFetch<Stats>('/api/stats/download', { method: 'POST' });
}
