"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, TrendingUp, MessageSquare } from "lucide-react";

const TABS = [
  { label: "Home",     href: "/portal",          icon: Home },
  { label: "Schedule", href: "/portal/schedule", icon: CalendarDays },
  { label: "Progress", href: "/portal/progress", icon: TrendingUp },
  { label: "Messages", href: "/portal/messages", icon: MessageSquare },
] as const;

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <div className="tabs">
      {TABS.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === "/portal"
            ? pathname === "/portal"
            : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`tab${isActive ? " is-active" : ""}`}
          >
            <Icon size={20} className="tab-ic" />
            <span className="tab-lbl">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
