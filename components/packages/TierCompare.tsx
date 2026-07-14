import Link from "next/link";
import { images } from "@/lib/images";

// Umrah tier comparison. Attributes only, no price in any cell. Three tiers
// side by side on desktop, stacking to one column on mobile.
const tiers = [
  {
    name: "Economy",
    href: "/umrah/economy-15-days",
    image: images.mosque,
    alt: "Mosque domes for the Economy Umrah tier",
    rows: [
      { k: "Duration", v: "15 days" },
      { k: "Hotels", v: "Walking or shuttle distance" },
      { k: "Room sharing", v: "Quad and shared" },
      { k: "Transport", v: "Shared ground transport" },
      { k: "Best suited", v: "Budget conscious pilgrims" },
    ],
  },
  {
    name: "Premium and five star",
    href: "/umrah/premium-21-days",
    image: images.madinah,
    alt: "Masjid an-Nabawi in Madinah for Premium Umrah",
    rows: [
      { k: "Duration", v: "21 days" },
      { k: "Hotels", v: "Near or facing the Haram" },
      { k: "Room sharing", v: "Triple and double" },
      { k: "Transport", v: "Private transport" },
      { k: "Best suited", v: "Comfort with worship" },
    ],
  },
  {
    name: "Ramadan",
    href: "/umrah/ramadan",
    image: images.quran,
    alt: "The Holy Quran for Ramadan Umrah",
    rows: [
      { k: "Duration", v: "10 to 30 days" },
      { k: "Hotels", v: "Near the Haram, booked early" },
      { k: "Room sharing", v: "Confirmed on quote" },
      { k: "Transport", v: "Arranged for your group" },
      { k: "Best suited", v: "Last Ashra and Laylat al-Qadr" },
    ],
  },
];

export default function TierCompare({
  withImages = false,
}: {
  withImages?: boolean;
}) {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            {withImages && (
              <div className="relative h-44 overflow-hidden sm:h-48 lg:h-44 xl:h-48">
                <img
                  src={t.image}
                  alt={t.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/85 via-brand-blue-deep/10 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 font-display text-2xl text-white">
                  {t.name}
                </h3>
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              {!withImages && (
                <h3 className="font-display text-xl text-brand-blue-deep">
                  {t.name}
                </h3>
              )}
              <dl
                className={`${withImages ? "" : "mt-4"} flex-1 divide-y divide-black/5`}
              >
                {t.rows.map((r) => (
                  <div key={r.k} className="flex justify-between gap-3 py-2.5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {r.k}
                    </dt>
                    <dd className="text-right text-sm font-medium text-brand-blue-deep">
                      {r.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href={t.href}
                className="btn-outline mt-5 w-full !py-2.5 text-sm"
              >
                View {t.name} Umrah
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
        Room sharing and exact hotels are confirmed for your group when we
        quote. No prices are published, since airfare and hotel rates change
        weekly.
      </p>
    </div>
  );
}
