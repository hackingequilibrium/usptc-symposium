CREATE TABLE public.partnership_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  organization text NOT NULL,
  role_title text,
  email text NOT NULL,
  org_type text NOT NULL,
  areas_of_interest text[] NOT NULL DEFAULT '{}',
  description text,
  website text,
  linkedin text
);

ALTER TABLE public.partnership_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit partnership inquiry"
  ON public.partnership_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read partnership inquiries"
  ON public.partnership_inquiries
  FOR SELECT
  TO public
  USING (true);