import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import StarRating from "../components/ui/StarRating";

export default function ProfilePage() {
  const { user, books } = useApp();
  const { t } = useTranslation();
  const read = books.filter(b => b.status === "read");
  const topRated = [...books].filter(b => b.rating > 0).sort((a,b) => b.rating - a.rating).slice(0, 3);
  const genreCounts = books.reduce((acc, b) => { acc[b.genre] = (acc[b.genre] || 0) + 1; return acc; }, {});
  const favoriteGenre = Object.entries(genreCounts).sort((a,b) => b[1]-a[1])[0]?.[0] || "—";
  const avgRating = read.filter(b => b.rating > 0).length
    ? (read.filter(b => b.rating > 0).reduce((s,b) => s + b.rating, 0) / read.filter(b => b.rating > 0).length).toFixed(1)
    : "—";

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t("profile.title")}</h1>
      </div>

      <div className="card" style={{ padding: 32, marginBottom: 24 }}>
        <div className="profile-header">
          <img src={user?.avatar} alt="avatar" className="avatar" style={{ width: 80, height: 80 }} />
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>{user?.name}</h2>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>{user?.email}</p>
            <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 4 }}>{t("profile.memberSince", { date: user?.joinedAt })}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
          {[
            { label: t("profile.totalBooks"), value: books.length, icon: "📚" },
            { label: t("profile.read"), value: read.length, icon: "✅" },
            { label: t("profile.avgRating"), value: avgRating, icon: "⭐" },
            { label: t("profile.favGenre"), value: favoriteGenre, icon: "🏷️", small: true },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--surface2)", borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: s.small ? 16 : 28, fontWeight: 700, color: "var(--accent)" }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {topRated.length > 0 && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>{t("profile.topRated")}</h3>
          {topRated.map((b, i) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: i < topRated.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: ["var(--amber)","var(--text-muted)","#cd7f32"][i], width: 32, textAlign: "center" }}>{i+1}</div>
              {b.cover && <img src={b.cover} alt={b.title} style={{ width: 40, height: 60, objectFit: "cover", borderRadius: 6 }} onError={e => e.target.style.display="none"} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{b.title}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 13 }}>{b.author}</div>
              </div>
              <StarRating value={b.rating} readonly />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
