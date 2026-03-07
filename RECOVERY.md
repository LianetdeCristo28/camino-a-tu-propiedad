# Plan de Recuperación de Datos

## 1. Backups Automáticos (Supabase)

Supabase incluye backups automáticos diarios en el Plan Pro:

- **Frecuencia**: Diarios
- **Retención**: Hasta 7 días (Plan Pro) o 30 días (Plan Enterprise)
- **Restauración**: Desde el dashboard de Supabase → Settings → Database → Backups
- **Tipo**: Backup completo de la base de datos PostgreSQL

### Verificar backups activos

1. Ir a [app.supabase.com](https://app.supabase.com)
2. Seleccionar el proyecto
3. Settings → Database → Backups
4. Confirmar que los backups automáticos están habilitados

## 2. Backup Manual de Leads (JSON)

Se incluye un script para exportar los leads a JSON localmente.

### Ejecutar backup manual

```bash
npx tsx server/scripts/backup.ts
```

Esto genera un archivo `backups/leads_YYYY-MM-DDTHH-MM-SS.json` con todos los leads. Se retienen los últimos 30 archivos automáticamente.

### Programar backups periódicos (opcional)

Añadir un cron job (en un servidor externo o servicio de cron):

```bash
# Cada 6 horas
0 */6 * * * cd /ruta/al/proyecto && npx tsx server/scripts/backup.ts
```

## 3. Exportar Leads como CSV

El endpoint protegido permite descargar todos los leads en formato CSV:

```
GET /api/admin/export-leads
```

- Requiere autenticación de administrador (sesión activa)
- Devuelve un archivo `.csv` con todos los campos
- Útil para importar a Google Sheets, Excel o un CRM

### Desde el navegador

1. Iniciar sesión en `/admin`
2. Navegar a `/api/admin/export-leads` (o usar el botón de exportar en el panel)
3. El archivo CSV se descarga automáticamente

### Desde la línea de comandos

```bash
# Primero obtener cookies de sesión autenticando
curl -c cookies.txt -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"TU_PASSWORD"}'

# Luego descargar el CSV
curl -b cookies.txt http://localhost:5000/api/admin/export-leads -o leads.csv
```

## 4. Restauración desde Backup JSON

Si necesitas restaurar leads desde un backup JSON:

1. Localizar el archivo de backup en `backups/`
2. Verificar el contenido: `cat backups/leads_XXXX.json | head`
3. Importar manualmente a la base de datos usando SQL o el dashboard de Supabase

### Script de restauración manual

```sql
-- En el SQL Editor de Supabase, insertar leads desde los datos del JSON
INSERT INTO leads (full_name, email, phone, city, budget, bedrooms, pool, profile_type, property_address, message, source)
VALUES ('Nombre', 'email@ejemplo.com', '+1234567890', 'Miami', '$500K', '3', 'no', 'comprador', NULL, NULL, 'backup_restore');
```

## 5. Recuperación ante Desastres

### Base de datos no accesible

1. Verificar el estado de Supabase en [status.supabase.com](https://status.supabase.com)
2. Si el servicio está caído, esperar la restauración automática
3. Los leads se pueden recrear desde los backups JSON locales

### Pérdida de datos parcial

1. Identificar la fecha del último estado correcto
2. Restaurar el backup de Supabase desde esa fecha
3. Complementar con los backups JSON locales si es necesario

### Pérdida total

1. Crear un nuevo proyecto en Supabase
2. Actualizar `SUPABASE_DATABASE_URL` en los secretos de Replit
3. Ejecutar `npm run db:push` para recrear el esquema
4. Restaurar datos desde el backup JSON más reciente
