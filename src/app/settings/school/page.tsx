"use client";

import { useState } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";

export default function SchoolPage() {
  const [saved, setSaved] = useState(false);
  const [termsSaved, setTermsSaved] = useState(false);

  function handleSave(setter: (v: boolean) => void) {
    setter(true);
    setTimeout(() => setter(false), 2000);
  }

  return (
    <>
      <Topbar title="School" />
      <div className="content" style={{ paddingBottom: 64 }}>
        <div className="grid-2-1" style={{ alignItems: "start" }}>
          {/* ── Left col ──────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* School Information */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>School Information</span>
              </div>
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="field">
                  <label className="field-label">School Name</label>
                  <input className="input" type="text" defaultValue="Vida" />
                </div>
                <div className="field">
                  <label className="field-label">School Type</label>
                  <select className="select" defaultValue="Dance Studio">
                    <option>Dance Studio</option>
                    <option>Music School</option>
                    <option>Arts Center</option>
                    <option>Sports Academy</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label className="field-label">Founded</label>
                  <input className="input" type="number" defaultValue="2018" min="1900" max="2099" />
                </div>
                <div className="field">
                  <label className="field-label">Description</label>
                  <textarea
                    className="textarea"
                    rows={3}
                    defaultValue="Vida is a premier performing arts school in Cebu, offering classes in ballet, hip-hop, contemporary dance, jazz, and more."
                  />
                </div>
              </div>
            </div>

            {/* Contact & Location */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Contact &amp; Location</span>
              </div>
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="field">
                  <label className="field-label">Street Address</label>
                  <input className="input" type="text" defaultValue="123 Fuente Osmeña Blvd" />
                </div>
                <div className="field">
                  <label className="field-label">City</label>
                  <input className="input" type="text" defaultValue="Cebu City, Philippines" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="field">
                    <label className="field-label">Phone</label>
                    <input className="input" type="tel" defaultValue="+63 32 000 0001" />
                  </div>
                  <div className="field">
                    <label className="field-label">Email</label>
                    <input className="input" type="email" defaultValue="info@vida.ph" />
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">Website</label>
                  <input className="input" type="url" defaultValue="https://vida.ph" />
                </div>
                <div style={{ paddingTop: 4 }}>
                  <Button variant="primary" onClick={() => handleSave(setSaved)}>
                    {saved ? "✓ Saved" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right col ─────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Academic Terms */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden", position: "sticky", top: 72 }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Academic Terms</span>
              </div>
              <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Term 1", start: "2026-01-06", end: "2026-04-25" },
                  { label: "Term 2", start: "2026-05-04", end: "2026-08-22" },
                  { label: "Term 3", start: "2026-09-07", end: "2026-12-19" },
                ].map((term) => (
                  <div key={term.label}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-4)", marginBottom: 6 }}>
                      {term.label}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div className="field">
                        <label className="field-label">Start</label>
                        <input className="input" type="date" defaultValue={term.start} />
                      </div>
                      <div className="field">
                        <label className="field-label">End</label>
                        <input className="input" type="date" defaultValue={term.end} />
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ paddingTop: 4 }}>
                  <Button variant="ghost" onClick={() => handleSave(setTermsSaved)}>
                    {termsSaved ? "✓ Saved" : "Save Terms"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Time Zone */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Time Zone</span>
              </div>
              <div style={{ padding: "18px 22px" }}>
                <div className="field">
                  <label className="field-label">Time Zone</label>
                  <select className="select">
                    <option value="Asia/Manila">Asia/Manila — Philippines Standard Time (UTC+8)</option>
                    <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
