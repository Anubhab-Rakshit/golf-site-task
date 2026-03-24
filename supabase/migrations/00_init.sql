-- Users Table (Extended from Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'user', -- 'user' or 'admin'
  subscription_status TEXT DEFAULT 'inactive', -- 'active', 'inactive', 'lapsed'
  renewal_date TIMESTAMP WITH TIME ZONE,
  plan_type TEXT, -- 'monthly', 'yearly'
  charity_id UUID,
  charity_percentage NUMERIC DEFAULT 10 CHECK (charity_percentage >= 10 AND charity_percentage <= 100),
  total_won NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Charities Table
CREATE TABLE public.charities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add constraint for charity_id in profiles
ALTER TABLE public.profiles ADD CONSTRAINT fk_charity FOREIGN KEY (charity_id) REFERENCES public.charities(id) ON DELETE SET NULL;

-- Scores Table (Rolling 5 logic handled in application/RPC)
CREATE TABLE public.scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  score_value INTEGER NOT NULL CHECK (score_value >= 1 AND score_value <= 45),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Draws Table
CREATE TABLE public.draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month_year TEXT NOT NULL UNIQUE, -- e.g., '2026-03'
  status TEXT DEFAULT 'pending', -- 'pending', 'simulated', 'published'
  winning_numbers INTEGER[], -- 5 numbers
  total_prize_pool NUMERIC DEFAULT 0,
  jackpot_rollover NUMERIC DEFAULT 0,
  draw_type TEXT DEFAULT 'random', -- 'random' or 'algorithmic'
  executed_at TIMESTAMP WITH TIME ZONE
);

-- User Draw Entries (Generated monthly based on active subscriptions)
CREATE TABLE public.user_draw_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id UUID REFERENCES public.draws(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  numbers_picked INTEGER[] NOT NULL, -- 5 numbers (derived from their scores or random if they don't have enough)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Winners Table
CREATE TABLE public.winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_id UUID REFERENCES public.draws(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  match_tier INTEGER NOT NULL CHECK (match_tier IN (3, 4, 5)),
  prize_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'paid'
  proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_draw_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winners ENABLE ROW LEVEL SECURITY;
