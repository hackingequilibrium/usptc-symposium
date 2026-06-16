import { speakerFallbackImage } from "./speakerImages";

// Canonical name list — also accepts simple variants by normalization.
const KNOWN_NAMES: string[] = [
  "Victoria Coleman","Honorata Hencel","Dominik Schmidt","Sławosz Uznański-Wiśniewski",
  "Anna Mikulska","Michał Kurtyka","Jennifer Granholm","Alexandre Bayen","Mike Lepech",
  "Max Salamonowicz","Maciej Kawecki","Aleksandra Radlińska","Piotr Moncarz","Dariusz Rosati",
  "Soody Tronson","Tian Yi Zhang","Mike Lyons","Karolina Okręglak-Hoty","Paulina Zadura",
  "Andrzej Bańka","Michał Bańka","Bartosz Bliuj-Stodulski","Agata Braja","Jordan Bramble",
  "Tadeusz Burczyński","Mark Chandler","Jacek Chmielewski","Camille Crittenden",
  "Agnieszka Czechowicz","Andrzej Domański","Krzysztof Dyczkowski","Piotr Dziurdzia",
  "Hamid Farzaneh","Mary Forrest","Krzysztof Gawkowski","Piotr Goliński","Shana Penn",
  "Christina Harvey","Arkadiusz Hruszowiec","Magdalena Hryb","Robert Hryniewicz",
  "Adam Januszko","Joanna Jaworek-Korjakowska","Barry Katz","Bogdan Klich","Zhaodan Kong",
  "Damian Kordos","Michal Kosinski","Rafał Kunaszyk","Adam Leszkiewicz","David Loftus",
  "Alex Luebke","Maciej Malawski","Paul Marca","Sunil Maulik","Ryan McGuiness",
  "Krzysztof Mendrok","Mark Mueller","Tomasz Nowakowski","Jerzy Orkiszewski",
  "Zbigniew Paszenda","Jasenka Rakas","Stephen K. Robinson","Lynn Rothschild",
  "Tomasz Rogalski","Ricardo Sanfelice","Aenor Sawyer","Natasha Scanes","Raja Sengupta",
  "Jeremy Sewell","Victor Kaberuke Shyaka","Paweł Skruch","Marina Sirota",
  "Dagmara Stasiowska","Rafał Stroiński","Tomasz Szczepański","Anna Timofiejczuk",
  "Mariusz Tomaka","Claire Tomlin","Leah Walker","Marek Warzecha","Mark Webber",
  "Janet Wojcicki","Lydia Zablotska","Michal Wyrebkowski","Tomasz Zawistowski",
  "Zbysław Ziemacki","Artur Chmielewski","Wojciech Wojakowski","Snehal Antani",
  "Paul Bryzek","Alojzy Nowak","Marek Gzik","Hubert Adamczyk","Scott Tilley",
  "Sanjeev Khagram","William Devenish","Julie Shapiro","Dione Rossiter","Christopher C. Miller",
  "Amanda Saravia-Butler","Andrzej Nowak","Andrzej Czulak","Tony Ricco","John Townsend",
  "Joe Finberg",
];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[łŁ]/g, m => m === "ł" ? "l" : "L")
    .toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();

// Map normalized name → canonical name
const canonical: Record<string, string> = {};
for (const n of KNOWN_NAMES) canonical[norm(n)] = n;

// Manual aliases for variants seen in agenda text
const ALIASES: Record<string, string> = {
  "rafal stroinski (fieldfisher)": "Rafał Stroiński",
  "rafal stroinski": "Rafał Stroiński",
  "piotr d moncarz": "Piotr Moncarz",
  "art (artur) chmielewski": "Artur Chmielewski",
  "art chmielewski": "Artur Chmielewski",
};
for (const [k, v] of Object.entries(ALIASES)) canonical[norm(k)] = v;

export interface AgendaSpeaker {
  name: string;
  img: string | null;
}

export function extractSpeakers(text: string | null | undefined): AgendaSpeaker[] {
  if (!text) return [];
  // Strip parenthetical affiliations and "Moderator:" labels
  const cleaned = text
    .replace(/\\n/g, "\n")
    .replace(/\([^)]*\)/g, " ")
    .replace(/Moderator\s*:/gi, " ")
    .replace(/\(confirmed\)/gi, " ");
  // Split on common separators
  const chunks = cleaned.split(/[,\n;]|(?:\s&\s)|(?:\sand\s)/i);
  const seen = new Set<string>();
  const out: AgendaSpeaker[] = [];
  for (const raw of chunks) {
    const piece = raw.replace(/\s+/g, " ").trim();
    if (!piece) continue;
    // Try the full piece, then progressively trim trailing tokens (handles
    // trailing org/affiliation text without parens, e.g. "Marina Sirota UC San Francisco")
    const tokens = piece.split(" ");
    let matched: string | null = null;
    for (let take = tokens.length; take >= 2; take--) {
      const candidate = tokens.slice(0, take).join(" ");
      const c = canonical[norm(candidate)];
      if (c) { matched = c; break; }
    }
    // Try last-N tokens too (handles "Moderator: Rafał Stroiński" residue)
    if (!matched) {
      for (let start = 0; start <= tokens.length - 2; start++) {
        for (let end = start + 2; end <= tokens.length; end++) {
          const candidate = tokens.slice(start, end).join(" ");
          const c = canonical[norm(candidate)];
          if (c) { matched = c; break; }
        }
        if (matched) break;
      }
    }
    if (matched && !seen.has(matched)) {
      seen.add(matched);
      out.push({ name: matched, img: speakerFallbackImage(matched) });
    }
  }
  const surname = (full: string) => {
    const parts = full.trim().split(/\s+/);
    return norm(parts[parts.length - 1] || full);
  };
  out.sort((a, b) => surname(a.name).localeCompare(surname(b.name)));
  return out;
}
