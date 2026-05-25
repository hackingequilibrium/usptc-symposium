import victoriaImg from "@/assets/speakers/victoria.png";
import slawoszImg from "@/assets/speakers/slawosz.jpg";
import honorataImg from "@/assets/speakers/honorata.jpg";
import dominikImg from "@/assets/speakers/dominik.png";
import annaImg from "@/assets/speakers/anna.jpg";
import michalImg from "@/assets/speakers/michal.png";
import jenniferImg from "@/assets/speakers/jennifer.jpg";
import alexanderImg from "@/assets/speakers/alexander.jpg";
import artImg from "@/assets/speakers/art.jpg";
import mikeImg from "@/assets/speakers/mike.jpg";
import maxImg from "@/assets/speakers/max.jpg";
import maciejImg from "@/assets/speakers/maciej.png";
import aleksandraImg from "@/assets/speakers/aleksandra.jpg";
import piotrImg from "@/assets/speakers/piotr.png";
import dariuszImg from "@/assets/speakers/dariusz.png";
import soodyImg from "@/assets/speakers/soody.png";
import tianImg from "@/assets/speakers/tian.jpg";
import mikeLyonsImg from "@/assets/speakers/mike-lyons.jpg";
import karolinaImg from "@/assets/speakers/karolina-okreglak-hoty.jpg";
import paulinaImg from "@/assets/speakers/paulina-zadura.jpg";
import andrzejImg from "@/assets/speakers/andrzej-banka.png";
import michalBankaImg from "@/assets/speakers/michal-banka.png";
import bartoszImg from "@/assets/speakers/bartosz-bliuj-stodulski.jpeg";
import agataImg from "@/assets/speakers/agata-braja.png";
import jordanImg from "@/assets/speakers/jordan-bramble.png";
import tadeuszImg from "@/assets/speakers/tadeusz-burczynski.png";

const map: Record<string, string> = {
  "Victoria Coleman": victoriaImg,
  "Honorata Hencel": honorataImg,
  "Dominik Schmidt": dominikImg,
  "Sławosz Uznański-Wiśniewski": slawoszImg,
  "Anna Mikulska": annaImg,
  "Michał Kurtyka": michalImg,
  "Jennifer Granholm": jenniferImg,
  "Alexandre Bayen": alexanderImg,
  "Art (Artur) Chmielewski": artImg,
  "Mike Lepech": mikeImg,
  "Max Salamonowicz": maxImg,
  "Maciej Kawecki": maciejImg,
  "Aleksandra Radlińska": aleksandraImg,
  "Piotr Moncarz": piotrImg,
  "Dariusz Rosati": dariuszImg,
  "Soody Tronson": soodyImg,
  "Tian Yi Zhang": tianImg,
  "Mike Lyons": mikeLyonsImg,
  "Karolina Okręglak-Hoty": karolinaImg,
  "Paulina Zadura": paulinaImg,
  "Andrzej Bańka": andrzejImg,
  "Michał Bańka": michalBankaImg,
  "Bartosz Bliuj-Stodulski": bartoszImg,
  "Agata Braja": agataImg,
  "Jordan Bramble": jordanImg,
  "Tadeusz Burczyński": tadeuszImg,
};

export const speakerFallbackImage = (name: string): string | null => map[name] ?? null;
