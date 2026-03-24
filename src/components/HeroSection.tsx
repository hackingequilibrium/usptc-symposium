import { Button } from "@/components/ui/button";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import usptcLogo from "@/assets/usptc-logo.png";

export const HeroSection = () => {
  return (
    <section className="relative isolate min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <AnimatedGradient />
      <div className="absolute inset-0 z-[1] noise-overlay pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <img src={usptcLogo} alt="US-Polish Trade Council" className="w-24 h-24 mx-auto mb-8 object-contain" />

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
        <div className="w-16 h-px bg-foreground/15 mx-auto mb-8" />

        {/* Value prop */}
        <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
          Where science meets commercialization across the US–Poland innovation ecosystem.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="px-10 py-6 rounded-sm">
            Register Now
          </Button>
          <Button variant="hero-outline" size="lg" className="px-10 py-6 rounded-sm">
            Apply / Partner / Sponsor
          </Button>
        </div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
};
