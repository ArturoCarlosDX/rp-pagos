import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const MP_TOKEN = process.env.MP_ACCESS_TOKEN;
if (!MP_TOKEN) {
  console.warn(
    "MP_ACCESS_TOKEN not set. Please create .env from .env.example and set MP_ACCESS_TOKEN"
  );
}

mercadopago.configure({ access_token: MP_TOKEN });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Create payment preference (Checkout Pro)
app.post("/api/payments/create", async (req, res) => {
  try {
    const { amount, description, external_reference, payer } = req.body;
    const publicUrl = process.env.PUBLIC_URL || "http://localhost:5173";

    const preference = {
      items: [
        {
          title: description || "Pago RP Pagos",
          quantity: 1,
          unit_price: Number(amount) || 0,
        },
      ],
      external_reference: external_reference || undefined,
      back_urls: {
        success: `${publicUrl}/payment/result`,
        failure: `${publicUrl}/payment/result`,
        pending: `${publicUrl}/payment/result`,
      },
      auto_return: "approved",
      payer: payer || undefined,
    };

    const mpRes = await mercadopago.preferences.create(preference);
    return res.json({
      checkout_url: mpRes.body.init_point,
      preference_id: mpRes.body.id,
      raw: mpRes.body,
    });
  } catch (err) {
    console.error("create preference error", err);
    return res
      .status(500)
      .json({ error: "Error creando preferencia", details: String(err) });
  }
});

// Webhook endpoint
app.post("/api/webhooks/mp", (req, res) => {
  // En producción valida signature y procesa correctamente
  console.log("MP webhook received", { body: req.body });
  // TODO: buscar payment info con mercadopago.payment.findById(id) y actualizar DB
  res.sendStatus(200);
});

// Verify payment by payment_id or preference_id
app.get("/api/payments/verify", async (req, res) => {
  try {
    const { payment_id, preference_id } = req.query;
    if (payment_id) {
      const info = await mercadopago.payment.findById(payment_id);
      return res.json(info);
    }
    if (preference_id) {
      // Search payments by preference id (this is an example: in production, store mapping in DB)
      // Mercado Pago has endpoints to search payments: we can use payments.search but here we return placeholder
      return res.json({
        preference_id,
        message: "Implement search by preference in production",
      });
    }
    return res
      .status(400)
      .json({ error: "payment_id or preference_id required" });
  } catch (err) {
    console.error("verify error", err);
    return res
      .status(500)
      .json({ error: "Error verificando pago", details: String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`RP Pagos server listening on ${PORT}`));
