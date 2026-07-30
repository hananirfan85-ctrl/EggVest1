-- =========================================================
-- EggVest Smart Poultry Platform - Supabase Database Schema
-- Run this SQL script directly inside your Supabase SQL Editor
-- (https://supabase.com/dashboard/project/_/sql)
-- =========================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'investor',
  avatar TEXT,
  kyc_status TEXT DEFAULT 'unverified',
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  wallet_balance NUMERIC(12,2) DEFAULT 0.00,
  total_earnings NUMERIC(12,2) DEFAULT 0.00,
  total_referral_earnings NUMERIC(12,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY,
  actor_id TEXT,
  actor_name TEXT,
  action TEXT NOT NULL,
  target TEXT,
  ip_address TEXT,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT,
  type TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'completed',
  description TEXT,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DEPOSITS TABLE
CREATE TABLE IF NOT EXISTS public.deposits (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT,
  user_email TEXT,
  amount NUMERIC(12,2) NOT NULL,
  payment_method TEXT,
  transaction_reference TEXT,
  proof_image_url TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- 5. WITHDRAWALS TABLE
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  user_name TEXT,
  user_email TEXT,
  amount NUMERIC(12,2) NOT NULL,
  net_amount NUMERIC(12,2) NOT NULL,
  fee NUMERIC(12,2) DEFAULT 0.00,
  payment_method TEXT,
  account_title TEXT,
  account_number TEXT,
  bank_name TEXT,
  iban TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- 6. NETWORK BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.network_banners (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  badge TEXT,
  desc TEXT,
  bg TEXT,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DISABLE RLS or ALLOW ANONYMOUS ACCESS FOR DEMO/PREVIEW MODE
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_banners DISABLE ROW LEVEL SECURITY;
