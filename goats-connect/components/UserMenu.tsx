import React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useAuth } from '~/providers/AuthProvider';
import { SignInModal } from './modals/SignInModal';

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showSignInModal, setShowSignInModal] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8" alt="">
            {isAuthenticated ? (
              <AvatarImage source={{ uri: user?.avatarUrl }} />
            ) : (
              <AvatarImage source={{ uri: 'https://ui-avatars.com/api/?background=random' }} />
            )}
            <AvatarFallback>
              <Text>{user?.username?.[0] ?? '?'}</Text>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {isAuthenticated ? (
              <>
                <DropdownMenuItem className="gap-3">
                  <View>
                    <Text className="font-medium">{user?.username}</Text>
                    <Text className="text-xs text-muted-foreground">
                      {user?.email}
                    </Text>
                  </View>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={logout}
                  className="text-destructive focus:text-destructive"
                >
                  <Text>Sign out</Text>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onSelect={() => setShowSignInModal(true)}>
                <Text>Sign in</Text>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignInModal 
        open={showSignInModal} 
        onOpenChange={setShowSignInModal} 
      />
    </>
  );
} 