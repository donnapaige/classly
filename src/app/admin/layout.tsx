import { Sidebar } from "@/components/admin/Sidebar";
import { MobileOverlay } from "@/components/admin/MobileOverlay";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="shell">
      {/* Backdrop — only visible on mobile when sidebar drawer is open */}
      <MobileOverlay />
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  );
}
