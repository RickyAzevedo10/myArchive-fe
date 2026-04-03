import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/useTranslation";
import Icon from "../ui/Icon";

export default function Sidebar({ route, navigate, onClose }) {
  const { user, logout, darkMode, setDarkMode } = useApp();
  const { t, locale, setLocale } = useTranslation();
  const links = [
    { path: "/dashboard", icon: "home", label: t("nav.dashboard") },
    { path: "/library", icon: "book", label: t("nav.library") },
    { path: "/profile", icon: "user", label: t("nav.profile") },
  ];
  return (
    <div className="sidebar">
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>📚</span>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{t("app.brand")}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t("app.brandSub")}</div>
          </div>
        </div>
      </div>

      {user && (
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
          <img src={user.avatar} alt="avatar" className="avatar" style={{ width: 36, height: 36, background: "var(--surface2)" }} />
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
          </div>
        </div>
      )}

      <nav style={{ flex: 1, padding: "12px 12px" }}>
        {links.map(l => (
          <div key={l.path} className={`nav-link ${route.startsWith(l.path) ? "active" : ""}`}
            onClick={() => { navigate(l.path); onClose && onClose(); }}>
            <Icon name={l.icon} size={17} />{l.label}
          </div>
        ))}
      </nav>

      <div style={{ padding: "12px 12px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 4 }}>
        <button className="btn btn-ghost" style={{ justifyContent: "flex-start", gap: 12, padding: "11px 16px", borderRadius: 10, fontSize: 14 }}
          onClick={() => setDarkMode(!darkMode)}>
          <Icon name={darkMode ? "sun" : "moon"} size={17} />
          {darkMode ? t("sidebar.lightMode") : t("sidebar.darkMode")}
        </button>
        <button className="btn btn-ghost" style={{ justifyContent: "flex-start", gap: 12, padding: "11px 16px", borderRadius: 10, fontSize: 14 }}
          onClick={() => setLocale(locale === "pt" ? "en" : "pt")}>
          <Icon name="globe" size={17} />
          {locale === "pt" ? "EN" : "PT"}
        </button>
        <button className="btn btn-ghost" style={{ justifyContent: "flex-start", gap: 12, padding: "11px 16px", borderRadius: 10, fontSize: 14, color: "var(--accent2)" }}
          onClick={logout}>
          <Icon name="logout" size={17} />{t("sidebar.logout")}
        </button>
      </div>
    </div>
  );
}
