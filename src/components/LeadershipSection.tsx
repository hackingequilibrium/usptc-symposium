import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import piotrImg from "@/assets/leaders/piotr-moncarz.png";
import jerzyImg from "@/assets/leaders/jerzy-orkiszewski.png";
import michalImg from "@/assets/leaders/michal-banka.png";

const leaders = [
  { name: "Piotr Moncarz", role: "USPTC General Chair", image: piotrImg },
  { name: "Jerzy Orkiszewski", role: "USPTC Co-Chair", image: jerzyImg },
  { name: "Michał Bańka", role: "Warsaw University of Technology", image: michalImg },
];

export const LeadershipSection = () => {
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
    <section id="leadership" ref={sectionRef} className="bg-navy py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-navy-foreground/50 mb-4">
            Guiding the Vision
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-navy-foreground mb-6">
            Leadership & Advisory
          </h2>
          <div className="w-16 h-px bg-navy-foreground/20 mb-8" />
          <p className="font-sans text-lg sm:text-xl text-navy-foreground/70 max-w-2xl leading-relaxed mb-16">
            The Symposium is guided by leaders across academia, industry, and
            public institutions, shaping long-term US–Poland collaboration in
            science and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leaders.map((leader, index) => {
            const initials = leader.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div
                key={leader.name}
                className={`group relative rounded-md bg-secondary overflow-hidden transition-all duration-700 ease-out hover:scale-[1.02] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-accent-blue/40 to-accent-pink/30 flex items-center justify-center">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="font-serif text-4xl text-foreground/25 select-none">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent p-6 pt-16">
                  <h3 className="font-sans text-base font-semibold text-navy-foreground leading-snug">
                    {leader.name}
                  </h3>
                  <p className="font-sans text-sm text-navy-foreground/60 mt-1">
                    {leader.role}
                  </p>
                </div>
              </div>
            );
          })}

          {/* View All card */}
          <div
            className={`group relative rounded-md bg-navy border border-navy-foreground/20 overflow-hidden flex flex-col items-center justify-center aspect-[3/4] transition-all duration-700 ease-out hover:scale-[1.02] cursor-pointer ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: isVisible
                ? `${300 + leaders.length * 100}ms`
                : "0ms",
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-navy-foreground/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className="w-6 h-6 text-navy-foreground" />
              </div>
              <span className="font-sans text-sm font-semibold tracking-wide uppercase text-navy-foreground">
                View All
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
