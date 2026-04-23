import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(100),
});

const AdminAuth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
      navigate("/admin", { replace: true });
    } catch (err: any) {
      setError(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <h1 className="font-serif text-2xl text-foreground">Admin {mode === "signup" ? "Sign up" : "Sign in"}</h1>
        <p className="text-muted-foreground text-sm">
          {mode === "signup"
            ? "Create an admin account. An existing admin must grant you access."
            : "Sign in with your admin email and password."}
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-sm border border-input bg-background text-foreground text-sm"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className="w-full px-4 py-3 rounded-sm border border-input bg-background text-foreground text-sm"
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full px-4 py-3 rounded-sm bg-foreground text-background text-sm font-medium tracking-wide uppercase disabled:opacity-50"
        >
          {busy ? "..." : mode === "signup" ? "Sign up" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="w-full text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signup" ? "Already have an account? Sign in" : "Need an account? Sign up"}
        </button>
      </form>
    </div>
  );
};

export default AdminAuth;
