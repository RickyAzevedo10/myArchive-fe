export default function SkeletonCard() {
  return (
    <div className="book-card" style={{ padding: 0 }}>
      <div className="skeleton" style={{ width: "100%", aspectRatio: "2/3" }} />
      <div style={{ padding: 12 }}>
        <div className="skeleton" style={{ height: 14, marginBottom: 8, borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 12, width: "60%", borderRadius: 6 }} />
      </div>
    </div>
  );
}
