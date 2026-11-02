CREATE TABLE public.brand_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  locale text NOT NULL DEFAULT 'es',
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  company text NOT NULL CHECK (char_length(company) BETWEEN 1 AND 160),
  email text NOT NULL CHECK (char_length(email) <= 255),
  whatsapp text CHECK (char_length(whatsapp) <= 40),
  website text CHECK (char_length(website) <= 300),
  campaign_type text NOT NULL CHECK (char_length(campaign_type) <= 60),
  talent text NOT NULL CHECK (char_length(talent) <= 60),
  product text NOT NULL CHECK (char_length(product) <= 500),
  objective text NOT NULL CHECK (char_length(objective) <= 1000),
  market text NOT NULL CHECK (char_length(market) <= 160),
  budget text CHECK (char_length(budget) <= 120),
  campaign_date text CHECK (char_length(campaign_date) <= 60),
  message text CHECK (char_length(message) <= 2000),
  consent boolean NOT NULL CHECK (consent = true)
);
GRANT INSERT ON public.brand_inquiries TO anon, authenticated;
GRANT ALL ON public.brand_inquiries TO service_role;
ALTER TABLE public.brand_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a brand inquiry" ON public.brand_inquiries FOR INSERT TO anon, authenticated WITH CHECK (consent = true);

CREATE TABLE public.creator_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  locale text NOT NULL DEFAULT 'es',
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  artistic_name text NOT NULL CHECK (char_length(artistic_name) <= 120),
  is_adult boolean NOT NULL CHECK (is_adult = true),
  country text NOT NULL CHECK (char_length(country) <= 80),
  city text CHECK (char_length(city) <= 80),
  email text NOT NULL CHECK (char_length(email) <= 255),
  whatsapp text CHECK (char_length(whatsapp) <= 40),
  instagram_user text CHECK (char_length(instagram_user) <= 80),
  instagram_url text CHECK (char_length(instagram_url) <= 300),
  tiktok_user text CHECK (char_length(tiktok_user) <= 80),
  tiktok_url text CHECK (char_length(tiktok_url) <= 300),
  other_url text CHECK (char_length(other_url) <= 300),
  followers text NOT NULL CHECK (char_length(followers) <= 60),
  categories text[] NOT NULL DEFAULT '{}',
  description text NOT NULL CHECK (char_length(description) <= 2000),
  featured_url text NOT NULL CHECK (char_length(featured_url) <= 300),
  extra text CHECK (char_length(extra) <= 2000),
  consent boolean NOT NULL CHECK (consent = true)
);
GRANT INSERT ON public.creator_applications TO anon, authenticated;
GRANT ALL ON public.creator_applications TO service_role;
ALTER TABLE public.creator_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a creator application" ON public.creator_applications FOR INSERT TO anon, authenticated WITH CHECK (consent = true);