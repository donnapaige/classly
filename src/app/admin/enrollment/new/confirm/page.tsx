"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { MOCK_CLASSES, MOCK_PLANS, CATEGORY_COLOR, getPlanDisplayPrice, type ClassId } from "@/data/mock";

// ── Next first-of-month due date ──────────────────────────────
function nextDueDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 1, 1);
  return d.toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" });
}

// ── Shared student list (mirrors register/page.tsx) ──────────
const MOCK_STUDENTS = [
  { id: "s1",  name: "Sophia dela Cruz",  parent: "Maria dela Cruz",   parent_email: "maria.dc@email.com" },
  { id: "s2",  name: "Lucas Reyes",        parent: "Jose Reyes",         parent_email: "jose.r@email.com" },
  { id: "s3",  name: "Isabella Cruz",      parent: "Ana Cruz",           parent_email: "ana.c@email.com" },
  { id: "s4",  name: "Miguel Santos",      parent: "Roberto Santos",     parent_email: "rob.s@email.com" },
  { id: "s5",  name: "Mia Santos",         parent: "Liza Santos",        parent_email: "liza.s@email.com" },
  { id: "s6",  name: "Noah Villanueva",    parent: "Carlo Villanueva",   parent_email: "carlo.v@email.com" },
  { id: "s7",  name: "Sofia Mendoza",      parent: "Grace Mendoza",      parent_email: "grace.m@email.com" },
  { id: "s8",  name: "James Tan",          parent: "Self (Adult)",       parent_email: "james.t@email.com" },
  { id: "s9",  name: "Hannah Kim",         parent: "Jin Kim",            parent_email: "jin.k@email.com" },
  { id: "s10", name: "Ethan Lim",          parent: "Patricia Lim",       parent_email: "pat.l@email.com" },
  { id: "s11", name: "Aria Dela Rosa",     parent: "Tony Dela Rosa",     parent_email: "tony.dr@email.com" },
];

// ── Inner component ───────────────────────────────────────────
function ConfirmForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "new-family";
  const studentId = searchParams.get("studentId");
  const backHref = `/admin/enrollment/new/register?type=${type}`;

  const studentLabel =
    type === "returning" && studentId
      ? (MOCK_STUDENTS.find((s) => s.id === studentId)?.name ?? "Student")
      : "New Student";

  const [selected, setSelected] = useState<Set<ClassId>>(new Set());
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function toggle(id: ClassId) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setActivePlanId(null); // clear plan when manually changing classes
  }

  function applyPlan(planId: string) {
    const plan = MOCK_PLANS.find((p) => p.id === planId);
    if (!plan) return;
    setSelected(new Set(plan.class_ids as ClassId[]));
    setActivePlanId(planId);
  }

  const selectedClasses = MOCK_CLASSES.filter((c) => selected.has(c.id));

  // Use plan price if a plan is applied and classes still exactly match
  const activePlan = activePlanId ? MOCK_PLANS.find((p) => p.id === activePlanId) : null;
  const planMatchesCurrent =
    activePlan &&
    activePlan.class_ids.length === selected.size &&
    activePlan.class_ids.every((id) => selected.has(id as ClassId));

  const usePlanPrice = planMatchesCurrent && activePlan?.price_override != null;
  const total = usePlanPrice
    ? activePlan!.price_override!
    : selectedClasses.reduce((sum, c) => sum + c.monthly_fee, 0);

  // ── Success state ─────────────────────────────────────────
  if (confirmed) {
    return (
      <>
        <Topbar title="New Enrollment" />
        <div className="content" style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
          <div style={{ maxWidth: 480, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 99, background: "var(--green-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
              <Button variant="ghost" href="/admin/students">View Student Record</Button>
              <Button variant="primary" href="/admin/enrollment/new">Enroll Another</Button>
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
        actions={<Button variant="ghost" size="sm" href="/admin/dashboard">Cancel</Button>}
      />

      <div className="content" style={{ paddingBottom: 64 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 6 }}>
          Step 3 of 3 — Class Assignment
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.022em", marginBottom: 24 }}>
          Choose classes
        </h1>

        <div className="grid-2-1" style={{ alignItems: "start" }}>
          {/* ── Left col ──────────────────────────────────── */}
          <div className="col" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Plans quick-pick */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: 10 }}>
                Start with a plan — optional
              </div>
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
                {MOCK_PLANS.filter((p) => p.status === "active").map((plan) => {
                  const isApplied = activePlanId === plan.id && planMatchesCurrent;
                  const displayPrice = getPlanDisplayPrice(plan);
                  return (
                    <div
                      key={plan.id}
                      style={{
                        minWidth: 190,
                        flexShrink: 0,
                        border: `2px solid ${isApplied ? "var(--accent)" : "var(--border)"}`,
                        background: isApplied ? "var(--highlight-soft)" : "var(--surface)",
                        borderRadius: 12,
                        padding: "13px 14px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        transition: "border-color 120ms, background 120ms",
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", background: "var(--accent-light)", color: "var(--accent)", borderRadius: 99, padding: "2px 7px", alignSelf: "flex-start" }}>
                        {plan.tag}
                      </span>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{plan.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
                        {plan.class_ids.length} class{plan.class_ids.length !== 1 ? "es" : ""} · ₱{displayPrice.toLocaleString()}/mo
                        {plan.price_override && <span style={{ color: "var(--green)", fontWeight: 600 }}> (bundle rate)</span>}
                      </div>
                      <button
                        onClick={() => isApplied ? (setSelected(new Set()), setActivePlanId(null)) : applyPlan(plan.id)}
                        style={{
                          marginTop: 4,
                          padding: "5px 0",
                          borderRadius: 6,
                          border: `1px solid ${isApplied ? "var(--accent)" : "var(--border-2)"}`,
                          background: isApplied ? "var(--accent)" : "transparent",
                          color: isApplied ? "#fff" : "var(--ink-2)",
                          fontSize: 11.5,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {isApplied ? "✓ Applied" : "Apply"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 11, color: "var(--ink-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                or choose individual classes
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {/* Class cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MOCK_CLASSES.map((cls) => {
                const isAdded = selected.has(cls.id);
                const dotColor = CATEGORY_COLOR[cls.category] ?? "var(--accent)";
                return (
                  <div
                    key={cls.id}
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
                    <div style={{ width: 10, height: 10, borderRadius: 99, background: dotColor, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 14 }}>{cls.name}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
                        {cls.teacher_name} · {cls.schedule}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13 }}>₱{cls.monthly_fee.toLocaleString()}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-4)" }}>/ mo</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggle(cls.id); }}
                      style={{
                        width: 72, padding: "6px 0", borderRadius: 8,
                        border: `1px solid ${isAdded ? "var(--accent)" : "var(--border-2)"}`,
                        background: isAdded ? "var(--accent)" : "transparent",
                        color: isAdded ? "#fff" : "var(--ink-2)",
                        fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0,
                      }}
                    >
                      {isAdded ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right col: invoice preview ─────────────────── */}
          <div className="col">
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden", position: "sticky", top: 72 }}>
              <div className="card-header" style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
                <span className="card-title">Invoice Preview</span>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-4)", marginBottom: 12 }}>
                  {studentLabel}
                </div>

                {/* Plan rate badge */}
                {usePlanPrice && activePlan && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "6px 10px", background: "var(--green-bg)", borderRadius: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--green)" }}>
                      ✓ {activePlan.name} — bundle rate applied
                    </span>
                  </div>
                )}

                {selectedClasses.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--ink-4)", fontStyle: "italic" }}>No classes selected yet.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {selectedClasses.map((cls) => (
                      <div key={cls.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: "var(--ink-2)" }}>{cls.name}</span>
                        <span style={{ fontWeight: 600, color: usePlanPrice ? "var(--ink-4)" : "var(--ink)", textDecoration: usePlanPrice ? "line-through" : "none" }}>
                          ₱{cls.monthly_fee.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ borderTop: "1px solid var(--border)", marginTop: 14, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>
                    Monthly Total
                    {usePlanPrice && <span style={{ fontSize: 11, color: "var(--green)", display: "block", fontWeight: 500 }}>Plan rate</span>}
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: total > 0 ? "var(--ink)" : "var(--ink-4)", fontVariantNumeric: "tabular-nums" }}>
                    ₱{total.toLocaleString()}
                  </span>
                </div>

                {total > 0 && (
                  <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 4, textAlign: "right" }}>
                    Due {nextDueDate()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
          <Button variant="ghost" size="sm" href={backHref}>← Back</Button>
          <Button variant="primary" size="md" disabled={selected.size === 0} onClick={() => setConfirmed(true)}>
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
