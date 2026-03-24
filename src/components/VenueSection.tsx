export const VenueSection = () => {
  const venues = [
    { name: "Stanford University", detail: "Opening Keynote & Aviation Track" },
    { name: "UC Berkeley", detail: "Space Track & Panel Discussions" },
    { name: "UCSF", detail: "BioSpace Workshop & Closing Gala" },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="container max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Venues
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-16">
          Three world-class campuses
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue.name}
              className="border border-border rounded-sm p-6 sm:p-8 bg-card hover:bg-secondary/50 transition-colors"
            >
              <h3 className="text-lg sm:text-xl tracking-tight text-foreground mb-2">
                {venue.name}
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                {venue.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
