import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/Shared";
import JsonLd from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import LastUpdated from "@/components/LastUpdated";
import Icon from "@/components/packages/DetailIcons";
import { getSettings } from "@/lib/settingsStore";
import { site, mapsLink } from "@/lib/site";
import { waHref, telHref } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Muslim Friendly Tour Packages from Pakistan | Al Raqeem" },
  description:
    "Muslim friendly and halal tour packages from Pakistan. Malaysia, Turkey, Baku, and Dubai in Muslim majority countries, plus halal on our Thailand and Singapore tours.",
  keywords: [
    "Muslim friendly tour packages from Pakistan",
    "halal tour packages from Pakistan",
    "halal holidays from Pakistan",
    "Muslim family tour packages",
    "halal friendly destinations",
  ],
  alternates: { canonical: "/tours/muslim-friendly-tours" },
  openGraph: { url: "/tours/muslim-friendly-tours" },
};

// The destinations we have built, ordered by how Muslim friendly they are, the
// four Muslim majority countries first, then the two where halal sits in the
// tourist areas. Every note is real, drawn from each destination page.
const destinations = [
  {
    name: "Malaysia",
    href: "/tours/malaysia",
    tag: "Muslim majority country",
    note: "Halal food is everywhere and mosques like the National Mosque and the Putra Mosque sit on the route, the easiest first trip abroad for a Muslim family.",
  },
  {
    name: "Turkey",
    href: "/tours/turkey",
    tag: "Muslim majority country",
    note: "A land of grand mosques, from Hagia Sophia to the Blue Mosque, with halal food across Istanbul and Cappadocia and prayer easy throughout.",
  },
  {
    name: "Baku, Azerbaijan",
    href: "/tours/baku",
    tag: "Muslim majority country",
    note: "Halal food is widely available, and mosques like the Bibi Heybat and the Taza Pir sit a short drive from the Old City on the Land of Fire.",
  },
  {
    name: "Dubai",
    href: "/tours/dubai",
    tag: "Muslim country",
    note: "Halal food is everywhere, prayer rooms sit in every mall, and the call to prayer marks the day, comfortable for a family from Pakistan.",
  },
  {
    name: "Thailand",
    href: "/tours/thailand",
    tag: "Halal in tourist areas",
    note: "Halal restaurants sit in the tourist areas of Bangkok and near the city mosques, and our desk plans meals and stops so a Muslim traveler stays comfortable.",
  },
  {
    name: "Singapore",
    href: "/tours/singapore",
    tag: "Halal certified outlets",
    note: "Halal certified food is available across the city, with a cluster in the Kampong Glam and Arab Street area around the Sultan Mosque.",
  },
];

const faqs = [
  {
    q: "Which of your tours are the most Muslim friendly?",
    a: "Malaysia, Turkey, Baku, and Dubai sit in Muslim countries where halal food is everywhere and mosques are on every route, the most comfortable for a Muslim family. Thailand and Singapore add halal in the tourist areas, so our desk plans the meals and prayer stops around your days.",
  },
  {
    q: "Is halal food available on these tours?",
    a: "Yes. In Malaysia, Turkey, Baku, and Dubai halal food is everywhere, and in Thailand and Singapore halal restaurants sit in the tourist areas and near the city mosques. Our desk plans your meals and stops so a Muslim traveler from Pakistan eats comfortably throughout the trip.",
  },
  {
    q: "Do the tours make time for prayer?",
    a: "Yes. Our desk builds the sightseeing around prayer times, and the itineraries pass mosques and prayer rooms, from the National Mosque in Kuala Lumpur to the malls of Dubai and the Sultan Mosque in Singapore. Tell us any needs and we shape the days around them.",
  },
  {
    q: "Are these tours suitable for a Muslim family?",
    a: "Yes. From our office in Charsadda we plan trips the way a family from Pakistan wants them, halal meals, easy prayer, a steady pace, and connected rooms. Malaysia is the gentlest first trip abroad, and our desk shapes any destination around your family.",
  },
  {
    q: "Do you arrange a comfortable pace for families and elders?",
    a: "Yes. Our desk sets a steady pace with connected rooms, short transfers, and rest between the sightseeing, and adjusts the days for younger children and elders. Share your group and any needs, and we shape the trip and the hotels around them.",
  },
  {
    q: "Which destination is best for a first Muslim friendly trip abroad?",
    a: "Malaysia is the gentlest first trip, a Muslim majority country with halal food everywhere, a simple e visa, short flights, and a walkable Kuala Lumpur. Turkey and Baku follow closely. Tell our desk your dates and group and we advise the best fit.",
  },
  {
    q: "Do you combine two Muslim friendly countries in one trip?",
    a: "Yes. Our desk pairs destinations like Malaysia with Thailand, or builds a wider route, in one booking with the visas and flights handled together. Tell us which countries you want, and we quote the combined trip for your dates and group.",
  },
  {
    q: "How do I get a quote for a Muslim friendly tour?",
    a: "Message our desk on WhatsApp with your destination, dates, and group size, and we send the current best price with the halal and prayer arrangements confirmed. Rates update weekly with airfare and hotel availability, and we quote the best price for your dates with no hidden charges.",
  },
];

export default async function MuslimFriendlyToursPage() {
  const settings = await getSettings();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/tours/muslim-friendly-tours`,
        url: `${site.url}/tours/muslim-friendly-tours`,
        name: "Muslim Friendly and Halal Tour Packages from Pakistan",
        isPartOf: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Tours", item: `${site.url}/tours` },
          {
            "@type": "ListItem",
            position: 3,
            name: "Muslim Friendly Tours",
            item: `${site.url}/tours/muslim-friendly-tours`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Muslim friendly tour destinations",
        itemListElement: destinations.map((d, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: d.name,
          url: `${site.url}${d.href}`,
        })),
      },
    ],
  };

  const quoteHref = waHref(
    settings.whatsapp,
    "Assalam o Alaikum, I want a quote for a Muslim friendly, halal tour for my dates."
  );

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
            <span className="text-white">Muslim Friendly Tours</span>
          </nav>
          <LastUpdated tone="dark" className="mt-3" />
          <h1 className="mt-4 max-w-3xl text-3xl font-medium leading-tight text-white sm:text-4xl">
            Muslim Friendly and Halal Tour Packages from Pakistan
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {site.name} plans travel the way a Muslim family from Pakistan wants
            it, halal food, easy prayer, and a comfortable pace. Malaysia,
            Turkey, Baku, and Dubai sit in Muslim countries where halal is
            everywhere and mosques are on every route, and our Thailand and
            Singapore tours add halal in the tourist areas. From our office in
            Charsadda, our desk shapes each trip around your family, quoted on
            inquiry for your dates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={quoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              Get a Muslim friendly tour quote
            </a>
            <a
              href={telHref(settings.phone)}
              className="btn border border-white/40 text-white hover:bg-white/10"
            >
              Call {settings.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-site">
          <p className="eyebrow">Where we take Muslim travelers</p>
          <h2 className="mt-2 font-display text-2xl text-brand-blue-deep sm:text-3xl">
            Halal friendly destinations we serve
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                  <Icon name="meal" size={13} />
                  {d.tag}
                </span>
                <h3 className="mt-3 font-display text-xl text-brand-blue-deep">
                  {d.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {d.note}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange-dark group-hover:text-brand-orange">
                  See the {d.name} tour
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Questions and answers</p>
          <h2 className="mt-2 font-display text-2xl text-brand-blue-deep sm:text-3xl">
            Muslim friendly travel, answered
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Planning a halal friendly trip?"
        subtitle="Tell our desk your destination, dates, and group, and we quote the trip with the halal meals and prayer stops arranged for your family."
        officeHref={mapsLink()}
      />
    </>
  );
}
