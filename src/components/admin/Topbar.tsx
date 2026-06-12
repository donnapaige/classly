"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/stores/ui";

interface TopbarProps {
  title: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, actions }: TopbarProps) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Hamburger — hidden on desktop, visible on mobile via CSS */}
        <button
          className="topbar-hamburger"
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <Menu size={18} />
        </button>
        <h1 className="top-title">{title}</h1>
      </div>

      <div className="topbar-actions">
        {actions}
        <Button variant="ghost" icon className="topbar-search-btn">
          <Search size={16} />
        </Button>
        <Button variant="ghost" icon>
          <Bell size={16} />
        </Button>
      </div>
    </header>
  );
}
