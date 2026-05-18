ALTER TABLE public.partners DROP CONSTRAINT IF EXISTS partners_category_check;
ALTER TABLE public.partners ADD CONSTRAINT partners_category_check CHECK (category IN ('Organizers','Honorary Patrons','Regional Strategic Partners','Sponsors & Partners','Partnering Organizations','Strategic Partners'));
UPDATE public.partners SET category = 'Partnering Organizations', sort_order = 1 WHERE id = '81ae2039-f10e-4e7f-9e7e-0ac23dec2119';
UPDATE public.partners SET sort_order = 1 WHERE id = '73962193-85f5-4096-82f0-ac019d5d7167';
UPDATE public.partners SET sort_order = 2 WHERE id = '25f623f3-a4dd-4d0a-82c0-d19baa0fc3ea';
UPDATE public.partners SET sort_order = 3 WHERE id = '0ae17d24-c8a4-4b7f-9d59-0efc69984601';
UPDATE public.partners SET sort_order = 4 WHERE id = '3880310f-93ba-4be5-a575-446e698606a2';