import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { ContactDialog } from "@/components/ContactDialog";

export const CTASection = () => {
  return (
    <section id="register" className="relative py-24 sm:py-32 overflow-hidden bg-navy">
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />
      <div className="container max-w-5xl mx-auto px-6 text-left relative z-10">
        {/* Eyebrow */}
        <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-navy-foreground/50 mb-6">
          Registration
        </p>

        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-navy-foreground mb-6 leading-[1.1]">
          Join the XXV US–Poland<br />Science & Technology Symposium
        </h2>

        {/* Value line */}
        <p className="text-navy-foreground/70 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Be part of a three-day experience across Stanford, UC Berkeley, and UCSF, connecting leaders in aviation, space, and advanced technologies.
        </p>

        {/* Primary CTA */}
        <div className="mb-3">
          <a href="https://eventify.com" target="_blank" rel="noopener noreferrer">
            <Button
              variant="hero"
              size="lg"
              className="px-12 py-7 rounded-sm bg-navy-foreground text-navy hover:bg-navy-foreground/90 text-sm"
            >
              Register Now
            </Button>
          </a>
        </div>
        <p className="text-navy-foreground/40 text-xs font-mono tracking-wide mb-10">
          Secure registration via Eventify
        </p>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 text-navy-foreground/60 text-sm mb-10">
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            June 1–3, 2026
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Stanford · UC Berkeley · UCSF
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Limited capacity
          </span>
        </div>

        {/* Secondary CTA */}
        <Button
          variant="hero-outline"
          size="lg"
          className="px-10 py-6 rounded-sm border-navy-foreground/20 text-navy-foreground hover:bg-navy-foreground/10"
        >
          Partner with Us
        </Button>
        <div className="mt-3">
          <ContactDialog>
            <button className="text-navy-foreground/50 hover:text-navy-foreground/80 text-xs font-mono tracking-wide underline underline-offset-4 transition-colors cursor-pointer">
              Interested in sponsoring? Contact us
            </button>
          </ContactDialog>
        </div>
      </div>
    </section>
  );
};
