import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDatabase } from './DatabaseProvider';

type User = {
  id: string;
  username: string;
  email: string;
  accountType: 'guest' | 'regular';
  avatarUrl?: string;
};

type AuthContextType = {
  user: User | null;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { getUser, saveUser, removeUser } = useDatabase();

  // Check for existing user on startup
  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    };

    loadUser();
  }, []);

  const loginAsGuest = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    const guestUser: User = {
      id: `guest_${Date.now()}`,
      username: `Guest_${Math.floor(Math.random() * 1000)}`,
      email: 'guest@example.com',
      accountType: 'guest',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/png?seed=${Date.now()}`
    };

    await saveUser(guestUser);
    setUser(guestUser);
  };

  const logout = async () => {
    await removeUser();
    setUser(null);
  };

  React.useEffect(() => {
    console.log('🔐 AuthProvider initialized:', { 
      user, 
      isAuthenticated: !!user 
    });
  }, [user]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loginAsGuest, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 