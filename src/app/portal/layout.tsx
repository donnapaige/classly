import { PortalNav } from "@/components/portal/PortalNav";
import { BottomTabs } from "@/components/portal/BottomTabs";

/**
 * Mobile portal shell.
 *
 * Structure:
 *   .screen  (flex column, 100dvh, overflow hidden, max 680px centered)
 *   ├── <PortalNav>     — sticky top bar (outside scroll area)
 *   ├── scroll div      — flex: 1, overflow-y: auto
 *   │    └── {children}
 *   └── <BottomTabs>    — sticky bottom nav
 */
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="screen">
      <PortalNav />

      {/* Scrollable content area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      <BottomTabs />
    </div>
  );
}
