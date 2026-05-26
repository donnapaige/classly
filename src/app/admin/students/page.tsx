import { Topbar } from "@/components/admin/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { Users } from "lucide-react";
import type { StudentStatus } from "@/types";

// ── Mock data (replace with Supabase in Phase 4) ──────────────
interface MockStudent {
  id: string;
  name: string;
  initials: string;
  parent: string;
  parent_email: string;
  classes: string[];
  monthly_fee: number;
  status: StudentStatus;
  enrolled_at: string;
}

const STUDENTS: MockStudent[] = [
  { id: "s1",  name: "Sophia dela Cruz",  initials: "SC", parent: "Maria dela Cruz",     parent_email: "maria.dc@email.com",   classes: ["Ballet Foundations"],                    monthly_fee: 4500, status: "active",     enrolled_at: "Jan 2026" },
  { id: "s2",  name: "Lucas Reyes",        initials: "LR", parent: "Jose Reyes",          parent_email: "jose.r@email.com",      classes: ["Hip-Hop Intermediate"],                  monthly_fee: 3800, status: "active",     enrolled_at: "Jan 2026" },
  { id: "s3",  name: "Isabella Cruz",      initials: "IC", parent: "Ana Cruz",             parent_email: "ana.c@email.com",       classes: ["Ballet Foundations"],                    monthly_fee: 4500, status: "active",     enrolled_at: "Feb 2026" },
  { id: "s4",  name: "Miguel Santos",      initials: "MS", parent: "Roberto Santos",       parent_email: "rob.s@email.com",       classes: ["Contemporary I"],                        monthly_fee: 4500, status: "active",     enrolled_at: "Jan 2026" },
  { id: "s5",  name: "Mia Santos",         initials: "MS", parent: "Liza Santos",          parent_email: "liza.s@email.com",      classes: ["Contemporary I"],                        monthly_fee: 4500, status: "active",     enrolled_at: "Feb 2026" },
  { id: "s6",  name: "Noah Villanueva",    initials: "NV", parent: "Carlo Villanueva",     parent_email: "carlo.v@email.com",     classes: ["Jazz for Teens"],                        monthly_fee: 3800, status: "active",     enrolled_at: "Jan 2026" },
  { id: "s7",  name: "Sofia Mendoza",      initials: "SM", parent: "Grace Mendoza",        parent_email: "grace.m@email.com",     classes: ["Jazz for Teens"],                        monthly_fee: 3800, status: "active",     enrolled_at: "Mar 2026" },
  { id: "s8",  name: "James Tan",          initials: "JT", parent: "Self (Adult)",         parent_email: "james.t@email.com",     classes: ["Adults Hip-Hop"],                        monthly_fee: 5200, status: "active",     enrolled_at: "Apr 2026" },
  { id: "s9",  name: "Hannah Kim",         initials: "HK", parent: "Jin Kim",              parent_email: "jin.k@email.com",       classes: ["Ballet Foundations", "Jazz for Teens"],  monthly_fee: 8300, status: "active",     enrolled_at: "Jan 2026" },
  { id: "s10", name: "Ethan Lim",          initials: "EL", parent: "Patricia Lim",         parent_email: "pat.l@email.com",       classes: ["Ballet Foundations"],                    monthly_fee: 4500, status: "waitlisted", enrolled_at: "May 2026" },
  { id: "s11", name: "Aria Dela Rosa",     initials: "AD", parent: "Tony Dela Rosa",       parent_email: "tony.dr@email.com",     classes: ["Hip-Hop Intermediate"],                  monthly_fee: 3800, status: "inactive",   enrolled_at: "Oct 2025" },
];

// ── Helpers ───────────────────────────────────────────────────
function getInitialsColor(status: StudentStatus) {
  if (status === "active")     return { bg: "var(--highlight-soft)", color: "var(--accent)" };
  if (status === "waitlisted") return { bg: "var(--amber-bg)",       color: "var(--amber)"  };
  return                              { bg: "var(--surface-3)",       color: "var(--ink-3)"  };
}

function StatusBadge({ status }: { status: StudentStatus }) {
  if (status === "active")     return <Badge variant="green" dot>Active</Badge>;
  if (status === "waitlisted") return <Badge variant="amber" dot>Waitlisted</Badge>;
  return <Badge variant="gray">Inactive</Badge>;
}

const total      = STUDENTS.length;
const active     = STUDENTS.filter(s => s.status === "active").length;
const waitlisted = STUDENTS.filter(s => s.status === "waitlisted").length;
const inactive   = STUDENTS.filter(s => s.status === "inactive").length;
const mrrTotal   = STUDENTS.filter(s => s.status === "active")
                            .reduce((sum, s) => sum + s.monthly_fee, 0);

// ── Page ──────────────────────────────────────────────────────
export default function StudentsPage() {
  return (
    <>
      <Topbar
        title="Students"
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">Export</Button>
            <Button variant="primary" size="sm" href="/admin/enrollment/new">
              + Add Student
            </Button>
          </div>
        }
      />

      <div className="content">
        {/* KPI strip */}
        <div className="stat-grid" style={{ marginBottom: 22 }}>
          <StatCard label="Total Students" value={String(total)}  period="All time"  variant="blue"   icon={<Users size={18} />} />
          <StatCard label="Active"         value={String(active)} period="Enrolled"  variant="green"  icon={<Users size={18} />} delta={`${Math.round(active/total*100)}%`} deltaDirection="up" />
          <StatCard label="Waitlisted"     value={String(waitlisted)} period="Pending" variant="amber" icon={<Users size={18} />} />
          <StatCard label="Monthly Revenue" value={`₱${mrrTotal.toLocaleString()}`} period="Active students" variant="purple" icon={<Users size={18} />} />
        </div>

        {/* Student roster */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Student Roster</span>
            <div style={{ display: "flex", gap: 6 }}>
              {(["All", "Active", "Waitlisted", "Inactive"] as const).map((label, i) => (
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
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="tbl-wrap" style={{ border: "none", borderRadius: 0, boxShadow: "none" }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Parent / Guardian</th>
                  <th>Classes</th>
                  <th>Monthly Fee</th>
                  <th>Since</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((s) => {
                  const ic = getInitialsColor(s.status);
                  return (
                    <tr key={s.id}>
                      {/* Student name + avatar */}
                      <td>
                        <div className="name-cell">
                          <div
                            className="avatar"
                            style={{ background: ic.bg, color: ic.color }}
                          >
                            {s.initials}
                          </div>
                          <span style={{ fontWeight: 600 }}>{s.name}</span>
                        </div>
                      </td>

                      {/* Parent */}
                      <td>
                        <div style={{ fontWeight: 500, color: "var(--ink)" }}>{s.parent}</div>
                        <div className="t-caption" style={{ color: "var(--ink-3)" }}>{s.parent_email}</div>
                      </td>

                      {/* Classes */}
                      <td>
                        {s.classes.length === 0 ? (
                          <span style={{ color: "var(--ink-4)" }}>—</span>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {s.classes.map(c => (
                              <span key={c} className="t-caption" style={{ color: "var(--ink-2)" }}>{c}</span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Fee */}
                      <td className="col-amt">
                        {s.monthly_fee > 0 ? `₱${s.monthly_fee.toLocaleString()}` : "—"}
                      </td>

                      {/* Enrolled since */}
                      <td className="col-num">{s.enrolled_at}</td>

                      {/* Status */}
                      <td><StatusBadge status={s.status} /></td>

                      {/* Actions */}
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
