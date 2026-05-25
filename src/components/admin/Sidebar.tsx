"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  UserPlus,
  Receipt,
  MessageSquare,
  Banknote,
  BookOpen,
} from "lucide-react";
import type { NavSection } from "@/types";

const NAV: NavSection[] = [
  {
    label: "Management",
    items: [
      { label: "Dashboard",  href: "/admin/dashboard",      icon: LayoutDashboard },
      { label: "Schedule",   href: "/admin/schedule",        icon: CalendarDays },
      { label: "Enrollment", href: "/admin/enrollment/new",  icon: UserPlus },
      { label: "Billing",    href: "/admin/billing",         icon: Receipt },
      { label: "Messaging",  href: "/admin/messaging",       icon: MessageSquare, badge: 3 },
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

  return (
    <aside className="sidebar">
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
