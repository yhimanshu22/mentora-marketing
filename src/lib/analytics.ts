declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackSignUp(method: string = 'google'): void {
  trackEvent('sign_up', {
    method,
  });
}

export function trackLogin(method: string = 'google'): void {
  trackEvent('login', {
    method,
  });
}

export function trackDownload(platform?: string, fileName?: string): void {
  trackEvent('file_download', {
    platform,
    file_name: fileName,
  });
}

export function trackPurchase(params: {
  transactionId: string;
  value?: number;
  currency?: string;
  tier?: string;
}): void {
  trackEvent('purchase', {
    transaction_id: params.transactionId,
    value: params.value ?? 1.0,
    currency: params.currency ?? 'USD',
    items: [
      {
        item_id: params.tier ?? 'starter',
        item_name: params.tier ? `Mentora ${params.tier}` : 'Mentora Credits',
        price: params.value ?? 1.0,
        quantity: 1,
      },
    ],
  });
}
