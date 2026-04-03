export default function Icon({ name, size = 18 }) {
  const icons = {
    book: "📚", home: "🏠", search: "🔍", plus: "➕", edit: "✏️", trash: "🗑️",
    star: "⭐", user: "👤", moon: "🌙", sun: "☀️", chart: "📊", logout: "🚪",
    close: "✕", check: "✓", arrow: "→", back: "←", menu: "☰", heart: "♥",
    quote: "💬", note: "📝", tag: "🏷️", filter: "⚡", eye: "👁", shield: "🔐",
    globe: "🌍", fire: "🔥", lock: "🔒",
  };
  return <span style={{ fontSize: size, lineHeight: 1 }}>{icons[name] || "•"}</span>;
}
