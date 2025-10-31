# RP Pagos

Documento con descripción general del proyecto, estructura de archivos, explicación de qué hace cada parte y sugerencias claras para conectar un backend local propio.

## Resumen

`RP Pagos` es una interfaz cliente (frontend) construida con React + Vite + TypeScript y Tailwind CSS diseñada para integrar GoHighLevel (GHL) con Mercado Pago. Provee pantallas de autenticación, un dashboard de control con métricas y un fondo animado de partículas (CosmosParticles). La aplicación incluye componentes UI reutilizables y skeletons para extender la integración con un backend propio.

Principales objetivos:

- Proveer una UI para gestionar integraciones y ver pagos.
- Ser una base para conectar a un backend que maneje la lógica con GHL y Mercado Pago (webhooks, sincronización, token management).

---

## Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query (react-query)
- Supabase (integración prevista, hay carpetas de ejemplo)
- Librerías de UI y iconos (Lucide)

---

## Estructura principal y propósito de archivos

Raíz del proyecto (archivos más relevantes):

- `index.html` — Plantilla HTML principal. Aquí se enlazan los favicons y meta tags.
- `package.json`, `package-lock.json` — Dependencias y scripts.
- `vite.config.ts` — Configuración de Vite (dev server, proxy posible).
- `tailwind.config.ts` — Configuración de Tailwind.

Carpeta `public/`:

- `react-favicon.svg`, `favicon.ico`, `icon-192.png` — Favicons y archivos públicos servidos en la raíz.
- `robots.txt` — Reglas para rastreadores.

Carpeta `src/` (código fuente):

- `main.tsx` — Punto de entrada React. Renderiza `<App />`.
- `App.tsx` — Router y proveedor global (QueryClientProvider, Tooltips, Toaster). Define rutas principales:
  - `/` Index
  - `/auth` Página de autenticación
  - `/dashboard` Dashboard principal
  - `/docs`, `*` NotFound
- `vite-env.d.ts`, `tsconfig.*.json` — configuraciones TypeScript.

Carpeta `src/pages/`:

- `Auth.tsx` — Pantalla de inicio de sesión / registro. Actualmente simula la autenticación (setTimeout). Tras login redirige a `/dashboard` y guarda un flag simple en `localStorage`. Reemplazar por lógica real de autenticación con tu backend.
- `Dashboard.tsx` — Vista principal luego del login. Muestra métricas, pagos recientes y estados de integración (GHL, Mercado Pago) con botones para gestionar conexiones.
- `Index.tsx`, `Docs.tsx`, `NotFound.tsx` — Páginas auxiliares.

Carpeta `src/components/`:

- `CosmosParticles.tsx` — Canvas con animación de partículas personalizada (fondo dinámico).
- `Navbar.tsx` — Barra superior de navegación.
- `ui/` — Conjunto de componentes UI reutilizables (botones, cards, inputs, toasts, etc.).

Carpeta `src/hooks/`:

- `use-toast.tsx` — Hook para toasts unificados.
- `use-mobile.tsx` — Hook auxiliar para detectar móviles.

Carpeta `src/integrations/supabase/`:

- `client.ts`, `types.ts` — Código de ejemplo para integrar Supabase. Puedes reutilizarlo o reemplazarlo por tu API.

Carpeta `src/lib/`:

- `utils.ts` — Utilidades compartidas.

---

## Qué ocurre después del inicio de sesión (flujo actual)

Actualmente la autenticación está simulada en `src/pages/Auth.tsx`. Al enviar el formulario (signin o signup):

1. Se muestra un `toast` de bienvenida.
2. Se escribe una bandera simple en `localStorage` (`rp_user_logged_in = '1'`).
3. Se redirige a `/dashboard` con `useNavigate`.

En el Dashboard (`src/pages/Dashboard.tsx`) se muestran datos estáticos (ejemplos de métricas y pagos recientes). Para que muestre datos reales, tu backend deberá exponer endpoints que el frontend consuma (ver sección siguiente).

---

## Conectar un backend local propio (guía práctica)

Opciones frecuentes:

- Implementar una API REST o GraphQL local (Node/Express, Fastify, Nest, Django, Flask, etc.) que maneje:

  - Autenticación y gestión de sesiones / tokens (emitir JWT o sesiones).
  - Comunicación con GoHighLevel y Mercado Pago (OAuth tokens, refresco, webhooks).
  - Endpoints para obtener métricas, pagos recientes, estados de integración.

- Para pruebas de webhooks (Mercado Pago) usa `ngrok` o `localtunnel` para exponer tu servidor local a internet.

Pasos concretos para conectar el frontend a tu backend local:

1. Define variables de entorno en la raíz (ejemplo `.env`):

```
VITE_API_BASE_URL=http://localhost:4000/api
VITE_SUPABASE_URL=... (si usas supabase)
VITE_SUPABASE_KEY=...
```

2. En el frontend usa `import.meta.env.VITE_API_BASE_URL` para construir las peticiones.

3. Configurar proxy en `vite.config.ts` (opcional pero práctico en desarrollo):

```ts
// vite.config.ts (fragmento)
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

Con esto, desde el frontend puedes llamar a `/api/payments` y Vite la redirigirá a `http://localhost:4000/api/payments`.

4. Flujo de autenticación sugerido:

- El backend implementa `/api/auth/login` que valida credenciales y devuelve un JWT.
- El frontend guarda el token (preferiblemente en memoria o HttpOnly cookie). Para simplicidad local se puede usar `localStorage`, aunque no es recomendado para producción.
- Añade un interceptor/fetch wrapper que incluya el Authorization header en cada petición.

Ejemplo sencillo de wrapper con fetch:

```ts
// src/lib/api.ts
export async function apiFetch(path: string, opts: RequestInit = {}) {
  const base = import.meta.env.VITE_API_BASE_URL || "";
  const token = localStorage.getItem("rp_token");
  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  } as any;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${base}${path}`, { ...opts, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

5. Webhooks y callbacks externos:

- Para recibir webhooks de Mercado Pago o GHL en local, expone tu servidor con ngrok: `ngrok http 4000` y configura la URL pública en los paneles de cada servicio.

6. Manejo de CORS:

- Asegúrate de permitir `http://localhost:5173` (o la URL del dev server) en las cabeceras CORS de tu backend durante desarrollo.

---

## Comandos útiles

Instalación y dev:

```powershell
npm install
npm run dev
```

Build (producción):

```powershell
npm run build
npm run preview
```

Git (ya configurado con remoto):

```powershell
git add .
git commit -m "Describe cambios"
git push rp-pagos main
```

---

## Recomendaciones para producción

- No guardar tokens sensibles en `localStorage`; usar cookies HttpOnly o un mecanismo de sesión seguro.
- Habilitar HTTPS y configurar un reverse proxy (nginx) con certificados.
- Configurar un sistema de logs y job workers para procesar webhooks y sincronizaciones.
- Sanear y validar datos recibidos desde GHL y Mercado Pago antes de almacenarlos.
- Añadir tests e integración continua para pipelines.

---

Si quieres, puedo:

- Añadir un ejemplo de servidor Node/Express minimal que exponga `/api/auth/login` y `/api/payments` para que lo ejecutes localmente.
- Crear el wrapper `src/lib/api.ts` y reemplazar las llamadas estáticas en `Dashboard` para consumir datos reales (mock).
- Expandir la documentación con diagramas o un checklist para despliegue.

Dime qué prefieres y lo implemento.
