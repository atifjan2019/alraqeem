import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import CaptionedImage from "@/components/packages/CaptionedImage";
import { liveSeasonalUmrah } from "@/lib/seasonalUmrah";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

// Seasonal Umrah on the hub, the Islamic calendar pages. Cards link down to
// each live season, with ItemList schema. Ramadan leads as the anchor.
export default function SeasonalUmrahStrip() {
  const seasons = liveSeasonalUmrah();
  if (seasons.length === 0) return null;

  const graph = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Seasonal Umrah packages by Islamic month",
    itemListElement: seasons.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${s.season} Umrah Packages from Pakistan`,
      url: `${site.url}/umrah/${s.slug}`,
    })),
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <JsonLd data={graph} />
        <p className="eyebrow">Umrah by season</p>
        <h2 className="mt-2 font-display text-2xl text-brand-blue-deep sm:text-3xl">
          Umrah in the Islamic months
        </h2>
        <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-slate-600">
          Each season carries its own significance and its own planning, from the
          peak of Ramadan to the calm of Rajab. Our desk arranges the dates around
          the moon sighting and the demand for the month.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {seasons.map((s) => (
            <Link
              key={s.slug}
              href={`/umrah/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-card transition hover:shadow-lift"
            >
              <CaptionedImage
                src={s.heroImage === "madinah" ? images.madinah : images.kaaba}
                caption={s.heroCaption}
                icon="moon"
                aspect="aspect-[16/10]"
              />
              <h3 className="mt-3 font-display text-lg text-brand-blue-deep group-hover:text-brand-orange-dark">
                {s.season} Umrah
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {s.gregorianWindow}, {s.hijriYear}.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-dark">
                See {s.season} Umrah
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
