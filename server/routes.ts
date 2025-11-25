import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, replyToMessageSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ 
          error: "Validation failed", 
          message: validationError.toString() 
        });
      }
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  // Get all contact messages
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Get a specific contact message
  app.get("/api/contact/:id", async (req, res) => {
    try {
      const message = await storage.getContactMessage(req.params.id);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });

  // Reply to a contact message
  app.post("/api/contact/:id/reply", async (req, res) => {
    try {
      const validatedReply = replyToMessageSchema.parse(req.body);
      const message = await storage.replyToContactMessage(req.params.id, validatedReply);
      
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      
      res.json(message);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ 
          error: "Validation failed", 
          message: validationError.toString() 
        });
      }
      res.status(500).json({ error: "Failed to send reply" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
