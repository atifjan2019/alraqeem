# Al Raqeem — Work Log, Last 8 Prompts

Scope: the tours silo build-out. Every page below was built or fixed against
its spec, verified with a production build and a live SSR check, and committed
locally on `main`. Rules held throughout: inquiry pricing (no prices/schema
prices), no em/en dashes, no banned words, real data only (no invented hotels,
day plans, or reviews — those route to inquiry/gaps), captioned image slots,
canonical section order (reviews/trust above the FAQ), 10–15 FAQs, mobile first.

> **Push status:** all commits are **local on `main`, not pushed**. `git push origin main` fails with **403 (write access not granted)** for the active credential — a remote permissions issue, not a code issue. You need to push once that's sorted.

---

## 1. Malaysia Tour Page (solo) — spec QA
**Commit:** `302025a`
The page was already built; ran the spec's self-QA gate.
- **Gap found & fixed:** the spec wants a **dedicated "Muslim friendly Malaysia" passage** (not just the wedge in the overview). Added an optional `wedge` field to the tour-content type and a brand-accented passage after the overview — halal food everywhere in a Muslim-majority country, the National Mosque and Putra Mosque on the route, surau prayer rooms. It's optional so no other tour is affected.
- Verified: title (singular) / H1 (plural), e-visa official link, halal in grid + FAQ, 15 FAQs, section order.

## 2. Thailand Tour Page (solo) — spec QA
**Commit:** `1196791`
- **Gap 1:** overview didn't mention halal → added "Halal food is widely available in Bangkok…" (spec §4).
- **Gap 2:** visa FAQ was vague ("need entry") → sharpened to the **verified rule**: Pakistani passport holders **need a Thailand visa** (the short-stay exemption does not cover Pakistani passports), applied as the Thailand e-visa, "verify current rules" + official link (spec §12, "do not state an unverified rule").

## 3. Coverage Checklist + Singapore Tour Page (solo)
**Commit:** `c2662c7`
- Re-ran the per-page coverage checklist. The one surviving unticked query was **"how do I get around in [dest]"** — the newer data-driven tours had it, but **Dubai, Turkey, and Baku didn't**. Added a getting-around FAQ to each (Dubai Metro/taxis; Istanbul trams/ferries + the domestic Cappadocia leg; walkable Baku Old City + metro), all staying at 15 FAQs.
- **Singapore:** ran its spec gate — already compliant (visa-required stated, official ICA link, family/Sentosa overview, halal noted). No changes needed.

## 4. Malaysia + Thailand Combo — spec QA
**Commit:** `01e3bfe`
- **Title/H1** → "Malaysia and Thailand Tour Package" (via display-name override; H1 had been "Malaysia & Thailand Combo").
- **Country-marked itinerary** — each day now carries a Malaysia/Thailand badge (added a `country` field + badge render), plus the included inter-country flight named.
- **"Explore each country" silo block** — links down to the Malaysia + Thailand solos and sideways to the 3-country combo (wired for both combos).
- 301 from the old `/packages/malaysia-thailand-8-days` confirmed.

## 5. Malaysia + Thailand + Singapore Combo — spec QA
**Commit:** `66e4607`
- **Title** → "Malaysia Thailand Singapore Tour Package | Al Raqeem"; **H1** → "Malaysia, Thailand and Singapore Tour Package from Pakistan".
- **Country markers** on all 9 itinerary days (Thailand ×3, Malaysia ×2, Singapore ×4) + the two inter-country flights named.
- **Overview halal note** added; the 3 official visa links + explore-each-country block were already wired.

## 6. Tours Silo Master Blueprint (self-scoping)
**Commits:** `a9a6777`, `9329f67`, `b0672a0`
The blueprint's guardrail: build real pages only where data exists; the rest is roadmap. I built what existing data supported and asked you to scope the rest.
- **Muslim-friendly & halal tours facet** (`a9a6777`) — the wedge; a real collection page aggregating the 6 live destinations by halal angle, CollectionPage + BreadcrumbList + ItemList schema, wired into the pillar + sitemap.
- **4 more theme facets** (`9329f67`) — honeymoon, family, group, beach & adventure — built on a reusable `TourFacet` component + `tourFacets` data file (adding a facet is now a data entry).
- **Domestic infrastructure + Swat** (`b0672a0`) — made the tour template **domestic-aware** (Pakistan category → no visa section, "Transport included" value strip, domestic documents FAQ, PKR/by-road grid) and shipped the first KPK wedge page, `/tours/swat`.

## 7. Tours Pillar Hub (/tours) — spec QA
**Commit:** `76ca6e1`
- Filtered the explorer to **international destinations only**, and added a dedicated **Pakistan tours directory** that leads the **KPK/Charsadda wedge**, with captioned cards + descriptive anchors linking down to each live Pakistan page and a note naming the northern areas still to come.
- The international, Pakistan, and theme-facet directories now sit side by side as the pillar's down-linking heart; reviews/trust above the FAQ.

## 8. Complete Topical Map + Swat Domestic Template + KPK build-out
**Commits:** `52c47e0`, `0aec472`, `82e580e`
- **3 KPK-nearest pages** (`52c47e0`) — **Kumrat Valley**, **Kalash Valley**, **Chitral** on the domestic pattern (real itineraries, attractions, galleries, cost drivers, meta, schema).
- **Swat to full domestic spec** (`0aec472`) — renamed to own **"Swat Tour Packages from Pakistan"** (Kalam kept in the itinerary, gets its own page later), added the **local-expertise wedge passage**, and swapped all 4 KPK grids to a **mountain-suited** set (best season, altitude, road & jeep access, connectivity, packing, ATMs — dropping halal/currency framing since these are domestic).
- **GB-north batch** (`82e580e`) — **Hunza** (Karakoram Highway, Attabad Lake, Passu Cones, Khunjerab), **Skardu** (Shangrila, Deosai, Sheosar Lake, Shigar, Katpana), **Naran & Kaghan** (Saif ul Malook, Babusar Top, Lulusar, Siri Paye).

---

## Tours silo — current state

| Layer | Live pages |
|---|---|
| **Pillar** | `/tours` (international + Pakistan + facet directories) |
| **International** | Dubai, Turkey, Baku, Malaysia, Thailand, Singapore |
| **Combos** | Malaysia+Thailand, Malaysia+Thailand+Singapore |
| **Pakistan (KPK/GB wedge)** | Swat, Kumrat Valley, Kalash Valley, Chitral, Hunza, Skardu, Naran & Kaghan |
| **Theme facets** | Muslim-friendly, Honeymoon, Family, Group, Beach & adventure |

**Total this run:** 12 destination/combo pages verified-to-spec, 5 facet pages, the pillar upgraded, the domestic template built, and 7 Pakistan pages shipped.

## Roadmap (remaining, real-data-gated)
- **KPK/domestic:** Dir, Fairy Meadows, Gilgit, Neelum Valley, Muzaffarabad, Rawalakot, Murree-Galiyat. (Kalam, Malam Jabba, Saif-ul-Malook, Deosai, Khunjerab are covered as days within their parent pages.)
- **International second wave:** Maldives, Saudi leisure, Indonesia/Bali, Sri Lanka, Egypt, Morocco, Uzbekistan, Georgia, Qatar, Iran (pure data entries, no template work).
- **Europe + long tail; more facets** (sightseeing, culture, adventure, wildlife, nature, food, solo).

## Gaps (per the no-fabrication rule)
Real named hotels, exact day plans, real photos, real reviews, and accreditation are **not invented** — they route to inquiry / motif panels and the gaps report. Send real specifics per page and I'll fold them in.
