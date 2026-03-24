import { Rocket, Bot, Shield, Scale } from "lucide-react";

const pillars = [
  {
    icon: Rocket,
    title: "Space Economy Expansion",
    description:
      "Satellite systems, launch innovation, and commercialization redefining global infrastructure",
  },
  {
    icon: Bot,
    title: "AI & Autonomous Systems",
    description:
      "AI-driven aviation, space operations, and next-gen decision systems",
  },
  {
    icon: Shield,
    title: "Security & Resilience",
    description:
      "Cybersecurity, dual-use technologies, and strategic infrastructure",
  },
  {
    icon: Scale,
    title: "Policy, Law & Governance",
    description:
      "Space regulation, international cooperation, and long-term implications",
  },
];

export const WhySection = () => {
  return (
    <section className="bg-navy text-navy-foreground py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-navy-foreground/50 mb-4">
          Focus Areas
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mb-6">
          Why Aviation & Space, Why Now
        </h2>
        <div className="w-16 h-px bg-navy-foreground/20 mb-8" />
        <p className="font-sans text-lg sm:text-xl text-navy-foreground/75 max-w-2xl leading-relaxed mb-16">
          Aviation and space are entering a new phase of rapid commercialization,
          driven by AI, advanced materials, and global competition. This
          symposium brings together the actors shaping what comes next.
        </p>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-md border border-navy-foreground/10 bg-navy-foreground/[0.04] p-8 transition-colors hover:bg-navy-foreground/[0.08]"
            >
              <pillar.icon
                className="w-8 h-8 text-accent-pink mb-5 transition-transform group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h3 className="font-sans text-lg font-medium mb-3 text-navy-foreground">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-navy-foreground/60 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
