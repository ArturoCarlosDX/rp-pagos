% RP Pagos - Backend de ejemplo

Este pequeño backend demuestra cómo crear una preferencia (link) de Mercado Pago en modo sandbox y exponer endpoints mínimos que el frontend del proyecto consume.

## Requisitos

- Node 18+ (o compatible)
- Copia `.env.example` a `.env` y rellena `MP_ACCESS_TOKEN` con tu token de sandbox.

Variables necesarias (.env):

```
MP_ACCESS_TOKEN=TU_TOKEN_DE_SANDBOX
PORT=4000
PUBLIC_URL=http://localhost:5173
```

Instalación y ejecución

```powershell
cd server
npm install
# desarrollo (reinicia con nodemon)
npm run dev
# producción
npm start
```

Endpoints relevantes

- POST /api/payments/create

  - Body JSON: { amount, description, external_reference, payer }
  - Respuesta: { checkout_url, preference_id }

- GET /api/payments/verify?payment_id=... (o ?preference_id=...)

- POST /api/webhooks/mp (recibe notificaciones de Mercado Pago)

Notas

- No subas `.env` ni tus credenciales al repo.
- Para probar webhooks en local usa `ngrok http 4000` y registra la URL pública en el panel de Mercado Pago o en tu configuración.
