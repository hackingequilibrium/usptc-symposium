ALTER TABLE public.partners DROP CONSTRAINT IF EXISTS partners_category_check;
ALTER TABLE public.partners ADD CONSTRAINT partners_category_check CHECK (category IN ('Organizers','Honorary Patrons','Sponsors & Partners','Strategic Partners'));
UPDATE public.partners SET category = 'Sponsors & Partners' WHERE category = 'Strategic Partners';