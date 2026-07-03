import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PackageInquiryCard from "@/components/packages/PackageInquiryCard";
import { CtaBand } from "@/components/Shared";
import JsonLd from "@/components/JsonLd";
import HomeFaq from "@/components/HomeFaq";
import Reviews from "@/components/Reviews";
import { getFeatured } from "@/lib/packagesStore";
import { getPosts } from "@/lib/postsStore";
import { getSettings } from "@/lib/settingsStore";
import { cities } from "@/lib/cities";
import { images, photo, realPhotos } from "@/lib/images";
import { reviewData } from "@/lib/reviews";
import { site, mapsLink } from "@/lib/site";
import { waHref, telHref } from "@/lib/settings";
import { homepageGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "Umrah and Hajj Travel Agency in Pakistan | Al Raqeem",
  },
  description:
    "A full-service Umrah, Hajj and international travel agency in Pakistan, based in Charsadda, serving all Pakistan with visa, flights, hotels and support.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Umrah and Hajj Travel Agency in Pakistan | Al Raqeem",
    description:
      "A full-service Umrah, Hajj and international travel agency in Pakistan, based in Charsadda and serving all Pakistan end to end.",
  },
};

const services = [
  {
    title: "Umrah and Hajj Packages",
    text: "Our Umrah packages run from economy to five star across 7 to 30 day durations, with quad and triple sharing and hotels near the Haram in Makkah and Madinah. Every program covers the Saudi Umrah e-visa, guided Ziyarat, and ground transport. For Hajj, choose our private route alongside the government scheme registered through MORA and Nusuk.",
    image: images.kaaba,
    links: [
      { label: "View Umrah packages", href: "/packages" },
      { label: "Hajj packages and MORA", href: "/packages/hajj-package" },
    ],
  },
  {
    title: "International Tour Packages",
    text: "Our international tours reach Dubai with the Burj Khalifa and Desert Safari, Turkey with Istanbul and Cappadocia, Baku with the Old City and Flame Towers, and a Malaysia and Thailand combo through Kuala Lumpur and Bangkok. Visa, flights, hotels, and sightseeing arrive in one booking.",
    image: images.dubai,
    links: [
      { label: "Dubai city tour", href: "/packages/dubai-5-days" },
      { label: "Turkey tour", href: "/packages/turkey-7-days" },
    ],
  },
  {
    title: "Visit Visa Services",
    text: "Our desk prepares visit visas for the UAE, Saudi Arabia, Turkey, Malaysia, Thailand, Azerbaijan, Schengen states, and the United Kingdom. Every document is checked before filing, since most refusals come from small file errors rather than ineligibility.",
    image: images.visa,
    links: [
      { label: "Visa services", href: "/visa-services" },
      { label: "UAE visa guide", href: "/blog/dubai-visit-visa-requirements-pakistan" },
    ],
  },
];

const reasons = [
  {
    title: "A name you visit in person",
    text: "Our head office is in Charsadda. You sit with real people across a desk, not a faceless call center.",
  },
  {
    title: "Honest pricing, clear quotes",
    text: "Every cost is explained in your quote before you pay. No hidden charges appear later, ever.",
  },
  {
    title: "Experience behind us",
    text: `Our team works as the sister company of ${site.sisterCompany}, built on years of serving pilgrims and travelers.`,
  },
  {
    title: "With you till you return",
    text: "Our WhatsApp support stays active throughout your trip, from departure lounge to safe arrival home.",
  },
];

const steps = [
  {
    step: "01",
    title: "Tell us your plan",
    text: "Message us on WhatsApp or visit the office with your destination and dates.",
  },
  {
    step: "02",
    title: "Get a clear quote",
    text: "We send package options with full pricing the same day. You choose what fits.",
  },
  {
    step: "03",
    title: "We handle everything",
    text: "Visa, tickets, hotels and transport are arranged while you simply prepare to travel.",
  },
  {
    step: "04",
    title: "Travel with support",
    text: "Fly out with documents in hand and our team one WhatsApp message away.",
  },
];

// Topical bridge: descriptive anchors from the root into the topical tree.
// Every href resolves to an existing page. Missing targets go to the gaps report.
const bridge = [
  {
    heading: "Umrah and Hajj packages",
    links: [
      { label: "Economy Umrah, 15 days", href: "/packages/economy-umrah-15-days" },
      { label: "Premium Umrah, 21 days", href: "/packages/premium-umrah-21-days" },
      { label: "Ramadan Umrah Special", href: "/packages/ramadan-umrah-special" },
      { label: "Hajj packages and MORA guidance", href: "/packages/hajj-package" },
    ],
  },
  {
    heading: "Umrah from your city",
    links: [
      { label: "Umrah from Peshawar", href: "/areas/peshawar" },
      { label: "Umrah from Islamabad", href: "/areas/islamabad" },
      { label: "Umrah from Charsadda", href: "/areas/charsadda" },
      { label: "Umrah from Rawalpindi", href: "/areas/rawalpindi" },
      { label: "Umrah from Lahore", href: "/areas/lahore" },
    ],
  },
  {
    heading: "International tours",
    links: [
      { label: "Dubai city tour", href: "/packages/dubai-5-days" },
      { label: "Turkey, Istanbul and Cappadocia", href: "/packages/turkey-7-days" },
      { label: "Baku, Azerbaijan", href: "/packages/baku-5-days" },
      { label: "Malaysia and Thailand combo", href: "/packages/malaysia-thailand-8-days" },
    ],
  },
  {
    heading: "Visas and travel guides",
    links: [
      { label: "Visit visa services", href: "/visa-services" },
      { label: "First time Umrah guide", href: "/blog/first-time-umrah-guide-pakistan" },
      { label: "Dubai visit visa guide", href: "/blog/dubai-visit-visa-requirements-pakistan" },
      { label: "All travel guides", href: "/blog" },
    ],
  },
];

// Priority stack order for the homepage: pilgrimage hubs first.
const cityOrder = [
  "charsadda",
  "peshawar",
  "islamabad",
  "rawalpindi",
  "lahore",
  "tangi",
  "shabqadar",
];

export default async function HomePage() {
  const settings = await getSettings();
  const featuredRaw = await getFeatured(4);
  // Pilgrimage cards lead the stack on mobile. Pricing is inquiry based, so
  // the price is stripped before it reaches the card.
  const featured = [
    ...featuredRaw.filter((p) => p.category === "Umrah & Hajj"),
    ...featuredRaw.filter((p) => p.category !== "Umrah & Hajj"),
  ].map((p) => ({ ...p, price: null }));
  const posts = (await getPosts()).slice(0, 3);
  const orderedCities = cityOrder
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is (typeof cities)[number] => Boolean(c));

  // Real credentials only. Blank values are omitted.
  const credentialBadges = [
    { label: "Company No.", value: site.credentials.companyNumber },
    { label: "MORA Umrah operator", value: site.credentials.moraLicence },
    { label: "IATA", value: site.credentials.iata },
  ].filter((c) => c.value);

  const stats = [
    { value: "7+", label: "Cities served" },
    { value: "8+", label: "Curated packages" },
    { value: "0", label: "Hidden charges" },
  ];

  return (
    <>
      <JsonLd data={homepageGraph(featured, posts, reviewData)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <img
          src={photo(realPhotos.hero, images.heroKaaba)}
          alt={
            realPhotos.hero
              ? "Umrah, Hajj and international travel from Pakistan"
              : "The Holy Kaaba in Masjid al-Haram, Makkah"
          }
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 overlay-hero" />
        <div className="container-site relative py-24 sm:py-32 lg:py-40">
          <p className="eyebrow text-brand-orange">
            Charsadda · Peshawar · Islamabad · All Pakistan
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Umrah, Hajj and International Travel Agency in Pakistan
          </h1>
          <p className="mt-4 max-w-2xl font-display text-xl italic text-brand-orange sm:text-2xl">
            From your doorstep to the Haram and the world beyond
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {site.name} arranges Umrah, Hajj, international tours and visas from
            Pakistan, with honest pricing quoted on inquiry and WhatsApp support
            from inquiry to safe return.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/packages" className="btn-orange">
              Explore Packages
            </Link>
            <a
              href={waHref(
                settings.whatsapp,
                "Assalam o Alaikum, I want to ask about Umrah packages."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/40 text-white hover:bg-white/10"
            >
              Ask on WhatsApp
            </a>
            <a
              href={telHref(settings.phone)}
              className="btn border border-white/40 text-white hover:bg-white/10 sm:hidden"
            >
              Call {settings.phone}
            </a>
          </div>
          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/15 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-brand-orange sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="overflow-hidden border-y border-black/5 bg-white py-14">
        <div className="container-site mb-10 text-center">
          <p className="eyebrow">Airline Partners</p>
          <h2 className="mt-2 font-display text-2xl text-brand-blue-deep sm:text-3xl">
            Flights with airlines you trust
          </h2>
        </div>
        {/* Infinite marquee strip */}
        <div
          className="relative overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
        >
          <div className="animate-marquee flex w-max items-center gap-14">
            {[
              { src: "/partners/qatar-airways.jpg", alt: "Qatar Airways",    big: true },
              { src: "/partners/airblue.png",       alt: "Airblue",          xl: true },
              { src: "/partners/airsial.png",       alt: "AirSial" },
              { src: "/partners/etihad.png",        alt: "Etihad Airways",   medium: true },
              { src: "/partners/saudia.png",        alt: "Saudia",           big: true },
              { src: "/partners/pia.png",           alt: "PIA",              big: true },
              /* duplicate for seamless loop */
              { src: "/partners/qatar-airways.jpg", alt: "Qatar Airways 2",  big: true },
              { src: "/partners/airblue.png",       alt: "Airblue 2",        xl: true },
              { src: "/partners/airsial.png",       alt: "AirSial 2" },
              { src: "/partners/etihad.png",        alt: "Etihad Airways 2", medium: true },
              { src: "/partners/saudia.png",        alt: "Saudia 2",         big: true },
              { src: "/partners/pia.png",           alt: "PIA 2",            big: true },
            ].map((p) => (
              <div
                key={p.alt}
                className="flex h-16 w-40 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-paper px-5 shadow-card"
              >
                <img
                  src={p.src}
                  alt={p.alt.replace(" 2", "")}
                  loading="lazy"
                  className={`max-w-full object-contain mix-blend-multiply ${p.xl ? "max-h-18" : p.big ? "max-h-14" : p.medium ? "max-h-12" : "max-h-10"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entity context layer */}
      <section className="border-b border-black/5 bg-paper py-16 sm:py-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Umrah, Hajj and travel from Pakistan</p>
            <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
              {site.name} is a Charsadda based agency arranging Umrah and Hajj to
              Makkah and Madinah, with hotels near Masjid al-Haram and Masjid
              an-Nabawi, guided Ziyarat, and the Saudi Umrah e-visa handled for
              you. Packages run from economy to five star across 7 to 30 day
              durations for 2026, with quad, triple, and double sharing and
              departures from Peshawar and Islamabad. Beyond the pilgrimage, our
              desk arranges international tours to Dubai, Turkey, Baku, and
              beyond, plus visit visas from Pakistan. One office in Charsadda
              serves travelers across all Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we do"
            title="Every journey, handled completely"
            description="Umrah, Hajj, international tours and visas, one standard of care with nothing left for you to chase."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 overlay-dark" />
                  <h3 className="absolute bottom-4 left-5 text-xl text-white">
                    {s.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {s.text}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 border-t border-black/5 pt-3">
                    {s.links.map((l) => (
                      <Link
                        key={l.label}
                        href={l.href}
                        className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-brand-orange-dark hover:text-brand-orange"
                      >
                        {l.label}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured packages */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Featured packages"
            title="Where will you go first?"
            description="Compare our most booked Umrah packages, Hajj programs and international tours, with hotels, flights and inclusions on every card, each quoted on inquiry."
          />
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((p) => (
              <PackageInquiryCard
                key={p.slug}
                pkg={p}
                whatsapp={settings.whatsapp}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/packages" className="btn-outline">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why us: split with image */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <img
                src={photo(realPhotos.office, images.madinah)}
                alt={
                  realPhotos.office
                    ? "Al Raqeem Travel and Tours head office in Charsadda"
                    : "Domes of the Prophet's Mosque in Madinah"
                }
                loading="lazy"
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl bg-brand-orange px-7 py-5 shadow-lift sm:block">
              <p className="font-display text-2xl text-brand-blue-deep">
                Sister company of
              </p>
              <p className="text-sm font-semibold text-brand-blue-deep/80">
                {site.sisterCompany}
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Why travelers choose us"
              title="Travel companies sell tickets. We take responsibility."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-card"
                >
                  <h3 className="text-lg">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl border border-black/5 bg-paper p-5 text-sm leading-relaxed text-slate-600">
              Our head office sits at Aman Plaza, Mardan Road, Charsadda, open
              Monday to Saturday, where you meet the team in person before
              booking.
            </p>
            {credentialBadges.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {credentialBadges.map((c) => (
                  <li
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-brand-blue-deep shadow-card"
                  >
                    <span className="text-brand-orange-dark">{c.label}</span>
                    {c.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Social proof (renders only when real reviews exist) */}
      <Reviews data={reviewData} />

      {/* How it works */}
      <section className="bg-brand-blue-deep py-20 text-white sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it works"
            title="From inquiry to boarding pass in four steps"
            tone="light"
            align="center"
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur"
              >
                <span className="font-display text-4xl text-brand-orange">
                  {s.step}
                </span>
                <h3 className="mt-3 text-lg text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Areas we serve"
            title="One office in Charsadda, serving all of Pakistan"
            description="Our Charsadda office serves Charsadda, Peshawar, Islamabad, Rawalpindi, Lahore, Tangi and Shabqadar, arranging Umrah, Hajj, tours and visas for travelers across all of Pakistan through WhatsApp, documents and departure."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orderedCities.map((c) => (
              <Link
                key={c.slug}
                href={`/areas/${c.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-black/5 bg-white px-6 py-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div>
                  <p className="font-display text-lg text-brand-blue-deep">
                    {c.name}
                  </p>
                  <p className="text-xs text-slate-500">{c.region}</p>
                </div>
                <span className="text-brand-orange-dark transition group-hover:translate-x-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hajj Pre Registration */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        {/* Decorative crescent, top right */}
        <svg
          viewBox="0 0 400 400"
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 w-[340px] opacity-[0.07] sm:w-[420px]"
        >
          <path
            d="M200 40a160 160 0 1 0 0 320 130 130 0 1 1 0-320z"
            fill="#C5A253"
          />
        </svg>
        {/* Decorative crescent, bottom left */}
        <svg
          viewBox="0 0 400 400"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 w-[280px] rotate-180 opacity-[0.05]"
        >
          <path
            d="M200 40a160 160 0 1 0 0 320 130 130 0 1 1 0-320z"
            fill="#C5A253"
          />
        </svg>

        <div className="container-site relative">
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon badge */}
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-brand-orange/40 bg-brand-orange/15 p-5">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5A253"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {/* Crescent moon */}
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#C5A253" stroke="none" />
              </svg>
            </div>

            <p className="eyebrow text-brand-orange">
              Ministry of Religious Affairs · Official Portal
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
              Hajj Pre-Registration
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Register your interest for the upcoming Hajj season through the
              Government of Pakistan's official MORA portal. Secure your place
              before allocations close.
            </p>

            {/* Info pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2", label: "Limited Seats" },
                { icon: "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", label: "Free to Register" },
                { icon: "M3 12l9-9 9 9M5 10v10h14V10", label: "Government Portal" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C5A253"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={item.icon} />
                  </svg>
                  {item.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="https://www.mora.gov.pk/Detail/YTI4ZjNkYzAtNGNmMi00MzBiLWFlZmYtOTg5MGI5ZmRiY2Nm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-brand-orange px-8 py-4 text-sm font-semibold text-brand-blue-deep shadow-lift transition hover:bg-brand-orange-dark"
              >
                Register on MORA Portal
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                </svg>
              </a>
              <p className="mt-3 text-xs text-slate-500">
                Opens the official mora.gov.pk portal in a new tab
              </p>
              <p className="mx-auto mt-6 max-w-xl text-sm text-slate-400">
                Prefer a fully arranged journey? Our{" "}
                <Link
                  href="/packages/hajj-package"
                  className="font-semibold text-brand-orange underline"
                >
                  private Hajj packages
                </Link>{" "}
                cover Nusuk and visa processing, trained group leaders, and Mina
                and Arafat camp services from booking to safe return.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Travel guides"
            title="Advice from our desk"
          />
          <div className="grid gap-7 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-black/5 bg-paper p-7 transition hover:-translate-y-1 hover:shadow-card"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange-dark">
                  {post.readMinutes} min read
                </p>
                <h3 className="mt-3 text-lg leading-snug transition group-hover:text-brand-blue">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Questions and answers"
            title="Umrah, Hajj and visa questions, answered"
            description="Straight answers on Umrah and Hajj costs, inclusions, hotels, visas and booking from any city in Pakistan."
            align="center"
          />
          <HomeFaq />
        </div>
      </section>

      {/* Topical bridge: internal link hub into the topical tree */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore more"
            title="Plan your journey by package, city, or visa"
            description="Jump straight to a package tier, your departure city, an international tour, or a visit visa, all handled by our team."
            align="center"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bridge.map((group) => (
              <div key={group.heading}>
                <h3 className="font-display text-lg text-brand-blue-deep">
                  {group.heading}
                </h3>
                <ul className="mt-3 space-y-1">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-white hover:text-brand-blue"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#A8853A"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        image={images.kaaba}
        imageAlt="The Holy Kaaba in Masjid al-Haram, Makkah"
        officeHref={mapsLink()}
      />
    </>
  );
}
