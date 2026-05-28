"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

// ── Mock data ──────────────────────────────────────────────────────────────
// Swap for useInvoices(id) in Phase 4.

const MOCK_INVOICE = {
  id: "inv_001",
  student: "Sofia Santos",
  dueDate: "June 15, 2026",
  lineItems: [
    { label: "Ballet Fundamentals — June 2026", amount: 2400 },
    { label: "Studio fee (June)", amount: 800 },
  ],
  total: 3200,
};

// ── Payment methods ────────────────────────────────────────────────────────

interface PayMethod {
  id: string;
  name: string;
  sub: string;
  logoStyle: React.CSSProperties;
  logoText: string;
  cta: string;
}

const PAY_METHODS: PayMethod[] = [
  {
    id: "gcash",
    name: "GCash",
    sub: "Redirect to GCash app",
    logoStyle: { background: "#DDF1F7", color: "#0078A8" },
    logoText: "G",
    cta: "Proceed with GCash",
  },
  {
    id: "maya",
    name: "Maya",
    sub: "Redirect to Maya app",
    logoStyle: { background: "#E2DEFB", color: "#4F2BCE" },
    logoText: "M",
    cta: "Proceed with Maya",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    sub: "Visa, Mastercard, JCB",
    logoStyle: { background: "var(--accent-light)", color: "var(--accent)" },
    logoText: "CC",
    cta: "Pay by Card",
  },
  {
    id: "qrph",
    name: "QR Ph",
    sub: "Scan with any bank app",
    logoStyle: { background: "var(--surface-3)", color: "var(--ink-2)" },
    logoText: "QR",
    cta: "Show QR Code",
  },
  {
    id: "cash",
    name: "Cash at Studio",
    sub: "Pay in person before class",
    logoStyle: { background: "var(--green-bg)", color: "var(--green)" },
    logoText: "₱",
    cta: "Get Cash Instructions",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function PayInvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  void params; // used for query in Phase 4

  const [selected, setSelected] = useState<string | null>(null);
  const inv = MOCK_INVOICE;
  const chosenMethod = PAY_METHODS.find((m) => m.id === selected);

  return (
    <div className="portal-page">
      {/* Back link */}
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
          Pay Invoice
        </div>
      </div>

      {/* Invoice summary card */}
      <div className="portal-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "14px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--ink-2)",
              }}
            >
              {inv.student}
            </div>
            <div style={{ fontSize: "12px", color: "var(--ink-3)", marginTop: "2px" }}>
              Due {inv.dueDate}
            </div>
          </div>
          <span className="tag tag-amber">Pending</span>
        </div>

        {/* Line items */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {inv.lineItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "13px", color: "var(--ink-2)" }}>
                {item.label}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--ink)",
                  flexShrink: 0,
                }}
              >
                ₱{item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginTop: "12px",
            paddingTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink-2)" }}
          >
            Total
          </span>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ₱{inv.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Payment method selection */}
      <div>
        <div
          className="portal-section-label"
          style={{ padding: 0, marginBottom: "12px" }}
        >
          Select Payment Method
        </div>
        <div className="methods">
          {PAY_METHODS.map((method) => (
            <button
              key={method.id}
              className={`method${selected === method.id ? " is-selected" : ""}`}
              onClick={() => setSelected(method.id)}
            >
              <div className="method-logo" style={method.logoStyle}>
                {method.logoText}
              </div>
              <div className="method-body">
                <div className="method-name">{method.name}</div>
                <div className="method-sub">{method.sub}</div>
              </div>
              <div className="m-radio" />
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div>
        <button
          className="btn btn-primary btn-full"
          disabled={!selected}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {chosenMethod ? chosenMethod.cta : "Select a payment method"}
          {selected && selected !== "cash" && <ExternalLink size={14} />}
        </button>
        {selected && selected !== "cash" && (
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "var(--ink-3)",
              marginTop: "10px",
            }}
          >
            You&apos;ll be redirected to the provider to complete payment.
          </p>
        )}
        {selected === "cash" && (
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "var(--ink-3)",
              marginTop: "10px",
            }}
          >
            Please bring exact payment to the studio before your next class.
          </p>
        )}
      </div>
    </div>
  );
}
