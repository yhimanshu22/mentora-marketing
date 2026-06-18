export function getGoogleClientId(): string {
  const fromImportMeta =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_GOOGLE_CLIENT_ID
      : undefined;
  const fromProcess =
    typeof process !== 'undefined' ? process.env.VITE_GOOGLE_CLIENT_ID : undefined;

  return (fromImportMeta ?? fromProcess ?? '').trim();
}

export function isValidGoogleClientId(clientId: string): boolean {
  if (!clientId) return false;
  if (clientId.includes('your-client-id')) return false;
  return /^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/i.test(clientId);
}
