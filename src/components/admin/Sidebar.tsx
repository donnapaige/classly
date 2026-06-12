"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  UserPlus,
  Users,
  Receipt,
  MessageSquare,
  Banknote,
  BookOpen,
  Package,
  Settings,
  X,
} from "lucide-react";
import type { NavSection } from "@/types";
import { useUIStore } from "@/stores/ui";

const NAV: NavSection[] = [
  {
    label: "Management",
    items: [
      { label: "Dashboard",  href: "/admin/dashboard",      icon: LayoutDashboard },
      { label: "Schedule",   href: "/admin/schedule",        icon: CalendarDays },
      { label: "Students",   href: "/admin/students",        icon: Users },
      { label: "Enrollment", href: "/admin/enrollment/new",  icon: UserPlus },
      { label: "Plans",      href: "/admin/plans",           icon: Package },
      { label: "Billing",    href: "/admin/billing",         icon: Receipt },
      { label: "Messaging",  href: "/admin/messaging",       icon: MessageSquare, badge: 2 },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Payroll",    href: "/admin/payroll",    icon: Banknote },
      { label: "Accounting", href: "/admin/accounting", icon: BookOpen },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  return (
    <aside className={`sidebar${sidebarOpen ? " is-open" : ""}`}>
      {/* Mobile close button — hidden on desktop via CSS */}
      <button
        className="sidebar-close-btn"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close navigation"
      >
        <X size={14} />
      </button>

      {/* Brand */}
      <div className="brand">
        <div className="brand-mark">V</div>
        <div>
          <div className="brand-name">Vida</div>
          <div className="brand-sub">Cebu, Philippines</div>
        </div>
      </div>

      {/* Nav sections */}
      {NAV.map((section) => (
        <nav key={section.label} className="nav-section">
          <div className="nav-label">{section.label}</div>
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item${isActive ? " is-active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
      ))}

      {/* User footer */}
      <div className="sidebar-foot">
        <Link
          href="/settings"
          className={`nav-item${pathname.startsWith("/settings") ? " is-active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        >
          <Settings size={16} />
          <span>Settings</span>
        </Link>
        <div className="user-pill">
          <div className="avatar">M</div>
          <div>
            <div className="user-name">Monica Villarica</div>
            <div className="user-role">Center Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
