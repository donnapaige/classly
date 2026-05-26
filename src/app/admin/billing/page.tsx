import { Topbar } from "@/components/admin/Topbar";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Receipt, DollarSign, Clock, AlertTriangle } from "lucide-react";
import type { Invoice } from "@/types";

// ── Mock data (replace with Supabase in Phase 3) ─────────────
const INVOICES: Invoice[] = [
  {
    id: "1", invoice_number: "INV-0041",
    student_id: "s1", student_name: "Sophia dela Cruz",
    description: "Ballet Foundations — May 2026",
    amount: 4500, due_date: "May 15, 2026",
    status: "paid", method: "gcash", paid_at: "May 14",
  },
  {
    id: "2", invoice_number: "INV-0042",
    student_id: "s2", student_name: "Lucas Reyes",
    description: "Hip-Hop Intermediate — May 2026",
    amount: 3800, due_date: "May 15, 2026",
    status: "paid", method: "maya", paid_at: "May 15",
  },
  {
    id: "3", invoice_number: "INV-0043",
    student_id: "s3", student_name: "Isabella Cruz",
    description: "Ballet Foundations — May 2026",
    amount: 4500, due_date: "May 15, 2026",
    status: "paid", method: "cash", paid_at: "May 13",
  },
  {
    id: "4", invoice_number: "INV-0044",
    student_id: "s4", student_name: "Miguel Santos",
    description: "Contemporary I — May 2026",
    amount: 4500, due_date: "May 15, 2026",
    status: "paid", method: "card", paid_at: "May 12",
  },
  {
    id: "5", invoice_number: "INV-0045",
    student_id: "s5", student_name: "Mia Santos",
    description: "Contemporary I — May 2026",
    amount: 4500, due_date: "May 15, 2026",
    status: "pending",
  },
  {
    id: "6", invoice_number: "INV-0046",
    student_id: "s6", student_name: "James Tan",
    description: "Adults Hip-Hop — May 2026",
    amount: 5200, due_date: "May 15, 2026",
    status: "pending",
  },
  {
    id: "7", invoice_number: "INV-0047",
    student_id: "s7", student_name: "Noah Villanueva",
    description: "Jazz for Teens — May 2026",
    amount: 3800, due_date: "May 10, 2026",
    status: "overdue",
  },
  {
    id: "8", invoice_number: "INV-0048",
    student_id: "s8", student_name: "Sofia Mendoza",
    description: "Jazz for Teens — May 2026",
    amount: 3800, due_date: "May 5, 2026",
    status: "overdue",
  },
];

// ── Helpers ───────────────────────────────────────────────────
const peso = (n: number) => `₱${n.toLocaleString()}`;

const METHOD_LABEL: Record<string, string> = {
  gcash: "GC", maya: "M", cash: "₱", card: "CC", qrph: "QR", grab: "G",
};

type MethodKey = keyof typeof METHOD_LABEL;

function methodIcClass(inv: Invoice): string {
  if (inv.status === "overdue") return "is-over";
  if (!inv.method)             return "is-card";
  return `is-${inv.method}`;
}

function methodLabel(inv: Invoice): string {
  if (inv.status === "overdue") return "!";
  if (!inv.method)              return "—";
  return METHOD_LABEL[inv.method as MethodKey] ?? "—";
}

function StatusBadge({ status }: { status: Invoice["status"] }) {
  if (status === "paid")      return <Badge variant="green" dot>Paid</Badge>;
  if (status === "pending")   return <Badge variant="amber" dot>Pending</Badge>;
  if (status === "overdue")   return <Badge variant="red"   dot>Overdue</Badge>;
  return <Badge variant="gray">Cancelled</Badge>;
}

// ── Derived KPIs ──────────────────────────────────────────────
function calcStats(invoices: Invoice[]) {
  const total   = invoices.reduce((s, i) => s + i.amount, 0);
  const paid    = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  return { total, paid, pending, overdue };
}

// ── Page ──────────────────────────────────────────────────────
export default function BillingPage() {
  const { total, paid, pending, overdue } = calcStats(INVOICES);

  return (
    <>
      <Topbar
        title="Billing & Invoices"
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">
              Export CSV
            </Button>
            <Button variant="primary" size="sm">
              Log Payment
            </Button>
          </div>
        }
      />

      <div className="content">
        {/* KPI strip */}
        <div className="stat-grid" style={{ marginBottom: 22 }}>
          <StatCard
            label="Total Invoiced"
            value={peso(total)}
            period="May 2026"
            variant="blue"
            icon={<Receipt size={18} />}
          />
          <StatCard
            label="Collected"
            value={peso(paid)}
            delta={`${INVOICES.filter(i => i.status === "paid").length} invoices`}
            deltaDirection="up"
            note="this month"
            period="Paid"
            variant="green"
            icon={<DollarSign size={18} />}
          />
          <StatCard
            label="Awaiting Payment"
            value={peso(pending)}
            delta={`${INVOICES.filter(i => i.status === "pending").length} open`}
            deltaDirection="flat"
            period="Pending"
            variant="amber"
            icon={<Clock size={18} />}
          />
          <StatCard
            label="Past Due"
            value={peso(overdue)}
            delta={`${INVOICES.filter(i => i.status === "overdue").length} invoices`}
            deltaDirection="down"
            note="action needed"
            period="Overdue"
            variant="amber"
            icon={<AlertTriangle size={18} />}
          />
        </div>

        {/* Invoice list */}
        <div className="card">
          {/* Card header with filter tabs */}
          <div className="card-header">
            <span className="card-title">Invoices — May 2026</span>
            <div style={{ display: "flex", gap: 6 }}>
              {(["All", "Paid", "Pending", "Overdue"] as const).map(
                (label, i) => (
                  <button
                    key={label}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 99,
                      border: "1px solid var(--border-2)",
                      background: i === 0 ? "var(--accent)" : "transparent",
                      color: i === 0 ? "#fff" : "var(--ink-2)",
                      font: "inherit",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 120ms, color 120ms",
                    }}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Rows */}
          {INVOICES.map((inv) => (
            <div key={inv.id} className="pay-row">
              {/* Method icon */}
              <div className={`pay-method-ic ${methodIcClass(inv)}`}>
                {methodLabel(inv)}
              </div>

              {/* Student + description */}
              <div className="pay-body">
                <div className="pay-name">{inv.student_name}</div>
                <div className="pay-sub">
                  {inv.invoice_number} · {inv.description}
                </div>
              </div>

              {/* Due date */}
              <span
                className="t-caption"
                style={{
                  color: "var(--ink-3)",
                  minWidth: 90,
                  textAlign: "right",
                }}
              >
                {inv.status === "paid" ? `Paid ${inv.paid_at}` : `Due ${inv.due_date}`}
              </span>

              {/* Amount + status */}
              <div className="pay-right">
                <span className="pay-amt">{peso(inv.amount)}</span>
                <StatusBadge status={inv.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
