"use client";

import { useEffect, useState } from "react";
import { getConfigAction, updateConfigAction } from "@/actions/config";
import type { AppConfig } from "@/lib/config";

export default function ConfigPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [price, setPrice] = useState("");
  const [checkoutLink, setCheckoutLink] = useState("");
  const [scripts, setScripts] = useState<string[]>([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    getConfigAction().then((data) => {
      setPrice(data.price);
      setCheckoutLink(data.checkoutLink);
      setScripts(data.scripts || []);
      setLoading(false);
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aglomerado") {
      setAuthed(true);
      setMessage({ type: "", text: "" });
    } else {
      setMessage({ type: "error", text: "Senha incorreta." });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    const res = await updateConfigAction(password, { price, checkoutLink, scripts });
    setSaving(false);

    if (res.success) {
      setMessage({ type: "success", text: "Configurações salvas!" });
    } else {
      setMessage({ type: "error", text: res.error || "Erro ao salvar." });
    }
  };

  const addScript = () => setScripts([...scripts, ""]);
  const updateScript = (index: number, value: string) => {
    const newScripts = [...scripts];
    newScripts[index] = value;
    setScripts(newScripts);
  };
  const removeScript = (index: number) => {
    setScripts(scripts.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f8f9fa", color: "#333" }}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="admin-config-wrapper" style={{ 
      minHeight: "100vh", 
      background: "#f0f4f8", 
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      color: "#1e293b",
      display: "flex",
      justifyContent: "center",
      alignItems: authed ? "flex-start" : "center",
      padding: authed ? "40px 20px" : "20px",
      margin: 0,
    }}>
      <style>{`
        /* Reset any global styles specifically for this container */
        .admin-config-wrapper * {
          box-sizing: border-box;
        }
        .admin-config-wrapper h1, .admin-config-wrapper h2, .admin-config-wrapper p, .admin-config-wrapper label {
          color: #1e293b !important; /* Force prevent orange overrides */
          transition: none !important; 
        }
        .admin-config-wrapper label {
          color: #475569 !important;
        }
        .admin-config-wrapper p.subtitle {
          color: #64748b !important;
        }
        .admin-glass-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 800px;
          padding: 32px;
          border: 1px solid #e2e8f0;
        }
        .admin-login-card {
          max-width: 400px;
          text-align: center;
        }
        .admin-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          color: #0f172a !important;
          background: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .admin-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }
        .admin-btn {
          cursor: pointer;
          border: none;
          font-weight: 500;
          transition: all 0.2s ease;
          border-radius: 8px;
        }
        .admin-btn:hover {
          transform: translateY(-1px);
        }
        .admin-btn-primary {
          background: #1e293b;
          color: #ffffff !important;
          padding: 12px 24px;
          font-size: 15px;
        }
        .admin-btn-primary:hover {
          background: #0f172a;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
        }
        .admin-btn-login {
          width: 100%;
          background: #3b82f6;
          color: #fff !important;
          padding: 12px;
          font-size: 16px;
        }
        .admin-btn-login:hover {
          background: #2563eb;
        }
        .admin-btn-secondary {
          background: #eff6ff;
          color: #2563eb !important;
          padding: 8px 16px;
          font-size: 13px;
        }
        .admin-btn-secondary:hover {
          background: #dbeafe;
        }
        .admin-btn-danger {
          background: #fef2f2;
          color: #dc2626 !important;
          padding: 6px 12px;
          font-size: 12px;
        }
        .admin-btn-danger:hover {
          background: #fee2e2;
        }
        .admin-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        .admin-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        @media (max-width: 600px) {
          .admin-row {
            flex-direction: column;
          }
        }
        .admin-section {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .admin-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 12px;
        }
      `}</style>

      {!authed ? (
        <div className="admin-glass-card admin-login-card">
          <h1 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}>Acesso Administrativo</h1>
          <p className="subtitle" style={{ fontSize: "14px", marginBottom: "24px" }}>Por favor, insira a senha para continuar.</p>
          
          {message.text && (
            <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "10px", borderRadius: "6px", fontSize: "14px", marginBottom: "16px" }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: "500" }}>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="Insira a senha do administrador"
              />
            </div>
            <button type="submit" className="admin-btn admin-btn-login">Entrar no Painel</button>
          </form>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "800px" }}>
          
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "700", letterSpacing: "-0.5px", marginBottom: "8px" }}>Configurações</h1>
            <p className="subtitle" style={{ fontSize: "15px", margin: 0 }}>Gerencie dinamicamente os links de checkout e os scripts do UTMify.</p>
          </div>

          {message.text && (
            <div style={{ 
              padding: "16px", borderRadius: "8px", marginBottom: "24px", fontSize: "14px", fontWeight: "500",
              background: message.type === 'error' ? '#fef2f2' : '#f0fdf4',
              color: message.type === 'error' ? '#b91c1c' : '#15803d',
              border: `1px solid ${message.type === 'error' ? '#fecaca' : '#bbf7d0'}`
            }}>
              {message.text}
            </div>
          )}

          <div className="admin-section">
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
              Produto Ativo (Osmo Pocket 3 Creator Combo)
            </h2>
            <div className="admin-row">
              <div className="admin-col">
                <label style={{ fontSize: "14px", fontWeight: "500" }}>Preço em Exibição</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="admin-input"
                  placeholder="Ex: 87.00"
                />
              </div>
              <div className="admin-col">
                <label style={{ fontSize: "14px", fontWeight: "500" }}>Link de Checkout</label>
                <input
                  type="text"
                  value={checkoutLink}
                  onChange={(e) => setCheckoutLink(e.target.value)}
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="admin-section">
            <div className="admin-header-flex">
              <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                Scripts de Rastreamento (UTMify)
              </h2>
              <button type="button" onClick={addScript} className="admin-btn admin-btn-secondary">
                + Adicionar Script
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {scripts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 0", color: "#94a3b8", fontSize: "14px", background: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                  Nenhum script foi adicionado ainda.
                </div>
              ) : (
                scripts.map((script, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label style={{ fontSize: "14px", fontWeight: "600" }}>Script {index + 1}</label>
                      <button type="button" onClick={() => removeScript(index)} className="admin-btn admin-btn-danger">
                        Remover
                      </button>
                    </div>
                    <textarea
                      value={script}
                      onChange={(e) => updateScript(index, e.target.value)}
                      className="admin-input"
                      style={{ minHeight: "120px", fontFamily: "monospace", fontSize: "13px", resize: "vertical", background: "#f8fafc", color: "#334155" }}
                      placeholder="<script>...código do pixel...</script>"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
            <button
              onClick={handleSave}
              disabled={saving}
              className="admin-btn admin-btn-primary"
              style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}
            >
              {saving ? "Salvando aguarde..." : "Salvar Configurações"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
