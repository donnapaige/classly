"use client";

import { useState } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { Package, MoreHorizontal, X } from "lucide-react";
import {
  MOCK_CLASSES,
  MOCK_PLANS,
  CATEGORY_COLOR,
  computePlanPrice,
  getPlanDisplayPrice,
  type MockPlan,
  type ClassId,
} from "@/data/mock";

// ── Tag options ───────────────────────────────────────────────
const TAG_OPTIONS = ["Ages 3–6", "Ages 7–12", "Teens", "Adults", "All ages"];

// ── Blank plan template ───────────────────────────────────────
function blankPlan(): Omit<MockPlan, "id"> {
  return { name: "", description: "", tag: "Ages 7–12", class_ids: [], price_override: undefined, status: "active" };
}

// ── Plan card ─────────────────────────────────────────────────
function PlanCard({
  plan,
  onEdit,
  onDelete,
}: {
  plan: MockPlan;
  onEdit: (p: MockPlan) => void;
  onDelete: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sum = computePlanPrice(plan);
  const display = getPlanDisplayPrice(plan);
  const hasOverride = plan.price_override != null && plan.price_override !== sum;

  return (
    <div
      className="card"
      style={{
        borderRadius: "var(--r-card-lg)",
        border: "1px solid var(--border)",
        padding: "20px 22px",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "var(--accent-light)",
              color: "var(--accent)",
              borderRadius: 99,
              padding: "3px 9px",
            }}
          >
            {plan.tag}
          </span>
          {plan.status === "active"
            ? <Badge variant="green" dot>Active</Badge>
            : <Badge variant="gray">Inactive</Badge>}
        </div>

        {/* ⋯ menu */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              width: 28, height: 28, borderRadius: 6,
              border: "1px solid var(--border-2)", background: "transparent",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--ink-3)",
            }}
          >
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <>
              <div
                style={{ position: "fixed", inset: 0, zIndex: 10 }}
                onClick={() => setMenuOpen(false)}
              />
              <div
                style={{
                  position: "absolute", right: 0, top: 32, zIndex: 20,
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 10, boxShadow: "var(--shadow-pop)",
                  minWidth: 120, overflow: "hidden",
                }}
              >
                <button
                  onClick={() => { setMenuOpen(false); onEdit(plan); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "10px 14px", background: "transparent", border: "none",
                    fontSize: 13, fontWeight: 500, color: "var(--ink)", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Edit
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onDelete(plan.id); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "10px 14px", background: "transparent", border: "none",
                    fontSize: 13, fontWeight: 500, color: "var(--red)", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--red-bg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Name + description */}
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>
          {plan.name}
        </div>
        {plan.description && (
          <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{plan.description}</div>
        )}
      </div>

      {/* Included classes */}
      <div>
        <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-4)", marginBottom: 7 }}>
          Includes
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {plan.class_ids.map((cid) => {
            const cls = MOCK_CLASSES.find((c) => c.id === cid);
            if (!cls) return null;
            return (
              <span
                key={cid}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 11.5, fontWeight: 600,
                  padding: "4px 9px", borderRadius: 99,
                  border: "1px solid var(--border-2)",
                  background: "var(--surface-2)", color: "var(--ink-2)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 99, background: CATEGORY_COLOR[cls.category] ?? "var(--ink-4)", flexShrink: 0 }} />
                {cls.name}
              </span>
            );
          })}
          {plan.class_ids.length === 0 && (
            <span style={{ fontSize: 12, color: "var(--ink-4)", fontStyle: "italic" }}>No classes yet</span>
          )}
        </div>
      </div>

      {/* Price row */}
      <div
        style={{
          borderTop: "1px solid var(--border)", paddingTop: 12,
          display: "flex", alignItems: "baseline", justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>
            ₱{display.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, color: "var(--ink-4)", marginLeft: 4 }}>/mo</span>
          {hasOverride && (
            <span style={{ fontSize: 11, color: "var(--ink-4)", marginLeft: 8, textDecoration: "line-through" }}>
              ₱{sum.toLocaleString()}
            </span>
          )}
          {!plan.price_override && (
            <div style={{ fontSize: 10.5, color: "var(--ink-4)", marginTop: 1 }}>sum of classes</div>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={() => onEdit(plan)}>Edit</Button>
      </div>
    </div>
  );
}

// ── Plan modal ────────────────────────────────────────────────
function PlanModal({
  initial,
  onSave,
  onClose,
}: {
  initial: MockPlan | null;
  onSave: (plan: Omit<MockPlan, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<MockPlan, "id">>(
    initial ? { ...initial } : blankPlan()
  );

  const classSum = form.class_ids.reduce((s, id) => {
    const cls = MOCK_CLASSES.find((c) => c.id === id);
    return s + (cls?.monthly_fee ?? 0);
  }, 0);

  function toggleClass(id: ClassId) {
    setForm((f) => ({
      ...f,
      class_ids: f.class_ids.includes(id)
        ? f.class_ids.filter((c) => c !== id)
        : [...f.class_ids, id],
    }));
  }

  return (
    <>
      {/* Overlay */}
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 200, backdropFilter: "blur(2px)" }}
        onClick={onClose}
      />
      {/* Modal card */}
      <div
        style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          zIndex: 201, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
          background: "var(--surface)", borderRadius: "var(--r-modal)",
          boxShadow: "var(--shadow-pop)", padding: "28px 28px 24px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>
            {initial ? "Edit Plan" : "New Plan"}
          </h2>
          <button
            onClick={onClose}
            style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border-2)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-3)" }}
          >
            <X size={14} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Name */}
          <div className="field">
            <label className="field-label">Plan Name <span style={{ color: "var(--red)" }}>*</span></label>
            <input
              className="input"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Junior Combo"
              required
            />
          </div>

          {/* Description */}
          <div className="field">
            <label className="field-label">Description</label>
            <textarea
              className="input"
              rows={2}
              value={form.description ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short description of this plan…"
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Tag */}
          <div className="field">
            <label className="field-label">Age / Level</label>
            <select
              className="select"
              value={form.tag}
              onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
            >
              {TAG_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Classes */}
          <div className="field">
            <label className="field-label">Classes</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {MOCK_CLASSES.map((cls) => {
                const checked = form.class_ids.includes(cls.id);
                return (
                  <label
                    key={cls.id}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 8,
                      border: `1px solid ${checked ? "var(--accent)" : "var(--border-2)"}`,
                      background: checked ? "var(--highlight-soft)" : "var(--surface)",
                      cursor: "pointer", transition: "border-color 120ms, background 120ms",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleClass(cls.id)}
                      style={{ width: 15, height: 15, accentColor: "var(--accent)", flexShrink: 0 }}
                    />
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: CATEGORY_COLOR[cls.category], flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{cls.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", fontVariantNumeric: "tabular-nums" }}>
                      ₱{cls.monthly_fee.toLocaleString()}/mo
                    </span>
                  </label>
                );
              })}
            </div>
            {form.class_ids.length > 0 && (
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 8, textAlign: "right" }}>
                Sum: ₱{classSum.toLocaleString()}/mo
              </div>
            )}
          </div>

          {/* Price override */}
          <div className="field">
            <label className="field-label">Price Override (optional)</label>
            <input
              className="input"
              type="number"
              min={0}
              value={form.price_override ?? ""}
              onChange={(e) => setForm((f) => ({
                ...f,
                price_override: e.target.value === "" ? undefined : Number(e.target.value),
              }))}
              placeholder={`Leave blank to use sum (₱${classSum.toLocaleString()})`}
            />
            <span className="field-help">Set a bundle price that differs from the sum of class fees.</span>
          </div>

          {/* Status */}
          <div className="field">
            <label className="field-label">Status</label>
            <select
              className="select"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "active" | "inactive" }))}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            disabled={!form.name.trim()}
            onClick={() => { if (form.name.trim()) { onSave(form); onClose(); } }}
          >
            Save Plan
          </Button>
        </div>
      </div>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function PlansPage() {
  const [plans, setPlans] = useState<MockPlan[]>([...MOCK_PLANS]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MockPlan | null>(null);

  const active = plans.filter((p) => p.status === "active").length;
  const avgClasses = plans.length > 0
    ? Math.round((plans.reduce((s, p) => s + p.class_ids.length, 0) / plans.length) * 10) / 10
    : 0;

  function openNew() { setEditingPlan(null); setModalOpen(true); }
  function openEdit(plan: MockPlan) { setEditingPlan(plan); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setEditingPlan(null); }

  function handleSave(data: Omit<MockPlan, "id">) {
    if (editingPlan) {
      setPlans((ps) => ps.map((p) => p.id === editingPlan.id ? { ...data, id: editingPlan.id } : p));
    } else {
      setPlans((ps) => [...ps, { ...data, id: `p${Date.now()}` }]);
    }
  }

  function handleDelete(id: string) {
    setPlans((ps) => ps.filter((p) => p.id !== id));
  }

  return (
    <>
      <Topbar
        title="Plans"
        actions={
          <Button variant="primary" size="sm" onClick={openNew}>
            + New Plan
          </Button>
        }
      />

      <div className="content">
        {/* KPI strip */}
        <div className="stat-grid" style={{ marginBottom: 24 }}>
          <StatCard label="Total Plans"      value={String(plans.length)} period="All"     variant="blue"   icon={<Package size={18} />} />
          <StatCard label="Active"           value={String(active)}       period="In use"   variant="green"  icon={<Package size={18} />} />
          <StatCard label="Avg Classes/Plan" value={String(avgClasses)}   period="Included" variant="purple" icon={<Package size={18} />} />
        </div>

        {/* Plans grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onEdit={openEdit} onDelete={handleDelete} />
          ))}

          {/* Ghost "add" card */}
          <button
            onClick={openNew}
            style={{
              borderRadius: "var(--r-card-lg)",
              border: "2px dashed var(--border-2)",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              minHeight: 180,
              color: "var(--ink-4)",
              transition: "border-color 150ms, color 150ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-2)";
              e.currentTarget.style.color = "var(--ink-4)";
            }}
          >
            <Package size={24} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>New Plan</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <PlanModal initial={editingPlan} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  );
}
