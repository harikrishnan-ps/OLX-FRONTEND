export interface ChatConversation {
  id: string;
  participant: ChatUser;
  product: ChatProduct;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type: 'buying' | 'selling';
  isActive?: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

export interface ChatProduct {
  id: string;
  title: string;
  price: number;
  image?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'system';
  status: 'sent' | 'delivered' | 'read';
}
