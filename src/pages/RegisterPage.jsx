import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import Spinner from "../components/ui/Spinner";

export default function RegisterPage({ onSwitch }) {
  const { register, addToast } = useApp();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { addToast({ key: "auth.passwordMin", type: "error" }); return; }
    setLoading(true);
    try { await register(form.name, form.email, form.password); }
    catch (err) { addToast({ key: "auth.invalidCredentials", type: "error" }); }
    finally { setLoading(false); }
  };
  return (
    <div className="auth-page">
      <div className="auth-blob" style={{ width: 400, height: 400, background: "var(--indigo)", top: -150, left: -100 }} />
      <div className="auth-blob" style={{ width: 300, height: 300, background: "var(--amber)", bottom: -100, right: -80 }} />
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>{t("auth.createTitle")}</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: 14 }}>{t("auth.createSubtitle")}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label className="label">{t("auth.nameLabel")}</label>
            <input className="input" type="text" required value={form.name} onChange={e => set("name", e.target.value)} placeholder={t("auth.namePlaceholder")} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label">{t("auth.emailLabel")}</label>
            <input className="input" type="email" required value={form.email} onChange={e => set("email", e.target.value)} placeholder={t("auth.emailPlaceholder")} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label">{t("auth.passwordLabel")}</label>
            <input className="input" type="password" required value={form.password} onChange={e => set("password", e.target.value)} placeholder={t("auth.passwordPlaceholder")} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15, marginTop: 8 }}>
            {loading ? <><Spinner size={18} /> {t("auth.createLoading")}</> : t("auth.createBtn")}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 24, color: "var(--text-muted)", fontSize: 14 }}>
          {t("auth.hasAccount")}{" "}
          <span style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }} onClick={onSwitch}>{t("auth.login")}</span>
        </div>
      </div>
    </div>
  );
}
