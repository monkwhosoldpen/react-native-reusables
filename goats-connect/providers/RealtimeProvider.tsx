import React, { createContext, useContext } from 'react';

type RealtimeContextType = {
  subscribe: (channel: string, callback: (data: any) => void) => () => void;
  publish: (channel: string, data: any) => void;
};

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    console.log('🔄 RealtimeProvider initialized');
  }, []);

  const subscribe = (channel: string, callback: (data: any) => void) => {
    console.log('🔄 New subscription to channel:', channel);
    // Implement subscription logic
    return () => {
      console.log('🔄 Unsubscribed from channel:', channel);
      // Cleanup subscription
    };
  };

  const publish = (channel: string, data: any) => {
    console.log('🔄 Publishing to channel:', { 
      channel, 
      data 
    });
    // Implement publish logic
  };

  return (
    <RealtimeContext.Provider value={{ subscribe, publish }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}; 