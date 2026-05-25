// ── Shared entity types — Phase 1 ─────────────────────────────

export type StatVariant = "blue" | "green" | "amber" | "purple";

export type TagVariant =
  | "green"
  | "amber"
  | "red"
  | "blue"
  | "teal"
  | "purple"
  | "gray";

export type ButtonVariant =
  | "primary"
  | "ghost"
  | "secondary"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

// Nav item used by Sidebar
export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

// KPI stat card data shape
export interface StatData {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "flat";
  note?: string;
  period?: string;
  variant?: StatVariant;
}

// Dashboard — today's classes
export interface ClassSession {
  id: string;
  name: string;
  teacher: string;
  room: string;
  time: string;
  enrolled: number;
  capacity: number;
  status: "active" | "cancelled" | "full";
}

// Recent payment row
export interface RecentPayment {
  id: string;
  studentName: string;
  amount: number;
  method: "gcash" | "maya" | "cash" | "card";
  status: "paid" | "pending" | "overdue";
  date: string;
}
