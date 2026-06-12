"use client";

import { useUIStore } from "@/stores/ui";

/**
 * Semi-transparent backdrop shown behind the sidebar drawer on mobile.
 * Tap it to close the drawer. Rendered in the admin layout.
 */
export function MobileOverlay() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  if (!sidebarOpen) return null;

  return (
    <div
      className="mob-overlay"
      onClick={() => setSidebarOpen(false)}
      aria-hidden="true"
    />
  );
}
