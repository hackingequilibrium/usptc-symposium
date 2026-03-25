import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import usptcFlag from "@/assets/usptc-flag.png";
import { MapPin, Clock } from "lucide-react";

interface AgendaItem {
  time: string;
  title: string;
  description?: string;
  bullets?: string[];
}

interface DaySchedule {
  label: string;
  date: string;
  location: string;
  subtitle: string;
  items: AgendaItem[];
}

const schedule: DaySchedule[] = [
  {
    label: "Pre-Symposium",
    date: "May 31",
    location: "Bay Area Council, San Francisco",
    subtitle: "Welcome & Registration",
    items: [
      {
        time: "5:30–7:00 PM",
        title: "Early Registration & Badge Pick-Up",
        description: "Light welcome refreshments.",
      },
      {
        time: "6:00–7:30 PM",
        title: "Welcome Cocktail Reception",
        bullets: ["Short welcome by USPTC", "Ice-breaker networking"],
      },
    ],
  },
  {
    label: "Day 1",
    date: "June 1",
    location: "Stanford University",
    subtitle: "Aviation, Innovation & Commercialization",
    items: [
      { time: "8:00–9:00 AM", title: "Registration & Welcome Coffee", description: "Light breakfast and snacks provided." },
      { time: "9:00–10:00 AM", title: "Opening Plenary: USPTC Mission & Impact 2024–2026", description: "Short introduction followed by moderated discussion." },
      { time: "10:00–10:15 AM", title: "Coffee Break" },
      { time: "10:15–11:00 AM", title: "AI + Space: Dual-Use Technologies", description: "Accelerating global innovation across aviation and space." },
      { time: "11:00 AM–12:00 PM", title: "Poland and Space", bullets: ["Space missions", "Materials science"] },
      { time: "12:00–1:00 PM", title: "Poster Session & Demos", description: "Selected research presentations and elevator pitches." },
      { time: "1:00–2:30 PM", title: "Tour of Stanford & Lunch" },
    ],
  },
  {
    label: "Day 2",
    date: "June 2",
    location: "UC Berkeley",
    subtitle: "Autonomous Systems & Infrastructure",
    items: [
      { time: "8:00–9:00 AM", title: "Registration & Welcome Coffee" },
      { time: "9:00–10:00 AM", title: "Plenary: Autonomous Aviation and UAV Ecosystems", description: "Keynote and panel discussion." },
      { time: "10:00–11:00 AM", title: "Coffee Break" },
      {
        time: "11:00 AM–1:00 PM",
        title: "From Planning to Physical Exploration",
        bullets: ["Space in a secure world", "Scientific research on Earth", "Technical challenges", "Research in space"],
      },
      { time: "1:00–2:00 PM", title: "Poster Session" },
      { time: "2:00–3:00 PM", title: "Networking Lunch" },
      { time: "3:00–4:00 PM", title: "Energy, Climate & System Resilience", bullets: ["Evolution of climate strategy", "Energy system stability"] },
      { time: "4:00–5:30 PM", title: "Space Impact on Business and Industry", bullets: ["Dual-use challenges", "Smart industry applications"] },
      { time: "2:30–4:00 PM", title: "Space, Law & Dual-Use", bullets: ["Regulations of dual-use technologies", "Cybersecurity & data privacy", "Investment landscape"] },
      { time: "4:00–5:00 PM", title: "Fireside Chat: AI as an Innovation Accelerator for Space" },
      { time: "5:00–5:45 PM", title: "Venture Capital & Financial Investment in Space" },
      { time: "6:45–8:30 PM", title: "Gala Dinner & Keynote", description: "The Next 20 Years in Space Exploration." },
    ],
  },
  {
    label: "Day 3",
    date: "June 3",
    location: "UCSF",
    subtitle: "BioSpace, Health & Cross-Sector Innovation",
    items: [
      { time: "8:00–9:00 AM", title: "Registration & Welcome Coffee" },
      {
        time: "9:00–10:00 AM",
        title: "Parallel Workshops",
        bullets: ["IP in dual-use environments", "Writing international grant proposals", "Building US–Poland consortia"],
      },
      { time: "10:00–10:30 AM", title: "Coffee Break" },
      { time: "10:30 AM–12:00 PM", title: "Astrobiology & Space Medicine", description: "Space as a laboratory for life sciences." },
      { time: "12:00–1:30 PM", title: "Networking Lunch" },
      {
        time: "1:30–3:00 PM",
        title: "New Era in Living Environments",
        bullets: ["Cities of the future", "Flying taxis", "Telemedicine"],
      },
      { time: "3:00–4:00 PM", title: "Healthcare, Industry & Public Services" },
      { time: "4:00–4:30 PM", title: "Closing Discussion: Ideas for Next Steps" },
      { time: "4:30–5:00 PM", title: "Official Closing Session" },
    ],
  },
];

const DaySection = ({ day, index }: { day: DaySchedule; index: number }) => {
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
      {/* Day header */}
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
            {day.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {day.location}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 border-l border-border">
        {day.items.map((item, i) => (
          <div key={i} className="relative pb-8 last:pb-0 group">
            {/* Dot */}
            <div className="absolute -left-[calc(1.5rem+4.5px)] top-1.5 w-[9px] h-[9px] rounded-full bg-muted-foreground/30 group-hover:bg-accent-blue transition-colors" />

            <div className="flex flex-col sm:flex-row sm:gap-6">
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap sm:w-40 shrink-0 mt-0.5">
                {item.time}
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
                {item.bullets && (
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header — matches Speakers page */}
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

      {/* Schedule content */}
      <div className="container max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {schedule.map((day, index) => (
          <DaySection key={day.label} day={day} index={index} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Agenda;
