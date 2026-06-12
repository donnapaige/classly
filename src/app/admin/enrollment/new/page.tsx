import Link from "next/link";
import { Topbar } from "@/components/admin/Topbar";
import { Button } from "@/components/ui/Button";

// ── Enrollment fork options ───────────────────────────────────
const FORK_OPTIONS = [
  {
    id: "new-family",
    title: "New Family",
    desc: "First-time enrollment. Create a parent account, add one or more students, assign them to classes, and generate the first invoice.",
    recommended: true,
    href: "/admin/enrollment/new/register?type=new-family",
  },
  {
    id: "returning",
    title: "Returning Family",
    desc: "Existing family re-enrolling for a new term, adding a sibling, or switching classes. Pulls their existing account and student records.",
    recommended: false,
    href: "/admin/enrollment/new/register?type=returning",
  },
  {
    id: "adult",
    title: "Adult Learner",
    desc: "Individual adult student enrolling on their own account (no parent/guardian). Ideal for adults-only classes.",
    recommended: false,
    href: "/admin/enrollment/new/register?type=adult",
  },
];

// ── Page ──────────────────────────────────────────────────────
export default function EnrollmentNewPage() {
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
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 40,
          paddingBottom: 64,
        }}
      >
        <div className="fork-card" style={{ maxWidth: 580, width: "100%" }}>
          {/* Eyebrow */}
          <div className="fork-eyebrow">
            <span className="pip" />
            Step 1 of 3 — Enrollment Type
          </div>

          {/* Heading */}
          <h1 className="fork-q">Who are you enrolling?</h1>
          <p className="fork-sub">
            Select the enrollment type below. Each path collects the right
            information for your school&rsquo;s records.
          </p>

          {/* Options */}
          <div className="fork-options">
            {FORK_OPTIONS.map((opt) => (
              <Link key={opt.id} href={opt.href} className="fork-option">
                <div className="fork-opt-top">
                  <span className="fork-opt-title">{opt.title}</span>
                  {opt.recommended && (
                    <span className="fork-opt-ribbon">Recommended</span>
                  )}
                </div>
                <p className="fork-opt-desc">{opt.desc}</p>
              </Link>
            ))}
          </div>

          {/* Help note */}
          <p
            className="t-caption"
            style={{
              color: "var(--ink-4)",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Not sure? Choose &ldquo;New Family&rdquo; — you can always link to
            an existing account in the next step.
          </p>
        </div>
      </div>
    </>
  );
}
