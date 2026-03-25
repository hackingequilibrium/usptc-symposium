import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import usptcFlag from "@/assets/usptc-flag.png";
import slawoszImg from "@/assets/speakers/slawosz.jpg";
import honorataImg from "@/assets/speakers/honorata.jpg";
import dominikImg from "@/assets/speakers/dominik.png";
import annaImg from "@/assets/speakers/anna.jpg";
import michalImg from "@/assets/speakers/michal.png";
import jenniferImg from "@/assets/speakers/jennifer.jpg";
import alexanderImg from "@/assets/speakers/alexander.jpg";

const baseSpeakers = [
  { name: "Honorata Hencel", role: "Boeing", image: honorataImg, linkedin: "#" },
  { name: "Dominik Schmidt", role: "Translarity", image: dominikImg, linkedin: "#" },
  { name: "Sławosz Uznański-Wiśniewski", role: "European Space Agency (ESA)", image: slawoszImg, linkedin: "#" },
  { name: "Anna Mikulska", role: "CGCN", image: annaImg, linkedin: "#" },
  { name: "Michał Kurtyka", role: "OECD", image: michalImg, linkedin: "#" },
  { name: "Jennifer Granholm", role: "DGA Group", image: jenniferImg, linkedin: "#" },
  { name: "Alexander Bayen", role: "EECS at UC Berkeley", image: alexanderImg, linkedin: "#" },
];

// Repeat to get 30 speakers
const speakers = Array.from({ length: 30 }, (_, i) => ({
  ...baseSpeakers[i % baseSpeakers.length],
  id: i,
}));

const Speakers = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy py-20 sm:py-28">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy-foreground/60 hover:text-navy-foreground text-sm font-mono tracking-wide mb-8 transition-colors"
          >
            ← Back to home
          </Link>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-navy-foreground/50 mb-4">
            XXV US–Poland Science & Technology Symposium
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-navy-foreground mb-4">
            All Speakers
          </h1>
          <p className="text-navy-foreground/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Leaders across science, policy, industry, and innovation shaping the future of aviation and space.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="group relative rounded-md bg-secondary overflow-hidden"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-accent-blue/40 to-accent-pink/30 flex items-center justify-center">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Info overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent p-3 pt-10">
                <h3 className="font-sans text-xs sm:text-sm font-semibold text-navy-foreground leading-snug">
                  {speaker.name}
                </h3>
                <p className="font-sans text-[10px] sm:text-xs text-navy-foreground/60 mt-0.5">
                  {speaker.role}
                </p>
              </div>

              {/* LinkedIn icon */}
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 w-7 h-7 rounded-sm bg-navy-foreground/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-navy-foreground/20 z-10"
                aria-label={`${speaker.name} on LinkedIn`}
              >
                <Linkedin className="w-3.5 h-3.5 text-navy-foreground" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Speakers;
