"use client";

import { useState } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  specialty: string;
  email: string;
  classes: number;
  status: "active" | "invited" | "inactive";
}

const INITIAL: Teacher[] = [
  { id: "t1", name: "Ms. Sarah Lim",    specialty: "Ballet",       email: "sarah@vida.ph",   classes: 2, status: "active" },
  { id: "t2", name: "Mr. Dex Cruz",     specialty: "Hip-Hop",      email: "dex@vida.ph",     classes: 2, status: "active" },
  { id: "t3", name: "Ms. Ria Santos",   specialty: "Contemporary", email: "ria@vida.ph",     classes: 1, status: "active" },
  { id: "t4", name: "Ms. Bea Tan",      specialty: "Jazz",         email: "bea@vida.ph",     classes: 1, status: "active" },
  { id: "t5", name: "Mr. Paolo Sy",     specialty: "Ballet",       email: "paolo@vida.ph",   classes: 0, status: "invited" },
  { id: "t6", name: "Ms. Nina Reyes",   specialty: "Modern",       email: "nina@vida.ph",    classes: 0, status: "inactive" },
];

const STATUS_TAG: Record<Teacher["status"], { label: string; cls: string }> = {
  active:   { label: "Active",   cls: "tag tag-green" },
  invited:  { label: "Invited",  cls: "tag tag-amber" },
  inactive: { label: "Inactive", cls: "tag tag-gray" },
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", specialty: "", role: "Teacher" });

  function handleInvite() {
    if (!form.name || !form.email) return;
    setTeachers((prev) => [
      ...prev,
      {
        id: `t${Date.now()}`,
        name: form.name,
        specialty: form.specialty,
        email: form.email,
        classes: 0,
        status: "invited",
      },
    ]);
    setForm({ name: "", email: "", specialty: "", role: "Teacher" });
    setShowModal(false);
  }

  function removeTeacher(id: string) {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  }

  const active = teachers.filter((t) => t.status === "active").length;
  const totalClasses = teachers.reduce((s, t) => s + t.classes, 0);
  const avgClasses = active > 0 ? (totalClasses / active).toFixed(1) : "0";

  return (
    <>
      <Topbar
        title="Teachers"
        actions={<Button variant="primary" size="sm" onClick={() => setShowModal(true)}>+ Invite Teacher</Button>}
      />
      <div className="content" style={{ paddingBottom: 64 }}>

        {/* KPI strip */}
        <div className="stat-grid" style={{ marginBottom: 24 }}>
          {[
            { label: "Total Teachers",     value: teachers.length },
            { label: "Active",             value: active },
            { label: "Avg Classes / Teacher", value: avgClasses },
          ].map(({ label, value }) => (
            <div key={label} className="stat">
              <div className="stat-label">{label}</div>
              <div className="stat-value">{value}</div>
            </div>
          ))}
        </div>

        {/* Teachers table */}
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Specialty</th>
                <th>Email</th>
                <th className="col-num">Classes</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => {
                const tag = STATUS_TAG[t.status];
                return (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: 99,
                          background: "var(--highlight-soft)", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 700, color: "var(--accent)", flexShrink: 0,
                        }}>
                          {t.name.split(" ").pop()?.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{t.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--ink-3)" }}>{t.specialty}</td>
                    <td style={{ color: "var(--ink-3)" }}>{t.email}</td>
                    <td className="col-num">{t.classes}</td>
                    <td><span className={tag.cls}>{tag.label}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => removeTeacher(t.id)} style={{ color: "var(--red)" }}>
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Invite modal ─────────────────────────────── */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50, padding: 24,
        }}>
          <div style={{
            background: "var(--surface)", borderRadius: "var(--r-modal)",
            width: "100%", maxWidth: 460,
            boxShadow: "var(--shadow-pop)",
          }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>Invite Teacher</span>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink-3)", display: "flex", alignItems: "center" }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="field">
                <label className="field-label">Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  className="input"
                  type="text"
                  placeholder="e.g. Ms. Jane Dela Cruz"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="field">
                <label className="field-label">Email <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  className="input"
                  type="email"
                  placeholder="teacher@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <label className="field-label">Specialty / Subject</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="e.g. Ballet"
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label className="field-label">Role</label>
                  <select className="select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option>Teacher</option>
                    <option>Staff</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ padding: "14px 22px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleInvite} disabled={!form.name || !form.email}>
                Send Invite
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
