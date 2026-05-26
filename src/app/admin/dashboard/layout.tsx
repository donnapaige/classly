// Shell is now provided by src/app/admin/layout.tsx (shared across all admin routes)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
