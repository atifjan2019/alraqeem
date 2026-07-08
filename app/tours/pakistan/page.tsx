import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/Shared";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import FaqAccordion from "@/components/FaqAccordion";
import LastUpdated from "@/components/LastUpdated";
import SearchInquiryWidget from "@/components/SearchInquiryWidget";
import CaptionedImage from "@/components/packages/CaptionedImage";
import { getPackages } from "@/lib/packagesStore";
import { getSettings } from "@/lib/settingsStore";
import { reviewData } from "@/lib/reviews";
import { site, mapsLink } from "@/lib/site";
import { waHref, telHref } from "@/lib/settings";
import { packageHref, packageDisplayName, type TravelPackage } from "@/lib/packages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Pakistan Tour Packages | Al Raqeem" },
  description:
    "Pakistan tour packages from our Charsadda base. Swat, Kumrat, Kalash, Chitral, Naran, Hunza, and Skardu, the northern areas run with local KPK expertise. Quoted on inquiry.",
  keywords: [
    "Pakistan tour packages",
    "northern areas tour packages",
    "KPK tour packages",
    "Gilgit Baltistan tour packages",
    "Kashmir tour packages",
    "Pakistan tour from Islamabad",
  ],
  alternates: { canonical: "/tours/pakistan" },
  openGraph: { url: "/tours/pakistan" },
};

// Region grouping. Live slugs render as cards from the real packages; the coming
// list is named so nothing reads as a broken link, and each ships when the real
// itinerary exists.
const REGIONS: {
  name: string;
  note: string;
  liveSlugs: string[];
  coming: string[];
}[] = [
  {
    name: "Khyber Pakhtunkhwa",
    note: "Nearest our Charsadda base, the valleys we know best and run with real local expertise.",
    liveSlugs: ["swat", "kumrat-valley", "kalash-valley", "chitral", "naran-kaghan"],
    coming: ["Kalam", "Malam Jabba", "Shogran", "Dir", "Mushkpuri Top"],
  },
  {
    name: "Gilgit Baltistan",
    note: "The Karakoram and the high north, Hunza and Skardu and the peaks beyond.",
    liveSlugs: ["hunza", "skardu"],
    coming: ["Fairy Meadows", "Gilgit"],
  },
  {
    name: "Azad Kashmir",
    note: "The Neelum valley, alpine lakes, and Muzaffarabad in the green hills.",
    liveSlugs: [],
    coming: ["Kashmir", "Neelum Valley", "Arang Kel", "Ratti Gali", "Rawalakot", "Muzaffarabad"],
  },
  {
    name: "Punjab hills and cities",
    note: "Murree and the Galiyat, and the heritage of Lahore.",
    liveSlugs: [],
    coming: ["Murree", "Lahore"],
  },
  {
    name: "Balochistan",
    note: "Quetta and the juniper forest and Quaid residency of Ziarat.",
    liveSlugs: [],
    coming: ["Quetta", "Ziarat"],
  },
  {
    name: "The coast",
    note: "The beaches of Gwadar and Ormara on the Makran coast.",
    liveSlugs: [],
    coming: ["Gwadar", "Ormara"],
  },
  {
    name: "Sindh",
    note: "The hill station of Gorakh Hills above the Kirthar range.",
    liveSlugs: [],
    coming: ["Gorakh Hills"],
  },
];

const faqs = [
  {
    q: "How much is a Pakistan northern areas tour?",
    a: "Pakistan tours are quoted on inquiry, since hotel rates and the jeep costs move by season and destination. Our desk reads the current rates for your dates and valley and sends the best price on WhatsApp, with no hidden charges and no stale published number. Message us with your dates and group size for a same day quote.",
  },
  {
    q: "Which northern areas do you cover?",
    a: "Our live trips cover Swat, Kumrat, Kalash, Chitral, and Naran in Khyber Pakhtunkhwa, and Hunza and Skardu in Gilgit Baltistan, with more of the north, Kashmir, and beyond on the way. From our Charsadda base the KPK valleys are closest, so we run them with real local knowledge.",
  },
  {
    q: "What is the best time for a Pakistan tour?",
    a: "Most northern trips run May to September, when the valleys are green and the high passes and lakes are open. Malam Jabba and the ski slopes suit winter, and the Kalash festivals fall in spring. Share your travel window and our desk plans the right region for the season.",
  },
  {
    q: "How do we reach the northern areas, and is transport included?",
    a: "Yes, transport is included. Our team drives you from Peshawar or Islamabad by road, with local jeeps for the off road sections like Mahodand, Saif ul Malook, and Deosai. Travelers near our Charsadda base start closest of all, with airport pickup coordinated when you book.",
  },
  {
    q: "Are Pakistan tours good for families?",
    a: "Yes. Our northern trips suit families, with cool weather, gentle sightseeing, and a pace our team sets for children and elders. We arrange family rooms, a driver who knows the roads, and rest stops, and shape the days and the region around your group.",
  },
  {
    q: "Why book a Pakistan tour with Al Raqeem?",
    a: "From our office in Charsadda the northern areas are on our doorstep, so we run them with proximity and local knowledge a Lahore or Karachi operator cannot match. Our drivers know the roads and the seasons, and our team has arranged northern trips for families across Khyber Pakhtunkhwa for years.",
  },
  {
    q: "Do you run private or group tours?",
    a: "Both. Join a group departure for the friendliest price and a set itinerary, or ask our desk for a private family tour with your own vehicle and pace. Tell us your group size and how you prefer to travel, and we quote the option that fits your dates.",
  },
  {
    q: "Do you customize a northern areas circuit?",
    a: "Yes. Our desk pairs valleys into a circuit, Swat with Kumrat, or a KPK to Gilgit Baltistan loop, and builds the days around your group. Share how many travelers, your dates, and where you want to go, and we send a plan and a quote for the route.",
  },
  {
    q: "Is halal food and prayer easy on a Pakistan tour?",
    a: "Yes, everywhere. The trips are within Pakistan, so all food is halal and mosques are on every route, with local valley dishes and trout along the way. Our team plans meals, prayer, and rest stops so the group travels comfortably through the days.",
  },
  {
    q: "How do I get a quote for a Pakistan tour?",
    a: "Message our desk on WhatsApp with your destination, dates, and group size, or visit our Charsadda office. We send options and a quote for your exact dates the same day, a deposit secures your rooms and jeeps, and the balance settles before departure, every amount confirmed in writing.",
  },
];

export default async function PakistanToursPage() {
  const packages = await getPackages();
  const settings = await getSettings();
  const bySlug = new Map<string, TravelPackage>(
    packages
      .filter((p) => p.category === "Pakistan")
      .map((p) => [p.slug, { ...p, price: null }])
  );

  const liveList = REGIONS.flatMap((r) =>
    r.liveSlugs.map((s) => bySlug.get(s)).filter((p): p is TravelPackage => Boolean(p))
  );

  const quoteHref = waHref(
    settings.whatsapp,
    "Assalam o Alaikum, I want a quote for a Pakistan northern areas tour for my dates."
  );

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/tours/pakistan`,
        url: `${site.url}/tours/pakistan`,
        name: "Pakistan Tour Packages",
        isPartOf: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Tours", item: `${site.url}/tours` },
          { "@type": "ListItem", position: 3, name: "Pakistan", item: `${site.url}/tours/pakistan` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Pakistan tour destinations",
        itemListElement: liveList.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: packageDisplayName(p),
          url: `${site.url}${packageHref(p)}`,
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />

      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="container-site py-16 sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-300"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/tours" className="hover:text-white">
              Tours
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Pakistan</span>
          </nav>
          <LastUpdated tone="dark" className="mt-3" />
          <h1 className="mt-4 max-w-3xl text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
            Pakistan Tour Packages
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {site.name} runs Pakistan's northern areas from our office in
            Charsadda, so the valleys of Khyber Pakhtunkhwa are on our doorstep
            and we arrange them with local drivers, real proximity, and years of
            northern trips behind us. Swat, Kumrat, Kalash, Chitral, Naran,
            Hunza, and Skardu, with transport, hotels, and guided sightseeing in
            one booking from Peshawar and Islamabad, quoted on inquiry.
          </p>
          <div className="mt-8 max-w-4xl">
            <SearchInquiryWidget whatsapp={settings.whatsapp} />
          </div>
        </div>
      </section>

      {/* Regional directory */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-site space-y-14">
          {REGIONS.map((region) => {
            const live = region.liveSlugs
              .map((s) => bySlug.get(s))
              .filter((p): p is TravelPackage => Boolean(p));
            return (
              <div key={region.name}>
                <h2 className="font-display text-2xl text-brand-blue-deep sm:text-3xl">
                  {region.name}
                </h2>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">
                  {region.note}
                </p>
                {live.length > 0 && (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {live.map((p) => (
                      <Link
                        key={p.slug}
                        href={packageHref(p)}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                      >
                        <CaptionedImage
                          caption={`${p.title} in ${region.name}`}
                          icon="pin"
                          aspect="aspect-[16/9]"
                        />
                        <div className="flex flex-1 flex-col pt-3">
                          <h3 className="font-display text-lg text-brand-blue-deep">
                            {p.title}
                          </h3>
                          <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">
                            {p.description}
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-dark group-hover:text-brand-orange">
                            {p.title} package
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {region.coming.length > 0 && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    <span className="font-semibold text-slate-600">Coming soon: </span>
                    {region.coming.join(", ")}. Message our desk for a trip to any
                    of them while the page is built.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Why book, the local wedge */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-paper p-7 shadow-card sm:p-8">
            <p className="eyebrow">Why book with our desk</p>
            <h2 className="mt-2 font-display text-2xl text-brand-blue-deep">
              A KPK based agency, next door to the north
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              From our head office at Aman Plaza, Mardan Road, Charsadda, the
              northern areas of Khyber Pakhtunkhwa are a short drive, so our team
              runs Swat, Kumrat, Kalash, Chitral, and Naran with the proximity and
              local knowledge a Lahore or Karachi operator cannot match. Our
              drivers know the roads, the jeep tracks, and the seasons, and our
              desk has arranged northern trips for families across the province
              for years, the sister company of Al Nafi Travels, with WhatsApp
              support from your first inquiry to your safe return.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews, staging placeholders until real reviews are connected */}
      <Reviews data={reviewData} />

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Questions and answers</p>
          <h2 className="mt-2 font-display text-2xl text-brand-blue-deep sm:text-3xl">
            Pakistan tours, answered
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Planning a trip up north?"
        subtitle="Tell our desk the valley, your dates, and your group, and we quote the trip with the transport, hotels, and jeeps arranged from our Charsadda base."
        officeHref={mapsLink()}
      />
    </>
  );
}
