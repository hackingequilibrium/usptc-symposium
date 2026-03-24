import stanfordImg from "@/assets/venues/stanford.jpg";
import berkeleyImg from "@/assets/venues/berkeley.jpg";
import ucsfImg from "@/assets/venues/ucsf.jpg";

const venues = [
  {
    name: "Stanford University",
    tracks: "Opening Keynote · Aviation & Entrepreneurship",
    description:
      "Where research meets commercialization at the heart of Silicon Valley",
    image: stanfordImg,
  },
  {
    name: "UC Berkeley",
    tracks: "Space · Engineering · Advanced Systems",
    description:
      "Deep technical exploration across space technologies and infrastructure",
    image: berkeleyImg,
  },
  {
    name: "UCSF",
    tracks: "BioSpace · Frontier Applications · Closing Gala",
    description:
      "Where space meets life sciences, health, and future human systems",
    image: ucsfImg,
  },
];

export const VenueSection = () => {
  return (
    <section className="py-24 sm:py-32 border-t border-border">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Venues
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-6">
          A Three-Campus Experience
        </h2>
        <div className="w-16 h-px bg-foreground/20 mb-16" />

        <div className="grid md:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue.name}
              className="group rounded-md overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground mb-2">
                  {venue.name}
                </h3>
                <p className="font-mono text-xs tracking-wide text-accent-blue mb-3">
                  {venue.tracks}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {venue.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
