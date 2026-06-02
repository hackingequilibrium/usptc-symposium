import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import usptcLogo from "@/assets/partners/usptc.png";
import polsvLogo from "@/assets/partners/polsv.png";
import taubeLogo from "@/assets/partners/taube.png";
import top500Logo from "@/assets/partners/top500.webp";
import embassyLogo from "@/assets/partners/embassy.webp";
import tripleRingLogo from "@/assets/partners/triple-ring.jpg";
import parpLogo from "@/assets/partners/parp.png";
import consulateLaLogo from "@/assets/partners/consulate-la.png";
import malopolskaLogo from "@/assets/partners/malopolska.png";
import adamedLogo from "@/assets/partners/adamed.png";
import poznanLogo from "@/assets/partners/poznan.jpg";
import katowiceLogo from "@/assets/partners/katowice.jpg";
import beataDrzazgaLogo from "@/assets/partners/beata-drzazga.webp";
import tritemLogo from "@/assets/partners/tritem.png";
import thisIsItLogo from "@/assets/partners/this-is-it.png";
import lotLogo from "@/assets/partners/lot.png";
import marcinKulasekLogo from "@/assets/partners/marcin-kulasek.png";
import paihLogo from "@/assets/partners/paih.png";
import sbsLogo from "@/assets/partners/sbs.jpeg";

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
  "Małopolska Region": malopolskaLogo,
  "Adamed": adamedLogo,
  "City of Poznan": poznanLogo,
  "City of Katowice": katowiceLogo,
  "Beata Drzazga Foundation": beataDrzazgaLogo,
  "Tritem": tritemLogo,
  "This is IT Maciej Kawecki": thisIsItLogo,
  "PLL LOT": lotLogo,
  "Marcin Kulasek – Minister of Science and Higher Education, Republic of Poland": marcinKulasekLogo,
  "Polish Investment and Trade Agency (PAIH)": paihLogo,
};

const CATEGORY_ORDER = ["Organizers", "Honorary Patrons", "Regional Strategic Partners", "Sponsors & Partners", "Media Partner", "Partnering Organizations"];

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  category: string;
  sort_order: number;
}

const PartnersWall = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    supabase
      .from("partners")
      .select("id,name,logo_url,category,sort_order")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setPartners((data ?? []) as Partner[]));
  }, []);

  const ordered = CATEGORY_ORDER.flatMap((cat) =>
    partners.filter((p) => p.category === cat).sort((a, b) => a.sort_order - b.sort_order)
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex items-center justify-center p-6">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 w-full max-h-full">
        {ordered.map((p) => {
          const logo = p.logo_url ?? fallbackLogos[p.name] ?? null;
          if (!logo) return null;
          const isMinistry = /minist|embassy|consulate|national centre for research|polish investment and trade|polish agency for enterprise|space research centre/i.test(p.name);
          const isSmall = p.name === "Fieldfisher" || p.name === "Tritem";
          const sizeClass = isMinistry
            ? "h-24 md:h-28"
            : isSmall
              ? "h-10 md:h-12"
              : "h-16 md:h-20";
          if (isMinistry) {
            return (
              <div key={p.id} className="flex items-center justify-center w-40 md:w-48 h-28 md:h-32">
                <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
              </div>
            );
          }
          return (
            <img
              key={p.id}
              src={logo}
              alt=""
              className={`${sizeClass} w-auto object-contain`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PartnersWall;
