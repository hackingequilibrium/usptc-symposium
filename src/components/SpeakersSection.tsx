import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { speakerFallbackImage } from "@/lib/speakerImages";

interface Speaker {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  virtual: boolean;
  sort_order: number;
}

export const SpeakersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    supabase
      .from("speakers")
      .select("id,name,role,image_url,virtual,sort_order")
      .eq("is_active", true)
      .eq("featured", true)
      .order("sort_order")
      .then(({ data }) => setSpeakers((data ?? []) as Speaker[]));
  }, []);

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
    <section id="speakers" ref={sectionRef} className="bg-background py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`transition-all duration-800 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Featured Voices
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-6">
            Speakers
          </h2>
          <div className="w-16 h-px bg-foreground/20 mb-8" />
          <p className="font-sans text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-16">
            Leaders across science, policy, industry, and innovation shaping the
            future of aviation and space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakers.map((speaker, index) => {
            const initials = speaker.name.split(" ").map((n) => n[0]).join("");
            const img = speaker.image_url ?? speakerFallbackImage(speaker.name);

            return (
              <div
                key={speaker.id}
                className={`group relative rounded-md bg-secondary overflow-hidden transition-all duration-700 ease-out hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: isVisible ? `${300 + index * 100}ms` : '0ms' }}
              >
                {speaker.virtual && (
                  <span className="absolute top-2 right-2 z-10 bg-accent-blue/90 text-navy text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm backdrop-blur-sm">
                    Virtual
                  </span>
                )}
                <div className="aspect-[3/4] bg-gradient-to-br from-accent-blue/40 to-accent-pink/30 flex items-center justify-center">
                  {img ? (
                    <img src={img} alt={speaker.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <span className="font-serif text-4xl text-foreground/25 select-none">{initials}</span>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent p-6 pt-16">
                  <h3 className="font-sans text-base font-semibold text-navy-foreground leading-snug">{speaker.name}</h3>
                  <p className="font-sans text-sm text-navy-foreground/60 mt-1">{speaker.role}</p>
                </div>
              </div>
            );
          })}

          <Link
            to="/speakers"
            className={`group relative rounded-md bg-navy overflow-hidden flex flex-col items-center justify-center aspect-[3/4] transition-all duration-700 ease-out hover:scale-[1.02] cursor-pointer ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: isVisible ? `${300 + speakers.length * 100}ms` : '0ms' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-navy-foreground/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className="w-6 h-6 text-navy-foreground" />
              </div>
              <span className="font-sans text-sm font-semibold tracking-wide uppercase text-navy-foreground">
                View all speakers
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
