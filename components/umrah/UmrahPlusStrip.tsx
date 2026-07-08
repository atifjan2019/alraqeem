import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import CaptionedImage from "@/components/packages/CaptionedImage";
import { liveUmrahPlus, comboHeroImage } from "@/lib/umrahPlus";
import { site } from "@/lib/site";

// Umrah Plus combos on the hub, the bridge to the tours silo. Cards link down
// to each live combo page, with ItemList schema. Only you run both Umrah and
// these destinations, so this bridge is uniquely yours.
export default function UmrahPlusStrip() {
  const combos = liveUmrahPlus();
  if (combos.length === 0) return null;

  const graph = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Umrah Plus combined packages",
    itemListElement: combos.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Umrah Plus ${c.destination} Packages from Pakistan`,
      url: `${site.url}/umrah/${c.slug}`,
    })),
  };

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="container-site">
        <JsonLd data={graph} />
        <p className="eyebrow">Umrah Plus</p>
        <h2 className="mt-2 font-display text-2xl text-brand-blue-deep sm:text-3xl">
          Umrah with a destination, one booking
        </h2>
        <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-slate-600">
          Perform the Umrah first, then add a heritage and leisure extension on
          the same trip. We run both the pilgrimage and these destinations, so
          the whole journey sits in one booking.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((c) => (
            <Link
              key={c.slug}
              href={`/umrah/${c.slug}`}
              className="group flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-card transition hover:shadow-lift"
            >
              <CaptionedImage
                src={comboHeroImage[c.slug]}
                caption={c.heroCaption}
                icon="moon"
                aspect="aspect-[16/10]"
              />
              <h3 className="mt-3 font-display text-lg text-brand-blue-deep group-hover:text-brand-orange-dark">
                Umrah Plus {c.destination}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {c.umrahMakkahNights + c.umrahMadinahNights} nights of Umrah, then {c.destinationNights} in {c.destination}, {c.region}.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-dark">
                See the combo
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
