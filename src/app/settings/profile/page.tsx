"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Topbar title="Profile" />
      <div className="content" style={{ paddingBottom: 64 }}>
        <div className="grid-2-1" style={{ alignItems: "start" }}>
          {/* ── Left col ──────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Your Information */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Your Information</span>
              </div>
              <div style={{ padding: "22px" }}>
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 99,
                      background: "var(--highlight-soft)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 22, fontWeight: 700, color: "var(--accent)",
                    }}>
                      M
                    </div>
                    <button style={{
                      position: "absolute", bottom: -2, right: -2,
                      width: 22, height: 22, borderRadius: 99,
                      background: "var(--accent)", color: "#fff",
                      border: "2px solid var(--surface)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Camera size={11} />
                    </button>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>Monica Villarica</div>
                    <button style={{
                      fontSize: 12, fontWeight: 600, color: "var(--accent)",
                      background: "transparent", border: "none", cursor: "pointer", padding: 0, marginTop: 2,
                    }}>
                      Change photo
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="field">
                    <label className="field-label">Full Name</label>
                    <input className="input" type="text" defaultValue="Monica Villarica" />
                  </div>
                  <div className="field">
                    <label className="field-label">Email</label>
                    <input className="input" type="email" defaultValue="monica@vida.ph" />
                  </div>
                  <div className="field">
                    <label className="field-label">Role</label>
                    <select className="select" disabled style={{ cursor: "not-allowed" }}>
                      <option>Center Admin</option>
                      <option>Staff</option>
                      <option>Teacher</option>
                    </select>
                    <span className="field-help">Role is managed by your account administrator.</span>
                  </div>
                  <div className="field">
                    <label className="field-label">Phone</label>
                    <input className="input" type="tel" defaultValue="+63 917 000 0001" />
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <Button variant="primary" onClick={handleSave}>
                      {saved ? "✓ Saved" : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Change Password</span>
              </div>
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="field">
                  <label className="field-label">Current Password</label>
                  <input className="input" type="password" placeholder="••••••••" />
                </div>
                <div className="field">
                  <label className="field-label">New Password</label>
                  <input className="input" type="password" placeholder="Min. 8 characters" />
                </div>
                <div className="field">
                  <label className="field-label">Confirm New Password</label>
                  <input className="input" type="password" placeholder="Repeat new password" />
                </div>
                <div style={{ paddingTop: 4 }}>
                  <Button variant="ghost">Update Password</Button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right col ─────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden", position: "sticky", top: 72 }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Account Details</span>
              </div>
              <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Member since", value: "January 2026" },
                  { label: "Account type", value: "School Admin" },
                  { label: "School", value: "Vida — Cebu, Philippines" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-4)", marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-2)" }}>{value}</div>
                  </div>
                ))}

                <div style={{ paddingTop: 6, borderTop: "1px solid var(--border)", marginTop: 4 }}>
                  <Button variant="ghost" href="/login" style={{ color: "var(--red)" }}>
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
