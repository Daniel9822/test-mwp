export interface User {
  userId: number;
  uuid: string;
  username: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface EmailMessage {
  id: string;
  subject: string;
  content: string;
  recipients: string[]; // Array of email addresses
  sentAt: Date;
  status: 'sent' | 'failed' | 'pending';
  attachments?: string[];
}

export interface SmsMessage {
  id: string;
  content: string;
  recipients: string[]; // Array of phone numbers
  sentAt: Date;
  status: 'sent' | 'failed' | 'pending';
}
