import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { parse as parseConnectionString } from "pg-connection-string";
import { eq, desc, and, gte } from "drizzle-orm";
import { type Lead, type InsertLead, leads } from "@shared/schema";
import { config } from "./config";

let pool: pg.Pool;

if (config.isSupabase) {
  const parsed = parseConnectionString(config.databaseUrl);
  console.log(`[DB] Conectando a Supabase: ${parsed.host}:${parsed.port}`);
  pool = new pg.Pool({
    host: parsed.host ?? undefined,
    port: parsed.port ? parseInt(String(parsed.port), 10) : undefined,
    user: parsed.user ?? undefined,
    password: parsed.password ?? undefined,
    database: parsed.database ?? undefined,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
} else {
  pool = new pg.Pool({
    connectionString: config.databaseUrl,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

pool.on("error", (err) => {
  console.error("[DB] Error inesperado en el pool de conexiones:", err.message);
});

pool.query("SELECT 1")
  .then(() => console.log("[DB] Conexión exitosa"))
  .catch((err) => console.error("[DB] Error de conexión:", err.message));

export { pool };

const db = drizzle(pool);

export { db };

export interface IStorage {
  insertLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadByEmailSince(email: string, since: Date): Promise<Lead | undefined>;
}

export class DatabaseStorage implements IStorage {
  async insertLead(lead: InsertLead): Promise<Lead> {
    const [created] = await db.insert(leads).values(lead).returning();
    return created;
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadByEmailSince(email: string, since: Date): Promise<Lead | undefined> {
    const [lead] = await db
      .select()
      .from(leads)
      .where(and(eq(leads.email, email), gte(leads.createdAt, since.toISOString())))
      .limit(1);
    return lead;
  }
}

export const storage = new DatabaseStorage();
