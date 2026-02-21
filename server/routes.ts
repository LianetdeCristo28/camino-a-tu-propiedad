import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      const validated = insertLeadSchema.parse(req.body);
      const lead = await storage.insertLead(validated);

      // TODO: Enviar a webhook n8n
      // await fetch(process.env.N8N_WEBHOOK_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(lead)
      // });

      res.json({ success: true, lead });
    } catch (error) {
      console.error("Error creating lead:", error);
      return res.status(400).json({ message: "Datos inválidos" });
    }
  });

  app.get("/api/leads", async (_req, res) => {
    try {
      const leads = await storage.getLeads();
      return res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      return res.status(500).json({ message: "Error al obtener los datos" });
    }
  });

  return httpServer;
}
