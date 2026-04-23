import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";

interface AdminRow {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
}

export const UsersAdmin = () => {
  const { session } = useAdminAuth();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [granting, setGranting] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-users", {
      method: "GET",
    });
    if (error) {
      toast({ title: "Failed to load admins", description: error.message, variant: "destructive" });
    } else {
      setAdmins(data?.admins ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const grant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (password && password.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    setGranting(true);
    const { data, error } = await supabase.functions.invoke("admin-users?action=grant", {
      method: "POST",
      body: { email: email.trim(), password: password || undefined },
    });
    setGranting(false);
    if (error || data?.error) {
      toast({
        title: "Could not grant admin",
        description: data?.error ?? error?.message ?? "Unknown error",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Admin granted", description: `${email} is now an admin.` });
    setEmail("");
    setPassword("");
    load();
  };

  const revoke = async (row: AdminRow) => {
    if (row.user_id === session?.user.id) {
      toast({ title: "Not allowed", description: "You cannot revoke your own admin role.", variant: "destructive" });
      return;
    }
    if (!confirm(`Revoke admin access for ${row.email}?`)) return;
    setRevokingId(row.id);
    const { data, error } = await supabase.functions.invoke("admin-users?action=revoke", {
      method: "POST",
      body: { user_id: row.user_id },
    });
    setRevokingId(null);
    if (error || data?.error) {
      toast({
        title: "Could not revoke",
        description: data?.error ?? error?.message ?? "Unknown error",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Admin revoked", description: `${row.email} no longer has admin access.` });
    load();
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="font-serif text-xl text-foreground">Add admin</h2>
        <p className="text-xs text-muted-foreground">
          Enter an email and password to create a new admin account. If the email already has an account, it will simply be granted admin access (password ignored).
        </p>
        <form onSubmit={grant} className="space-y-2 max-w-md">
          <input
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-sm bg-background text-foreground"
          />
          <input
            type="password"
            placeholder="Password (min 6 chars, for new accounts)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full px-3 py-2 text-sm border border-border rounded-sm bg-background text-foreground"
          />
          <button
            type="submit"
            disabled={granting}
            className="px-4 py-2 rounded-sm bg-foreground text-background text-sm disabled:opacity-50"
          >
            {granting ? "Adding…" : "Add admin"}
          </button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-foreground">Current admins</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : admins.length === 0 ? (
          <p className="text-sm text-muted-foreground">No admins yet.</p>
        ) : (
          <ul className="border border-border rounded-sm divide-y divide-border max-w-2xl">
            {admins.map((a) => {
              const isSelf = a.user_id === session?.user.id;
              return (
                <li key={a.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="text-sm text-foreground">{a.email}</div>
                    {isSelf && (
                      <div className="text-xs text-muted-foreground">You</div>
                    )}
                  </div>
                  <button
                    onClick={() => revoke(a)}
                    disabled={isSelf || revokingId === a.id}
                    className="text-xs text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:hover:text-muted-foreground"
                  >
                    {revokingId === a.id ? "Revoking…" : "Revoke"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};
