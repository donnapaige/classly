import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AssignPlanButton } from "@/components/admin/AssignPlanButton";
import type { StudentStatus, InvoiceStatus } from "@/types";

// ── Mock data (mirrors students/page.tsx — replace with Supabase in Phase 4) ──
interface MockStudent {
  id: string;
  name: string;
  initials: string;
  birth_date: string;
  gender: string;
  parent: string;
  parent_email: string;
  parent_phone: string;
  classes: { name: string; category: string; teacher: string; schedule: string; monthly_fee: number }[];
  status: StudentStatus;
  enrolled_at: string;
  address: string;
}

const STUDENTS: MockStudent[] = [
  {
    id: "s1",
    name: "Sophia dela Cruz",
    initials: "SC",
    birth_date: "March 14, 2016",
    gender: "Female",
    parent: "Maria dela Cruz",
    parent_email: "maria.dc@email.com",
    parent_phone: "+63 917 555 0101",
    address: "42 Mango Ave, Cebu City",
    classes: [
      { name: "Ballet Foundations", category: "ballet", teacher: "Ms. Sarah Lim", schedule: "Mon & Wed 4:00–5:00 PM", monthly_fee: 4500 },
    ],
    status: "active",
    enrolled_at: "January 2026",
  },
  {
    id: "s2",
    name: "Lucas Reyes",
    initials: "LR",
    birth_date: "June 2, 2014",
    gender: "Male",
    parent: "Jose Reyes",
    parent_email: "jose.r@email.com",
    parent_phone: "+63 918 555 0202",
    address: "88 Fuente Osmeña, Cebu City",
    classes: [
      { name: "Hip-Hop Intermediate", category: "hiphop", teacher: "Mr. Dex Cruz", schedule: "Tue & Thu 5:00–6:00 PM", monthly_fee: 3800 },
    ],
    status: "active",
    enrolled_at: "January 2026",
  },
  {
    id: "s3",
    name: "Isabella Cruz",
    initials: "IC",
    birth_date: "November 8, 2015",
    gender: "Female",
    parent: "Ana Cruz",
    parent_email: "ana.c@email.com",
    parent_phone: "+63 919 555 0303",
    address: "17 Colon St, Cebu City",
    classes: [
      { name: "Ballet Foundations", category: "ballet", teacher: "Ms. Sarah Lim", schedule: "Mon & Wed 4:00–5:00 PM", monthly_fee: 4500 },
    ],
    status: "active",
    enrolled_at: "February 2026",
  },
  {
    id: "s4",
    name: "Miguel Santos",
    initials: "MS",
    birth_date: "August 19, 2013",
    gender: "Male",
    parent: "Roberto Santos",
    parent_email: "rob.s@email.com",
    parent_phone: "+63 920 555 0404",
    address: "5 Banilad Rd, Cebu City",
    classes: [
      { name: "Contemporary I", category: "contemp", teacher: "Ms. Ria Santos", schedule: "Wed 3:00–4:30 PM", monthly_fee: 4500 },
    ],
    status: "active",
    enrolled_at: "January 2026",
  },
  {
    id: "s5",  name: "Mia Santos",       initials: "MS", birth_date: "May 1, 2017",      gender: "Female", parent: "Liza Santos",       parent_email: "liza.s@email.com",  parent_phone: "+63 921 555 0505", address: "5 Banilad Rd, Cebu City",          classes: [{ name: "Contemporary I",       category: "contemp", teacher: "Ms. Ria Santos", schedule: "Wed 3:00–4:30 PM",       monthly_fee: 4500 }], status: "active",     enrolled_at: "February 2026" },
  { id: "s6",  name: "Noah Villanueva",  initials: "NV", birth_date: "Feb 22, 2011",     gender: "Male",   parent: "Carlo Villanueva",  parent_email: "carlo.v@email.com", parent_phone: "+63 922 555 0606", address: "30 Lahug, Cebu City",              classes: [{ name: "Jazz for Teens",        category: "jazz",    teacher: "Ms. Bea Tan",   schedule: "Sat 9:00–10:30 AM",      monthly_fee: 3800 }], status: "active",     enrolled_at: "January 2026" },
  { id: "s7",  name: "Sofia Mendoza",    initials: "SM", birth_date: "July 30, 2012",    gender: "Female", parent: "Grace Mendoza",     parent_email: "grace.m@email.com", parent_phone: "+63 923 555 0707", address: "12 Escario St, Cebu City",         classes: [{ name: "Jazz for Teens",        category: "jazz",    teacher: "Ms. Bea Tan",   schedule: "Sat 9:00–10:30 AM",      monthly_fee: 3800 }], status: "active",     enrolled_at: "March 2026" },
  { id: "s8",  name: "James Tan",        initials: "JT", birth_date: "April 5, 1995",    gender: "Male",   parent: "Self (Adult)",      parent_email: "james.t@email.com", parent_phone: "+63 924 555 0808", address: "99 Ayala Center, Cebu City",       classes: [{ name: "Adults Hip-Hop",        category: "adults",  teacher: "Mr. Dex Cruz",  schedule: "Fri 7:00–8:00 PM",       monthly_fee: 5200 }], status: "active",     enrolled_at: "April 2026" },
  { id: "s9",  name: "Hannah Kim",       initials: "HK", birth_date: "October 11, 2014", gender: "Female", parent: "Jin Kim",           parent_email: "jin.k@email.com",   parent_phone: "+63 925 555 0909", address: "77 IT Park, Cebu City",            classes: [{ name: "Ballet Foundations",    category: "ballet",  teacher: "Ms. Sarah Lim", schedule: "Mon & Wed 4:00–5:00 PM", monthly_fee: 4500 }, { name: "Jazz for Teens", category: "jazz", teacher: "Ms. Bea Tan", schedule: "Sat 9:00–10:30 AM", monthly_fee: 3800 }], status: "active", enrolled_at: "January 2026" },
  { id: "s10", name: "Ethan Lim",        initials: "EL", birth_date: "January 3, 2018",  gender: "Male",   parent: "Patricia Lim",      parent_email: "pat.l@email.com",   parent_phone: "+63 926 555 1010", address: "23 AS Fortuna, Mandaue City",      classes: [{ name: "Ballet Foundations",    category: "ballet",  teacher: "Ms. Sarah Lim", schedule: "Mon & Wed 4:00–5:00 PM", monthly_fee: 4500 }], status: "waitlisted", enrolled_at: "May 2026" },
  { id: "s11", name: "Aria Dela Rosa",   initials: "AD", birth_date: "September 14, 2013", gender: "Female", parent: "Tony Dela Rosa",  parent_email: "tony.dr@email.com", parent_phone: "+63 927 555 1111", address: "55 Jakosalem St, Cebu City",       classes: [{ name: "Hip-Hop Intermediate",  category: "hiphop",  teacher: "Mr. Dex Cruz",  schedule: "Tue & Thu 5:00–6:00 PM", monthly_fee: 3800 }], status: "inactive",   enrolled_at: "October 2025" },
];

// ── Mock invoices per student ─────────────────────────────────
function getMockInvoices(studentId: string) {
  return [
    { id: "inv1", number: "INV-2026-0042", description: "June 2026 Tuition", amount: STUDENTS.find(s => s.id === studentId)?.classes.reduce((s, c) => s + c.monthly_fee, 0) ?? 0, due_date: "Jun 1, 2026", status: "paid" as InvoiceStatus },
    { id: "inv2", number: "INV-2026-0031", description: "May 2026 Tuition",  amount: STUDENTS.find(s => s.id === studentId)?.classes.reduce((s, c) => s + c.monthly_fee, 0) ?? 0, due_date: "May 1, 2026", status: "paid" as InvoiceStatus },
    { id: "inv3", number: "INV-2026-0018", description: "Apr 2026 Tuition",  amount: STUDENTS.find(s => s.id === studentId)?.classes.reduce((s, c) => s + c.monthly_fee, 0) ?? 0, due_date: "Apr 1, 2026", status: "paid" as InvoiceStatus },
  ];
}

// ── Mock teacher notes ────────────────────────────────────────
const MOCK_NOTES = [
  { author: "Ms. Sarah Lim", time: "Jun 3, 2026", body: "Great improvement in port de bras this week. Posture is noticeably more consistent during center combinations." },
  { author: "Ms. Sarah Lim", time: "May 20, 2026", body: "Working on turnout exercises at home as recommended. She's very eager to practice outside class hours." },
];

// ── Category color map ────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  ballet: "#3B82F6", hiphop: "#8B5CF6", contemp: "#22C55E", jazz: "#F59E0B", adults: "#0EA5E9",
};

function StatusBadge({ status }: { status: StudentStatus }) {
  if (status === "active")     return <Badge variant="green" dot>Active</Badge>;
  if (status === "waitlisted") return <Badge variant="amber" dot>Waitlisted</Badge>;
  return <Badge variant="gray">Inactive</Badge>;
}

function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  if (status === "paid")    return <Badge variant="green">Paid</Badge>;
  if (status === "pending") return <Badge variant="amber">Pending</Badge>;
  if (status === "overdue") return <Badge variant="red">Overdue</Badge>;
  return <Badge variant="gray">Cancelled</Badge>;
}

// ── Detail grid row ───────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-4)" }}>
        {label}
      </span>
      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{value}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = STUDENTS.find((s) => s.id === params.id);
  if (!student) notFound();

  const invoices = getMockInvoices(student.id);
  const icColors = student.status === "active"
    ? { bg: "var(--highlight-soft)", color: "var(--accent)" }
    : student.status === "waitlisted"
    ? { bg: "var(--amber-bg)", color: "var(--amber)" }
    : { bg: "var(--surface-3)", color: "var(--ink-3)" };

  return (
    <>
      <Topbar
        title={
          <span className="crumbs">
            <a href="/admin/students" style={{ color: "var(--ink-3)", textDecoration: "none" }}>Students</a>
            <span style={{ margin: "0 6px", color: "var(--ink-4)" }}>›</span>
            <span className="cur">{student.name}</span>
          </span>
        }
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">Change Status ▾</Button>
          </div>
        }
      />

      <div className="content">
        <div className="grid-2-1" style={{ alignItems: "start" }}>

          {/* ── Left col ───────────────────────────────────── */}
          <div className="col" style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Student info card */}
            <div className="card">
              <div style={{ padding: "20px 22px" }}>
                {/* Avatar + name + status */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div
                    className="avatar"
                    style={{
                      width: 56,
                      height: 56,
                      fontSize: 20,
                      fontWeight: 700,
                      borderRadius: 99,
                      background: icColors.bg,
                      color: icColors.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {student.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>
                      {student.name}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <StatusBadge status={student.status} />
                      <span style={{ fontSize: 12, color: "var(--ink-4)" }}>Since {student.enrolled_at}</span>
                    </div>
                  </div>
                </div>

                {/* Details grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px 24px",
                    paddingTop: 20,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <DetailRow label="Date of Birth" value={student.birth_date} />
                  <DetailRow label="Gender" value={student.gender} />
                  <DetailRow label="Parent / Guardian" value={student.parent} />
                  <DetailRow label="Phone" value={student.parent_phone} />
                  <DetailRow label="Email" value={student.parent_email} />
                  <DetailRow label="Address" value={student.address} />
                </div>
              </div>
            </div>

            {/* Enrolled classes card */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Enrolled Classes</span>
                <Button variant="ghost" size="sm" href="/admin/enrollment/new">
                  + Enroll
                </Button>
              </div>
              <div className="tbl-wrap" style={{ border: "none", borderRadius: 0, boxShadow: "none" }}>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Teacher</th>
                      <th>Schedule</th>
                      <th>Monthly Fee</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.classes.map((cls) => (
                      <tr key={cls.name}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 99,
                                background: CAT_COLOR[cls.category] ?? "var(--ink-4)",
                                flexShrink: 0,
                              }}
                            />
                            <span style={{ fontWeight: 600 }}>{cls.name}</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--ink-2)" }}>{cls.teacher}</td>
                        <td className="col-num">{cls.schedule}</td>
                        <td className="col-amt">₱{cls.monthly_fee.toLocaleString()}</td>
                        <td><Badge variant="green" dot>Active</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoice history card */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Invoice History</span>
                <Button variant="ghost" size="sm" href="/admin/billing">
                  View All
                </Button>
              </div>
              <div className="tbl-wrap" style={{ border: "none", borderRadius: 0, boxShadow: "none" }}>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="col-num">{inv.number}</td>
                        <td style={{ color: "var(--ink-2)" }}>{inv.description}</td>
                        <td className="col-amt">₱{inv.amount.toLocaleString()}</td>
                        <td className="col-num">{inv.due_date}</td>
                        <td><InvoiceStatusBadge status={inv.status} /></td>
                        <td>
                          <Button variant="ghost" size="sm" href="/admin/billing">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Right col (rail) ───────────────────────────── */}
          <div className="col" style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Quick actions */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Quick Actions</span>
              </div>
              <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                <Button variant="primary" full href="/admin/billing">Log Payment</Button>
                <Button variant="ghost" full href="/admin/messaging">Send Message</Button>
                <AssignPlanButton />
                <Button variant="ghost" full>Change Status</Button>
                <Button variant="danger" full outline>Unenroll</Button>
              </div>
            </div>

            {/* Teacher notes */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Teacher Notes</span>
              </div>
              <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                {MOCK_NOTES.map((note, i) => (
                  <div key={i} className="note">
                    <div className="note-head">
                      <span className="note-author">{note.author}</span>
                      <span className="note-time">{note.time}</span>
                    </div>
                    <div className="note-body">{note.body}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
