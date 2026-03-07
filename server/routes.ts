import type { Express } from "express";
import { createServer, type Server } from "http";
import { promises as dns } from "dns";
import sanitizeHtml from "sanitize-html";
import { storage, pool } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { leadLimiter } from "./index";

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [],
  allowedAttributes: {},
};

function sanitizeText(value: unknown): string | undefined | null {
  if (value === null || value === undefined) return value;
  if (typeof value !== "string") return value as any;
  return sanitizeHtml(value.trim(), sanitizeOptions);
}

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "throwaway.email",
  "guerrillamail.com",
  "guerrillamail.net",
  "sharklasers.com",
  "grr.la",
  "guerrillamailblock.com",
  "yopmail.com",
  "trashmail.com",
  "trashmail.net",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "tempail.com",
  "temp-mail.org",
  "10minutemail.com",
  "mohmal.com",
  "getnada.com",
  "emailondeck.com",
  "mintemail.com",
]);

async function validateEmailDomain(email: string): Promise<{ valid: boolean; reason?: string }> {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) {
    return { valid: false, reason: "Formato de email inválido" };
  }

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, reason: "No se permiten correos temporales. Usa tu email personal o profesional." };
  }

  try {
    const records = await dns.resolveMx(domain);
    if (!records || records.length === 0) {
      return { valid: false, reason: "El dominio del email no acepta correos. Verifica tu dirección." };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: "El dominio del email no es válido. Verifica tu dirección." };
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/health", async (_req, res) => {
    try {
      await pool.query("SELECT 1");
      return res.json({ status: "ok", db: "connected" });
    } catch {
      return res.status(503).json({ status: "degraded", db: "disconnected" });
    }
  });

  app.post("/api/leads", leadLimiter, async (req, res) => {
    try {
      const sanitizedBody = {
        ...req.body,
        fullName: sanitizeText(req.body.fullName),
        email: sanitizeText(req.body.email),
        phone: sanitizeText(req.body.phone),
        city: sanitizeText(req.body.city),
        budget: sanitizeText(req.body.budget),
        bedrooms: sanitizeText(req.body.bedrooms),
        profileType: sanitizeText(req.body.profileType),
        propertyAddress: sanitizeText(req.body.propertyAddress),
        message: sanitizeText(req.body.message),
        source: sanitizeText(req.body.source),
        consentedAt: req.body.consentedAt,
      };

      if (!sanitizedBody.consentedAt) {
        return res.status(400).json({ message: "Debes aceptar la política de privacidad para continuar." });
      }

      const validated = insertLeadSchema.parse(sanitizedBody);

      const emailCheck = await validateEmailDomain(validated.email);
      if (!emailCheck.valid) {
        return res.status(400).json({ message: emailCheck.reason });
      }

      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentLead = await storage.getLeadByEmailSince(validated.email, twentyFourHoursAgo);
      if (recentLead) {
        return res.json({ success: true, lead: recentLead, duplicate: true });
      }

      const lead = await storage.insertLead(validated);
      res.json({ success: true, lead });
    } catch (error) {
      console.error("Error creating lead:", error);
      return res.status(400).json({ message: "Datos inválidos" });
    }
  });

  return httpServer;
}
