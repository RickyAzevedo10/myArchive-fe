import { useTranslation } from "../../i18n/useTranslation";

const STATUS_COLORS = { want_to_read: "#6366f1", reading: "#f59e0b", read: "#10b981" };

export default function Badge({ status }) {
  const { t } = useTranslation();
  const label = t(`status.${status}`);
  const colors = STATUS_COLORS[status];
  return <span className="badge" style={{ background: colors + "20", color: colors, border: `1px solid ${colors}40` }}>{label}</span>;
}
