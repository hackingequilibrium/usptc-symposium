-- Replace Michał Kurtyka with Alojzy Nowak in homepage featured speakers
UPDATE public.speakers SET featured = false WHERE id = 'e98b6359-d2dc-4ab1-9e6a-2290f3a78a2e';
UPDATE public.speakers SET featured = true, sort_order = 41 WHERE id = '6f3e57f8-54d0-43ee-acd0-df4aad2bbbd9';