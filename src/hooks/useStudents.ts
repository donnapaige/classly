"use client";

/**
 * React Query hooks for student data.
 * These run on the CLIENT — import in "use client" components only.
 * Falls back to an empty array if Supabase isn't configured yet.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

// ── useStudents ───────────────────────────────────────────────
export function useStudents(status?: "active" | "inactive" | "waitlisted") {
  return useQuery({
    queryKey: ["students", status ?? "all"],
    queryFn: async () => {
      const supabase = getSupabase();
      let query = supabase
        .from("students")
        .select("*")
        .order("full_name");
      if (status) query = query.eq("status", status);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    enabled: isConfigured,
    placeholderData: [],
  });
}

// ── useStudent ────────────────────────────────────────────────
export function useStudent(id: string) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: async () => {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("students")
        .select(`*, enrollments(*, classes(name, category, monthly_fee))`)
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isConfigured && !!id,
  });
}
