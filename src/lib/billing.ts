import { ApiError, apiFetch } from './api';

export async function openBillingPortal(token: string): Promise<void> {
  const data = await apiFetch<{ url: string }>('/api/billing/portal', {
    method: 'POST',
    token,
  });
  window.location.href = data.url;
}

export function handleBillingPortalError(err: unknown): boolean {
  if (err instanceof ApiError && err.status === 400) {
    window.location.href = '/#pricing';
    return true;
  }
  return false;
}
