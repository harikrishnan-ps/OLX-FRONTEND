export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'offer';
  sentAt: string;
  readAt?: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatPreview {
  id: string;
  participant: ChatParticipant;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  product: ChatProduct;
  role: 'buyer' | 'seller';
  isOnline?: boolean;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface ChatProduct {
  id: string;
  title: string;
  price: number;
  image?: string;
}
