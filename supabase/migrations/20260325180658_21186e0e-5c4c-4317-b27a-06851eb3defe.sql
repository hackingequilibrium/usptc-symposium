
-- Allow anon to also read submissions (admin panel uses password gate, not auth)
DROP POLICY "Authenticated users can read submissions" ON public.contact_submissions;
CREATE POLICY "Anyone can read submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (true);
