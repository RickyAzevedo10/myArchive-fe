import { useTranslation } from "../../i18n/useTranslation";

export default function Toast({ toasts }) {
  const { t } = useTranslation();
  return (
    <div className="toast-container">
      {toasts.map(tItem => (
        <div key={tItem.id} className={`toast toast-${tItem.type}`}>
          <span>{tItem.type === "success" ? "✓" : tItem.type === "error" ? "✕" : "ℹ"}</span>
          {tItem.msg.key ? t(tItem.msg.key, tItem.msg.params) : tItem.msg}
        </div>
      ))}
    </div>
  );
}
