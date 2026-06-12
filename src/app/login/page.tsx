import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-logo">
          <div className="brand-mark" style={{ width: 36, height: 36, fontSize: 16 }}>V</div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ink)" }}>
            Vida
          </span>
        </div>

        <div className="auth-title">Welcome back</div>
        <div className="auth-sub">Sign in to your school account</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="field">
            <label className="field-label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>

          <div className="field">
            <label className="field-label">Password</label>
            <input className="input" type="password" placeholder="••••••••" autoComplete="current-password" />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <a
                href="#"
                style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <Link
            href="/admin/dashboard"
            className="btn btn-primary btn-full"
            style={{ marginTop: 4, textAlign: "center" }}
          >
            Sign in
          </Link>
        </div>

        <div className="auth-footer">
          New to Vida?{" "}
          <Link href="/signup">Sign up →</Link>
        </div>
      </div>
    </div>
  );
}
