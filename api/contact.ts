// api/contact.ts
// FULL SERVERLESS BACKEND IN ONE FILE
// Works on Vercel (no Express, no server, no extra setup)

import { randomUUID } from "crypto";
import { z } from "zod";
import { fromError } from "zod-validation-error";

/////////////////////////////////////////////////////////////////////////////////////
//  STORAGE (IN-MEMORY — SAME AS YOUR REPLIT VERSION)
/////////////////////////////////////////////////////////////////////////////////////

const storage = {
  contactMessages: new Map(),

  async create(data) {
    const id = randomUUID();
    const msg = {
      id,
      ...data,
      status: "new",
      reply: null,
      createdAt: new Date().toISOString(),
      repliedAt: null,
    };
    this.contactMessages.set(id, msg);
    return msg;
  },

  async getAll() {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async get(id) {
    return this.contactMessages.get(id);
  },

  async reply(id, replyText) {
    const existing = this.contactMessages.get(id);
    if (!existing) return undefined;

    const updated = {
      ...existing,
      status: "replied",
      reply: replyText,
      repliedAt: new Date().toISOString(),
    };

    this.contactMessages.set(id, updated);
    return updated;
  },
};

/////////////////////////////////////////////////////////////////////////////////////
//  ZOD SCHEMAS (EXACTLY LIKE YOUR ORIGINAL)
//  — Contact form validation
//  — Reply validation
/////////////////////////////////////////////////////////////////////////////////////

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const replySchema = z.object({
  reply: z.string().min(1, "Reply is required"),
});

/////////////////////////////////////////////////////////////////////////////////////
//  MAIN SERVERLESS HANDLER (ONE FILE = ALL ROUTES)
//  Works for:
//  — POST /api/contact
//  — GET /api/contact
//  — GET /api/contact?id=123
//  — POST /api/contact?id=123&reply=1
/////////////////////////////////////////////////////////////////////////////////////

export default async function handler(req, res) {
  const { method } = req;

  // GET /api/contact (all messages)
  if (method === "GET" && !req.query.id) {
    const list = await storage.getAll();
    return res.status(200).json(list);
  }

  // GET /api/contact?id=123
  if (method === "GET" && req.query.id) {
    const message = await storage.get(req.query.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    return res.status(200).json(message);
  }

  // POST /api/contact (create message)
  if (method === "POST" && !req.query.id) {
    try {
      const validated = contactSchema.parse(req.body);
      const created = await storage.create(validated);
      return res.status(200).json(created);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          error: "Validation failed",
          message: fromError(error).toString(),
        });
      }
      return res.status(500).json({ error: "Server error" });
    }
  }

  // POST /api/contact?id=123  (reply to message)
  if (method === "POST" && req.query.id) {
    try {
      const validated = replySchema.parse(req.body);
      const updated = await storage.reply(req.query.id, validated.reply);

      if (!updated) {
        return res.status(404).json({ error: "Message not found" });
      }

      return res.status(200).json(updated);
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          error: "Validation failed",
          message: fromError(error).toString(),
        });
      }
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Anything else
  return res.status(405).json({ error: "Method not allowed" });
}
