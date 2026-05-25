import type { StatVariant } from "@/types";

interface StatCardProps {
  label: string;
  value: string;
  period?: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "flat";
  note?: string;
  variant?: StatVariant;
  icon: React.ReactNode;
}

export function StatCard({
  label,
  value,
  period,
  delta,
  deltaDirection = "up",
  note,
  variant = "blue",
  icon,
}: StatCardProps) {
  const iconClass = [
    "stat-icon",
    variant === "green" ? "is-green" : "",
    variant === "amber" ? "is-amber" : "",
    variant === "purple" ? "is-purple" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const deltaClass = [
    "stat-delta",
    deltaDirection === "down" ? "is-down" : "",
    deltaDirection === "flat" ? "is-flat" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="stat">
      <div className="stat-top">
        <div className={iconClass}>{icon}</div>
        {period && <span className="stat-period">{period}</span>}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        {delta && <span className={deltaClass}>{delta}</span>}
        {note && <span className="stat-note">{note}</span>}
      </div>
    </div>
  );
}
