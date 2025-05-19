// Tipos para la funcionalidad del chat

export interface UserStatus {
  online: boolean;
  lastActive?: Date;
}

export interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: UserStatus;
  unreadCount: number;
  isCustomer: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  name: string;
  size: number; // in bytes
  thumbnailUrl?: string;
}

export interface ChatConversation {
  id: string;
  participants: string[]; // Array of user IDs
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
}

// Chat notification type
export interface ChatNotification {
  id: string;
  type: 'new_message' | 'user_online' | 'user_offline';
  content: string;
  timestamp: Date;
  isRead: boolean;
  userId: string;
}
