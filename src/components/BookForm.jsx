import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import StarRating from "./ui/StarRating";
import Spinner from "./ui/Spinner";

export default function BookForm({ initial, onSubmit, onClose, loading }) {
  const { t } = useTranslation();
  const empty = { title:"", author:"", genre:"Fiction", year: new Date().getFullYear(), cover:"", status:"want_to_read", rating:0, review:"", summary:"", notes:"", quotes:[] };
  const [form, setForm] = useState(initial || empty);
  const [quoteInput, setQuoteInput] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const addQuote = () => { if (quoteInput.trim()) { set("quotes", [...(form.quotes||[]), quoteInput.trim()]); setQuoteInput(""); } };
  const removeQuote = (i) => set("quotes", form.quotes.filter((_,idx) => idx !== i));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };

  const genres = ["Fiction","Non-Fiction","Science Fiction","Fantasy","Mystery","Thriller","Romance","Biography","History","Self-Help","Science","Poetry","Horror","Literary Fiction","Graphic Novel"];
  const statusLabels = {
    want_to_read: t("status.want_to_read"),
    reading: t("status.reading"),
    read: t("status.read"),
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <label className="label">{t("form.title")}</label>
          <input className="input" required value={form.title} onChange={e => set("title", e.target.value)} placeholder={t("form.titlePlaceholder")} />
        </div>
        <div>
          <label className="label">{t("form.author")}</label>
          <input className="input" required value={form.author} onChange={e => set("author", e.target.value)} placeholder={t("form.authorPlaceholder")} />
        </div>
        <div>
          <label className="label">{t("form.year")}</label>
          <input className="input" type="number" min="1000" max="2030" value={form.year} onChange={e => set("year", +e.target.value)} />
        </div>
        <div>
          <label className="label">{t("form.genre")}</label>
          <select className="input" value={form.genre} onChange={e => set("genre", e.target.value)}>
            {genres.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="label">{t("form.status")}</label>
          <select className="input" value={form.status} onChange={e => set("status", e.target.value)}>
            {Object.entries(statusLabels).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label className="label">{t("form.cover")}</label>
          <input className="input" value={form.cover} onChange={e => set("cover", e.target.value)} placeholder={t("form.coverPlaceholder")} />
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label className="label">{t("form.summary")}</label>
          <textarea className="input" value={form.summary} onChange={e => set("summary", e.target.value)} placeholder={t("form.summaryPlaceholder")} rows={3} />
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <label className="label">{t("form.notes")}</label>
          <textarea className="input" value={form.notes} onChange={e => set("notes", e.target.value)} placeholder={t("form.notesPlaceholder")} rows={2} />
        </div>
        {form.status === "read" && (
          <>
            <div style={{ gridColumn: "1/-1" }}>
              <label className="label">{t("form.rating")}</label>
              <StarRating value={form.rating} onChange={v => set("rating", v)} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label className="label">{t("form.review")}</label>
              <textarea className="input" value={form.review} onChange={e => set("review", e.target.value)} placeholder={t("form.reviewPlaceholder")} rows={3} />
            </div>
          </>
        )}
        <div style={{ gridColumn: "1/-1" }}>
          <label className="label">{t("form.quotes")}</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input className="input" value={quoteInput} onChange={e => setQuoteInput(e.target.value)} placeholder={t("form.quotePlaceholder")} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addQuote())} />
            <button type="button" className="btn btn-secondary btn-sm" onClick={addQuote}>+</button>
          </div>
          {(form.quotes||[]).map((q,i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
              <div className="quote-item" style={{ flex: 1, fontSize: 13 }}>{q}</div>
              <button type="button" className="btn btn-ghost btn-sm btn-icon" onClick={() => removeQuote(i)}>✕</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
        <button type="button" className="btn btn-secondary" onClick={onClose}>{t("form.cancel")}</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <><Spinner size={16} /> {t("form.saving")}</> : t("form.save")}
        </button>
      </div>
    </form>
  );
}
