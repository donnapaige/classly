"use client";

import { useSearchParams } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { Suspense } from "react";

// ── Inner form (reads searchParams) ──────────────────────────
function RegisterForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "new-family";
  const continueHref = `/admin/enrollment/new/confirm?type=${type}`;

  const isNewFamily = type === "new-family";
  const isReturning = type === "returning";
  const isAdult = type === "adult";

  const typeLabel = isNewFamily
    ? "New Family"
    : isReturning
    ? "Returning Family"
    : "Adult Learner";

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

      <div
        className="content"
        style={{ display: "flex", justifyContent: "center", paddingTop: 40, paddingBottom: 64 }}
      >
        <div className="fork-card" style={{ maxWidth: 580, width: "100%" }}>
          {/* Eyebrow */}
          <div className="fork-eyebrow">
            <span className="pip" />
            Step 2 of 3 — Registration
          </div>

          <h1 className="fork-q">Set up the account</h1>
          <p className="fork-sub">
            {isNewFamily && "Create a parent account and add the student's details."}
            {isReturning && "Find the existing family account to continue enrollment."}
            {isAdult && "Enter the adult learner's personal information."}
            {" "}
            <span style={{ color: "var(--ink-3)" }}>({typeLabel})</span>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 28 }}>

            {/* ── Returning: search only ─────────────────────── */}
            {isReturning && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--ink-3)",
                    marginBottom: 14,
                  }}
                >
                  Find Existing Account
                </legend>
                <div className="field">
                  <label className="field-label">Parent Name or Email</label>
                  <input
                    className="input"
                    type="search"
                    placeholder="Search by name or email…"
                    autoFocus
                  />
                  <span className="field-help">
                    Type to find their existing account and student records.
                  </span>
                </div>
              </fieldset>
            )}

            {/* ── New Family: parent section ─────────────────── */}
            {isNewFamily && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--ink-3)",
                    marginBottom: 14,
                  }}
                >
                  Parent / Guardian
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="field">
                    <label className="field-label">Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                    <input className="input" type="text" placeholder="e.g. Maria dela Cruz" required />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="field">
                      <label className="field-label">Email <span style={{ color: "var(--red)" }}>*</span></label>
                      <input className="input" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="field">
                      <label className="field-label">Phone</label>
                      <input className="input" type="tel" placeholder="+63 9XX XXX XXXX" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Address</label>
                    <textarea className="input" rows={2} placeholder="Home address (optional)" style={{ resize: "vertical" }} />
                  </div>
                </div>
              </fieldset>
            )}

            {/* ── New Family: student section ────────────────── */}
            {isNewFamily && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--ink-3)",
                    marginBottom: 14,
                  }}
                >
                  Student
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="field">
                    <label className="field-label">Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                    <input className="input" type="text" placeholder="e.g. Sofia dela Cruz" required />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="field">
                      <label className="field-label">Birth Date</label>
                      <input className="input" type="date" />
                    </div>
                    <div className="field">
                      <label className="field-label">Gender</label>
                      <select className="select">
                        <option value="">Select…</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Notes</label>
                    <textarea
                      className="input"
                      rows={2}
                      placeholder="Allergies, special needs, or anything the teacher should know…"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                </div>
              </fieldset>
            )}

            {/* ── Adult Learner ──────────────────────────────── */}
            {isAdult && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--ink-3)",
                    marginBottom: 14,
                  }}
                >
                  Personal Information
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="field">
                    <label className="field-label">Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                    <input className="input" type="text" placeholder="e.g. James Tan" required />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="field">
                      <label className="field-label">Email <span style={{ color: "var(--red)" }}>*</span></label>
                      <input className="input" type="email" placeholder="email@example.com" required />
                    </div>
                    <div className="field">
                      <label className="field-label">Phone</label>
                      <input className="input" type="tel" placeholder="+63 9XX XXX XXXX" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Birth Date</label>
                    <input className="input" type="date" />
                  </div>
                  <div className="field">
                    <label className="field-label">Notes</label>
                    <textarea
                      className="input"
                      rows={2}
                      placeholder="Allergies, special needs, or anything the teacher should know…"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                </div>
              </fieldset>
            )}

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
            <Button variant="ghost" size="sm" href="/admin/enrollment/new">
              ← Back
            </Button>
            <Button variant="primary" size="md" href={continueHref}>
              Continue →
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page wrapper (Suspense required for useSearchParams) ──────
export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
