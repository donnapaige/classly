// ── Shared entity types ───────────────────────────────────────

// ── UI primitives ─────────────────────────────────────────────

export type StatVariant = "blue" | "green" | "amber" | "purple";

export type TagVariant =
  | "green"
  | "amber"
  | "red"
  | "blue"
  | "teal"
  | "purple"
  | "gray";

export type ButtonVariant = "primary" | "ghost" | "secondary" | "danger";
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

// ── Dashboard mock shapes (Phase 1) ───────────────────────────

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

export interface RecentPayment {
  id: string;
  studentName: string;
  amount: number;
  method: "gcash" | "maya" | "cash" | "card";
  status: "paid" | "pending" | "overdue";
  date: string;
}

// ── Domain types (Phase 2) ─────────────────────────────────────

export type StudentStatus = "active" | "inactive" | "waitlisted";
export type ClassCategory = "ballet" | "hiphop" | "contemp" | "jazz" | "adults";
export type EnrollmentStatus = "active" | "waitlisted" | "completed" | "cancelled";
export type InvoiceStatus = "pending" | "paid" | "overdue" | "cancelled";
export type PaymentMethod = "gcash" | "maya" | "cash" | "card" | "qrph" | "grab";
export type UserRole = "admin" | "staff" | "teacher";

export interface Student {
  id: string;
  full_name: string;
  birth_date?: string;
  parent_name?: string;
  parent_email?: string;
  parent_phone?: string;
  status: StudentStatus;
  created_at: string;
}

export interface DanceClass {
  id: string;
  name: string;
  category: ClassCategory;
  teacher_name: string;
  room: string;
  capacity: number;
  monthly_fee: number;
  status: "active" | "inactive";
}

export interface ScheduleBlock {
  id: string;
  class_id: string;
  name: string;
  teacher: string;
  category: ClassCategory;
  day_of_week: number; // 0 = Mon … 5 = Sat
  start_time: string;
  end_time: string;
  enrolled: number;
  capacity: number;
}

export interface Enrollment {
  id: string;
  student_id: string;
  student_name: string;
  class_id: string;
  class_name: string;
  status: EnrollmentStatus;
  enrolled_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  student_id: string;
  student_name: string;
  description: string;
  amount: number;
  due_date: string;
  status: InvoiceStatus;
  method?: PaymentMethod;
  paid_at?: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  student_id: string;
  student_name: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paid_at: string;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  tag: string;
  class_ids: string[];
  price_override?: number;
  status: "active" | "inactive";
}
