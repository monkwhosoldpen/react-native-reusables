import React, { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const USER_STORAGE_KEY = '@user_data';

type DatabaseContextType = {
  getUser: () => Promise<any>;
  saveUser: (user: any) => Promise<void>;
  removeUser: () => Promise<void>;
  query: (sql: string, params?: any[]) => Promise<any>;
};

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const storage = Platform.OS === 'web' ? localStorage : AsyncStorage;

  const getUser = async () => {
    try {
      if (Platform.OS === 'web') {
        const data = storage.getItem(USER_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
      } else {
        const data = await storage.getItem(USER_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  };

  const saveUser = async (user: any) => {
    try {
      const data = JSON.stringify(user);
      if (Platform.OS === 'web') {
        storage.setItem(USER_STORAGE_KEY, data);
      } else {
        await storage.setItem(USER_STORAGE_KEY, data);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const removeUser = async () => {
    try {
      if (Platform.OS === 'web') {
        storage.removeItem(USER_STORAGE_KEY);
      } else {
        await storage.removeItem(USER_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const query = async (sql: string, params?: any[]) => {
    console.log('💾 Database query:', { sql, params });
    // Implement database query logic
  };

  return (
    <DatabaseContext.Provider value={{ getUser, saveUser, removeUser, query }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}; 