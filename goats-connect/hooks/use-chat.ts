import { useState, useEffect } from 'react';
import { Message } from '~/types/message';
import { GoatService } from '~/services/goat-service';

export function useChatMessages(username?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMessages() {
      if (!username) {
        setError('No username provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await GoatService.getChatMessages(username);
        setMessages(result.messages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages();
  }, [username]);

  return { messages, isLoading, error };
} 