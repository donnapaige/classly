-- ═══════════════════════════════════════════════════════════
-- Vida Class Management — Initial Schema (Phase 2)
-- Run in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════

-- ── Tenants (one row = one dance school) ─────────────────────
CREATE TABLE tenants (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  location       TEXT,
  brand_color    TEXT DEFAULT '#1F1B3A',
  highlight      TEXT DEFAULT '#C8B6F0',
  logo_url       TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Users (extends Supabase auth.users) ──────────────────────
CREATE TABLE users (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  role           TEXT NOT NULL DEFAULT 'staff'
                   CHECK (role IN ('admin', 'staff', 'teacher')),
  avatar_initials TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Students ──────────────────────────────────────────────────
CREATE TABLE students (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  full_name      TEXT NOT NULL,
  birth_date     DATE,
  parent_name    TEXT,
  parent_email   TEXT,
  parent_phone   TEXT,
  notes          TEXT,
  status         TEXT NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active', 'inactive', 'waitlisted')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Classes (program templates) ───────────────────────────────
CREATE TABLE classes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  category       TEXT NOT NULL
                   CHECK (category IN ('ballet','hiphop','contemp','jazz','adults')),
  teacher_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  room           TEXT,
  capacity       INT NOT NULL DEFAULT 15,
  monthly_fee    NUMERIC(10,2) NOT NULL DEFAULT 0,
  status         TEXT NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active', 'inactive')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Sessions (scheduled occurrences) ─────────────────────────
-- day_of_week: 0=Mon … 5=Sat
CREATE TABLE sessions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  class_id       UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  day_of_week    INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 5),
  start_time     TIME NOT NULL,
  end_time       TIME NOT NULL,
  term_start     DATE,
  term_end       DATE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Enrollments ───────────────────────────────────────────────
CREATE TABLE enrollments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id       UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  status         TEXT NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active','waitlisted','completed','cancelled')),
  enrolled_at    TIMESTAMPTZ DEFAULT NOW(),
  notes          TEXT,
  UNIQUE (student_id, class_id)
);

-- ── Invoices ──────────────────────────────────────────────────
CREATE TABLE invoices (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  invoice_number TEXT,
  description    TEXT,
  amount         NUMERIC(10,2) NOT NULL,
  due_date       DATE,
  status         TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','paid','overdue','cancelled')),
  period_start   DATE,
  period_end     DATE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Payments ──────────────────────────────────────────────────
CREATE TABLE payments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  invoice_id     UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id),
  amount         NUMERIC(10,2) NOT NULL,
  method         TEXT NOT NULL
                   CHECK (method IN ('gcash','maya','cash','card','qrph','grab')),
  reference      TEXT,
  paid_at        TIMESTAMPTZ DEFAULT NOW(),
  logged_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  notes          TEXT
);

-- ── Messages ──────────────────────────────────────────────────
CREATE TABLE messages (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  sender_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  recipient_type TEXT CHECK (recipient_type IN ('class','student','parent','broadcast')),
  recipient_id   UUID,
  subject        TEXT,
  body           TEXT NOT NULL,
  is_read        BOOLEAN DEFAULT FALSE,
  sent_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════════════

ALTER TABLE tenants     ENABLE ROW LEVEL SECURITY;
ALTER TABLE users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE students    ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices    ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages    ENABLE ROW LEVEL SECURITY;

-- Helper: get the calling user's tenant_id
CREATE OR REPLACE FUNCTION auth_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM users WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Tenant-scoped policies (same pattern for all tables)
CREATE POLICY "tenant_isolation" ON tenants
  FOR ALL USING (id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON users
  FOR ALL USING (tenant_id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON students
  FOR ALL USING (tenant_id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON classes
  FOR ALL USING (tenant_id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON sessions
  FOR ALL USING (tenant_id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON enrollments
  FOR ALL USING (tenant_id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON invoices
  FOR ALL USING (tenant_id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON payments
  FOR ALL USING (tenant_id = auth_tenant_id());

CREATE POLICY "tenant_isolation" ON messages
  FOR ALL USING (tenant_id = auth_tenant_id());

-- ═══════════════════════════════════════════════════════════
-- Seed: Vida Dance Center (dev tenant)
-- ═══════════════════════════════════════════════════════════

-- Run after creating your first Supabase auth user, then replace
-- the UUID below with that user's auth.users.id.

-- INSERT INTO tenants (id, name, slug, location)
-- VALUES ('11111111-0000-0000-0000-000000000001', 'Vida Dance Center', 'vida-cebu', 'Cebu, Philippines');

-- INSERT INTO users (id, tenant_id, full_name, email, role, avatar_initials)
-- VALUES ('<your-auth-uid>', '11111111-0000-0000-0000-000000000001', 'Monica Villarica', 'monica@vida.ph', 'admin', 'M');
