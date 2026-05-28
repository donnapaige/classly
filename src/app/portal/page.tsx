import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProgressRing } from "@/components/portal/ProgressRing";

// ── Mock data ──────────────────────────────────────────────────────────────
// Days 0–6 = Mon–Sun. Swap for real Supabase queries in Phase 4.

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** Indices (0 = Mon) of days that have at least one class this week. */
const DAYS_WITH_CLASSES = new Set([0, 1, 2, 3, 4, 5]);

interface ClassEntry {
  time: string;
  ampm: "AM" | "PM";
  duration: string;
  category: "ballet" | "hiphop" | "contemp" | "jazz" | "adults";
  label: string;
  title: string;
  teacher: string;
  room: string;
  enrolled: number;
  capacity: number;
  ringColor: string;
  href: string;
}

/**
 * Today's classes for Sofia Santos.
 * All shown regardless of day so the mock always has content.
 */
const MOCK_CLASSES: ClassEntry[] = [
  {
    time: "9:00",
    ampm: "AM",
    duration: "60 min",
    category: "ballet",
    label: "Ballet",
    title: "Ballet Fundamentals",
    teacher: "Ms. Patricia Reyes",
    room: "Studio A",
    enrolled: 12,
    capacity: 15,
    ringColor: "#3B82F6",
    href: "/portal/progress/student_001",
  },
  {
    time: "11:00",
    ampm: "AM",
    duration: "45 min",
    category: "contemp",
    label: "Contemporary",
    title: "Contemporary Moves",
    teacher: "Ms. Jen Ocampo",
    room: "Studio B",
    enrolled: 8,
    capacity: 10,
    ringColor: "#22C55E",
    href: "/portal/progress/student_001",
  },
  {
    time: "3:00",
    ampm: "PM",
    duration: "60 min",
    category: "jazz",
    label: "Jazz",
    title: "Jazz Kids",
    teacher: "Mr. Carlo Diaz",
    room: "Studio A",
    enrolled: 14,
    capacity: 18,
    ringColor: "#F59E0B",
    href: "/portal/progress/student_001",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function PortalHome() {
  // Build Mon–Sun date labels for this week
  const today = new Date();
  const todayDow = today.getDay(); // 0 = Sun
  const mondayFirst = todayDow === 0 ? 6 : todayDow - 1; // 0 = Mon

  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayFirst);

  const weekDays = DAY_NAMES.map((name, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      name,
      date: d.getDate(),
      isToday: i === mondayFirst,
      hasClass: DAYS_WITH_CLASSES.has(i),
    };
  });

  return (
    <>
      {/* Greeting */}
      <div className="portal-greeting">
        <div className="t-h3" style={{ color: "var(--ink)" }}>
          {getGreeting()}, Maya ☀️
        </div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--ink-3)",
            marginTop: "3px",
          }}
        >
          Sofia Santos · Term 2, 2026
        </div>
      </div>

      {/* Day-selector pill bar */}
      <div className="days">
        {weekDays.map((day) => (
          <div
            key={day.date}
            className={[
              "day",
              day.isToday ? "is-active" : "",
              day.hasClass ? "has-class" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="d-name">{day.name}</span>
            <span className="d-num">{day.date}</span>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div className="portal-quick-stats">
        <div className="pqs-card">
          <div className="pqs-label">Next Class</div>
          <div className="pqs-val">9:00 AM</div>
          <div className="pqs-sub">Ballet · Studio A</div>
        </div>

        <Link href="/portal/pay/inv_001" style={{ textDecoration: "none" }}>
          <div className="pqs-card is-alert">
            <div className="pqs-label">Outstanding</div>
            <div className="pqs-val">₱3,200</div>
            <div className="pqs-sub">Tap to pay →</div>
          </div>
        </Link>
      </div>

      {/* Section label */}
      <div className="portal-section-label">Today&rsquo;s Classes</div>

      {/* Timeline */}
      <div className="timeline">
        {MOCK_CLASSES.map((cls, i) => (
          <div key={i} className="trow">
            <div className="time-col">
              <span className="ttime">{cls.time}</span>
              <span className="tampm">{cls.ampm}</span>
            </div>

            <Link href={cls.href} className={`card is-${cls.category}`}>
              <div className="card-top">
                <span className="card-tag">{cls.label}</span>
                <span className="card-time-label">{cls.duration}</span>
              </div>
              <div className="card-title">{cls.title}</div>
              <div className="card-sub">
                {cls.teacher} &middot; {cls.room}
              </div>
              <div className="card-foot">
                <ProgressRing
                  percent={Math.round((cls.enrolled / cls.capacity) * 100)}
                  color={cls.ringColor}
                  size={28}
                  strokeWidth={3}
                />
                <span className="card-progress-text">
                  {cls.enrolled}/{cls.capacity} enrolled
                </span>
                <ChevronRight size={14} style={{ color: "var(--ink-4)" }} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
