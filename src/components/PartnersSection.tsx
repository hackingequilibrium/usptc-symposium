import usptcLogo from "@/assets/partners/usptc.png";
import polsvLogo from "@/assets/partners/polsv.png";
import taubeLogo from "@/assets/partners/taube.png";
import top500Logo from "@/assets/partners/top500.webp";
import embassyLogo from "@/assets/partners/embassy.png";
import tripleRingLogo from "@/assets/partners/triple-ring.jpg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const partnerCategories = [
  {
    label: "Organizers",
    partners: [
      { name: "US-Polish Trade Council", logo: usptcLogo, url: "https://usptc.org/" },
      { name: "Poland in Silicon Valley Center for Science, Innovation, and Entrepreneurship", logo: polsvLogo, url: "https://polsv.org/" },
      { name: "Taube Philanthropies", logo: taubeLogo, url: "https://taubephilanthropies.org/" },
    ],
  },
  {
    label: "Strategic Partners",
    partners: [
      { name: "Top 500 Innovators Program Alumni", logo: top500Logo },
    ],
  },
  {
    label: "Honorary Patrons",
    partners: [
      { name: "Embassy of the Republic of Poland in Washington, D.C.", logo: embassyLogo },
    ],
  },
];

export const PartnersSection = () => {
  return (
    <section id="partners" className="py-24 sm:py-32 bg-background">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-16">
          Partners
        </h2>

        <TooltipProvider delayDuration={200}>
          <div className="space-y-12">
            {partnerCategories.map((category) => (
              <div key={category.label}>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-navy mb-4">
                  {category.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {category.partners.map((partner) => {
                    const content = partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-20 object-contain"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-foreground text-center tracking-tight">
                        {partner.name}
                      </span>
                    );

                    const cardClass = "flex items-center justify-center rounded-md border border-border bg-white p-4 min-h-[100px] hover:shadow-md transition-shadow";

                    const card = 'url' in partner && partner.url ? (
                      <a
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardClass}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={partner.name} className={cardClass}>
                        {content}
                      </div>
                    );

                    return (
                      <Tooltip key={partner.name}>
                        <TooltipTrigger asChild>
                          {card}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{partner.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};