import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { PartnersSection } from "@/components/PartnersSection";
import usptcFlag from "@/assets/usptc-flag.png";

interface Poster {
  title: string;
  authors: string[];
  institution: string;
}

const POSTERS: Poster[] = [
  {
    title:
      "Protection of Strategic Infrastructure and Foreign Real Estate Acquisition in the Context of Hybrid Threats — The Polish Legal and Security Perspective",
    authors: ["Aleksandra Siewert, PhD"],
    institution: "University College of Professional Education",
  },
  {
    title:
      "Generative AI and job satisfaction in the financial industry in Poland — does the type of work matter?",
    authors: ["Dominika Bosek-Rak, PhD"],
    institution: "SGH Warsaw School of Economics",
  },
  {
    title: "Medicine in Space",
    authors: ["Alicja Orkiszewski MD, PhD"],
    institution: "Private practice, Arizona, USA",
  },
  {
    title: "Cool stuff from space!",
    authors: ["Alicja Orkiszewski MD, PhD"],
    institution: "Private practice, Arizona, USA",
  },
  {
    title: "The history of VELCRO",
    authors: ["Alicja Orkiszewski MD, PhD"],
    institution: "Private practice, Arizona, USA",
  },
  {
    title: "How space medicine reshaped everyday healthcare",
    authors: ["Alicja Orkiszewski MD, PhD"],
    institution: "Private practice, Arizona, USA",
  },
  {
    title: "Interactive AI Worlds for Space Exploration",
    authors: ["Rylan Pozniak Daniels"],
    institution: "iRylan.com",
  },
  {
    title: "ESG Reporting and AI Governance. Strategic implications of Algorithmic Bias",
    authors: [
      "Prof. Mikołaj Pindelski",
      "Tarana Jafarova, MSc",
      "Maciej Moroz, MSc",
      "Prof. Joanna Żukowska",
    ],
    institution: "SGH Warsaw School of Economics",
  },
  {
    title: "Human Capital Competencies in the Critical Infrastructure Sector",
    authors: [
      "Prof. Joanna Żukowska",
      "Prof. Mikołaj Pindelski",
      "Anna Tryfon-Bojarska, PhD",
      "Estera Kot, PhD",
    ],
    institution: "SGH Warsaw School of Economics",
  },
  {
    title:
      "Poland–US Relations in the Area of LNG Supply: Trade Dynamics, the Role of Infrastructure, and Physical and Cyber Challenges",
    authors: ["Wiktoria Fabian", "Mariusz Ruszel", "Adam Szurlej"],
    institution:
      "Ignacy Łukasiewicz Institute for Energy Policy; Rzeszow University of Technology, Faculty of Management; AGH University of Kraków, Faculty of Energy and Fuels, Faculty of Drilling, Oil and Gas",
  },
  {
    title: "Digital Twin Technologies in Medical Applications",
    authors: ["Prof. Maciej Malawski"],
    institution: "Sano Centre for Computational Medicine, Kraków, Poland",
  },
  {
    title: "Małopolska. Where space meets talents.",
    authors: ["Małopolska Region"],
    institution: "",
  },
  {
    title: "Immersive VR/XR Training for Safety-Critical Technical Operations",
    authors: ["Mikołaj Maik", "Krzysztof Walczak"],
    institution: "Poznań University of Economics and Business",
  },
  {
    title: "Context-Aware Maintenance in Intelligent Manufacturing Systems",
    authors: ["Anna Timofiejczuk"],
    institution: "Silesian University of Technology",
  },
  {
    title:
      "Urban Digital Twins as Decision-Support Systems for Scenario-Based Urban Planning",
    authors: ["Anna Timofiejczuk", "Anna Lessaer-Kentzer", "Jacek Chmielewski"],
    institution:
      "Silesian University of Technology; Kraków University of Technology",
  },
  {
    title: "TOP 1000 Innovators of Poland",
    authors: [
      "Agata Braja",
      "Jacek Chmielewski",
      "Patrick Consorti",
      "Hamid Farzaneh",
      "Mary Forrest",
      "Kamila Krawiec",
      "Piotr Moncarz",
      "Jan Murlewski",
      "Anna Timofiejczuk",
    ],
    institution:
      "Poland in Silicon Valley Center for Science, Innovations, and Entrepreneurship",
  },
  {
    title: "Effectiveness of international innovation programs for technology transfer",
    authors: ["Kamila Krawiec", "Anna Timofiejczuk", "Jacek Chmielewski"],
    institution:
      "Poland in Silicon Valley Center for Science, Innovations, and Entrepreneurship",
  },
  {
    title:
      "University–industry collaboration models in international innovation programs",
    authors: ["Anna Timofiejczuk", "Jacek Chmielewski", "Kamila Krawiec"],
    institution:
      "Poland in Silicon Valley Center for Science, Innovations, and Entrepreneurship",
  },
  {
    title:
      "From exposure to implementation: barriers in technology transfer after international programs",
    authors: [
      "Kamila Krawiec",
      "Soody Tronson",
      "Anna Timofiejczuk",
      "Jacek Chmielewski",
    ],
    institution:
      "Poland in Silicon Valley Center for Science, Innovations, and Entrepreneurship",
  },
];

const PosterCard = ({ poster, index }: { poster: Poster; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: visible ? `${Math.min(index * 40, 400)}ms` : "0ms" }}
    >
      <div className="flex gap-5 py-6 border-b border-border">
        <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0 w-8 pt-1">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug text-balance">
            {poster.title}
          </h3>
          <p className="mt-2 text-sm text-foreground/80">
            {poster.authors.join(", ")}
          </p>
          {poster.institution && (
            <p className="mt-1 text-sm italic text-muted-foreground">
              {poster.institution}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Posters = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            Posters
          </h1>
          <p className="text-navy-foreground/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            The full set of posters presented across all poster sessions. Browse the titles, authors, and institutions below.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div>
          {POSTERS.map((poster, i) => (
            <PosterCard key={i} poster={poster} index={i} />
          ))}
        </div>
      </div>

      <PartnersSection />
      <Footer />
    </div>
  );
};

export default Posters;
