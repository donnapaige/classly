"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, GraduationCap, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AccountType = "school" | "teacher";

interface InviteRow { name: string; email: string; }

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [invites, setInvites] = useState<InviteRow[]>([{ name: "", email: "" }]);

  function addInviteRow() {
    setInvites((rows) => [...rows, { name: "", email: "" }]);
  }
  function removeInviteRow(i: number) {
    setInvites((rows) => rows.filter((_, idx) => idx !== i));
  }
  function updateInvite(i: number, field: keyof InviteRow, value: string) {
    setInvites((rows) => rows.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  }

  const cardWidth = step === 1 ? 560 : 560;

  // ── Step 1 — account type ────────────────────────────────────
  if (step === 1) {
    return (
      <div className="auth-shell">
        <div className="auth-card" style={{ maxWidth: cardWidth }}>
          <div className="auth-logo">
            <div className="brand-mark" style={{ width: 36, height: 36, fontSize: 16 }}>V</div>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ink)" }}>Vida</span>
          </div>

          <div className="auth-title">Create your account</div>
          <div className="auth-sub">Choose how you'll use Vida</div>

          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            <div
              className={`type-card${accountType === "school" ? " is-selected" : ""}`}
              onClick={() => setAccountType("school")}
            >
              <div className="type-icon"><Building2 size={20} /></div>
              <div className="type-title">School / Institution</div>
              <div className="type-desc">
                Manage classes, teachers, billing, and parent communications for your school.
              </div>
            </div>

            <div
              className={`type-card${accountType === "teacher" ? " is-selected" : ""}`}
              onClick={() => setAccountType("teacher")}
            >
              <div className="type-icon"><GraduationCap size={20} /></div>
              <div className="type-title">Teacher / Tutor</div>
              <div className="type-desc">
                Teach independently or as part of a school. Track your classes and students.
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-full"
            disabled={!accountType}
            onClick={() => setStep(2)}
          >
            Continue →
          </button>

          <div className="auth-footer">
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2 — school details ──────────────────────────────────
  if (step === 2 && accountType === "school") {
    return (
      <div className="auth-shell">
        <div className="auth-card" style={{ maxWidth: cardWidth }}>
          <div
            style={{
              fontSize: 11, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 6,
            }}
          >
            Step 2 of 3 — School Details
          </div>
          <div className="auth-title" style={{ marginBottom: 24 }}>Set up your school</div>

          {/* School info */}
          <fieldset style={{ border: "none", padding: 0, margin: "0 0 22px" }}>
            <legend style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 14 }}>
              School Information
            </legend>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="field">
                <label className="field-label">School Name <span style={{ color: "var(--red)" }}>*</span></label>
                <input className="input" type="text" placeholder="e.g. Vida Dance Academy" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <label className="field-label">School Type</label>
                  <select className="select">
                    <option>Dance Studio</option>
                    <option>Music School</option>
                    <option>Arts Center</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label className="field-label">City / Location</label>
                  <input className="input" type="text" placeholder="e.g. Cebu City" />
                </div>
              </div>
              <div className="field">
                <label className="field-label">Phone</label>
                <input className="input" type="tel" placeholder="+63 9XX XXX XXXX" />
              </div>
            </div>
          </fieldset>

          {/* Admin account */}
          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 14 }}>
              Your Admin Account
            </legend>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="field">
                <label className="field-label">Your Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                <input className="input" type="text" placeholder="e.g. Monica Villarica" required />
              </div>
              <div className="field">
                <label className="field-label">Email <span style={{ color: "var(--red)" }}>*</span></label>
                <input className="input" type="email" placeholder="you@example.com" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <label className="field-label">Password <span style={{ color: "var(--red)" }}>*</span></label>
                  <input className="input" type="password" placeholder="Min. 8 characters" required />
                </div>
                <div className="field">
                  <label className="field-label">Confirm Password</label>
                  <input className="input" type="password" placeholder="Repeat password" />
                </div>
              </div>
            </div>
          </fieldset>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>← Back</Button>
            <Button variant="primary" onClick={() => setStep(3)}>Create School Account →</Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2 — teacher details ─────────────────────────────────
  if (step === 2 && accountType === "teacher") {
    return (
      <div className="auth-shell">
        <div className="auth-card" style={{ maxWidth: cardWidth }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 6 }}>
            Step 2 of 2 — Teacher Details
          </div>
          <div className="auth-title" style={{ marginBottom: 24 }}>Your teacher profile</div>

          {/* Personal info */}
          <fieldset style={{ border: "none", padding: 0, margin: "0 0 22px" }}>
            <legend style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 14 }}>
              Your Information
            </legend>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="field">
                <label className="field-label">Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                <input className="input" type="text" placeholder="e.g. Sarah Lim" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <label className="field-label">Specialty</label>
                  <input className="input" type="text" placeholder="e.g. Ballet, Contemporary" />
                </div>
                <div className="field">
                  <label className="field-label">Phone</label>
                  <input className="input" type="tel" placeholder="+63 9XX XXX XXXX" />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Account */}
          <fieldset style={{ border: "none", padding: 0, margin: "0 0 22px" }}>
            <legend style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 14 }}>
              Account
            </legend>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="field">
                <label className="field-label">Email <span style={{ color: "var(--red)" }}>*</span></label>
                <input className="input" type="email" placeholder="you@example.com" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <label className="field-label">Password <span style={{ color: "var(--red)" }}>*</span></label>
                  <input className="input" type="password" placeholder="Min. 8 characters" required />
                </div>
                <div className="field">
                  <label className="field-label">Confirm Password</label>
                  <input className="input" type="password" placeholder="Repeat password" />
                </div>
              </div>
            </div>
          </fieldset>

          {/* School link (optional) */}
          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <legend style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 14 }}>
              School (optional)
            </legend>
            <div className="field">
              <label className="field-label">School Name or Code</label>
              <input className="input" type="text" placeholder="e.g. Vida Dance Academy or VDA-2026" />
              <span className="field-help">Leave blank to create an individual tutor account.</span>
            </div>
          </fieldset>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>← Back</Button>
            <Button variant="primary" onClick={() => router.push("/admin/dashboard")}>
              Create Teacher Account →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 3 — invite teachers (school path only) ──────────────
  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ maxWidth: cardWidth }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-3)", marginBottom: 6 }}>
          Step 3 of 3 — Invite Teachers
        </div>
        <div className="auth-title">Invite your team</div>
        <div className="auth-sub">
          Add teachers now or skip — you can always invite them from Settings later.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {invites.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                className="input"
                type="text"
                placeholder="Teacher name"
                value={row.name}
                onChange={(e) => updateInvite(i, "name", e.target.value)}
                style={{ flex: 1 }}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={row.email}
                onChange={(e) => updateInvite(i, "email", e.target.value)}
                style={{ flex: 1 }}
              />
              {invites.length > 1 && (
                <button
                  onClick={() => removeInviteRow(i)}
                  style={{
                    width: 32, height: 32, flexShrink: 0, borderRadius: 6,
                    border: "1px solid var(--border-2)", background: "transparent",
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", color: "var(--ink-3)",
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addInviteRow}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "transparent", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 600, color: "var(--accent)", padding: 0, marginBottom: 28,
          }}
        >
          <Plus size={14} /> Add another teacher
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <Button variant="ghost" href="/admin/dashboard">Skip for now</Button>
          <Button variant="primary" href="/admin/dashboard">Send Invites →</Button>
        </div>
      </div>
    </div>
  );
}
