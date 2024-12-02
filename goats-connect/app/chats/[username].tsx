import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '~/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import { useGoatByUsername } from '~/hooks/use-goats';
import { useChatMessages } from '~/hooks/use-chat';
import { ChatMessage } from '~/components/ChatMessage';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Send } from 'lucide-react-native';
import { useState } from 'react';

export default function ChatScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const { goat, isLoading: isLoadingGoat } = useGoatByUsername(username);
  const { messages, isLoading: isLoadingMessages } = useChatMessages(username);
  const [newMessage, setNewMessage] = useState('');

  if (isLoadingGoat || isLoadingMessages) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading chat...</Text>
      </View>
    );
  }

  if (!goat) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500">Could not find goat with username @{username}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 bg-background">
        <View className="p-4 border-b border-border">
          <Text className="text-lg font-semibold">{goat.name}</Text>
          <Text className="text-muted-foreground text-sm">@{goat.username}</Text>
        </View>

        <ScrollView 
          className="flex-1 p-4"
          contentContainerStyle={{ paddingTop: 10 }}
        >
          {messages?.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </ScrollView>

        <View className="p-4 border-t border-border flex-row items-center gap-2">
          <Input
            className="flex-1"
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <Button
            size="icon"
            disabled={!newMessage.trim()}
            onPress={() => {
              // Handle sending message
              setNewMessage('');
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
} 