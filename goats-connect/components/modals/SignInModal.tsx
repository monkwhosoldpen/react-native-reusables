import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { useAuth } from '~/providers/AuthProvider';

type SignInModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const { loginAsGuest } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleGuestSignIn = async () => {
    setLoading(true);
    await loginAsGuest();
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Goats Connect</DialogTitle>
          <DialogDescription>
            Choose how you would like to continue using the app
          </DialogDescription>
        </DialogHeader>

        <View className="py-4">
          <Button 
            onPress={handleGuestSignIn}
            disabled={loading}
            className="w-full mb-3"
          >
            <View className="flex-row items-center justify-center">
              {loading ? (
                <>
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white ml-2">Signing in...</Text>
                </>
              ) : (
                <Text className="text-white">Continue as Guest</Text>
              )}
            </View>
          </Button>
        </View>

        <DialogFooter>
          <Button 
            variant="outline" 
            onPress={() => onOpenChange(false)}
            className="w-full"
          >
            <Text>Cancel</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 