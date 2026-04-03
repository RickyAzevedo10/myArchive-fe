import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import BooksAPI from "../services/booksApi";
import Icon from "../components/ui/Icon";
import Badge from "../components/ui/Badge";
import StarRating from "../components/ui/StarRating";
import Spinner from "../components/ui/Spinner";
import Modal from "../components/ui/Modal";
import BookForm from "../components/BookForm";

export default function BookDetailPage({ id, navigate }) {
  const { books, updateBook, deleteBook, addToast } = useApp();
  const { t } = useTranslation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("info");
  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    BooksAPI.getById(id).then(b => { setBook(b); setLoading(false); });
  }, [id]);

  useEffect(() => { const b = books.find(x => x.id === id); if (b) setBook(b); }, [books, id]);

  const handleDelete = async () => {
    if (!confirm(t("bookDetail.confirmDelete"))) return;
    await deleteBook(id);
    navigate("/library");
  };

  const handleSave = async (data) => {
    setSaving(true);
    try { await updateBook(id, data); setShowEdit(false); }
    finally { setSaving(false); }
  };

  const handleStatusChange = async (status) => {
    await updateBook(id, { status });
  };

  const statusLabels = {
    want_to_read: t("status.want_to_read"),
    reading: t("status.reading"),
    read: t("status.read"),
  };

  const statusColors = { want_to_read: "#6366f1", reading: "#f59e0b", read: "#10b981" };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
      <Spinner size={36} />
    </div>
  );
  if (!book) return (
    <div className="empty-state">
      <div className="empty-icon">😕</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>{t("bookDetail.notFound")}</h3>
      <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate("/library")}>{t("bookDetail.backBtn")}</button>
    </div>
  );

  return (
    <div>
      <button className="btn btn-ghost" style={{ marginBottom: 16 }} onClick={() => navigate("/library")}>
        {t("bookDetail.back")}
      </button>

      <div className="detail-hero">
        <div className="detail-hero-bg" style={{ backgroundImage: `url(${book.cover})` }} />
        <div className="detail-hero-content">
          {book.cover
            ? <img src={book.cover} alt={book.title} className="detail-cover" onError={e => e.target.style.display="none"} />
            : <div className="detail-cover" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface2)", fontSize: 64 }}>📖</div>
          }
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "white", marginBottom: 8, lineHeight: 1.2 }}>{book.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 12 }}>{book.author} · {book.year}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <Badge status={book.status} />
              <span className="badge" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}>{book.genre}</span>
              {book.rating > 0 && <StarRating value={book.rating} readonly />}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div>
          <label className="label" style={{ marginBottom: 4 }}>{t("bookDetail.changeStatus")}</label>
          <div style={{ display: "flex", gap: 8 }}>
            {Object.entries(statusLabels).map(([v, l]) => (
              <button key={v} className={`btn btn-sm ${book.status === v ? "btn-primary" : "btn-secondary"}`}
                onClick={() => handleStatusChange(v)} style={book.status === v ? { background: statusColors[v], color: "#0f0e17" } : {}}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto", alignSelf: "flex-end" }}>
          <button className="btn btn-secondary" onClick={() => setShowEdit(true)}><Icon name="edit" size={15} /> {t("bookDetail.edit")}</button>
          <button className="btn btn-danger" onClick={handleDelete}><Icon name="trash" size={15} /> {t("bookDetail.delete")}</button>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 24, width: "fit-content" }}>
        {[["info", t("bookDetail.tabInfo")],["notes", t("bookDetail.tabNotes")],["quotes", t("bookDetail.tabQuotes")]].map(([v,l]) => (
          <button key={v} className={`tab ${tab === v ? "active" : ""}`} onClick={() => setTab(v)}>{l}</button>
        ))}
      </div>

      {tab === "info" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {book.summary && (
            <div className="card" style={{ padding: 24, gridColumn: "1/-1" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 12 }}>{t("bookDetail.summary")}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{book.summary}</p>
            </div>
          )}
          {book.review && (
            <div className="card" style={{ padding: 24, gridColumn: "1/-1" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 12 }}>{t("bookDetail.review")}</h3>
              <StarRating value={book.rating} readonly />
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>{book.review}</p>
            </div>
          )}
          {!book.summary && !book.review && (
            <div className="empty-state" style={{ gridColumn: "1/-1", padding: 40 }}>
              <div className="empty-icon" style={{ fontSize: 40 }}>📄</div>
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{t("bookDetail.noSummary")} <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => setShowEdit(true)}>{t("bookDetail.addCta")}</span></p>
            </div>
          )}
        </div>
      )}
      {tab === "notes" && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 12 }}>{t("bookDetail.notes")}</h3>
          {book.notes ? <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{book.notes}</p>
            : <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)", fontSize: 14 }}>
                {t("bookDetail.noNotes")} <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => setShowEdit(true)}>{t("bookDetail.addCta")}</span>
              </div>}
        </div>
      )}
      {tab === "quotes" && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 16 }}>{t("bookDetail.quotes")}</h3>
          {book.quotes?.length > 0 ? book.quotes.map((q, i) => (
            <div key={i} className="quote-item">{q}</div>
          )) : <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)", fontSize: 14 }}>
            {t("bookDetail.noQuotes")} <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => setShowEdit(true)}>{t("bookDetail.addCta")}</span>
          </div>}
        </div>
      )}

      {showEdit && (
        <Modal title={t("form.editBook")} onClose={() => setShowEdit(false)} size="lg">
          <BookForm initial={book} onSubmit={handleSave} onClose={() => setShowEdit(false)} loading={saving} />
        </Modal>
      )}
    </div>
  );
}
