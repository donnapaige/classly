import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";

// ── Mock data ──────────────────────────────────────────────────────────────
// Swap for useStudent(id) + Supabase query in Phase 4.

const MOCK_STUDENT = {
  name: "Sofia Santos",
  term: "Term 2, 2026",
  enrolledClasses: ["Ballet Fundamentals", "Contemporary Moves"],
  overallLevel: "Level 1 → Level 2",
};

const SKILLS = [
  { label: "Posture & Alignment", value: 85 },
  { label: "Turnout", value: 68 },
  { label: "Pointwork", value: 72 },
  { label: "Pirouette", value: 48 },
  { label: "Jumps & Leaps", value: 80 },
  { label: "Musicality", value: 91 },
];

const NOTES = [
  {
    author: "Ms. Patricia Reyes",
    date: "May 20, 2026",
    body: "Sofia has made excellent progress in her arabesque this term. Her musicality is one of the strongest in the group — she really listens to the music.",
  },
  {
    author: "Ms. Jen Ocampo",
    date: "May 14, 2026",
    body: "Keep working on the turnout at home — gentle butterfly stretches for 10 minutes daily will make a real difference before our end-of-term showcase.",
  },
  {
    author: "Ms. Patricia Reyes",
    date: "May 7, 2026",
    body: "Sofia is ready to move to Level 2 pirouettes. Will introduce doubles next session. She's been very consistent in her preparation.",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function ProgressPage({
  params,
}: {
  params: { studentId: string };
}) {
  void params; // studentId used for data fetch in Phase 4

  return (
    <div className="portal-page">
      {/* Back link + title */}
      <div>
        <Link
          href="/portal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--ink-3)",
            textDecoration: "none",
            marginBottom: "12px",
          }}
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <div className="t-h2" style={{ color: "var(--ink)" }}>
          {MOCK_STUDENT.name}
        </div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--ink-3)",
            marginTop: "3px",
          }}
        >
          {MOCK_STUDENT.term} · {MOCK_STUDENT.overallLevel}
        </div>
      </div>

      {/* Enrolled classes */}
      <div>
        <div className="portal-section-label" style={{ padding: 0, marginBottom: "10px" }}>
          Enrolled Classes
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {MOCK_STUDENT.enrolledClasses.map((cls) => (
            <span key={cls} className="tag tag-blue">
              {cls}
            </span>
          ))}
        </div>
      </div>

      {/* Skill bars */}
      <div>
        <div
          className="portal-section-label"
          style={{ padding: 0, marginBottom: "14px" }}
        >
          Skills Assessment
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {SKILLS.map((skill) => (
            <div key={skill.label} className="skill-row">
              <span className="skill-label">{skill.label}</span>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: `${skill.value}%` }}
                />
              </div>
              <span className="skill-val">{skill.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher notes */}
      <div>
        <div
          className="portal-section-label"
          style={{ padding: 0, marginBottom: "12px" }}
        >
          Teacher Notes
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {NOTES.map((note, i) => (
            <div key={i} className="note">
              <div className="note-head">
                <span className="note-author">{note.author}</span>
                <span className="note-time">{note.date}</span>
              </div>
              <p className="note-body">{note.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share milestone */}
      <button className="btn btn-primary btn-full" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <Share2 size={15} />
        Share Milestone Card
      </button>
    </div>
  );
}
