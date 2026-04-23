-- Restrict listing the bucket while still allowing direct file access via public URL
DROP POLICY IF EXISTS "Public can read cms assets" ON storage.objects;

CREATE POLICY "Public can read cms asset files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'cms-assets'
  AND (storage.foldername(name))[1] IS NOT NULL
);