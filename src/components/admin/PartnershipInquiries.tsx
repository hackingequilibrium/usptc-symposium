import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

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

export const PartnershipInquiries = () => {
  const [items, setItems] = useState<PartnerInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("partnership_inquiries").select("*").order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data as PartnerInquiry[]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (items.length === 0) return <p className="text-muted-foreground">No partnership inquiries yet.</p>;

  return (
    <div className="space-y-4">
      {items.map((inq) => (
        <div key={inq.id} className="rounded-sm border border-input bg-card p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="font-medium text-foreground">{inq.name}</h3>
            <span className="text-xs text-muted-foreground font-mono">{format(new Date(inq.created_at), "MMM d, yyyy · HH:mm")}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {inq.email} · {inq.organization}{inq.role_title && ` · ${inq.role_title}`}
          </p>
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-block text-xs px-2 py-0.5 rounded-sm bg-muted text-muted-foreground font-mono">{inq.org_type}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {inq.areas_of_interest.map((area) => (
              <span key={area} className="inline-block text-xs px-2 py-0.5 rounded-sm bg-accent text-accent-foreground">{area}</span>
            ))}
          </div>
          {inq.description && <p className="text-sm text-foreground/80 whitespace-pre-wrap">{inq.description}</p>}
          {(inq.website || inq.linkedin) && (
            <div className="flex gap-4 text-xs text-muted-foreground">
              {inq.website && <a href={inq.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">Website</a>}
              {inq.linkedin && <a href={inq.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline">LinkedIn</a>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
