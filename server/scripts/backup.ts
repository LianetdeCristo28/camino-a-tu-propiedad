import { storage } from "../storage";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const BACKUP_DIR = join(process.cwd(), "backups");

async function backupLeads() {
  try {
    await mkdir(BACKUP_DIR, { recursive: true });

    const leads = await storage.getLeads();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `leads_${timestamp}.json`;
    const filepath = join(BACKUP_DIR, filename);

    await writeFile(filepath, JSON.stringify(leads, null, 2), "utf-8");
    console.log(`[Backup] ${leads.length} leads exportados a ${filepath}`);

    const files = (await import("fs")).readdirSync(BACKUP_DIR)
      .filter((f: string) => f.startsWith("leads_") && f.endsWith(".json"))
      .sort()
      .reverse();

    const MAX_BACKUPS = 30;
    if (files.length > MAX_BACKUPS) {
      const { unlinkSync } = await import("fs");
      for (const old of files.slice(MAX_BACKUPS)) {
        unlinkSync(join(BACKUP_DIR, old));
        console.log(`[Backup] Archivo antiguo eliminado: ${old}`);
      }
    }
  } catch (error) {
    console.error("[Backup] Error al exportar leads:", (error as Error).message);
    process.exit(1);
  }
}

backupLeads().then(() => process.exit(0));
