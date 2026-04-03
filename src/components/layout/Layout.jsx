import { useState } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import Sidebar from "./Sidebar";

export default function Layout({ children, route, navigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div>
      <div className="mobile-header">
        <button className="btn btn-ghost btn-icon" onClick={() => setSidebarOpen(true)}>☰</button>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>📚 {t("app.brand")}</span>
        <div style={{ width: 36 }} />
      </div>
      {sidebarOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 49 }} onClick={() => setSidebarOpen(false)} />}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar route={route} navigate={navigate} onClose={() => setSidebarOpen(false)} />
      </div>
      <main className="main-content">{children}</main>
    </div>
  );
}
