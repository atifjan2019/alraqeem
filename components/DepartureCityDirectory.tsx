import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { liveDepartureCities } from "@/lib/departureCities";
import { site } from "@/lib/site";

// City directory for the Umrah hub. Lists only live city pages, grouped by
// tier, with descriptive anchors and ItemList schema. Links down to each live
// city page. Every non built town is covered by the all cities line, no
// doorway pages. The hub links down, each city page links up.
export default function DepartureCityDirectory() {
  const tier1 = liveDepartureCities(1);
  const tier2 = liveDepartureCities(2);
  const all = [...tier1, ...tier2];

  const graph = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Umrah packages by departure city",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Umrah Packages from ${c.city}`,
      url: `${site.url}/umrah/${c.slug}`,
    })),
  };

  const columns = [
    { title: "Airport cities, direct Saudi flights", cities: tier1 },
    { title: "Khyber Pakhtunkhwa, our home region", cities: tier2 },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <JsonLd data={graph} />
        <p className="eyebrow">Umrah by departure city</p>
        <h2 className="mt-2 font-display text-2xl text-brand-blue-deep sm:text-3xl">
          Umrah packages from your city
        </h2>
        <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-slate-600">
          Each city page carries its own real departure, the airport and the
          routing, and our local service for that city, not the same body with a
          different name.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {columns.map((col) => (
            <div
              key={col.title}
              className="flex flex-col rounded-3xl border border-black/5 bg-paper p-6 shadow-card sm:p-8"
            >
              <h3 className="font-display text-lg text-brand-blue-deep">
                {col.title}
              </h3>
              <div className="gold-rule mt-3" />
              <ul className="mt-4 grid flex-1 grid-cols-1 gap-x-6 sm:grid-cols-2">
                {col.cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/umrah/${c.slug}`}
                      className="flex min-h-[44px] items-center gap-2 border-b border-black/5 text-sm font-medium text-brand-blue-deep transition hover:text-brand-orange-dark"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-orange-dark" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      Umrah from {c.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl bg-brand-blue/5 p-4 text-sm leading-relaxed text-slate-600">
          Not on the list? We serve travelers from all cities of Pakistan, with
          pickup from our Charsadda office and departures from the nearest
          airport. Message us for your city and dates, and our desk builds the
          plan around them.
        </p>
      </div>
    </section>
  );
}
