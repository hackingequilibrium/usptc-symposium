## Problem

The Agenda page (and the whole app) fails to load because `src/lib/speakerImages.ts` imports 5 speaker photos that don't exist on disk:

- `src/assets/speakers/scott-tilley.jpg`
- `src/assets/speakers/snehal-antani.jpg`
- `src/assets/speakers/paul-bryzek.jpg`
- `src/assets/speakers/marek-gzik.jpg`
- `src/assets/speakers/alojzy-nowak.jpg`

Only `hubert-adamczyk.jpg` made it to disk in the previous turn. The other 5 backgrounded `curl` commands ran from the wrong working directory and the files were lost.

Vite errors with: `Failed to resolve import "@/assets/speakers/scott-tilley.jpg"`.

## Fix

Re-download the 5 missing photos directly to `src/assets/speakers/` using absolute paths (no `cd` + `&` mix). The image URLs in the database storage bucket are confirmed reachable. No code changes needed — the imports and map entries in `speakerImages.ts` are already correct.

Once the files exist, the Agenda page will render again with the new avatars (Scott Tilley, Snehal Antani, Paul Bryzek, Marek Gzik, Alojzy Nowak, Hubert Adamczyk, plus the already-fixed Rafał Stroiński / Artur Chmielewski / Victor Kaberuka Shyaka name mappings).
