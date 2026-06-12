// Shared mock data — replace with Supabase queries in Phase 4

export const MOCK_CLASSES = [
  { id: "c1", name: "Ballet Foundations",   category: "ballet",  teacher_name: "Ms. Sarah Lim",  schedule: "Mon & Wed · 4:00–5:00 PM",  monthly_fee: 4500 },
  { id: "c2", name: "Hip-Hop Intermediate", category: "hiphop",  teacher_name: "Mr. Dex Cruz",   schedule: "Tue & Thu · 5:00–6:00 PM",  monthly_fee: 3800 },
  { id: "c3", name: "Contemporary I",       category: "contemp", teacher_name: "Ms. Ria Santos", schedule: "Wed · 3:00–4:30 PM",        monthly_fee: 4500 },
  { id: "c4", name: "Jazz for Teens",       category: "jazz",    teacher_name: "Ms. Bea Tan",    schedule: "Sat · 9:00–10:30 AM",       monthly_fee: 3800 },
  { id: "c5", name: "Adults Hip-Hop",       category: "adults",  teacher_name: "Mr. Dex Cruz",   schedule: "Fri · 7:00–8:00 PM",        monthly_fee: 5200 },
] as const;

export type ClassId = typeof MOCK_CLASSES[number]["id"];

export const CATEGORY_COLOR: Record<string, string> = {
  ballet:  "#3B82F6",
  hiphop:  "#8B5CF6",
  contemp: "#22C55E",
  jazz:    "#F59E0B",
  adults:  "#0EA5E9",
};

export interface MockPlan {
  id: string;
  name: string;
  description: string;
  tag: string;
  class_ids: ClassId[];
  price_override?: number;
  status: "active" | "inactive";
}

export const MOCK_PLANS: MockPlan[] = [
  {
    id: "p1",
    name: "Little Stars",
    description: "Intro ballet for the youngest learners.",
    tag: "Ages 3–6",
    class_ids: ["c1"],
    price_override: undefined,
    status: "active",
  },
  {
    id: "p2",
    name: "Junior Combo",
    description: "Ballet + Jazz — the classic two-class combo for school-age kids.",
    tag: "Ages 7–12",
    class_ids: ["c1", "c4"],
    price_override: 7500,
    status: "active",
  },
  {
    id: "p3",
    name: "Teen Full Program",
    description: "Three classes a week for serious teen dancers.",
    tag: "Teens",
    class_ids: ["c2", "c3", "c4"],
    price_override: 10000,
    status: "active",
  },
  {
    id: "p4",
    name: "Adults Express",
    description: "Evening hip-hop for adult learners — no experience needed.",
    tag: "Adults",
    class_ids: ["c5"],
    price_override: undefined,
    status: "active",
  },
];

export function getClassById(id: ClassId) {
  return MOCK_CLASSES.find((c) => c.id === id);
}

export function computePlanPrice(plan: MockPlan): number {
  return plan.class_ids.reduce((sum, id) => {
    const cls = getClassById(id);
    return sum + (cls?.monthly_fee ?? 0);
  }, 0);
}

export function getPlanDisplayPrice(plan: MockPlan): number {
  return plan.price_override ?? computePlanPrice(plan);
}
