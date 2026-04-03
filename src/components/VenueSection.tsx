import { useEffect, useRef, useState } from "react";
import stanfordImg from "@/assets/venues/stanford.jpg";
import berkeleyImg from "@/assets/venues/berkeley.jpg";
import ucsfImg from "@/assets/ucsf.jpg";

const venues = [
  {
    name: "Stanford University",
    day: "Day 1",
    tracks: "Opening Keynote · Aviation & Entrepreneurship",
    description: "Where research meets commercialization at the heart of Silicon Valley",
    image: stanfordImg,
    bg: "bg-gradient-to-br from-white to-[hsl(355,90%,94%)]",
  },
  {
    name: "UC Berkeley",
    day: "Day 2",
    tracks: "Space · Engineering · Advanced Systems",
    description: "Deep technical exploration across space technologies and infrastructure",
    image: berkeleyImg,
    bg: "bg-gradient-to-br from-white to-[hsl(216,60%,93%)]",
  },
  {
    name: "UCSF",
    day: "Day 3",
    tracks: "BioSpace · Frontier Applications · Closing Gala",
    description: "Where space meets life sciences, health, and future human systems",
    image: ucsfImg,
    bg: "bg-gradient-to-br from-white to-[hsl(330,50%,93%)]",
  },
];

export const VenueSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="venues" ref={sectionRef} className="py-24 sm:py-32 bg-navy">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div className={`transition-all duration-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-navy-foreground/60 mb-4">
            Venues
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-navy-foreground mb-6">
            A Three-Campus Experience
          </h2>
          <div className="w-16 h-px bg-navy-foreground/20 mb-16" />
        </div>


        <div className="grid md:grid-cols-3 gap-6">
          {venues.map((venue, index) => (
            <div
              key={venue.name}
              className={`group rounded-md overflow-hidden ${venue.bg} shadow-sm hover:shadow-md transition-all duration-700 ease-out hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? `${300 + index * 150}ms` : '0ms' }}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase bg-navy text-navy-foreground px-3 py-1 rounded-sm mb-3">
                  {venue.day}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground mb-2">
                  {venue.name}
                </h3>
                <p className="font-mono text-xs tracking-wide text-navy mb-3">
                  {venue.tracks}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {venue.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: isVisible ? '750ms' : '0ms' }}>
          <a
            href="/agenda"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-navy text-navy-foreground font-sans text-sm font-semibold tracking-wide uppercase hover:bg-navy/90 transition-colors shadow-lg shadow-navy/20"
          >
            View Full Agenda →
          </a>
        </div>
      </div>
    </section>
  );
};
