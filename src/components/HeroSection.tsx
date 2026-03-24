import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import usptcLogo from "@/assets/usptc-logo.png";
import astronaut from "@/assets/astronaut.png";

export const HeroSection = () => {
  return (
    <section className="relative isolate min-h-screen flex items-center overflow-hidden bg-background">
      {/* Gradient shifted to the right half */}
      <div className="absolute top-0 right-0 bottom-0 w-[70%]" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)' }}>
        <AnimatedGradient />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex items-center">
        {/* Left: Text content */}
        <div className="w-full md:w-[70%] text-left">
          {/* Logo */}
          <img src={usptcLogo} alt="US-Polish Trade Council" className="w-24 h-24 mb-8 object-contain" />

          {/* Overline */}
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
            Stanford University · UC Berkeley · UCSF
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight text-foreground mb-6">
            US–Poland Science &<br />Technology Symposium
          </h1>

          {/* Subtitle */}
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground/80 italic mb-8">
            Opportunities in Aviation and Space
          </p>

          <p className="font-mono text-sm tracking-wide text-foreground/70 mb-8">
            June 1–3, 2026
          </p>

          {/* Hairline */}
          <div className="w-16 h-px bg-foreground/15 mb-8" />

          {/* Value prop */}
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed">
            Where science meets commercialization across the US–Poland innovation ecosystem.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button variant="hero" size="lg" className="px-10 py-6 rounded-sm">
              Register Now
            </Button>
            <Button variant="hero-outline" size="lg" className="px-10 py-6 rounded-sm">
              Partner with Us
            </Button>
          </div>
        </div>

        {/* Right: Astronaut on gradient */}
        <div className="hidden md:flex w-[30%] justify-center items-center relative">
          <img
            src={astronaut}
            alt="Astronaut floating in space"
            className="w-full max-w-md object-contain drop-shadow-2xl relative z-10 animate-float"
          />
        </div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
};
