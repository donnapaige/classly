import React from "react";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";
import type { ClassCategory } from "@/types";

// ── Mock schedule data (replace with Supabase in Phase 3) ─────
// Key: "dayIndex-slotIndex"  (0=Mon…5=Sat, 0=8AM…9=5PM)

interface ScheduleBlock {
  name: string;
  teacher: string;
  category: ClassCategory;
  enrolled: number;
  capacity: number;
}

const DAYS = [
  { label: "Mon 26", isToday: true },
  { label: "Tue 27", isToday: false },
  { label: "Wed 28", isToday: false },
  { label: "Thu 29", isToday: false },
  { label: "Fri 30", isToday: false },
  { label: "Sat 31", isToday: false },
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM",  "2:00 PM",  "3:00 PM",
  "4:00 PM",  "5:00 PM",
];

const SCHEDULE: Record<string, ScheduleBlock> = {
  // Monday
  "0-0": { name: "Ballet Foundations", teacher: "Ms. Santos", category: "ballet",  enrolled: 12, capacity: 15 },
  "0-2": { name: "Hip-Hop Jr.",         teacher: "Mr. Cruz",   category: "hiphop",  enrolled: 14, capacity: 15 },
  "0-7": { name: "Jazz for Teens",      teacher: "Ms. Lim",    category: "jazz",    enrolled: 11, capacity: 12 },
  // Tuesday
  "1-1": { name: "Contemporary I",      teacher: "Ms. Reyes",  category: "contemp", enrolled: 9,  capacity: 14 },
  "1-6": { name: "Adults Ballet",       teacher: "Ms. Santos", category: "adults",  enrolled: 6,  capacity: 12 },
  // Wednesday
  "2-0": { name: "Ballet Advanced",     teacher: "Ms. Santos", category: "ballet",  enrolled: 8,  capacity: 10 },
  "2-5": { name: "Hip-Hop Intermediate",teacher: "Mr. Cruz",   category: "hiphop",  enrolled: 15, capacity: 15 },
  // Thursday
  "3-2": { name: "Contemporary II",     teacher: "Ms. Reyes",  category: "contemp", enrolled: 7,  capacity: 12 },
  "3-8": { name: "Jazz Beginners",      teacher: "Ms. Lim",    category: "jazz",    enrolled: 8,  capacity: 15 },
  // Friday
  "4-1": { name: "Ballet Foundations",  teacher: "Ms. Santos", category: "ballet",  enrolled: 12, capacity: 15 },
  "4-3": { name: "Hip-Hop Jr.",         teacher: "Mr. Cruz",   category: "hiphop",  enrolled: 14, capacity: 15 },
  // Saturday
  "5-0": { name: "Tots Ballet",         teacher: "Ms. Santos", category: "ballet",  enrolled: 10, capacity: 12 },
  "5-2": { name: "Adults Hip-Hop",      teacher: "Mr. Cruz",   category: "adults",  enrolled: 5,  capacity: 12 },
  "5-6": { name: "Contemporary Jr.",    teacher: "Ms. Reyes",  category: "contemp", enrolled: 7,  capacity: 12 },
};

const LEGEND: { label: string; cat: ClassCategory; bg: string; text: string }[] = [
  { label: "Ballet",        cat: "ballet",  bg: "#dbeafe", text: "#1e40af" },
  { label: "Hip-Hop",       cat: "hiphop",  bg: "#ede9fe", text: "#5b21b6" },
  { label: "Contemporary",  cat: "contemp", bg: "#dcfce7", text: "#166534" },
  { label: "Jazz",          cat: "jazz",    bg: "#fef3c7", text: "#92400e" },
  { label: "Adults",        cat: "adults",  bg: "#e0f2fe", text: "#0c4a6e" },
];

// ── Derived stats ─────────────────────────────────────────────
const totalClasses  = Object.keys(SCHEDULE).length;
const totalStudents = Object.values(SCHEDULE).reduce((s, b) => s + b.enrolled, 0);
const fullCount     = Object.values(SCHEDULE).filter(b => b.enrolled >= b.capacity).length;

const WEEK_STATS = [
  { label: "Classes This Week", value: totalClasses },
  { label: "Students Enrolled", value: totalStudents },
  { label: "Full Classes",      value: fullCount },
  { label: "Teachers Active",   value: 4 },
];

// ── Page ──────────────────────────────────────────────────────
export default function SchedulePage() {
  return (
    <>
      <Topbar
        title="Schedule"
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" size="sm">
              May 26 – 31, 2026
            </Button>
            <Button variant="primary" size="sm">
              + Add Class
            </Button>
          </div>
        }
      />

      <div className="content" style={{ paddingBottom: 48 }}>
        {/* Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <span
            className="t-mono"
            style={{ color: "var(--ink-4)", marginRight: 4 }}
          >
            Category
          </span>
          {LEGEND.map((l) => (
            <span
              key={l.cat}
              className="legend-chip"
              style={{ background: l.bg, color: l.text }}
            >
              {l.label}
            </span>
          ))}
        </div>

        {/* Weekly KPI strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 18,
          }}
        >
          {WEEK_STATS.map((kpi) => (
            <div
              key={kpi.label}
              className="card"
              style={{ padding: "14px 18px" }}
            >
              <div className="stat-label" style={{ marginBottom: 6 }}>
                {kpi.label}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Schedule grid */}
        <div style={{ overflowX: "auto" }}>
          <div className="sched-grid" style={{ minWidth: 820 }}>
            {/* Header row: blank 88px + 6 day headers */}
            <div
              className="ghdr"
              style={{ borderRight: "1px solid var(--border)" }}
            />
            {DAYS.map((day) => (
              <div
                key={day.label}
                className={`ghdr${day.isToday ? " is-today" : ""}`}
              >
                {day.label}
              </div>
            ))}

            {/* Time rows */}
            {TIME_SLOTS.map((time, slotIdx) => (
              <React.Fragment key={`slot-${slotIdx}`}>
                <div className="gtime">{time}</div>
                {Array.from({ length: 6 }, (_, dayIdx) => {
                  const block = SCHEDULE[`${dayIdx}-${slotIdx}`];
                  return (
                    <div
                      key={dayIdx}
                      className={`gcell${dayIdx === 0 ? " is-today" : ""}`}
                    >
                      {block && (
                        <div className={`blk is-${block.category}`}>
                          <div className="blk-name">{block.name}</div>
                          <div className="blk-sub">{block.teacher}</div>
                          <div className="blk-sub">
                            {block.enrolled}/{block.capacity}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
