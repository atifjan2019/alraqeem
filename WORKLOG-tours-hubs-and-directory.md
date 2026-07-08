# Al Raqeem — Work Log, Tours Hubs & Directory

Continues from `WORKLOG-last-8-prompts.md`. Covers the four prompts after that
log: the two sub hubs, the reusable directory block, and the facet card images.
Every change was verified with a production build and a live SSR check, and
committed locally on `main`. Rules held: inquiry pricing (no prices/schema
prices), no em/en dashes, no banned words, real data only (no invented hotels,
day plans, photos, or reviews — those route to inquiry/gaps), captioned image
slots (motif panels where no real photo), no dead links, mobile first.

> **Push status:** all commits are **local on `main`, not pushed**. `git push origin main` fails with **403 (write access not granted)** for the active credential — a remote permissions issue, not a code issue. Push once that is sorted.

---

## 1. International Tours Sub Hub — /tours/international-tours
**Commit:** `67975bd`
Built the international sub hub, one tier below the `/tours` pillar, owning the head term **international tour packages from Pakistan** and down linking to every live international destination and combo.
- Hero with the Tours search widget, an entity classifying intro (agency → destinations → Peshawar/Islamabad → Muslim friendly angle).
- **Destination directory:** 8 captioned cards (6 destinations + 2 combos) with **descriptive anchors** ("Dubai Tour Package from Pakistan", not "view") and **ItemList schema**, no prices.
- **Deep coverage prose** absorbing the vertical cluster (why book, real pickup cities, luxury tier, cost drivers) with **sideways links** to the honeymoon, family, and Muslim friendly facets and **down links** to both combos.
- EEAT why-book block, Reviews (placeholder), 12 FAQs, CTA. Reviews/trust above the FAQ.
- Linked the pillar **down** to the sub hub.
- Held: a direct child → sub hub back link (needs a breadcrumb level change on every international page) — offered, not yet applied.

## 2. Pakistan Tours Sub Hub — /tours/pakistan
**Commit:** `e2b0888`
Built the Pakistan sub hub, owning **Pakistan tour packages**, as a regional directory grouped exactly as the queue specifies.
- Regions: **KPK, Gilgit Baltistan, Azad Kashmir, Punjab, Balochistan, the coast, Sindh.**
- **7 live pages** render as captioned cards with descriptive anchors + ItemList schema; **roadmap destinations are plain text** ("Coming soon: …") so **nothing is a dead link**.
- Hero + widget + the local KPK wedge, an EEAT why-book block, Reviews, 10 Pakistan vertical FAQs, CTA.
- Linked the pillar's Pakistan directory **down** to the sub hub (replaced the stale "coming" note, which listed now-live valleys, with the sub hub link and the actually-remaining areas).
- **Template sub type awareness:** the practical grid is already a per-page data array (so a coastal/city/Balochistan page just supplies its own labels — no enum needed); generalized the one hardcoded domestic bit, the hero subhead now reads "run from our Charsadda base" instead of "across the northern areas," so it fits Lahore, Gwadar, and Quetta too.

## 3. Two Column Destination Directory (reusable block)
**Commit:** `5c07483`
Built one reusable, data driven directory block used on the homepage and the pillar.
- **`lib/destinations.ts`** — one data file, each entry `{ name, slug, category, live }`. Live entries (8 international, 7 Pakistan) match real pages; roadmap entries carry `live: false` so the queue is in one place but the block omits them.
- **`components/DestinationDirectory.tsx`** — two warm panel cards, **International Tour Packages** and **Tour Packages in Pakistan**, each listing its live destinations as descriptive name links in two inner columns, with **ItemList schema** per card. No mixing between columns, no dead links.
- Placed on the homepage ("Our tour destinations") and the pillar ("Every destination we serve"). Mobile: cards stack, inner columns collapse, 44 px targets.
- **Growth:** when a roadmap page ships, flip its entry to `live: true` and it appears in the block, the sub hub, and the schema — one edit.

## 4. Facet Card Images and International Explore More
**Commit:** `d281f7e`
Two changes on the pillar and the directory.
- **Facet card images:** each of the 5 theme facet cards ("Tours shaped around how you travel") now carries a **captioned motif panel** — the Putra Mosque (Muslim friendly), Cappadocia balloons (honeymoon), Universal Studios on Sentosa (family), a guided group tour (group), the Phi Phi Islands (beach and adventure). Each caption is the alt and feeds ImageObject; real photos logged to gaps.
- **Explore all buttons:** the destination directory's "View more" links became clear buttons with the exact anchors, **Explore all international destinations** → `/tours/international-tours` and **Explore all Pakistan destinations** → `/tours/pakistan`, on both the homepage and the pillar.

---

## Tours silo — current state

| Layer | Live pages |
|---|---|
| **Pillar** | `/tours` |
| **Sub hubs** | `/tours/international-tours`, `/tours/pakistan` |
| **International** | Dubai, Turkey, Baku, Malaysia, Thailand, Singapore |
| **Combos** | Malaysia+Thailand, Malaysia+Thailand+Singapore |
| **Pakistan (KPK/GB wedge)** | Swat, Kumrat Valley, Kalash Valley, Chitral, Naran & Kaghan, Hunza, Skardu |
| **Theme facets** | Muslim friendly, Honeymoon, Family, Group, Beach & adventure |
| **Reusable block** | Two column destination directory (homepage + pillar) |

## Roadmap (real data gated, in `lib/destinations.ts` and the sub hub directories)
- **KPK/domestic:** Kalam, Malam Jabba, Shogran, Dir, Mushkpuri, Fairy Meadows, Gilgit, Kashmir, Neelum Valley, Arang Kel, Ratti Gali, Rawalakot, Muzaffarabad, Murree, Lahore, Quetta, Ziarat, Gwadar, Ormara, Gorakh Hills.
- **International second wave:** Maldives, Saudi leisure, Indonesia, Sri Lanka, Egypt, Morocco, Uzbekistan, Georgia, Qatar, Iran.
- Each ships when its real itinerary exists; flip `live: true` and add the page data.

## Gaps (per the no-fabrication rule)
Real named hotels, exact day plans, real photos (hero, cards, facet images), real reviews, accreditation, and the years-in-operation figure are **not invented** — motif panels / inquiry / gaps report. Send real specifics per page and they fold in.
