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

interface PartnerInquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  role_title: string | null;
  org_type: string;
  areas_of_interest: string[];
  description: string | null;
  website: string | null;
  linkedin: string | null;
  created_at: string;
}

type Tab = "contact" | "partnership";

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [inquiries, setInquiries] = useState<PartnerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("contact");

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
    const fetchData = async () => {
      const [contactRes, partnerRes] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("partnership_inquiries").select("*").order("created_at", { ascending: false }),
      ]);

      if (contactRes.data) setSubmissions(contactRes.data as Submission[]);
      if (partnerRes.data) setInquiries(partnerRes.data as PartnerInquiry[]);
      setLoading(false);
    };
    fetchData();
  }, [isAuthed]);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-serif text-2xl text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm">Enter the admin password to view submissions.</p>
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
        <h1 className="font-serif text-3xl text-foreground mb-6">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border">
          <button
            onClick={() => setTab("contact")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === "contact"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setTab("partnership")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === "partnership"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Partnership Inquiries ({inquiries.length})
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : tab === "contact" ? (
          /* Contact Submissions */
          submissions.length === 0 ? (
            <p className="text-muted-foreground">No contact submissions yet.</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((s) => (
                <div key={s.id} className="rounded-sm border border-input bg-card p-5 space-y-2">
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
          )
        ) : (
          /* Partnership Inquiries */
          inquiries.length === 0 ? (
            <p className="text-muted-foreground">No partnership inquiries yet.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="rounded-sm border border-input bg-card p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-medium text-foreground">{inq.name}</h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {format(new Date(inq.created_at), "MMM d, yyyy · HH:mm")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {inq.email} · {inq.organization}
                    {inq.role_title && ` · ${inq.role_title}`}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-xs px-2 py-0.5 rounded-sm bg-muted text-muted-foreground font-mono">
                      {inq.org_type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {inq.areas_of_interest.map((area) => (
                      <span
                        key={area}
                        className="inline-block text-xs px-2 py-0.5 rounded-sm bg-accent text-accent-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  {inq.description && (
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap">{inq.description}</p>
                  )}
                  {(inq.website || inq.linkedin) && (
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      {inq.website && (
                        <a href={inq.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">
                          Website
                        </a>
                      )}
                      {inq.linkedin && (
                        <a href={inq.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Admin;
