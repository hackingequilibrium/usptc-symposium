---
name: Admin CMS
description: /admin content management — partners, speakers, agenda CRUD with image upload; auth + admin-role gate; user management for granting admin access
type: feature
---
- Auth: email/password via Supabase. /admin/auth handles sign in / sign up. /admin gated by `useAdminAuth` hook checking `user_roles` table for role = 'admin'.
- First admin must be granted manually: insert a row into `user_roles` (user_id = auth user UUID, role = 'admin') from Cloud → Database. Subsequent admins added via the **Users** tab in /admin.
- Tables managed in admin tabs: `partners`, `speakers`, `agenda_days` + `agenda_items`, plus `user_roles` via the Users tab.
- **Users tab**: lists current admins (email + revoke button), form to grant admin access by email. Backed by edge function `admin-users` (verify_jwt = true) which uses service role to read `auth.users` for email↔user_id resolution. Function checks caller is admin via `has_role()` and refuses self-revoke.
- Image uploads go to public storage bucket `cms-assets` (subfolders `partners/` and `speakers/`); RLS allows admin write only, public read of files.
- Public pages (PartnersSection, SpeakersSection, /speakers, /agenda) read from DB on load.
- Fallback assets: speakers and partners with NULL image_url/logo_url use bundled assets via name-keyed maps in `src/lib/speakerImages.ts` and `src/components/PartnersSection.tsx`.
- Featured flag on speakers controls who appears on the landing page (vs full /speakers list).
