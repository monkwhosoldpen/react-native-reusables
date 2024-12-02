import React from 'react';
import { AuthProvider } from '~/providers/AuthProvider';
import { DatabaseProvider } from '~/providers/DatabaseProvider';
import { NotificationProvider } from '~/providers/NotificationProvider';
import { RealtimeProvider } from '~/providers/RealtimeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <DatabaseProvider>
            <AuthProvider>

                <RealtimeProvider>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </RealtimeProvider>

            </AuthProvider>
        </DatabaseProvider>
    );
} 