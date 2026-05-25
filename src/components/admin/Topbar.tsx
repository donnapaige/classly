import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TopbarProps {
  title: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, actions }: TopbarProps) {
  return (
    <header className="topbar">
      <h1 className="top-title">{title}</h1>
      <div className="topbar-actions">
        {actions}
        <Button variant="ghost" icon>
          <Search size={16} />
        </Button>
        <Button variant="ghost" icon>
          <Bell size={16} />
        </Button>
      </div>
    </header>
  );
}
