import { SettingsSidebar } from "@/components/admin/SettingsSidebar";
import { MobileOverlay } from "@/components/admin/MobileOverlay";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <SettingsSidebar />
      <MobileOverlay />
      <div className="main">{children}</div>
    </div>
  );
}
