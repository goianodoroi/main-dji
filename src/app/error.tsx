"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aqui você poderia logar o erro em um serviço como Sentry ou Datadog
    console.error("Global app error caught:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#f5f5f5",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "500px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "16px" }}>
          Desculpe, algo deu errado.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.5 }}>
          Não foi possível carregar esta parte da página. Nossa equipe já foi notificada.
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: "#E05D26",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "99px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
