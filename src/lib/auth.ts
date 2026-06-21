import jwt from 'jsonwebtoken';

export interface DecodedJWT {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): DecodedJWT | null {
  try {
    const decoded = jwt.verify(
      token,
      import.meta.env.VITE_JWT_SECRET || import.meta.env.JWT_SECRET || 'your-super-secret-jwt-key-keep-it-safe-change-in-production'
    ) as DecodedJWT;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem('snapcut_auth_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('snapcut_auth_token', token);
}

export function removeAuthToken(): void {
  localStorage.removeItem('snapcut_auth_token');
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data as T;
}
