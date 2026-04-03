import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import Spinner from "../components/ui/Spinner";

export default function LoginPage({ onSwitch }) {
  const { login, addToast } = useApp();
  const { t } = useTranslation();
  const [email, setEmail] = useState("alex@biblioteca.pt");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await login(email, password); }
    catch (err) { addToast({ key: "auth.invalidCredentials", type: "error" }); }
    finally { setLoading(false); }
  };
  return (
    <div className="auth-page">
      <div className="auth-blob" style={{ width: 400, height: 400, background: "var(--accent)", top: -100, right: -100 }} />
      <div className="auth-blob" style={{ width: 300, height: 300, background: "var(--accent3)", bottom: -80, left: -80 }} />
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>{t("app.title")}</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: 14 }}>{t("app.subtitle")}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label className="label">{t("auth.emailLabel")}</label>
            <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={t("auth.emailPlaceholder")} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label className="label">{t("auth.passwordLabel")}</label>
            <input className="input" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder={t("auth.passwordPlaceholder")} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15 }}>
            {loading ? <><Spinner size={18} /> {t("auth.loginLoading")}</> : t("auth.login")}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 24, color: "var(--text-muted)", fontSize: 14 }}>
          {t("auth.noAccount")}{" "}
          <span style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }} onClick={onSwitch}>{t("auth.createAccount")}</span>
        </div>
        <div style={{ marginTop: 20, padding: 14, background: "var(--surface2)", borderRadius: 10, fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>
          {t("auth.demoHint")}
        </div>
      </div>
    </div>
  );
}
