import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../lib/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        try {
          const prismaUser = await syncUserToDatabase(
            session.user.id,
            session.user.email!,
            session.user.user_metadata?.full_name || session.user.user_metadata?.name
          );
          setUser(prismaUser);
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          try {
            const prismaUser = await syncUserToDatabase(
              session.user.id,
              session.user.email!,
              session.user.user_metadata?.full_name || session.user.user_metadata?.name
            );
            setUser(prismaUser);
          } catch (error) {
            console.error('Error syncing user:', error);
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast.error(error.message);
      throw error;
    }
    
    toast.success('Logged in successfully');
  };

  const signup = async (email: string, password: string, name?: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    
    if (error) {
      toast.error(error.message);
      throw error;
    }
    
    // If user is returned, sync immediately
    if (data.user) {
      const prismaUser = await syncUserToDatabase(
        data.user.id,
        data.user.email!,
        name
      );
      setUser(prismaUser);
    }
    
    toast.success('Signed up successfully');
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.success('Logged out successfully');
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
