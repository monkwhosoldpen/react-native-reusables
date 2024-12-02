import { Goat, GoatCategory } from '~/types/goat';
import { Message, Chat } from '~/types/message';
import { goats as mockGoats, goatCategories as mockCategories } from '~/data/mock-goats';

// You can replace this with actual API calls later
const SIMULATE_NETWORK_DELAY = 800;

const mockMessages: Record<string, Chat> = {};

// Generate mock messages for each goat
mockGoats.forEach(goat => {
  const numberOfMessages = 5 + Math.floor(Math.random() * 15); // 5-20 messages
  const messages: Message[] = [];
  
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - numberOfMessages);

  for (let i = 0; i < numberOfMessages; i++) {
    const isGoat = Math.random() > 0.5;
    currentDate = new Date(currentDate.getTime() + 1000 * 60 * Math.floor(Math.random() * 60));

    messages.push({
      id: `${goat.id}-msg-${i}`,
      text: isGoat 
        ? getRandomGoatMessage(goat)
        : getRandomUserMessage(),
      sender: isGoat ? 'goat' : 'user',
      timestamp: currentDate,
      status: 'read',
    });
  }

  mockMessages[goat.username] = {
    goatId: goat.id,
    messages,
    lastRead: new Date(),
  };
});

function getRandomGoatMessage(goat: Goat): string {
  const messages = [
    `I'm a ${goat.category === '1' ? 'dairy' : goat.category === '2' ? 'meat' : goat.category === '3' ? 'pet' : 'show'} goat!`,
    'Baaaaa! 🐐',
    'Would you like to see my certifications?',
    `My price is ${goat.price.toLocaleString()} dollars`,
    'I have a great bloodline!',
    'When can we meet?',
    'I eat anything! Well, almost anything...',
    'Do you have any hay?',
    'Looking forward to meeting you!',
    'I won several competitions! 🏆',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomUserMessage(): string {
  const messages = [
    "Hi! I'm interested in buying.",
    "What's your best price?",
    "Can we meet tomorrow?",
    "Do you have any health certificates?",
    "How old are you?",
    "Are you good with kids?",
    "What's your milk production like?",
    "Great! I'll think about it.",
    "Thanks for the information!",
    "That sounds perfect!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export class GoatService {
  static async getGoats(params?: { 
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ 
    goats: Goat[];
    totalCount: number;
    hasMore: boolean;
  }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, SIMULATE_NETWORK_DELAY));

    let filteredGoats = [...mockGoats];
    
    // Apply category filter
    if (params?.category) {
      filteredGoats = filteredGoats.filter(goat => goat.category === params.category);
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const start = (page - 1) * limit;
    const paginatedGoats = filteredGoats.slice(start, start + limit);

    return {
      goats: paginatedGoats,
      totalCount: filteredGoats.length,
      hasMore: start + limit < filteredGoats.length,
    };
  }

  static async getCategories(): Promise<GoatCategory[]> {
    await new Promise(resolve => setTimeout(resolve, SIMULATE_NETWORK_DELAY));
    return mockCategories;
  }

  static async getGoatByUsername(username: string): Promise<Goat | null> {
    await new Promise(resolve => setTimeout(resolve, SIMULATE_NETWORK_DELAY));
    
    const goat = mockGoats.find(g => g.username === username);
    if (!goat) {
      throw new Error(`Goat with username ${username} not found`);
    }
    
    return goat;
  }

  static async getChatMessages(username: string): Promise<Chat> {
    await new Promise(resolve => setTimeout(resolve, SIMULATE_NETWORK_DELAY));
    
    const chat = mockMessages[username];
    if (!chat) {
      throw new Error(`Chat with username ${username} not found`);
    }
    
    return chat;
  }
} 