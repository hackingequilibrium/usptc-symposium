const leaders = [
  { name: "Piotr Moncarz", role: "USPTC General Chair" },
  { name: "Jerzy Orkiszewski", role: "USPTC Co-Chair" },
  { name: "Michał Bańka", role: "Warsaw University of Technology" },
];

export const LeadershipSection = () => {
  return (
    <section id="leadership" className="py-24 sm:py-32 bg-background">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-4">
          Leadership & Advisory
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-16 text-base sm:text-lg">
          The Symposium is guided by leaders across academia, industry, and public institutions, shaping long-term US–Poland collaboration in science and technology.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="rounded-md border border-border bg-card p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <span className="font-serif text-xl text-foreground">
                  {leader.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-serif text-lg text-foreground mb-1">{leader.name}</h3>
              <p className="font-mono text-xs tracking-wide uppercase text-muted-foreground">
                {leader.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
