import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { ContactSubmissions } from "@/components/admin/ContactSubmissions";
import { PartnershipInquiries } from "@/components/admin/PartnershipInquiries";
import { PartnersAdmin } from "@/components/admin/PartnersAdmin";
import { SpeakersAdmin } from "@/components/admin/SpeakersAdmin";
import { AgendaAdmin } from "@/components/admin/AgendaAdmin";
import { UsersAdmin } from "@/components/admin/UsersAdmin";

type Tab = "contact" | "partnership" | "partners" | "speakers" | "agenda" | "users";

const TABS: { id: Tab; label: string }[] = [
  { id: "partners", label: "Partners" },
  { id: "speakers", label: "Speakers" },
  { id: "agenda", label: "Agenda" },
  { id: "contact", label: "Contact" },
  { id: "partnership", label: "Partnerships" },
  { id: "users", label: "Users" },
];

const Admin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("partners");
  const [grantingSelf, setGrantingSelf] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [loading, session, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  };

  const claimAdmin = async () => {
    if (!session) return;
    setGrantingSelf(true);
    // First admin: only succeeds if no admin exists yet (per RLS, this insert needs admin role,
    // so we use a one-time bootstrap via direct insert that works only when user_roles is empty
    // for admin role). RLS will block otherwise.
    const { count } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) {
      alert("An admin already exists. Ask them to grant you access in Cloud → Database → user_roles.");
      setGrantingSelf(false);
      return;
    }
    // Insert via SQL needs to bypass RLS — won't work from client.
    alert("To grant the first admin role, open Cloud → Database → user_roles, and insert a row with your user_id and role 'admin'. Your user ID is:\n\n" + session.user.id);
    setGrantingSelf(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-serif text-2xl text-foreground">Access required</h1>
          <p className="text-sm text-muted-foreground">
            You're signed in as <span className="font-mono">{session.user.email}</span> but don't have admin access yet.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={claimAdmin}
              disabled={grantingSelf}
              className="px-4 py-2 rounded-sm bg-foreground text-background text-sm"
            >
              How to grant admin access
            </button>
            <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground">
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Admin Panel</h1>
            <p className="text-xs text-muted-foreground mt-1">Signed in as {session.user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">View site</Link>
            <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground">Sign out</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-8 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "partners" && <PartnersAdmin />}
        {tab === "speakers" && <SpeakersAdmin />}
        {tab === "agenda" && <AgendaAdmin />}
        {tab === "contact" && <ContactSubmissions />}
        {tab === "partnership" && <PartnershipInquiries />}
        {tab === "users" && <UsersAdmin />}
      </div>
    </div>
  );
};

export default Admin;
