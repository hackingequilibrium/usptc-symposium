import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ??
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify caller
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await userClient.auth.getClaims(
      token,
    );
    if (claimsErr || !claims?.claims) {
      return json({ error: "Unauthorized" }, 401);
    }
    const callerId = claims.claims.sub as string;

    // Admin client (service role) for auth.users access + role checks
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

    // Verify caller is admin
    const { data: isAdminRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerId)
      .eq("role", "admin")
      .maybeSingle();
    if (!isAdminRow) {
      return json({ error: "Forbidden" }, 403);
    }

    const url = new URL(req.url);
    const action = url.searchParams.get("action") ?? "list";

    if (req.method === "GET" || action === "list") {
      const { data: roles, error: rolesErr } = await admin
        .from("user_roles")
        .select("id, user_id, role, created_at")
        .eq("role", "admin")
        .order("created_at", { ascending: true });
      if (rolesErr) return json({ error: rolesErr.message }, 500);

      const enriched = await Promise.all(
        (roles ?? []).map(async (r) => {
          const { data: u } = await admin.auth.admin.getUserById(r.user_id);
          return {
            id: r.id,
            user_id: r.user_id,
            email: u?.user?.email ?? "(unknown)",
            created_at: r.created_at,
          };
        }),
      );
      return json({ admins: enriched });
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));

      if (action === "grant") {
        const email = String(body.email ?? "").trim().toLowerCase();
        if (!email || !email.includes("@")) {
          return json({ error: "Valid email required" }, 400);
        }

        // Find user by email — paginate auth.users
        let foundId: string | null = null;
        let page = 1;
        while (page <= 20 && !foundId) {
          const { data, error } = await admin.auth.admin.listUsers({
            page,
            perPage: 200,
          });
          if (error) return json({ error: error.message }, 500);
          const match = data.users.find(
            (u) => u.email?.toLowerCase() === email,
          );
          if (match) foundId = match.id;
          if (data.users.length < 200) break;
          page++;
        }
        if (!foundId) {
          return json(
            { error: "No registered user with that email. Ask them to sign up first." },
            404,
          );
        }

        const { error: insErr } = await admin
          .from("user_roles")
          .insert({ user_id: foundId, role: "admin" });
        if (insErr && !insErr.message.includes("duplicate")) {
          return json({ error: insErr.message }, 500);
        }
        return json({ success: true, user_id: foundId, email });
      }

      if (action === "revoke") {
        const userId = String(body.user_id ?? "");
        if (!userId) return json({ error: "user_id required" }, 400);
        if (userId === callerId) {
          return json({ error: "You cannot revoke your own admin role" }, 400);
        }
        const { error: delErr } = await admin
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", "admin");
        if (delErr) return json({ error: delErr.message }, 500);
        return json({ success: true });
      }
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : "Server error" }, 500);
  }
});
