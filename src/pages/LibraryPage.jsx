import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import Icon from "../components/ui/Icon";
import Badge from "../components/ui/Badge";
import SkeletonCard from "../components/ui/SkeletonCard";
import Modal from "../components/ui/Modal";
import BookForm from "../components/BookForm";

export default function LibraryPage({ navigate }) {
  const { books, loading, addBook, updateBook } = useApp();
  const { t, locale } = useTranslation();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = books.filter(b => {
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.author.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (filterGenre !== "all" && b.genre !== filterGenre) return false;
    if (filterRating !== "all" && b.rating < +filterRating) return false;
    return true;
  });

  const genres = [...new Set(books.map(b => b.genre))].sort();

  const statusLabels = {
    want_to_read: t("status.want_to_read"),
    reading: t("status.reading"),
    read: t("status.read"),
  };

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (editBook) { await updateBook(editBook.id, data); }
      else { await addBook(data); }
      setShowModal(false); setEditBook(null);
    } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="page-title">{t("library.title")}</h1>
          <p className="page-subtitle">{t("library.results", { n: filtered.length })}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditBook(null); setShowModal(true); }}>
          <Icon name="plus" size={16} /> {t("library.addBook")}
        </button>
      </div>

      <div className="filter-bar">
        <div style={{ position: "relative", flex: "1 1 200px", minWidth: 160 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔍</span>
          <input className="input" style={{ paddingLeft: 36 }} value={search} onChange={e => setSearch(e.target.value)} placeholder={t("library.searchPlaceholder")} />
        </div>
        <select className="input" style={{ width: "auto", flex: "0 1 140px" }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">{t("library.allStatuses")}</option>
          {Object.entries(statusLabels).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select className="input" style={{ width: "auto", flex: "0 1 140px" }} value={filterGenre} onChange={e => setFilterGenre(e.target.value)}>
          <option value="all">{t("library.allGenres")}</option>
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
        <select className="input" style={{ width: "auto", flex: "0 1 130px" }} value={filterRating} onChange={e => setFilterRating(e.target.value)}>
          <option value="all">{t("library.anyRating")}</option>
          <option value="4">4+ ⭐</option>
          <option value="3">3+ ⭐</option>
        </select>
      </div>

      {loading ? (
        <div className="grid-books">{Array(8).fill(0).map((_,i) => <SkeletonCard key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8 }}>{t("library.noResults")}</h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{t("library.noResultsText")}</p>
        </div>
      ) : (
        <div className="grid-books">
          {filtered.map(b => (
            <div key={b.id} className="book-card" onClick={() => navigate(`/book/${b.id}`)}>
              {b.cover
                ? <img src={b.cover} alt={b.title} className="book-cover" onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                : null}
              <div className="book-cover-placeholder" style={{ display: b.cover ? "none" : "flex" }}>📖</div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
                <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.author}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Badge status={b.status} />
                  {b.rating > 0 && <div style={{ fontSize: 12, color: "var(--amber)" }}>{"★".repeat(b.rating)}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="floating-btn" title={t("library.addBook")} onClick={() => { setEditBook(null); setShowModal(true); }}>+</button>

      {showModal && (
        <Modal title={editBook ? t("form.editBook") : t("form.newBook")} onClose={() => { setShowModal(false); setEditBook(null); }} size="lg">
          <BookForm initial={editBook} onSubmit={handleSave} onClose={() => { setShowModal(false); setEditBook(null); }} loading={saving} />
        </Modal>
      )}
    </div>
  );
}
