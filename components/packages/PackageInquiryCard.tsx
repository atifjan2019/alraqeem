import Link from "next/link";
import { TravelPackage, packageHref } from "@/lib/packages";
import { packageImage } from "@/lib/images";
import { tierOf } from "@/lib/packageDetail";
import { waHref } from "@/lib/settings";

// Inquiry based card. No price anywhere. Two actions: Get a quote (WhatsApp
// with the package prefilled) and Details (the detail page).
export default function PackageInquiryCard({
  pkg,
  whatsapp,
}: {
  pkg: TravelPackage;
  whatsapp: string;
}) {
  const href = packageHref(pkg);
  const tier = tierOf(pkg);
  const signals = pkg.highlights.slice(0, 2);
  const quote = waHref(
    whatsapp,
    `Assalam o Alaikum, I want a quote for the "${pkg.title}" package for my dates.`
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link href={href} className="relative block h-48 overflow-hidden">
        <img
          src={packageImage(pkg.slug, pkg.category, pkg.image)}
          alt={`${pkg.title} from Pakistan`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 overlay-dark" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-4">
          <span className="rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-blue-deep">
            {tier ?? pkg.category}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {pkg.duration}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug">
          <Link href={href} className="transition hover:text-brand-blue">
            {pkg.title}
          </Link>
        </h3>

        {signals.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {signals.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 text-xs leading-snug text-slate-600"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A8853A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 border-t border-black/5 pt-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Pricing
          </p>
          <p className="font-display text-lg text-brand-blue-deep">
            Price on inquiry
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Rates update weekly. We quote the current best price for your dates.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href={quote}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange flex-1 !px-4 !py-2.5 text-sm"
            >
              Get a quote
            </a>
            <Link
              href={href}
              className="btn-outline flex-1 !px-4 !py-2.5 text-sm"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
