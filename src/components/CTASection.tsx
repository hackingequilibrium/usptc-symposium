import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { ContactDialog } from "@/components/ContactDialog";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import symposiumPoster from "@/assets/symposium-poster.jpg";

export const CTASection = () => {
  return (
    <section id="register" className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="absolute top-0 right-0 bottom-0 w-[70%]" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)' }}>
        <AnimatedGradient />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
      </div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — text content */}
          <div className="flex-1">
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-muted-foreground mb-6">
              Registration
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-6 leading-[1.1]">
              Join the XXV US–Poland<br />Science & Technology Symposium
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
              Be part of a three-day experience across Stanford, UC Berkeley, and UCSF, connecting leaders in aviation, space, and advanced technologies.
            </p>

            <div className="mb-3">
              <a href="https://eventify.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="hero"
                  size="lg"
                  className="px-12 py-7 rounded-sm bg-navy text-navy-foreground hover:bg-navy/90 text-sm"
                >
                  Register Now
                </Button>
              </a>
            </div>
            <p className="text-muted-foreground/60 text-xs font-mono tracking-wide mb-10">
              Secure registration via Eventify
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 text-muted-foreground text-sm mb-10">
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

            <Button
              variant="hero-outline"
              size="lg"
              className="px-10 py-6 rounded-sm border-2 border-foreground/40 text-foreground hover:bg-foreground/10"
            >
              Partner with Us
            </Button>
            <div className="mt-3">
              <ContactDialog>
                <button className="text-muted-foreground hover:text-foreground text-xs font-mono tracking-wide underline underline-offset-4 transition-colors cursor-pointer">
                  Interested in sponsoring? Contact us
                </button>
              </ContactDialog>
            </div>
          </div>

          {/* Right — poster */}
          <div className="hidden lg:block w-72 xl:w-80 shrink-0">
            <img
              src={symposiumPoster}
              alt="XXV US-Poland Science and Technology Symposium poster"
              className="w-full rounded-md shadow-[0_10px_40px_-10px_hsl(var(--foreground)/0.15)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
