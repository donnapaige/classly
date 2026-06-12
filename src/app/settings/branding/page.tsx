"use client";

import { useState } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";

const SWATCHES = [
  { label: "Vida Plum",  hex: "#1F1B3A" },
  { label: "Indigo",     hex: "#4338CA" },
  { label: "Teal",       hex: "#0E7C8A" },
  { label: "Rose",       hex: "#BE185D" },
  { label: "Amber",      hex: "#B45309" },
  { label: "Emerald",    hex: "#047857" },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function lightenHex(hex: string, alpha = 0.12) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function BrandingPage() {
  const [accent, setAccent] = useState("#1F1B3A");
  const [customHex, setCustomHex] = useState("");
  const [displayName, setDisplayName] = useState("Vida");
  const [tagline, setTagline] = useState("Cebu's Premier Performing Arts School");

  function applyHex(hex: string) {
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      setAccent(hex);
    }
  }

  return (
    <>
      <Topbar title="Branding" />
      <div className="content" style={{ paddingBottom: 64 }}>
        <div className="grid-2-1" style={{ alignItems: "start" }}>
          {/* ── Left col ──────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Logo & Wordmark */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Logo &amp; Wordmark</span>
              </div>
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Logo upload */}
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)", marginBottom: 8 }}>School Logo</div>
                  <div style={{
                    border: "2px dashed var(--border-2)", borderRadius: 12,
                    height: 100, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 8,
                    cursor: "pointer", background: "var(--surface-2)",
                    transition: "border-color 120ms, background 120ms",
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ink-5)"; (e.currentTarget as HTMLDivElement).style.background = "var(--surface-3)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)"; }}
                  >
                    <Upload size={18} color="var(--ink-3)" />
                    <span style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}>Upload logo</span>
                    <span style={{ fontSize: 11, color: "var(--ink-4)" }}>PNG, SVG — 160×80 recommended</span>
                  </div>
                </div>

                {/* Favicon upload */}
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)", marginBottom: 8 }}>Favicon</div>
                  <div style={{
                    border: "2px dashed var(--border-2)", borderRadius: 12,
                    height: 72, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 6,
                    cursor: "pointer", background: "var(--surface-2)",
                  }}>
                    <Upload size={15} color="var(--ink-3)" />
                    <span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 500 }}>Upload favicon — 64×64 ICO/PNG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Color */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Brand Color</span>
              </div>
              <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
                  {SWATCHES.map((s) => (
                    <button
                      key={s.hex}
                      title={s.label}
                      onClick={() => { setAccent(s.hex); setCustomHex(""); }}
                      style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: s.hex, border: "none", cursor: "pointer",
                        outline: accent === s.hex ? `3px solid ${s.hex}` : "none",
                        outlineOffset: 2,
                        boxShadow: "0 1px 3px rgba(0,0,0,.15)",
                        transition: "transform 120ms",
                        transform: accent === s.hex ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>

                {/* Custom hex */}
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <div style={{
                      position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                      width: 18, height: 18, borderRadius: 4, background: customHex || accent,
                      border: "1px solid var(--border-2)",
                    }} />
                    <input
                      className="input"
                      type="text"
                      placeholder="#1F1B3A"
                      value={customHex}
                      onChange={(e) => setCustomHex(e.target.value)}
                      style={{ paddingLeft: 36 }}
                      onKeyDown={(e) => { if (e.key === "Enter") applyHex(customHex); }}
                    />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => applyHex(customHex)}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            {/* App Name */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>App Name</span>
              </div>
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="field">
                  <label className="field-label">Display Name</label>
                  <input className="input" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div className="field">
                  <label className="field-label">Tagline</label>
                  <input className="input" type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                </div>
                <div style={{ paddingTop: 4 }}>
                  <Button variant="primary">Save</Button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right col: live preview ────────────────── */}
          <div style={{ position: "sticky", top: 72 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-card-lg)", overflow: "hidden" }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Preview</span>
              </div>
              <div style={{ padding: "22px" }}>
                {/* Mini sidebar mock */}
                <div style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 12, overflow: "hidden", marginBottom: 16,
                }}>
                  {/* Brand bar */}
                  <div style={{
                    padding: "12px 14px", display: "flex", alignItems: "center", gap: 10,
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 7, background: accent,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: "#fff",
                    }}>
                      {displayName.charAt(0).toUpperCase() || "V"}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                      {displayName || "Vida"}
                    </div>
                  </div>

                  {/* Nav items preview */}
                  {["Dashboard", "Students", "Settings"].map((label, i) => (
                    <div
                      key={label}
                      style={{
                        padding: "8px 14px", display: "flex", alignItems: "center", gap: 8,
                        background: i === 0 ? accent : "transparent",
                        borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: i === 0 ? "rgba(255,255,255,.5)" : "var(--ink-4)" }} />
                      <span style={{ fontSize: 12.5, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? "#fff" : "var(--ink-3)" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button preview */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <button style={{
                    padding: "8px 16px", borderRadius: 8, border: "none",
                    background: accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}>
                    Primary
                  </button>
                  <button style={{
                    padding: "8px 16px", borderRadius: 8,
                    border: `1px solid ${accent}`,
                    background: lightenHex(accent, 0.08),
                    color: accent, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}>
                    Ghost
                  </button>
                </div>

                <p style={{ fontSize: 11.5, color: "var(--ink-4)", margin: 0, lineHeight: 1.5 }}>
                  Changes apply to the admin console and parent portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
