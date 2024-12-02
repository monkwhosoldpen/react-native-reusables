import React, { createContext, useContext } from 'react';

type NotificationContextType = {
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  requestPermission: () => Promise<boolean>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    console.log('📱 NotificationProvider initialized');
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    console.log('📱 Showing notification:', { 
      message, 
      type 
    });
    // Implement notification logic
  };

  const requestPermission = async () => {
    console.log('📱 Requesting notification permissions');
    // Implement permission request logic
    const result = true;
    console.log('📱 Permission result:', result);
    return result;
  };

  return (
    <NotificationContext.Provider value={{ showNotification, requestPermission }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 