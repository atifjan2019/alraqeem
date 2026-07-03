import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/Shared";
import JsonLd from "@/components/JsonLd";
import Reviews from "@/components/Reviews";
import FaqAccordion from "@/components/FaqAccordion";
import PackagesExplorer from "@/components/packages/PackagesExplorer";
import { getPackages } from "@/lib/packagesStore";
import { getSettings } from "@/lib/settingsStore";
import { reviewData } from "@/lib/reviews";
import { images, photo, realPhotos } from "@/lib/images";
import { mapsLink } from "@/lib/site";
import { waHref, telHref } from "@/lib/settings";
import { packagesHubGraph } from "@/lib/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Umrah, Hajj and Tour Packages from Pakistan | Al Raqeem",
  },
  description:
    "Umrah, Hajj and international tour packages from Pakistan, quoted on inquiry for your exact dates. Visa, flights, hotels and Ziyarat handled by our team.",
  alternates: { canonical: "/packages" },
  openGraph: { url: "/packages" },
};

const hubFaqs = [
  {
    q: "How does pricing work for your packages?",
    a: "Package pricing is quoted on inquiry because airfare and hotel rates update every week. Our team checks live fares for your exact travel dates and sends the current best price on WhatsApp, with no hidden charges and no stale published numbers. Message our desk with your dates and group size for a same day quote.",
  },
  {
    q: "What is included in a package?",
    a: "Each package covers the core of the journey: visa, flights, hotels, ground transport, and guided sightseeing or Ziyarat. Umrah packages add hotels near the Haram with Makkah and Madinah Ziyarat, while tour packages add city sightseeing and excursions. Our desk confirms every inclusion in writing before you pay.",
  },
  {
    q: "Which cities do flights depart from?",
    a: "Umrah and Hajj flights depart from Peshawar and Islamabad, whichever carries the better fare and schedule for your dates. Our team arranges onward ground transport, and travelers from nearby towns coordinate airport pickup when they book. For international tours, our desk confirms the departure airport with your quote.",
  },
  {
    q: "Do packages include visa and flights?",
    a: "Yes. Every package includes the relevant visa and return flights, prepared and booked by our team. Umrah packages include the Saudi e-visa, and tour packages include the visit visa for the destination. Our desk checks every document before filing, so your visa clears without avoidable delays.",
  },
  {
    q: "What room sharing options are available for Umrah?",
    a: "Room sharing for Umrah follows your group size and budget, and our team arranges the layout that fits. Tell our desk how many travelers share a room, and we quote hotels near the Haram to match. Exact sharing and hotel names are confirmed for your dates before you pay.",
  },
  {
    q: "Do you build custom packages for my group?",
    a: "Yes. Our team builds custom packages for families, offices, and community groups of any size, to any destination we serve. Share your travel dates, group size, and the experience you want, and our desk designs the itinerary, arranges documents, and sends one quote for the whole group.",
  },
  {
    q: "How do I get a quote and book?",
    a: "Booking starts with one WhatsApp message or a visit to the Charsadda office. Our team sends package options and a quote for your exact dates the same day. Once you choose, a deposit secures your seats and rooms, the balance settles before departure, and every amount stays confirmed in writing.",
  },
  {
    q: "How early should I book, especially for Ramadan Umrah?",
    a: "Book as early as your dates allow, since hotels near the Haram and airline seats fill months ahead. Ramadan Umrah fills first, and the last Ashra sells out earliest, so plan well before Ramadan 2026. For tours, three to six weeks gives comfortable time for visa processing and the best fares.",
  },
];

export default async function PackagesPage() {
  const packages = await getPackages();
  const settings = await getSettings();

  // Inquiry based section: strip any price before it reaches the client.
  const clientPackages = packages.map((p) => ({ ...p, price: null }));

  return (
    <>
      <JsonLd data={packagesHubGraph(packages)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <img
          src={photo(realPhotos.hero, images.kaaba)}
          alt="Umrah, Hajj and international travel packages from Pakistan"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 overlay-hero" />
        <div className="container-site relative py-20 sm:py-28">
          <p className="eyebrow text-brand-orange">Our packages</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
            Umrah, Hajj and Tour Packages from Pakistan
          </h1>
          <p className="mt-4 max-w-2xl font-display text-xl italic text-brand-orange sm:text-2xl">
            Curated journeys, one standard of care
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Every package is quoted on inquiry because rates update weekly with
            airfare and hotel availability, so you get the current best price for
            your exact dates with no hidden charges. Message our team on WhatsApp
            for a quote.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Al Raqeem arranges Umrah, Hajj, and international tour packages from
            Pakistan for 2026, across economy, premium, and five star tiers, from
            five to thirty day durations, departing from Peshawar, Islamabad, and
            beyond. Visa, flights, hotels, transport, and Ziyarat are handled end
            to end, so you compare journeys by what matters and leave the
            logistics to our desk.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref(
                settings.whatsapp,
                "Assalam o Alaikum, I want a quote for a package for my dates."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              Get a quote on WhatsApp
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

      {/* Explorer: filters + both groups */}
      <section className="py-16 sm:py-24">
        <div className="container-site">
          <PackagesExplorer
            packages={clientPackages}
            whatsapp={settings.whatsapp}
          />
        </div>
      </section>

      {/* Social proof (renders only when real reviews exist) */}
      <Reviews data={reviewData} />

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Questions and answers</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Package pricing, inclusions and booking
            </h2>
            <div className="gold-rule mx-auto mt-6" />
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Straight answers on how quotes work, what a package includes, and
              how to book from any city in Pakistan.
            </p>
          </div>
          <FaqAccordion items={hubFaqs} idBase="hub-faq" />
        </div>
      </section>

      <CtaBand
        title="Don't see your destination?"
        subtitle="We build custom packages for any destination and group size. Tell us where you want to go, and our desk sends a quote for your exact dates."
        officeHref={mapsLink()}
      />
    </>
  );
}
