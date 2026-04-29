import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import usptcFlag from "@/assets/usptc-flag.png";
import { MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AgendaItem {
  id: string;
  day_id: string;
  time_text: string;
  title: string;
  description: string | null;
  bullets: string[];
  sort_order: number;
}

interface Day {
  id: string;
  label: string;
  date_text: string;
  location: string;
  subtitle: string;
  sort_order: number;
}

const DaySection = ({ day, items, index }: { day: Day; items: AgendaItem[]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    >
      <div className="mb-8">
        <span className="inline-block bg-navy text-navy-foreground font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm mb-3">
          {day.label}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground mt-1">
          {day.subtitle}
        </h2>
        <div className="flex items-center gap-4 text-muted-foreground text-sm font-mono mt-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {day.date_text}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {day.location}
          </span>
        </div>
      </div>

      <div className="relative pl-6 border-l border-border">
        {items.map((item) => (
          <div key={item.id} className="relative pb-8 last:pb-0 group">
            <div className="absolute -left-[calc(1.5rem+4.5px)] top-1.5 w-[9px] h-[9px] rounded-full bg-muted-foreground/30 group-hover:bg-accent-blue transition-colors" />

            <div className="flex flex-col sm:flex-row sm:gap-6">
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap sm:w-40 shrink-0 mt-0.5">
                {item.time_text}
              </span>
              <div className="mt-1 sm:mt-0">
                <h3 className="font-sans text-sm sm:text-base font-semibold text-foreground leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
                {/^poster session/i.test(item.title) && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">A1 poster template:</span>
                    <a
                      href="/poster-template-a1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2.5 py-1 rounded-sm border border-border text-foreground hover:bg-navy hover:text-navy-foreground hover:border-navy transition-colors"
                    >
                      PDF
                    </a>
                    <a
                      href="/poster-template-a1.pptx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2.5 py-1 rounded-sm border border-border text-foreground hover:bg-navy hover:text-navy-foreground hover:border-navy transition-colors"
                    >
                      PPTX
                    </a>
                  </div>
                )}
                {item.bullets.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-2 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Agenda = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [items, setItems] = useState<AgendaItem[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      supabase.from("agenda_days").select("*").order("sort_order"),
      supabase.from("agenda_items").select("*").order("sort_order"),
    ]).then(([d, i]) => {
      setDays((d.data ?? []) as Day[]);
      setItems((i.data ?? []) as AgendaItem[]);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-navy py-20 sm:py-28">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy-foreground/60 hover:text-navy-foreground text-sm font-mono tracking-wide mb-8 transition-colors"
          >
            ← Back to home
          </Link>
          <img src={usptcFlag} alt="USPTC" className="w-28 h-28 object-contain mb-6" />
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-navy-foreground/50 mb-4">
            XXV US–Poland Science & Technology Symposium
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-navy-foreground mb-4">
            Full Agenda
          </h1>
          <p className="text-navy-foreground/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Explore key sessions across three days of programming, from strategic dialogue to applied innovation and partnerships.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {days.map((day, index) => (
          <DaySection
            key={day.id}
            day={day}
            items={items.filter((i) => i.day_id === day.id).sort((a, b) => a.sort_order - b.sort_order)}
            index={index}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Agenda;
