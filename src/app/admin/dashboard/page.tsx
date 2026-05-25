import { Users, CalendarDays, DollarSign, TrendingUp } from "lucide-react";
import { Topbar } from "@/components/admin/Topbar";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ClassSession, RecentPayment } from "@/types";

// ── Mock data (replace with Supabase queries in Phase 2) ──────

const STATS = [
  {
    label: "Active Students",
    value: "148",
    delta: "+4 this term",
    deltaDirection: "up" as const,
    note: "vs 144 last term",
    period: "This term",
    variant: "blue" as const,
    icon: <Users size={18} />,
  },
  {
    label: "Classes Today",
    value: "12",
    delta: "+2",
    deltaDirection: "up" as const,
    note: "vs yesterday",
    period: "Mon 26 May",
    variant: "green" as const,
    icon: <CalendarDays size={18} />,
  },
  {
    label: "Revenue (May)",
    value: "₱184,500",
    delta: "+11%",
    deltaDirection: "up" as const,
    note: "vs April",
    period: "Month to date",
    variant: "purple" as const,
    icon: <DollarSign size={18} />,
  },
  {
    label: "Outstanding",
    value: "₱22,800",
    delta: "8 invoices",
    deltaDirection: "flat" as const,
    note: "3 overdue",
    period: "Unpaid",
    variant: "amber" as const,
    icon: <TrendingUp size={18} />,
  },
];

const TODAY_CLASSES: ClassSession[] = [
  {
    id: "1",
    name: "Ballet Foundations",
    teacher: "Ms. Santos",
    room: "Studio A",
    time: "8:00 AM",
    enrolled: 12,
    capacity: 15,
    status: "active",
  },
  {
    id: "2",
    name: "Hip-Hop Intermediate",
    teacher: "Mr. Cruz",
    room: "Studio B",
    time: "10:00 AM",
    enrolled: 15,
    capacity: 15,
    status: "full",
  },
  {
    id: "3",
    name: "Contemporary I",
    teacher: "Ms. Reyes",
    room: "Studio A",
    time: "1:00 PM",
    enrolled: 9,
    capacity: 14,
    status: "active",
  },
  {
    id: "4",
    name: "Jazz for Teens",
    teacher: "Ms. Lim",
    room: "Studio C",
    time: "3:30 PM",
    enrolled: 11,
    capacity: 12,
    status: "active",
  },
];

const RECENT_PAYMENTS: RecentPayment[] = [
  {
    id: "1",
    studentName: "Sophia dela Cruz",
    amount: 4500,
    method: "gcash",
    status: "paid",
    date: "May 25",
  },
  {
    id: "2",
    studentName: "Lucas Reyes",
    amount: 3800,
    method: "maya",
    status: "paid",
    date: "May 25",
  },
  {
    id: "3",
    studentName: "Mia Santos",
    amount: 4500,
    method: "cash",
    status: "pending",
    date: "May 24",
  },
  {
    id: "4",
    studentName: "Noah Villanueva",
    amount: 3800,
    method: "card",
    status: "overdue",
    date: "May 20",
  },
];

// ── Helpers ───────────────────────────────────────────────────

function ClassStatusBadge({ status }: { status: ClassSession["status"] }) {
  if (status === "active")    return <Badge variant="green" dot>Active</Badge>;
  if (status === "full")      return <Badge variant="amber" dot>Full</Badge>;
  return <Badge variant="red" dot>Cancelled</Badge>;
}

function PaymentStatusBadge({ status }: { status: RecentPayment["status"] }) {
  if (status === "paid")    return <Badge variant="green">Paid</Badge>;
  if (status === "pending") return <Badge variant="amber">Pending</Badge>;
  return <Badge variant="red">Overdue</Badge>;
}

const METHOD_LABELS: Record<RecentPayment["method"], string> = {
  gcash: "GCash",
  maya:  "Maya",
  cash:  "Cash",
  card:  "Card",
};

// ── Page ───────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <>
      <Topbar
        title="Dashboard"
        actions={
          <Button variant="primary" size="sm" href="/admin/enrollment/new">
            + New Enrollment
          </Button>
        }
      />

      <div className="content">
        {/* Greeting */}
        <div style={{ marginBottom: 22 }}>
          <h2 className="t-h2" style={{ color: "var(--ink)", marginBottom: 4 }}>
            Good morning, Monica
          </h2>
          <p className="t-body" style={{ color: "var(--ink-3)", margin: 0 }}>
            Monday, 26 May 2025 · Vida Dance Center, Cebu
          </p>
        </div>

        {/* KPI strip */}
        <div className="stat-grid">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Main + rail */}
        <div className="grid-2-1">
          {/* Main column */}
          <div className="col">
            {/* Today's Classes */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Today&rsquo;s Classes</span>
                <Button variant="ghost" size="sm" href="/admin/schedule">
                  View schedule
                </Button>
              </div>
              <div
                className="tbl-wrap"
                style={{ border: "none", borderRadius: 0, boxShadow: "none" }}
              >
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Teacher</th>
                      <th>Room</th>
                      <th>Time</th>
                      <th>Enrolled</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TODAY_CLASSES.map((cls) => (
                      <tr key={cls.id}>
                        <td>
                          <span
                            style={{ fontWeight: 600, color: "var(--ink)" }}
                          >
                            {cls.name}
                          </span>
                        </td>
                        <td>{cls.teacher}</td>
                        <td className="col-num">{cls.room}</td>
                        <td className="col-num">{cls.time}</td>
                        <td className="col-num">
                          {cls.enrolled}/{cls.capacity}
                        </td>
                        <td>
                          <ClassStatusBadge status={cls.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Waitlist */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Waitlist</span>
                <Badge variant="amber">2 pending</Badge>
              </div>
              <div style={{ padding: "14px 22px" }}>
                <p
                  className="t-body"
                  style={{ color: "var(--ink-3)", margin: 0 }}
                >
                  2 students are waiting for an open slot. Review and confirm
                  enrollment.
                </p>
              </div>
            </div>
          </div>

          {/* Rail column */}
          <div className="col">
            {/* Recent Payments */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Recent Payments</span>
                <Button variant="ghost" size="sm" href="/admin/billing">
                  All invoices
                </Button>
              </div>
              {RECENT_PAYMENTS.map((p, i) => (
                <div
                  key={p.id}
                  className="payment-item"
                  style={{
                    borderBottom:
                      i < RECENT_PAYMENTS.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13.5,
                        color: "var(--ink)",
                      }}
                    >
                      {p.studentName}
                    </div>
                    <div className="t-caption" style={{ color: "var(--ink-3)" }}>
                      {METHOD_LABELS[p.method]} · {p.date}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      className="col-amt"
                      style={{ fontSize: 13, color: "var(--ink)" }}
                    >
                      ₱{p.amount.toLocaleString()}
                    </span>
                    <PaymentStatusBadge status={p.status} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Quick Actions</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  padding: "14px 22px",
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  full
                  href="/admin/enrollment/new"
                >
                  + Enrollment
                </Button>
                <Button variant="ghost" size="sm" full href="/admin/billing">
                  Log Payment
                </Button>
                <Button variant="ghost" size="sm" full href="/admin/messaging">
                  Send Message
                </Button>
                <Button variant="ghost" size="sm" full href="/admin/schedule">
                  Add Class
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Messages</span>
                <Badge variant="blue">3 unread</Badge>
              </div>
              <div style={{ padding: "14px 22px" }}>
                <p
                  className="t-body"
                  style={{ color: "var(--ink-3)", margin: 0 }}
                >
                  3 unread messages from parents and teachers.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  href="/admin/messaging"
                  style={{ marginTop: 10 }}
                >
                  Open inbox
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
