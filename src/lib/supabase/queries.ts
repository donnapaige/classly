/**
 * Typed Supabase query helpers — Phase 3
 *
 * All functions accept a Supabase client (server or browser) and return
 * typed data. Use these inside Server Components or React Query hooks.
 *
 * Server Components:  import { createServerSupabase } from "@/lib/supabase/server"
 * Client hooks:       import { createBrowserClient }   from "@supabase/ssr"
 */

import type { SupabaseClient } from "@supabase/supabase-js";

// ── Dashboard ─────────────────────────────────────────────────

export async function getDashboardStats(supabase: SupabaseClient) {
  const [studentsRes, invoicesRes] = await Promise.all([
    supabase.from("students").select("id, status"),
    supabase.from("invoices").select("id, amount, status"),
  ]);

  if (studentsRes.error) throw studentsRes.error;
  if (invoicesRes.error) throw invoicesRes.error;

  const students = studentsRes.data ?? [];
  const invoices = invoicesRes.data ?? [];

  const activeStudents = students.filter((s) => s.status === "active").length;
  const totalRevenue   = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum: number, i: { amount: number }) => sum + i.amount, 0);
  const outstanding    = invoices
    .filter((i) => i.status === "pending" || i.status === "overdue")
    .reduce((sum: number, i: { amount: number }) => sum + i.amount, 0);
  const overdueCount   = invoices.filter((i) => i.status === "overdue").length;

  return { activeStudents, totalRevenue, outstanding, overdueCount };
}

// ── Students ──────────────────────────────────────────────────

export async function getStudents(
  supabase: SupabaseClient,
  status?: "active" | "inactive" | "waitlisted"
) {
  let query = supabase
    .from("students")
    .select("*")
    .order("full_name");

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getStudentById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("students")
    .select(`
      *,
      enrollments (
        id, status, enrolled_at,
        classes ( id, name, category, monthly_fee )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ── Classes & Schedule ────────────────────────────────────────

export async function getClasses(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("classes")
    .select("*, users!teacher_id(full_name)")
    .eq("status", "active")
    .order("name");

  if (error) throw error;
  return data ?? [];
}

export async function getSessionsForWeek(
  supabase: SupabaseClient,
  termStart?: string,
  termEnd?: string
) {
  let query = supabase
    .from("sessions")
    .select(`
      *,
      classes (
        id, name, category, capacity, room,
        users!teacher_id(full_name),
        enrollments(count)
      )
    `);

  if (termStart) query = query.gte("term_start", termStart);
  if (termEnd)   query = query.lte("term_end",   termEnd);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// ── Invoices & Payments ───────────────────────────────────────

export async function getInvoices(
  supabase: SupabaseClient,
  status?: "pending" | "paid" | "overdue" | "cancelled"
) {
  let query = supabase
    .from("invoices")
    .select("*, students(full_name)")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getRecentPayments(supabase: SupabaseClient, limit = 5) {
  const { data, error } = await supabase
    .from("payments")
    .select("*, students(full_name), invoices(description)")
    .order("paid_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function logPayment(
  supabase: SupabaseClient,
  payload: {
    invoice_id: string;
    student_id: string;
    amount: number;
    method: "gcash" | "maya" | "cash" | "card" | "qrph" | "grab";
    reference?: string;
    notes?: string;
  }
) {
  // Mark the invoice as paid
  const { error: invError } = await supabase
    .from("invoices")
    .update({ status: "paid" })
    .eq("id", payload.invoice_id);

  if (invError) throw invError;

  // Insert the payment record
  const { data, error } = await supabase
    .from("payments")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ── Messages ──────────────────────────────────────────────────

export async function getMessages(supabase: SupabaseClient, limit = 20) {
  const { data, error } = await supabase
    .from("messages")
    .select("*, users!sender_id(full_name, role)")
    .order("sent_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function markMessageRead(supabase: SupabaseClient, id: string) {
  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("id", id);

  if (error) throw error;
}

// ── Enrollments ───────────────────────────────────────────────

export async function createEnrollment(
  supabase: SupabaseClient,
  payload: {
    student_id: string;
    class_id: string;
    notes?: string;
  }
) {
  // Check class capacity
  const { data: cls, error: clsErr } = await supabase
    .from("classes")
    .select("capacity, enrollments(count)")
    .eq("id", payload.class_id)
    .single();

  if (clsErr) throw clsErr;

  const enrolled = (cls as { enrollments: { count: number }[] }).enrollments?.[0]?.count ?? 0;
  const status   = enrolled >= cls.capacity ? "waitlisted" : "active";

  const { data, error } = await supabase
    .from("enrollments")
    .insert({ ...payload, status })
    .select()
    .single();

  if (error) throw error;
  return data;
}
