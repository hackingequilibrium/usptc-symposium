---
name: Admin CMS
description: /admin content management — partners, speakers, agenda CRUD with image upload; auth + admin-role gate
type: feature
---
- Auth: email/password via Supabase. /admin/auth handles sign in / sign up. /admin gated by `useAdminAuth` hook checking `user_roles` table for role = 'admin'.
- First admin must be granted manually: insert a row into `user_roles` (user_id = auth user UUID, role = 'admin') from Cloud → Database. The /admin page shows a screen with the user's UUID for non-admins.
- Tables managed in admin tabs: `partners` (logo_url, url, category, sort_order, is_active), `speakers` (image_url, linkedin, virtual, featured, sort_order, is_active), `agenda_days` + `agenda_items` (linked by day_id).
- Image uploads go to public storage bucket `cms-assets` (subfolders `partners/` and `speakers/`); RLS allows admin write only, public read of files.
- Public pages (PartnersSection, SpeakersSection, /speakers, /agenda) read from DB on load.
- Fallback assets: speakers and partners with NULL image_url/logo_url use bundled assets via name-keyed maps in `src/lib/speakerImages.ts` and `src/components/PartnersSection.tsx`. As soon as admin uploads, DB URL takes precedence.
- Featured flag on speakers controls who appears on the landing page (vs full /speakers list).
- Old shared password (123456 / PolSV2026) is removed.
