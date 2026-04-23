import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import linkedinIcon from "@/assets/linkedin-icon.svg";
import { Footer } from "@/components/Footer";
import usptcFlag from "@/assets/usptc-flag.png";
import { supabase } from "@/integrations/supabase/client";
import { speakerFallbackImage } from "@/lib/speakerImages";

interface Speaker {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  linkedin: string | null;
  virtual: boolean;
  sort_order: number;
}

const SpeakerCard = ({ speaker, index }: { speaker: Speaker; index: number }) => {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const colIndex = index % 6;
  const img = speaker.image_url ?? speakerFallbackImage(speaker.name);
  const initials = speaker.name.split(" ").map((n) => n[0]).join("");

  return (
    <div
      ref={ref}
      className={`group relative rounded-md bg-secondary overflow-hidden transition-all duration-700 ease-out hover:scale-[1.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: isVisible ? `${colIndex * 80}ms` : "0ms" }}
    >
      {speaker.virtual && (
        <span className="absolute top-2 right-2 z-10 bg-accent-blue/90 text-navy text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm backdrop-blur-sm">
          Virtual
        </span>
      )}
      <div className="aspect-[3/4] bg-gradient-to-br from-accent-blue/40 to-accent-pink/30 flex items-center justify-center">
        {img ? (
          <img src={img} alt={speaker.name} loading="lazy" className="w-full h-full object-cover object-top" />
        ) : (
          <span className="font-serif text-4xl text-foreground/25 select-none">{initials}</span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent p-3 pb-4 pt-10">
        <h3 className="font-sans text-xs sm:text-sm font-semibold text-navy-foreground leading-snug pr-9">{speaker.name}</h3>
        <p className="font-sans text-[10px] sm:text-xs text-navy-foreground/60 mt-0.5 pr-9">{speaker.role}</p>
      </div>

      {speaker.linkedin && (
        <a
          href={speaker.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-sm flex items-center justify-center transition-opacity hover:brightness-110 z-10"
          aria-label={`${speaker.name} on LinkedIn`}
        >
          <img src={linkedinIcon} alt="LinkedIn" className="w-7 h-7" />
        </a>
      )}
    </div>
  );
};

const Speakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase
      .from("speakers")
      .select("id,name,role,image_url,linkedin,virtual,sort_order")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setSpeakers((data ?? []) as Speaker[]));
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
            All Speakers
          </h1>
          <p className="text-navy-foreground/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Leaders across science, policy, industry, and innovation shaping the future of aviation and space.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Speakers;
