const DEFAULT_API_URL = 'http://localhost:3001';

export function getApiBaseUrl(): string {
  const url = import.meta.env.VITE_API_URL?.trim();
  if (url) return url.replace(/\/$/, '');
  if (import.meta.env.DEV) return '';
  return DEFAULT_API_URL;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const { token, headers, ...rest } = options;
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new ApiError(response.status, data.error ?? 'Request failed');
  }

  return data;
}
