export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'goat';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
};

export type Chat = {
  goatId: string;
  messages: Message[];
  lastRead?: Date;
}; 