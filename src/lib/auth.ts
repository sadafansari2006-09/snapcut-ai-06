import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  name: string | null;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
  createdAt: string;
  updatedAt: string;
}

// Helper to sync Supabase user with our Prisma DB
async function syncUserToDatabase(
  userId: string,
  email: string,
  name?: string
): Promise<User> {
  const response = await fetch('/api/auth/sync-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId, email, name }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to sync user');
  }
  return data.user;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;

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
