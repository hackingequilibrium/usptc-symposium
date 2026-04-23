-- Allow admins to delete partnership inquiries and contact submissions
CREATE POLICY "Admins can delete partnership inquiries"
ON public.partnership_inquiries
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Remove the test partnership inquiry
DELETE FROM public.partnership_inquiries WHERE id = '87c86b10-3bb8-4510-a988-2ce8e05f551e';