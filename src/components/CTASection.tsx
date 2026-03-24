import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="relative py-24 sm:py-32 noise-overlay overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, hsl(216 60% 93% / 0.4), transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, hsl(355 90% 94% / 0.3), transparent 60%), hsl(0 0% 100%)",
        }}
      />
      <div className="container max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-6">
          Shape the future of<br />transatlantic innovation
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Join leading researchers, founders, and policymakers at the intersection of US and Polish science & technology.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="px-10 py-6 rounded-sm">
            Register Now
          </Button>
          <Button variant="hero-outline" size="lg" className="px-10 py-6 rounded-sm">
            Become a Sponsor
          </Button>
        </div>
      </div>
    </section>
  );
};
