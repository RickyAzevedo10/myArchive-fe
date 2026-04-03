import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import Badge from "../components/ui/Badge";

export default function DashboardPage() {
  const { books, user } = useApp();
  const { t } = useTranslation();
  const read = books.filter(b => b.status === "read");
  const reading = books.filter(b => b.status === "reading");
  const want = books.filter(b => b.status === "want_to_read");
  const avgRating = read.filter(b => b.rating > 0).length
    ? (read.filter(b => b.rating > 0).reduce((s,b) => s + b.rating, 0) / read.filter(b => b.rating > 0).length).toFixed(1)
    : "—";

  const genreCounts = books.reduce((acc, b) => { acc[b.genre] = (acc[b.genre] || 0) + 1; return acc; }, {});
  const topGenres = Object.entries(genreCounts).sort((a,b) => b[1]-a[1]).slice(0, 6);
  const maxGenre = topGenres[0]?.[1] || 1;

  const monthlyMock = [
    "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"
  ].map(m => ({ m, v: Math.floor(Math.random() * 4) }));
  const maxMonth = Math.max(...monthlyMock.map(x => x.v), 1);

  const recentBooks = [...books].sort((a,b) => new Date(b.addedAt) - new Date(a.addedAt)).slice(0, 5);
  const genreColors = ["var(--accent)", "var(--indigo)", "var(--green)", "var(--amber)", "var(--accent2)", "var(--accent3)"];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t("dashboard.greeting", { name: user?.name?.split(" ")[0] })}</h1>
        <p className="page-subtitle">{t("dashboard.subtitle")}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: t("dashboard.read"), value: read.length, color: "var(--green)", icon: "✓" },
          { label: t("dashboard.reading"), value: reading.length, color: "var(--amber)", icon: "📖" },
          { label: t("dashboard.wantToRead"), value: want.length, color: "var(--indigo)", icon: "📋" },
          { label: t("dashboard.avgRating"), value: avgRating, color: "var(--accent)", icon: "⭐" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div className="stat-number" style={{ color: s.color, fontSize: 36 }}>{s.value}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>{t("dashboard.topGenres")}</h3>
          {topGenres.length === 0 ? <div style={{ color: "var(--text-muted)", fontSize: 14 }}>{t("dashboard.noData")}</div> :
            topGenres.map(([g, n], i) => (
              <div key={g} className="chart-bar">
                <div className="chart-label">{g}</div>
                <div style={{ flex: 1, background: "var(--surface2)", borderRadius: 6, height: 28, overflow: "hidden" }}>
                  <div className="chart-fill" style={{ width: `${(n/maxGenre)*100}%`, background: genreColors[i] }}>{n}</div>
                </div>
              </div>
            ))
          }
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>{t("dashboard.annualProgress")}</h3>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 120 }}>
            {monthlyMock.map(({ m, v }) => (
              <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: `${(v/maxMonth)*90}px`, background: v > 0 ? "var(--accent)" : "var(--surface2)", borderRadius: "4px 4px 0 0", opacity: v > 0 ? 1 : 0.4, transition: "height 0.8s cubic-bezier(0.4,0,0.2,1)", minHeight: 4 }} />
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{t(`months.${m}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>{t("dashboard.recent")}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recentBooks.map(b => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              {b.cover ? <img src={b.cover} alt={b.title} style={{ width: 36, height: 54, objectFit: "cover", borderRadius: 6 }} onError={e => e.target.style.display="none"} />
                : <div style={{ width: 36, height: 54, background: "var(--surface2)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>📖</div>
              }
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{b.author}</div>
              </div>
              <Badge status={b.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
