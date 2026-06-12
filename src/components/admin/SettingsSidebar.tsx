"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle, Building2, Palette, Users, ChevronLeft, X } from "lucide-react";
import { useUIStore } from "@/stores/ui";

const NAV = [
  { label: "Profile",  href: "/settings/profile",  icon: UserCircle },
  { label: "School",   href: "/settings/school",   icon: Building2 },
  { label: "Branding", href: "/settings/branding", icon: Palette },
  { label: "Teachers", href: "/settings/teachers", icon: Users },
];

export function SettingsSidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  return (
    <aside className={`sidebar${sidebarOpen ? " is-open" : ""}`} style={{ width: 248 }}>
      <button
        className="sidebar-close-btn"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close navigation"
      >
        <X size={14} />
      </button>

      <div className="brand">
        <div className="brand-mark">V</div>
        <div>
          <div className="brand-name">Vida</div>
          <div className="brand-sub">Settings</div>
        </div>
      </div>

      <nav className="nav-section">
        <div className="nav-label">Account</div>
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item${isActive ? " is-active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        <Link
          href="/admin/dashboard"
          className="nav-item"
          style={{ color: "var(--ink-3)", fontSize: 13 }}
        >
          <ChevronLeft size={16} />
          <span>Back to Admin</span>
        </Link>
      </div>
    </aside>
  );
}
