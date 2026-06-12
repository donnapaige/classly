"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MOCK_PLANS } from "@/data/mock";

interface AssignPlanButtonProps {
  currentPlanId?: string;
}

export function AssignPlanButton({ currentPlanId }: AssignPlanButtonProps) {
  const [planId, setPlanId] = useState<string | undefined>(currentPlanId);
  const [open, setOpen] = useState(false);

  const activePlans = MOCK_PLANS.filter((p) => p.status === "active");
  const current = activePlans.find((p) => p.id === planId);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "9px 14px",
          borderRadius: 8,
          border: "1px solid var(--border-2)",
          background: "var(--surface)",
          cursor: "pointer",
          fontSize: 13.5,
          fontWeight: 500,
          color: current ? "var(--ink)" : "var(--ink-4)",
          transition: "border-color 120ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--ink-5)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-2)")}
      >
        <span>
          {current ? (
            <>
              <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-4)", marginRight: 6 }}>
                Plan:
              </span>
              {current.name}
            </>
          ) : (
            "Assign plan…"
          )}
        </span>
        <ChevronDown size={14} style={{ color: "var(--ink-4)", flexShrink: 0 }} />
      </button>

      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setOpen(false)} />
          <div
            style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
              zIndex: 51, background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, boxShadow: "var(--shadow-pop)", overflow: "hidden",
            }}
          >
            {/* No plan option */}
            <button
              onClick={() => { setPlanId(undefined); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 14px", background: !planId ? "var(--surface-2)" : "transparent",
                border: "none", borderBottom: "1px solid var(--border)",
                fontSize: 13, color: "var(--ink-3)", cursor: "pointer",
              }}
            >
              No plan
            </button>

            {activePlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => { setPlanId(plan.id); setOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "10px 14px",
                  background: planId === plan.id ? "var(--highlight-soft)" : "transparent",
                  border: "none", borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { if (planId !== plan.id) e.currentTarget.style.background = "var(--surface-2)"; }}
                onMouseLeave={(e) => { if (planId !== plan.id) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{plan.name}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 1 }}>
                  {plan.tag} · {plan.class_ids.length} class{plan.class_ids.length !== 1 ? "es" : ""}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
