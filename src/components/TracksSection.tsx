export const TracksSection = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Symposium Tracks
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-16">
          Two pillars of innovation
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Aviation */}
          <div className="group relative rounded-sm border border-border bg-accent-pink/30 p-8 sm:p-10 transition-colors hover:bg-accent-pink/50 noise-overlay overflow-hidden">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Track 01
            </span>
            <h3 className="text-2xl sm:text-3xl tracking-tight text-foreground mt-3 mb-4">
              Aviation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced propulsion, autonomous flight systems, sustainable aviation fuels, and next-generation airframe design bridging Polish aerospace engineering with US commercialization.
            </p>
          </div>

          {/* Space */}
          <div className="group relative rounded-sm border border-border bg-accent-blue/30 p-8 sm:p-10 transition-colors hover:bg-accent-blue/50 noise-overlay overflow-hidden">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Track 02
            </span>
            <h3 className="text-2xl sm:text-3xl tracking-tight text-foreground mt-3 mb-4">
              Space
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Satellite technologies, Earth observation, space biotech, and orbital manufacturing — connecting Poland's growing space sector with Silicon Valley's venture ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
