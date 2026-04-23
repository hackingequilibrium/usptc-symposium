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

export const ContactSubmissions = () => {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data as Submission[]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (items.length === 0) return <p className="text-muted-foreground">No contact submissions yet.</p>;

  return (
    <div className="space-y-4">
      {items.map((s) => (
        <div key={s.id} className="rounded-sm border border-input bg-card p-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="font-medium text-foreground">{s.name}</h3>
            <span className="text-xs text-muted-foreground font-mono">{format(new Date(s.created_at), "MMM d, yyyy · HH:mm")}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {s.email}{s.organization && ` · ${s.organization}`}
          </p>
          <p className="text-sm text-foreground/80 whitespace-pre-wrap">{s.message}</p>
        </div>
      ))}
    </div>
  );
};
