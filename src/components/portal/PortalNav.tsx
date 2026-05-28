import { Bell, Menu } from "lucide-react";

interface PortalNavProps {
  title?: string;
  sub?: string;
}

/**
 * Mobile top bar for the parent portal.
 * Renders server-side — no client hooks needed.
 */
export function PortalNav({
  title = "Vida",
  sub = "Cebu, Philippines",
}: PortalNavProps) {
  return (
    <nav className="nav">
      <button className="nav-btn" aria-label="Menu">
        <Menu size={18} />
      </button>

      <div className="nav-center">
        <div className="nav-title">{title}</div>
        {sub && <div className="nav-sub">{sub}</div>}
      </div>

      <button className="nav-btn" aria-label="Notifications">
        <Bell size={18} />
      </button>
    </nav>
  );
}
