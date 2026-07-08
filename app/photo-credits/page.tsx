import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Shared";
import { mapsLink } from "@/lib/site";
import credits from "@/lib/photoCredits.json";

export const metadata: Metadata = {
  title: "Photo Credits",
  description:
    "Attribution for the openly licensed photographs used on Al Raqeem Travel & Tours, sourced from Wikimedia Commons under Creative Commons and public domain licences.",
  alternates: { canonical: "/photo-credits" },
  openGraph: { url: "/photo-credits" },
};

type Credit = {
  slug: string;
  key: string;
  file: string;
  title: string;
  commonsFile: string;
  license: string;
  artist: string;
  source: string;
};

// Friendly page names for the grouping, so the credits read by destination
// rather than by slug. A slug with no entry here shows its own text.
const pageNames: Record<string, string> = {
  "dubai-5-days": "Dubai",
  "turkey-7-days": "Turkey",
  "baku-5-days": "Baku, Azerbaijan",
  malaysia: "Malaysia",
  thailand: "Thailand",
  singapore: "Singapore",
  "malaysia-thailand-8-days": "Malaysia and Thailand",
  "malaysia-thailand-singapore": "Malaysia, Thailand and Singapore",
  swat: "Swat",
  "kumrat-valley": "Kumrat Valley",
};

export default function PhotoCreditsPage() {
  const all = credits as Credit[];
  const bySlug = new Map<string, Credit[]>();
  for (const c of all) {
    const list = bySlug.get(c.slug) ?? [];
    list.push(c);
    bySlug.set(c.slug, list);
  }

  return (
    <>
      <PageHero
        eyebrow="Attribution"
        title="Photo credits"
        description="The destination photographs on this site are openly licensed, sourced from Wikimedia Commons, and credited below to their photographers and licences."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <p className="text-lg leading-relaxed text-slate-700">
            The landmark and destination photographs on our tour pages are
            representative images shared under Creative Commons and public
            domain licences through Wikimedia Commons. Each one is credited to
            its photographer and licence below, with a link to the source file.
            Our own trip photographs replace these as our team adds them.
          </p>

          <div className="mt-10 space-y-10">
            {[...bySlug.keys()].map((slug) => (
              <div key={slug}>
                <h2 className="font-display text-xl text-brand-blue-deep">
                  {pageNames[slug] ?? slug}
                </h2>
                <div className="gold-rule mt-3" />
                <ul className="mt-5 space-y-4">
                  {(bySlug.get(slug) ?? []).map((c) => (
                    <li
                      key={c.file}
                      className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-3 shadow-card"
                    >
                      <img
                        src={c.file}
                        alt={c.title}
                        loading="lazy"
                        className="h-16 w-24 shrink-0 rounded-lg object-cover"
                      />
                      <p className="text-sm leading-relaxed text-slate-600">
                        <span className="font-semibold text-brand-blue-deep">
                          {c.title}
                        </span>
                        , by {c.artist || "unknown"}, {c.license}, via{" "}
                        <a
                          href={c.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-brand-blue underline"
                        >
                          Wikimedia Commons
                        </a>
                        .
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Planning a trip with us?"
        subtitle="Message our desk on WhatsApp or sit with our team in Charsadda, and we plan your dates, hotels, and route in writing before you pay."
        officeHref={mapsLink()}
      />
    </>
  );
}
