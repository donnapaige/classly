import { Topbar } from "@/components/admin/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MessageSquare } from "lucide-react";

// ── Mock data (replace with Supabase in Phase 4) ──────────────
interface Thread {
  id: string;
  sender: string;
  initials: string;
  role: "parent" | "teacher" | "system";
  subject: string;
  preview: string;
  time: string;
  isUnread: boolean;
  tag?: "urgent" | "invoice" | "schedule";
}

const THREADS: Thread[] = [
  {
    id: "t1",
    sender: "Maria dela Cruz",
    initials: "MD",
    role: "parent",
    subject: "Class schedule change — Ballet Thursday",
    preview: "Hi! I wanted to ask about the schedule change for Ballet on Thursday. Will it affect the recital rehearsal?",
    time: "10:32 AM",
    isUnread: true,
  },
  {
    id: "t2",
    sender: "Ms. Santos",
    initials: "S",
    role: "teacher",
    subject: "Studio A — extra rehearsal Saturday",
    preview: "Just a heads up that I'll need Studio A this Saturday from 2–5 PM for extra recital rehearsal time. Is it available?",
    time: "9:15 AM",
    isUnread: true,
    tag: "schedule",
  },
  {
    id: "t3",
    sender: "Jose Reyes",
    initials: "JR",
    role: "parent",
    subject: "May invoice — query on amount",
    preview: "Good afternoon! I noticed the invoice for Lucas this month seems higher than usual. Can you please clarify?",
    time: "Yesterday",
    isUnread: false,
    tag: "invoice",
  },
  {
    id: "t4",
    sender: "Mr. Cruz",
    initials: "C",
    role: "teacher",
    subject: "Prospective student — Hip-Hop class",
    preview: "I have a prospective student visiting the class tomorrow afternoon. Please let me know if that's alright.",
    time: "Yesterday",
    isUnread: false,
  },
  {
    id: "t5",
    sender: "Grace Mendoza",
    initials: "GM",
    role: "parent",
    subject: "Recital costume sizes for Sofia",
    preview: "Hello! We received the costume form. Sofia's size is Small for the top and Medium for the skirt. Thank you!",
    time: "May 24",
    isUnread: false,
  },
  {
    id: "t6",
    sender: "Ms. Reyes",
    initials: "R",
    role: "teacher",
    subject: "Contemporary I — showcase slot request",
    preview: "The Contemporary I group is ready for the showcase. I'd suggest the last slot before intermission — around 7:30 PM.",
    time: "May 23",
    isUnread: false,
    tag: "schedule",
  },
  {
    id: "t7",
    sender: "Jin Kim",
    initials: "JK",
    role: "parent",
    subject: "Hannah — summer intensive interest",
    preview: "Hi, Hannah loved the spring term. We're very interested in the summer intensive if there are slots still available.",
    time: "May 22",
    isUnread: false,
  },
  {
    id: "t8",
    sender: "Ms. Lim",
    initials: "L",
    role: "teacher",
    subject: "Jazz syllabus update for June",
    preview: "I've updated the Jazz for Teens syllabus for the next term. Attaching the revised assessment criteria for your review.",
    time: "May 21",
    isUnread: false,
  },
];

// ── Helpers ───────────────────────────────────────────────────
function RoleAvatar({ initials, role }: { initials: string; role: Thread["role"] }) {
  const styles: Record<Thread["role"], { bg: string; color: string }> = {
    parent:  { bg: "var(--highlight-soft)", color: "var(--accent)" },
    teacher: { bg: "var(--purple-bg)",      color: "var(--purple)" },
    system:  { bg: "var(--surface-3)",      color: "var(--ink-3)"  },
  };
  const s = styles[role];
  return (
    <div
      className="avatar"
      style={{
        width: 40,
        height: 40,
        background: s.bg,
        color: s.color,
        fontSize: 14,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function TagChip({ tag }: { tag: NonNullable<Thread["tag"]> }) {
  const map = {
    urgent:   { variant: "red"    as const, label: "Urgent"   },
    invoice:  { variant: "amber"  as const, label: "Invoice"  },
    schedule: { variant: "blue"   as const, label: "Schedule" },
  };
  const t = map[tag];
  return <Badge variant={t.variant}>{t.label}</Badge>;
}

const unreadCount = THREADS.filter(t => t.isUnread).length;

// ── Page ──────────────────────────────────────────────────────
export default function MessagingPage() {
  return (
    <>
      <Topbar
        title="Messaging"
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">Broadcast</Button>
            <Button variant="primary" size="sm">
              <MessageSquare size={14} />
              Compose
            </Button>
          </div>
        }
      />

      <div className="content">
        <div className="grid-2-1" style={{ alignItems: "flex-start" }}>
          {/* Thread list */}
          <div className="col">
            <div className="card">
              <div className="card-header">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="card-title">Inbox</span>
                  {unreadCount > 0 && (
                    <Badge variant="blue">{unreadCount} unread</Badge>
                  )}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["All", "Unread", "Parents", "Teachers"] as const).map((label, i) => (
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

              {/* Threads */}
              {THREADS.map((thread) => (
                <div key={thread.id} className={`msg-thread${thread.isUnread ? " is-unread" : ""}`}>
                  {/* Unread dot */}
                  <div style={{ width: 8, flexShrink: 0, display: "flex", alignItems: "flex-start", paddingTop: 6 }}>
                    {thread.isUnread && (
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 99,
                          background: "var(--accent)",
                        }}
                      />
                    )}
                  </div>

                  <RoleAvatar initials={thread.initials} role={thread.role} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 2,
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13.5,
                          fontWeight: thread.isUnread ? 700 : 600,
                          color: "var(--ink)",
                        }}
                      >
                        {thread.sender}
                      </span>
                      <span
                        className="t-caption"
                        style={{ color: "var(--ink-3)", flexShrink: 0 }}
                      >
                        {thread.time}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: thread.isUnread ? 600 : 500,
                          color: thread.isUnread ? "var(--ink)" : "var(--ink-2)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {thread.subject}
                      </span>
                      {thread.tag && <TagChip tag={thread.tag} />}
                    </div>

                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--ink-3)",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {thread.preview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right rail */}
          <div className="col">
            {/* Select a thread prompt */}
            <div
              className="card"
              style={{
                padding: "48px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "var(--highlight-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageSquare size={24} color="var(--accent)" />
              </div>
              <div>
                <p
                  className="t-h4"
                  style={{ color: "var(--ink)", margin: "0 0 6px" }}
                >
                  Select a thread
                </p>
                <p
                  className="t-body"
                  style={{ color: "var(--ink-3)", margin: 0 }}
                >
                  Click any message on the left to read and reply.
                </p>
              </div>
              <Button variant="primary" size="sm" style={{ marginTop: 4 }}>
                <MessageSquare size={14} />
                Compose New
              </Button>
            </div>

            {/* Quick stats */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Overview</span>
              </div>
              <div style={{ padding: "14px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Total Threads",   value: THREADS.length, color: "var(--ink)" },
                  { label: "Unread",          value: unreadCount,    color: "var(--accent)" },
                  { label: "From Parents",    value: THREADS.filter(t => t.role === "parent").length,  color: "var(--ink-2)" },
                  { label: "From Teachers",   value: THREADS.filter(t => t.role === "teacher").length, color: "var(--purple)" },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span className="t-body" style={{ color: "var(--ink-3)" }}>{row.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 16, color: row.color }}>{row.value}</span>
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
