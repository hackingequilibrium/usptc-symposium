

## Add User Management to Admin Panel

Add a new "Users" tab in `/admin` so existing admins can grant or revoke admin access to other registered users without touching the database.

### What you'll see

A new **Users** tab alongside Partners / Speakers / Agenda / Contact / Partnerships. Inside:

- A list of all current admins (email + "Revoke" button).
- An "Add admin" form: enter the email of an already-registered user → click **Grant admin**.
- Confirmation dialog before revoking. You cannot revoke your own admin role (safety guard).

```text
┌─ Users ──────────────────────────────────────┐
│ Grant admin access                           │
│ [ email@example.com        ] [Grant admin]   │
│                                              │
│ Current admins                               │
│ • agata.braja@polsv.org           [Revoke]   │
│ • someone.else@polsv.org          [Revoke]   │
└──────────────────────────────────────────────┘
```

### How it works (technical)

1. **Edge function `admin-users`** (verify_jwt = true): runs with the service role key so it can read `auth.users` (which the client SDK can't). Endpoints:
   - `GET list` → returns all rows in `user_roles` joined with email from `auth.users`.
   - `POST grant { email }` → looks up user by email, inserts `(user_id, 'admin')` into `user_roles`.
   - `POST revoke { user_id }` → deletes the admin row.
   - Every call first verifies the caller is authenticated AND has the `admin` role via `has_role()`. Rejects otherwise.
   - Refuses self-revoke.

2. **New component `src/components/admin/UsersAdmin.tsx`**: calls the edge function via `supabase.functions.invoke('admin-users', ...)`, renders the list + form, handles loading/errors with toasts.

3. **`src/pages/Admin.tsx`**: add `"users"` to the `Tab` union, add `{ id: "users", label: "Users" }` to `TABS`, render `<UsersAdmin />` when active.

4. **No schema migration needed** — `user_roles` table and `has_role()` function already exist. The `Admins can manage roles` RLS policy already allows admins to insert/delete; the edge function uses the service role purely to look up emails in `auth.users`.

### Why an edge function

The Supabase JS client cannot query `auth.users`, so we can't resolve "email → user_id" from the browser. The edge function does that lookup server-side, while still enforcing that only an authenticated admin can call it.

### Files

- new: `supabase/functions/admin-users/index.ts`
- new: `supabase/config.toml` block for `admin-users` (verify_jwt = true)
- new: `src/components/admin/UsersAdmin.tsx`
- edit: `src/pages/Admin.tsx` (add tab)
- edit: `.lovable/memory/features/admin-cms.md` (note user management capability)

