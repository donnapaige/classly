"use client";

/**
 * React Query hooks for invoice / payment data.
 * These run on the CLIENT — import in "use client" components only.
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

// ── useInvoices ───────────────────────────────────────────────
export function useInvoices(status?: "pending" | "paid" | "overdue" | "cancelled") {
  return useQuery({
    queryKey: ["invoices", status ?? "all"],
    queryFn: async () => {
      const supabase = getSupabase();
      let query = supabase
        .from("invoices")
        .select("*, students(full_name)")
        .order("created_at", { ascending: false });
      if (status) query = query.eq("status", status);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    enabled: isConfigured,
    placeholderData: [],
  });
}

// ── useRecentPayments ─────────────────────────────────────────
export function useRecentPayments(limit = 5) {
  return useQuery({
    queryKey: ["payments", "recent", limit],
    queryFn: async () => {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("payments")
        .select("*, students(full_name)")
        .order("paid_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data ?? [];
    },
    enabled: isConfigured,
    placeholderData: [],
  });
}

// ── useLogPayment ─────────────────────────────────────────────
export function useLogPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      invoice_id: string;
      student_id: string;
      amount: number;
      method: "gcash" | "maya" | "cash" | "card" | "qrph" | "grab";
      reference?: string;
    }) => {
      const supabase = getSupabase();

      // Mark invoice paid
      await supabase
        .from("invoices")
        .update({ status: "paid" })
        .eq("id", payload.invoice_id);

      // Insert payment
      const { data, error } = await supabase
        .from("payments")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
