import { ArrowRight } from "lucide-react";
import slawoszImg from "@/assets/speakers/slawosz.jpg";
import honorataImg from "@/assets/speakers/honorata.jpg";
import dominikImg from "@/assets/speakers/dominik.png";
import annaImg from "@/assets/speakers/anna.jpg";
import michalImg from "@/assets/speakers/michal.png";
import jenniferImg from "@/assets/speakers/jennifer.jpg";
import alexanderImg from "@/assets/speakers/alexander.jpg";

const speakers = [
  {
    name: "Honorata Hencel",
    role: "Boeing",
    image: honorataImg,
  },
  {
    name: "Dominik Schmidt",
    role: "Translarity",
    image: dominikImg,
  },
  {
    name: "Sławosz Uznański-Wiśniewski",
    role: "European Space Agency (ESA)",
    image: slawoszImg,
  },
  {
    name: "Anna Mikulska",
    role: "CGCN",
    image: annaImg,
  },
  {
    name: "Michał Kurtyka",
    role: "Organization for Economic Cooperation and Development",
    image: michalImg,
  },
  {
    name: "Jennifer Granholm",
    role: "DGA Group",
    image: jenniferImg,
  },
  {
    name: "Alexander Bayen",
    role: "EECS at UC Berkeley",
    image: alexanderImg,
  },
];

export const SpeakersSection = () => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Featured Voices
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-6">
          Speakers
        </h2>
        <div className="w-16 h-px bg-foreground/20 mb-8" />
        <p className="font-sans text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-16">
          Leaders across science, policy, industry, and innovation shaping the
          future of aviation and space.
        </p>

        {/* Speaker grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakers.map((speaker) => {
            const initials = speaker.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div
                key={speaker.name}
                className="group relative rounded-md bg-secondary overflow-hidden transition-all hover:scale-[1.02]"
              >
                {/* Avatar */}
                <div className="aspect-[3/4] bg-gradient-to-br from-accent-blue/40 to-accent-pink/30 flex items-center justify-center">
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="font-serif text-4xl text-foreground/25 select-none">
                      {initials}
                    </span>
                  )}
                </div>

                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent p-6 pt-16">
                  <h3 className="font-sans text-base font-semibold text-navy-foreground leading-snug">
                    {speaker.name}
                  </h3>
                  <p className="font-sans text-sm text-navy-foreground/60 mt-1">
                    {speaker.role}
                  </p>
                </div>
              </div>
            );
          })}

          {/* View all speakers card */}
          <a
            href="#speakers"
            className="group relative rounded-md bg-navy overflow-hidden flex flex-col items-center justify-center aspect-[3/4] transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-navy-foreground/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className="w-6 h-6 text-navy-foreground" />
              </div>
              <span className="font-sans text-sm font-semibold tracking-wide uppercase text-navy-foreground">
                View all speakers
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
