"use client";

/**
 * React Query hooks for dashboard KPI data.
 * These run on the CLIENT — import in "use client" components only.
 */

import { useQuery } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const isConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-ref.supabase.co";

// ── useDashboardStats ─────────────────────────────────────────
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const supabase = getSupabase();
      const [studentsRes, invoicesRes] = await Promise.all([
        supabase.from("students").select("id, status"),
        supabase.from("invoices").select("id, amount, status"),
      ]);

      if (studentsRes.error) throw studentsRes.error;
      if (invoicesRes.error) throw invoicesRes.error;

      const students  = studentsRes.data ?? [];
      const invoices  = invoicesRes.data ?? [];

      return {
        activeStudents: students.filter((s) => s.status === "active").length,
        totalStudents:  students.length,
        paidRevenue:    invoices
          .filter((i) => i.status === "paid")
          .reduce((sum: number, i: { amount: number }) => sum + i.amount, 0),
        outstanding:    invoices
          .filter((i) => i.status !== "paid" && i.status !== "cancelled")
          .reduce((sum: number, i: { amount: number }) => sum + i.amount, 0),
        overdueCount:   invoices.filter((i) => i.status === "overdue").length,
      };
    },
    enabled: isConfigured,
    staleTime: 5 * 60 * 1000, // 5 min — dashboard refreshes every 5 min
  });
}

// ── useTodayClasses ───────────────────────────────────────────
export function useTodayClasses() {
  const todayDow = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=Mon

  return useQuery({
    queryKey: ["sessions", "today", todayDow],
    queryFn: async () => {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("sessions")
        .select(`
          *,
          classes (
            name, category, room,
            users!teacher_id(full_name),
            enrollments(count)
          )
        `)
        .eq("day_of_week", todayDow);

      if (error) throw error;
      return data ?? [];
    },
    enabled: isConfigured,
  });
}
