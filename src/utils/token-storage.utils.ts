'use client';

const ACCESS_TOKEN_KEY = 'access_token';

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  // Dispatch custom event to notify components
  window.dispatchEvent(new Event('auth-change'));
}

export function removeAccessToken(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  // Dispatch custom event to notify components
  window.dispatchEvent(new Event('auth-change'));
}
