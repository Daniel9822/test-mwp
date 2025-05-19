import { User, EmailMessage, SmsMessage } from "../types/users";

// Mock Users (Extended from mockCustomers with phone numbers)
export const mockUsers: User[] = [
  {
    userId: 1,
    uuid: "user-001",
    username: "john_doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 555-123-4567",
    isAdmin: false,
    createdAt: new Date("2023-01-15"),
    lastLogin: new Date("2023-06-20")
  },
  {
    userId: 2,
    uuid: "user-002",
    username: "jane_smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1 555-987-6543",
    isAdmin: false,
    createdAt: new Date("2023-02-21"),
    lastLogin: new Date("2023-06-18")
  },
  {
    userId: 3,
    uuid: "user-003",
    username: "admin_user",
    email: "admin@example.com",
    phoneNumber: "+1 555-789-0123",
    isAdmin: true,
    createdAt: new Date("2023-01-01"),
    lastLogin: new Date("2023-06-22")
  },
  {
    userId: 4,
    uuid: "user-004",
    username: "sam_johnson",
    email: "sam.johnson@example.com",
    phoneNumber: "+1 555-456-7890",
    isAdmin: false,
    createdAt: new Date("2023-03-12"),
    lastLogin: new Date("2023-06-15")
  },
  {
    userId: 5,
    uuid: "user-005",
    username: "alex_brown",
    email: "alex.brown@example.com",
    phoneNumber: "+1 555-234-5678",
    isAdmin: false,
    createdAt: new Date("2023-04-05"),
    lastLogin: new Date("2023-06-10")
  },
  {
    userId: 6,
    uuid: "user-006",
    username: "maria_garcia",
    email: "maria.garcia@example.com",
    phoneNumber: "+1 555-345-6789",
    isAdmin: false,
    createdAt: new Date("2023-04-18"),
    lastLogin: new Date("2023-06-19")
  },
  {
    userId: 7,
    uuid: "user-007",
    username: "robert_williams",
    email: "robert.williams@example.com",
    phoneNumber: "+1 555-567-8901",
    isAdmin: false,
    createdAt: new Date("2023-03-25"),
    lastLogin: new Date("2023-06-17")
  }
];

// Mock sent emails
export const mockEmails: EmailMessage[] = [
  {
    id: "email-001",
    subject: "Welcome to our platform",
    content: "Thank you for joining our platform. We are excited to have you on board!",
    recipients: ["john.doe@example.com", "jane.smith@example.com"],
    sentAt: new Date("2023-06-01"),
    status: "sent"
  },
  {
    id: "email-002",
    subject: "New Product Launch",
    content: "We are excited to announce the launch of our new product line. Check it out now!",
    recipients: ["john.doe@example.com", "sam.johnson@example.com", "alex.brown@example.com"],
    sentAt: new Date("2023-06-10"),
    status: "sent"
  },
  {
    id: "email-003",
    subject: "Your Monthly Newsletter",
    content: "Here's your monthly newsletter with all the latest updates and promotions.",
    recipients: ["john.doe@example.com", "jane.smith@example.com", "sam.johnson@example.com", "alex.brown@example.com"],
    sentAt: new Date("2023-06-15"),
    status: "sent"
  }
];

// Mock sent SMS messages
export const mockSms: SmsMessage[] = [
  {
    id: "sms-001",
    content: "Your order has been shipped and will arrive in 2-3 business days.",
    recipients: ["+1 555-123-4567", "+1 555-987-6543"],
    sentAt: new Date("2023-06-05"),
    status: "sent"
  },
  {
    id: "sms-002",
    content: "Flash sale! 25% off all products for the next 24 hours.",
    recipients: ["+1 555-123-4567", "+1 555-456-7890", "+1 555-234-5678"],
    sentAt: new Date("2023-06-12"),
    status: "sent"
  }
];
