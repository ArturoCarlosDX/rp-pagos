import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiFetch from "@/lib/api";

export default function PaymentResult() {
  const { search } = useLocation();
  const q = new URLSearchParams(search);
  const [status, setStatus] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(search);
    const collection_id = q.get("collection_id");
    const payment_id = q.get("payment_id") || collection_id;
    const preference_id = q.get("preference_id");
    const statusParam = q.get("status");

    async function verify() {
      try {
        if (payment_id) {
          const info = await apiFetch(
            `/payments/verify?payment_id=${payment_id}`
          );
          setDetails(info as Record<string, unknown>);
          // use the query param as primary indicator; backend details are shown below
          setStatus(statusParam || "unknown");
        } else if (preference_id) {
          const info = await apiFetch(
            `/payments/verify?preference_id=${preference_id}`
          );
          setDetails(info as Record<string, unknown>);
          setStatus(statusParam || "unknown");
        } else {
          setStatus(statusParam || "unknown");
        }
      } catch (e) {
        console.error("verify error", e);
        setStatus(statusParam || "unknown");
      }
    }
    verify();
  }, [search]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Resultado de Pago</h1>
        <p className="mb-2">
          Estado: <strong>{status}</strong>
        </p>
        <div className="bg-muted p-4 rounded">
          <pre className="text-sm">{JSON.stringify(details, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
