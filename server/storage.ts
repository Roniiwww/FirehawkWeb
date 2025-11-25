import { 
  type User, 
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type ReplyToMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  replyToContactMessage(id: string, reply: ReplyToMessage): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      id,
      ...insertMessage,
      status: "new",
      reply: null,
      createdAt: new Date().toISOString(),
      repliedAt: null,
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async replyToContactMessage(id: string, replyData: ReplyToMessage): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (!message) {
      return undefined;
    }

    const updatedMessage: ContactMessage = {
      ...message,
      reply: replyData.reply,
      status: "replied",
      repliedAt: new Date().toISOString(),
    };

    this.contactMessages.set(id, updatedMessage);
    return updatedMessage;
  }
}

export const storage = new MemStorage();
