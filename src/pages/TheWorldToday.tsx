import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { extractSpeakers } from "@/lib/agendaSpeakers";
import usptcFlag from "@/assets/usptc-flag.png";

interface AgendaItem {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
}

const TheWorldToday = () => {
  const [items, setItems] = useState<AgendaItem[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase
      .from("agenda_items")
      .select("id,title,description,sort_order")
      .or("title.ilike.pax silica%,title.ilike.global economy%")
      .order("sort_order")
      .then(({ data }) => setItems((data ?? []) as AgendaItem[]));
  }, []);

  const ordered = [...items].sort((a, b) => {
    const rank = (t: string) => (/^pax silica/i.test(t) ? 0 : 1);
    return rank(a.title) - rank(b.title);
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 md:px-12 py-16 sm:py-20">
        <Link
          to="/agenda"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-mono tracking-wide mb-8 transition-colors"
        >
          ← Back to agenda
        </Link>

        <img src={usptcFlag} alt="USPTC" className="w-20 h-20 object-contain mb-6" />

        <div className="bg-navy text-navy-foreground rounded-2xl px-8 py-8 sm:px-10 sm:py-10">
          <h1 className="font-serif text-3xl sm:text-4xl text-navy-foreground leading-tight">
            The World Today
          </h1>
          <p className="mt-1 font-mono text-xs sm:text-sm text-navy-foreground/70">
            4:30–6:00 PM
          </p>
          <p className="mt-3 flex items-start gap-1.5 text-xs sm:text-sm text-navy-foreground/70">
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>
              Mackenzie Room, Room 300, 3rd Floor Jen-Hsun Huang Engineering Center
              <br />
              475 Via Ortega, Stanford, CA 94305
              {" ("}
              <a
                href="https://maps.app.goo.gl/21o25fvBLutQPg6p9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-foreground underline hover:no-underline"
              >
                View on map →
              </a>
              {")"}
            </span>
          </p>

          <div className="mt-8 divide-y divide-navy-foreground/15">
            {ordered.map((wt) => {
              const speakers = extractSpeakers(wt.description);
              const speaker = speakers[0];
              const role =
                speaker?.name === "Jacob Helberg"
                  ? "Under Secretary for Economic Affairs, US State Department"
                  : speaker?.name === "Alojzy Nowak"
                  ? "Rector, University of Warsaw"
                  : "";
              return (
                <div key={wt.id} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-5">
                    {speaker?.img ? (
                      <img
                        src={speaker.img}
                        alt={speaker.name}
                        loading="lazy"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-1 ring-navy-foreground/20 shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-navy-foreground/10 ring-1 ring-navy-foreground/20 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <h2 className="font-sans text-lg sm:text-xl font-semibold text-navy-foreground leading-snug">
                        {wt.title}
                      </h2>
                      {speaker && (
                        <p className="mt-1 text-sm sm:text-base font-semibold text-navy-foreground">
                          {speaker.name}
                        </p>
                      )}
                      {role && (
                        <p className="text-xs sm:text-sm italic text-navy-foreground/70 leading-snug">
                          {role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TheWorldToday;
