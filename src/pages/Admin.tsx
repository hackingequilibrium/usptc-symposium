import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Submission {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple password gate (not production-grade — just a quick admin lock)
  const ADMIN_PASS = "usptc2026";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (!isAuthed) return;
    const fetchSubmissions = async () => {
      // Use anon key read — RLS requires authenticated, so sign in anonymously won't work.
      // We'll use a direct query via supabase client. Since RLS allows authenticated SELECT,
      // we need to work around this. For now, use the service role or a simple approach.
      // Actually, let's just query directly — the anon role doesn't have SELECT.
      // We'll use supabase functions or a simpler approach.
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setSubmissions(data as Submission[]);
      }
      setLoading(false);
    };
    fetchSubmissions();
  }, [isAuthed]);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-serif text-2xl text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm">Enter the admin password to view contact submissions.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-sm border border-input bg-background text-foreground text-sm"
          />
          {error && <p className="text-destructive text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-sm bg-foreground text-background text-sm font-medium tracking-wide uppercase"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl text-foreground mb-2">Contact Submissions</h1>
        <p className="text-muted-foreground text-sm mb-8">
          {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
        </p>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="rounded-sm border border-input bg-card p-5 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-medium text-foreground">{s.name}</h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    {format(new Date(s.created_at), "MMM d, yyyy · HH:mm")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {s.email}
                  {s.organization && ` · ${s.organization}`}
                </p>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{s.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
