import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken, verifyToken, apiRequest } from '../lib/auth';

interface User {
  id: string;
  email: string;
  name: string | null;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        // For now, we'll set a mock user. In a real app, you'd fetch the user from the API
        setUser({
          id: decoded.userId,
          email: decoded.email,
          name: null,
          plan: 'FREE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiRequest<{
      success: boolean;
      token: string;
      user: User;
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success) {
      setAuthToken(response.token);
      setUser(response.user);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    const response = await apiRequest<{
      success: boolean;
      token: string;
      user: User;
    }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    if (response.success) {
      setAuthToken(response.token);
      setUser(response.user);
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
