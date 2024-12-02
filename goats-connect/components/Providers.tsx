import React from 'react';
import { AuthProvider } from '~/providers/AuthProvider';
import { DatabaseProvider } from '~/providers/DatabaseProvider';
import { NotificationProvider } from '~/providers/NotificationProvider';
import { RealtimeProvider } from '~/providers/RealtimeProvider';
import { GoatProvider } from '~/contexts/goat-context';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <DatabaseProvider>
            <AuthProvider>
                <RealtimeProvider>
                    <NotificationProvider>
                        <GoatProvider>
                            {children}
                        </GoatProvider>
                    </NotificationProvider>
                </RealtimeProvider>
            </AuthProvider>
        </DatabaseProvider>
    );
} 