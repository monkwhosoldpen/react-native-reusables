import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Message } from '~/types/message';
import { Check, CheckCheck } from 'lucide-react-native';

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isGoat = message.sender === 'goat';

  return (
    <View className={`flex-row ${isGoat ? 'justify-start' : 'justify-end'} mb-2`}>
      <View 
        className={`
          px-3 py-2 rounded-2xl max-w-[80%]
          ${isGoat ? 'bg-card rounded-tl-none' : 'bg-primary rounded-tr-none'}
        `}
      >
        <Text 
          className={`${isGoat ? 'text-foreground' : 'text-primary-foreground'}`}
        >
          {message.text}
        </Text>
        <View className="flex-row items-center justify-end mt-1">
          <Text 
            className={`text-xs mr-1 ${
              isGoat ? 'text-muted-foreground' : 'text-primary-foreground/70'
            }`}
          >
            {'timestamp'}
          </Text>
          {!isGoat && (
            message.status === 'read' ? (
              <CheckCheck className="w-3 h-3 text-primary-foreground/70" />
            ) : (
              <Check className="w-3 h-3 text-primary-foreground/70" />
            )
          )}
        </View>
      </View>
    </View>
  );
} 