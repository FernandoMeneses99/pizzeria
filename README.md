# Pizzeria (clon + frontend moderno)

Clon moderno de la plantilla "Pizza" (Colorlib) usando **Vite + React + TypeScript**, **Tailwind CSS v4** (`tailwindcss` + `@tailwindcss/cli`), componentes estilo **shadcn/ui**, animaciones **GSAP**, iconos **Lucide**, preparado para **Supabase** (menú dinámico, reservas, configuración) y despliegue en **Vercel**.

## Requisitos
- Node.js 18+
- npm

## Instalación y desarrollo
```bash
npm install
npm run dev
```

## Variables de entorno
Copia `.env.example` a `.env` y completa:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_PASSWORD=admin123
```
> Si no configuras Supabase, el sitio usa datos de respaldo (fallback) para el menú y el formulario de reservas no podrá guardarse.

## Base de datos (Supabase)
Ejecuta el script `supabase/schema.sql` en el **SQL Editor** de tu proyecto Supabase para crear:
- `menu_items` (menú dinámico)
- `reservations` (reservas desde el formulario público)
- `site_config` (configuración del sitio)
Incluye políticas RLS básicas (lectura pública de menú/config, inserción pública de reservas) y datos semilla.

**Seguridad admin:** el panel `/admin` usa una contraseña simple por `VITE_ADMIN_PASSWORD` (gate frontend). Para producción, se recomienda implementar **Supabase Auth** con roles y políticas RLS que restrinjan lectura/gestión de reservas y CRUD de menú/config a usuarios autenticados/autorizados (o usar un backend con `service_role`).

## Rutas principales
- `/` Home
- `/menu` Menú (desde BD con fallback)
- `/services` Servicios
- `/about` Nosotros
- `/blog` Blog
- `/reservas` Formulario de reservas (guarda en Supabase)
- `/admin` Panel de administración (reservas, menú, configuración)

## Build
```bash
npm run build
npm run preview
```

## Despliegue (Vercel)
- Framework: Vite, output `dist` (ver `vercel.json` con rewrite SPA).
- Configura las variables de entorno en Vercel (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`).
- Repositorio objetivo: `https://github.com/FernandoMeneses99/pizzeria.git`

## Notas de migración desde la plantilla original
- Bootstrap/jQuery/plugins reemplazados por Tailwind + React + GSAP.
- Icon fonts reemplazados por Lucide.
- Página de contacto convertida en **Reservas** con persistencia en BD y visualización en admin.
- Menú y configuración preparados para ser dinámicos desde Supabase.
