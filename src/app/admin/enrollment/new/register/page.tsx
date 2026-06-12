"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import { Suspense, useState } from "react";
import { Plus, X } from "lucide-react";

// ── Shared mock students (returning family search) ────────────
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

interface StudentRow { name: string; birthDate: string; gender: string; notes: string; }

const BLANK_STUDENT: StudentRow = { name: "", birthDate: "", gender: "", notes: "" };

const LEGEND_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--ink-3)",
  marginBottom: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

// ── Inner form ────────────────────────────────────────────────
function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "new-family";

  const isNewFamily = type === "new-family";
  const isReturning = type === "returning";
  const isAdult     = type === "adult";

  const typeLabel = isNewFamily ? "New Family" : isReturning ? "Returning Family" : "Adult Learner";

  // ── New Family state ──────────────────────────────────────
  const [students, setStudents] = useState<StudentRow[]>([{ ...BLANK_STUDENT }]);

  function addStudent() {
    setStudents((prev) => [...prev, { ...BLANK_STUDENT }]);
  }
  function removeStudent(i: number) {
    setStudents((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateStudent(i: number, field: keyof StudentRow, value: string) {
    setStudents((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  // ── Returning Family state ────────────────────────────────
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const results = query.length >= 2
    ? MOCK_STUDENTS.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.parent.toLowerCase().includes(query.toLowerCase()) ||
          s.parent_email.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function selectStudent(s: typeof MOCK_STUDENTS[0]) {
    setSelectedId(s.id);
    setSelectedStudent(s);
    setQuery(s.name);
    setShowResults(false);
  }

  function clearSelection() {
    setSelectedId(null);
    setSelectedStudent(null);
    setQuery("");
  }

  // ── Navigation ────────────────────────────────────────────
  function handleContinue() {
    if (isReturning) {
      router.push(`/admin/enrollment/new/confirm?type=returning&studentId=${selectedId}`);
    } else {
      router.push(`/admin/enrollment/new/confirm?type=${type}`);
    }
  }

  const canContinue = isReturning ? selectedId !== null : true;

  return (
    <>
      <Topbar
        title="New Enrollment"
        actions={<Button variant="ghost" size="sm" href="/admin/dashboard">Cancel</Button>}
      />

      <div className="content" style={{ display: "flex", justifyContent: "center", paddingTop: 40, paddingBottom: 64 }}>
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

            {/* ── Returning: search ──────────────────────────── */}
            {isReturning && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={LEGEND_STYLE}>Find Existing Account</legend>
                <div className="field" style={{ position: "relative" }}>
                  <label className="field-label">Parent Name or Email</label>
                  <input
                    className="input"
                    type="search"
                    placeholder="Search by name or email…"
                    autoFocus
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowResults(true);
                      if (!e.target.value) { setSelectedId(null); setSelectedStudent(null); }
                    }}
                    onFocus={() => setShowResults(true)}
                  />
                  <span className="field-help">Type to find their existing account and student records.</span>

                  {/* Results dropdown */}
                  {showResults && results.length > 0 && (
                    <div style={{
                      position: "absolute", top: "calc(100% - 8px)", left: 0, right: 0,
                      background: "var(--surface)", border: "1px solid var(--border-2)",
                      borderRadius: 10, boxShadow: "var(--shadow-pop)",
                      maxHeight: 200, overflowY: "auto", zIndex: 20,
                    }}>
                      {results.map((s) => (
                        <div
                          key={s.id}
                          onMouseDown={() => selectStudent(s)}
                          style={{
                            padding: "10px 14px",
                            borderBottom: "1px solid var(--border)",
                            cursor: "pointer",
                            background: selectedId === s.id ? "var(--accent)" : "transparent",
                            transition: "background 100ms",
                          }}
                          onMouseEnter={(e) => {
                            if (selectedId !== s.id) (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)";
                          }}
                          onMouseLeave={(e) => {
                            if (selectedId !== s.id) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: 13.5, color: selectedId === s.id ? "#fff" : "var(--ink)" }}>
                            {s.name}
                          </div>
                          <div style={{ fontSize: 12, color: selectedId === s.id ? "rgba(255,255,255,.7)" : "var(--ink-3)", marginTop: 1 }}>
                            {s.parent} · {s.parent_email}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected chip */}
                {selectedStudent && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, marginTop: 10,
                    padding: "7px 12px", background: "var(--green-bg)", borderRadius: 8,
                    border: "1px solid rgba(47,125,92,.2)",
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--green)", flex: 1 }}>
                      ✓ {selectedStudent.name} — {selectedStudent.parent} ({selectedStudent.parent_email})
                    </span>
                    <button
                      onClick={clearSelection}
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--green)", display: "flex", padding: 0 }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}
              </fieldset>
            )}

            {/* ── New Family: parent ─────────────────────────── */}
            {isNewFamily && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={LEGEND_STYLE}>Parent / Guardian</legend>
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

            {/* ── New Family: student blocks ─────────────────── */}
            {isNewFamily && students.map((student, i) => (
              <fieldset
                key={i}
                style={{
                  border: "none", padding: 0, margin: 0,
                  paddingTop: i > 0 ? 20 : 0,
                  borderTop: i > 0 ? "1px dashed var(--border-2)" : "none",
                }}
              >
                <legend style={LEGEND_STYLE}>
                  <span>{students.length > 1 ? `Student ${i + 1}` : "Student"}</span>
                  {students.length > 1 && (
                    <button
                      onClick={() => removeStudent(i)}
                      style={{
                        display: "flex", alignItems: "center", gap: 4,
                        background: "transparent", border: "none", cursor: "pointer",
                        fontSize: 11, fontWeight: 600, color: "var(--red)", padding: 0,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                      }}
                    >
                      <X size={11} /> Remove
                    </button>
                  )}
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="field">
                    <label className="field-label">Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g. Sofia dela Cruz"
                      value={student.name}
                      onChange={(e) => updateStudent(i, "name", e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="field">
                      <label className="field-label">Birth Date</label>
                      <input
                        className="input"
                        type="date"
                        value={student.birthDate}
                        onChange={(e) => updateStudent(i, "birthDate", e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label className="field-label">Gender</label>
                      <select
                        className="select"
                        value={student.gender}
                        onChange={(e) => updateStudent(i, "gender", e.target.value)}
                      >
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
                      value={student.notes}
                      onChange={(e) => updateStudent(i, "notes", e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>
            ))}

            {/* Add another student */}
            {isNewFamily && (
              <button
                onClick={addStudent}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "transparent", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, color: "var(--accent)", padding: 0,
                  alignSelf: "flex-start",
                }}
              >
                <Plus size={14} /> Add Another Student
              </button>
            )}

            {/* ── Adult Learner ──────────────────────────────── */}
            {isAdult && (
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={LEGEND_STYLE}>Personal Information</legend>
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
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)",
          }}>
            <Button variant="ghost" size="sm" href="/admin/enrollment/new">← Back</Button>
            <Button
              variant="primary"
              size="md"
              disabled={!canContinue}
              onClick={handleContinue}
            >
              Continue →
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page wrapper ──────────────────────────────────────────────
export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
