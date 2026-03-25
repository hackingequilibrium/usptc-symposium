import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import linkedinIcon from "@/assets/linkedin-icon.svg";
import { Footer } from "@/components/Footer";
import usptcFlag from "@/assets/usptc-flag.png";
import piotrImg from "@/assets/leaders/piotr-moncarz.png";
import jerzyImg from "@/assets/leaders/jerzy-orkiszewski.png";
import michalBImg from "@/assets/leaders/michal-banka.png";
import jacekImg from "@/assets/leaders/jacek-chmielewski.png";
import patrickImg from "@/assets/leaders/patrick-consorti.png";
import magdalenaHImg from "@/assets/leaders/magdalena-hryb.jpg";
import kamilaImg from "@/assets/leaders/kamila-krawic.png";

const baseLeaders = [
  { name: "Piotr Moncarz", role: "USPTC General Chair", image: piotrImg, linkedin: "https://www.linkedin.com/in/piotr-d-moncarz-ph-d-p-e-nae-8989a41/" },
  { name: "Jerzy Orkiszewski", role: "USPTC Co-Chair", image: jerzyImg, linkedin: "https://www.linkedin.com/in/jerzy-orkiszewski-b062b68/" },
  { name: "Michał Bańka", role: "Warsaw University of Technology", image: michalBImg, linkedin: "https://www.linkedin.com/in/michalbanka/" },
  { name: "Jacek Chmielewski", role: "PolSV, Auburn University, Cracow University of Technology", image: jacekImg, linkedin: "#" },
  { name: "Patrick Consorti", role: "PolSV", image: patrickImg, linkedin: "https://www.linkedin.com/in/patrickconsorti/" },
  { name: "Magdalena Hryb", role: "Poznan University of Technology", image: magdalenaHImg, linkedin: "https://www.linkedin.com/in/magdalena-hryb-33b70155/" },
  { name: "Kamila Krawic", role: "PolSV", image: kamilaImg, linkedin: "" },
  { name: "Agnieszka Lewandowska", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Paweł Jankowski", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Ewa Mazur", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Marek Kamiński", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Joanna Wójcik", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Krzysztof Szymański", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Barbara Dąbrowska", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Adam Olszewski", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Monika Krawczyk", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Jan Pawlak", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Dorota Sikora", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Piotr Grabowski", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Anna Zawadzka", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Łukasz Baran", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Magdalena Kubiak", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Stanisław Górski", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Zofia Michalska", role: "Advisory Board", image: "", linkedin: "#" },
  { name: "Rafał Chmielewski", role: "Advisory Board", image: "", linkedin: "#" },
];

const leaders = baseLeaders.map((leader, i) => ({ ...leader, id: i }));

const LeaderCard = ({ leader, index }: { leader: (typeof leaders)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const colIndex = index % 5;
  const initials = leader.name.split(" ").map((n) => n[0]).join("");

  return (
    <div
      ref={ref}
      className={`group relative rounded-md bg-secondary overflow-hidden transition-all duration-700 ease-out hover:scale-[1.02] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: isVisible ? `${colIndex * 80}ms` : "0ms" }}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-accent-blue/40 to-accent-pink/30 flex items-center justify-center">
        {leader.image ? (
          <img
            src={leader.image}
            alt={leader.name}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <span className="font-serif text-3xl text-foreground/25 select-none">
            {initials}
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent p-3 pb-4 pt-10">
        <h3 className="font-sans text-xs sm:text-sm font-semibold text-navy-foreground leading-snug pr-9">
          {leader.name}
        </h3>
        <p className="font-sans text-[10px] sm:text-xs text-navy-foreground/60 mt-0.5 pr-9">
          {leader.role}
        </p>
      </div>

      {leader.linkedin && (
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-sm flex items-center justify-center transition-opacity hover:brightness-110 z-10"
          aria-label={`${leader.name} on LinkedIn`}
        >
          <img src={linkedinIcon} alt="LinkedIn" className="w-7 h-7" />
        </a>
      )}
    </div>
  );
};

const Leadership = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-navy py-20 sm:py-28">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy-foreground/60 hover:text-navy-foreground text-sm font-mono tracking-wide mb-8 transition-colors"
          >
            ← Back to home
          </Link>
          <img src={usptcFlag} alt="USPTC" className="w-28 h-28 object-contain mb-6" />
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-navy-foreground/50 mb-4">
            XXV US–Poland Science & Technology Symposium
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-navy-foreground mb-4">
            Leadership & Advisory
          </h1>
          <p className="text-navy-foreground/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            The Symposium is guided by leaders across academia, industry, and public institutions, shaping long-term US–Poland collaboration in science and technology.
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {leaders.map((leader, index) => (
            <LeaderCard key={leader.id} leader={leader} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leadership;
