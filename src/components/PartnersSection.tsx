import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import usptcLogo from "@/assets/partners/usptc.png";
import polsvLogo from "@/assets/partners/polsv.png";
import taubeLogo from "@/assets/partners/taube.png";
import top500Logo from "@/assets/partners/top500.webp";
import embassyLogo from "@/assets/partners/embassy.webp";
import tripleRingLogo from "@/assets/partners/triple-ring.jpg";
import parpLogo from "@/assets/partners/parp.png";
import consulateLaLogo from "@/assets/partners/consulate-la.png";

const fallbackLogos: Record<string, string> = {
  "Polsko Amerykańska Rada Współpracy": usptcLogo,
  "US-Polish Trade Council": usptcLogo,
  "Poland in Silicon Valley Center for Science, Innovation, and Entrepreneurship": polsvLogo,
  "Taube Philanthropies": taubeLogo,
  "Top 500 Innovators Program Alumni": top500Logo,
  "Triple Ring Technologies": tripleRingLogo,
  "Polish Agency for Enterprise Development": parpLogo,
  "Embassy of the Republic of Poland in Washington, D.C.": embassyLogo,
  "Consulate General of the Republic of Poland in Los Angeles": consulateLaLogo,
};

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  url: string | null;
  category: string;
  sort_order: number;
}

const CATEGORY_ORDER = ["Organizers", "Strategic Partners", "Honorary Patrons"];

export const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    supabase
      .from("partners")
      .select("id,name,logo_url,url,category,sort_order")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setPartners((data ?? []) as Partner[]));
  }, []);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    label: cat,
    partners: partners.filter((p) => p.category === cat).sort((a, b) => a.sort_order - b.sort_order),
  })).filter((g) => g.partners.length > 0);

  return (
    <section id="partners" className="py-24 sm:py-32 bg-background">
      <div className="container max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-16">
          Partners
        </h2>

        <TooltipProvider delayDuration={200}>
          <div className="space-y-12">
            {grouped.map((category) => (
              <div key={category.label}>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-navy mb-4">
                  {category.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {category.partners.map((partner) => {
                    const isHonoraryPatrons = category.label === "Honorary Patrons";
                    const logo = partner.logo_url ?? fallbackLogos[partner.name] ?? null;
                    const content = (
                      <div className="flex flex-col items-center justify-between h-full gap-2 w-full">
                        <div className={`flex-1 flex items-center justify-center w-full ${isHonoraryPatrons ? "min-h-40" : "min-h-20"}`}>
                          {logo ? (
                            <img
                              src={logo}
                              alt={partner.name}
                              className={`object-contain ${isHonoraryPatrons ? "max-h-40" : "max-h-20"}`}
                            />
                          ) : null}
                        </div>
                        <span className="text-xs font-medium text-foreground/70 text-center leading-tight">
                          {partner.name}
                        </span>
                      </div>
                    );

                    const cardClass = `flex items-stretch justify-center rounded-md border border-border bg-white p-4 ${isHonoraryPatrons ? "min-h-[200px]" : "min-h-[100px]"} hover:shadow-md transition-shadow`;

                    const card = partner.url ? (
                      <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                        {content}
                      </a>
                    ) : (
                      <div key={partner.name} className={cardClass}>{content}</div>
                    );

                    return (
                      <Tooltip key={partner.id}>
                        <TooltipTrigger asChild>{card}</TooltipTrigger>
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
