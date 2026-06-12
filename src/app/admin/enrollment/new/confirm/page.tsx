"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

// ── Mock class data ───────────────────────────────────────────
const MOCK_CLASSES = [
  { id: "c1", name: "Ballet Foundations",   category: "ballet",  teacher_name: "Ms. Sarah Lim",  schedule: "Mon & Wed · 4:00–5:00 PM",  monthly_fee: 4500 },
  { id: "c2", name: "Hip-Hop Intermediate", category: "hiphop",  teacher_name: "Mr. Dex Cruz",   schedule: "Tue & Thu · 5:00–6:00 PM",  monthly_fee: 3800 },
  { id: "c3", name: "Contemporary I",       category: "contemp", teacher_name: "Ms. Ria Santos", schedule: "Wed · 3:00–4:30 PM",        monthly_fee: 4500 },
  { id: "c4", name: "Jazz for Teens",       category: "jazz",    teacher_name: "Ms. Bea Tan",    schedule: "Sat · 9:00–10:30 AM",       monthly_fee: 3800 },
  { id: "c5", name: "Adults Hip-Hop",       category: "adults",  teacher_name: "Mr. Dex Cruz",   schedule: "Fri · 7:00–8:00 PM",        monthly_fee: 5200 },
] as const;

type ClassId = typeof MOCK_CLASSES[number]["id"];

// ── Category color dot ────────────────────────────────────────
const CATEGORY_COLOR: Record<string, string> = {
  ballet:  "#3B82F6",
  hiphop:  "#8B5CF6",
  contemp: "#22C55E",
  jazz:    "#F59E0B",
  adults:  "#0EA5E9",
};

// ── Next first-of-month due date ──────────────────────────────
function nextDueDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1, 1);
  return d.toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" });
}

// ── Inner component ───────────────────────────────────────────
function ConfirmForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "new-family";
  const backHref = `/admin/enrollment/new/register?type=${type}`;

  const [selected, setSelected] = useState<Set<ClassId>>(new Set());
  const [confirmed, setConfirmed] = useState(false);

  function toggle(id: ClassId) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const selectedClasses = MOCK_CLASSES.filter((c) => selected.has(c.id));
  const total = selectedClasses.reduce((sum, c) => sum + c.monthly_fee, 0);

  // ── Success state ─────────────────────────────────────────
  if (confirmed) {
    return (
      <>
        <Topbar title="New Enrollment" />
        <div
          className="content"
          style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}
        >
          <div
            style={{
              maxWidth: 480,
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 99,
                background: "var(--green-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={32} color="var(--green)" />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>
                Enrollment confirmed!
              </h2>
              <p style={{ color: "var(--ink-3)", fontSize: 14 }}>
                The student has been enrolled in {selectedClasses.length} class{selectedClasses.length !== 1 ? "es" : ""}.
                An invoice of ₱{total.toLocaleString()} has been created.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Button variant="ghost" href="/admin/students">
                View Student Record
              </Button>
              <Button variant="primary" href="/admin/enrollment/new">
                Enroll Another
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main form ─────────────────────────────────────────────
  return (
    <>
      <Topbar
        title="New Enrollment"
        actions={
          <Button variant="ghost" size="sm" href="/admin/dashboard">
            Cancel
          </Button>
        }
      />

      <div className="content" style={{ paddingBottom: 64 }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--ink-3)",
            marginBottom: 6,
          }}
        >
          Step 3 of 3 — Class Assignment
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.022em",
            marginBottom: 24,
          }}
        >
          Choose classes
        </h1>

        <div className="grid-2-1" style={{ alignItems: "start" }}>
          {/* ── Left: available classes ────────────────────── */}
          <div className="col" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MOCK_CLASSES.map((cls) => {
              const isAdded = selected.has(cls.id);
              const dotColor = CATEGORY_COLOR[cls.category] ?? "var(--accent)";
              return (
                <div
                  key={cls.id}
                  className="card"
                  style={{
                    border: `2px solid ${isAdded ? "var(--accent)" : "var(--border)"}`,
                    background: isAdded ? "var(--highlight-soft)" : "var(--surface)",
                    borderRadius: "var(--r-card-lg)",
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    transition: "border-color 120ms ease, background 120ms ease",
                  }}
                  onClick={() => toggle(cls.id)}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 99,
                      background: dotColor,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 14 }}>
                      {cls.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
                      {cls.teacher_name} · {cls.schedule}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13 }}>
                      ₱{cls.monthly_fee.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-4)" }}>/ mo</div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggle(cls.id); }}
                    style={{
                      width: 72,
                      padding: "6px 0",
                      borderRadius: 8,
                      border: `1px solid ${isAdded ? "var(--accent)" : "var(--border-2)"}`,
                      background: isAdded ? "var(--accent)" : "transparent",
                      color: isAdded ? "#fff" : "var(--ink-2)",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {isAdded ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── Right: invoice preview ─────────────────────── */}
          <div className="col">
            <div
              className="card"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--r-card-lg)",
                overflow: "hidden",
                position: "sticky",
                top: 72,
              }}
            >
              <div
                className="card-header"
                style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}
              >
                <span className="card-title">Invoice Preview</span>
              </div>

              <div style={{ padding: "16px 18px" }}>
                {/* Student placeholder */}
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--ink-4)",
                    marginBottom: 12,
                  }}
                >
                  New Student
                </div>

                {/* Line items */}
                {selectedClasses.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--ink-4)", fontStyle: "italic" }}>
                    No classes selected yet.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedClasses.map((cls) => (
                      <div
                        key={cls.id}
                        style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}
                      >
                        <span style={{ color: "var(--ink-2)" }}>{cls.name}</span>
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                          ₱{cls.monthly_fee.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total */}
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    marginTop: 14,
                    paddingTop: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>
                    Monthly Total
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: total > 0 ? "var(--ink)" : "var(--ink-4)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ₱{total.toLocaleString()}
                  </span>
                </div>

                {total > 0 && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--ink-4)",
                      marginTop: 4,
                      textAlign: "right",
                    }}
                  >
                    Due {nextDueDate()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
          }}
        >
          <Button variant="ghost" size="sm" href={backHref}>
            ← Back
          </Button>
          <Button
            variant="primary"
            size="md"
            disabled={selected.size === 0}
            onClick={() => setConfirmed(true)}
          >
            Confirm Enrollment
          </Button>
        </div>
      </div>
    </>
  );
}

// ── Page wrapper ──────────────────────────────────────────────
export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmForm />
    </Suspense>
  );
}
