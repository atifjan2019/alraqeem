import Link from "next/link";
import { images } from "@/lib/images";
import { getSettings } from "@/lib/settingsStore";
import { waHref, telHref } from "@/lib/settings";

export function PageHero({
  eyebrow,
  title,
  description,
  image = images.mosque,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <img
        src={image}
        alt={imageAlt ?? title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 overlay-hero" />
      <div className="container-site relative py-20 sm:py-28">
        <p className="eyebrow text-brand-orange">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export async function CtaBand({
  title = "Ready to begin your journey?",
  subtitle = "Sit with our team in Charsadda or reach us on WhatsApp. Clear written quotes, complete service, and support from departure to safe return.",
  image = images.mosque,
  imageAlt = "Umrah, Hajj and international travel destinations",
  officeHref = "/contact",
}: {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  officeHref?: string;
}) {
  const settings = await getSettings();
  const officeIsExternal = officeHref.startsWith("http");
  return (
    <section className="relative overflow-hidden bg-ink">
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 overlay-hero" />
      <div className="container-site relative py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-orange">Al Raqeem Travel &amp; Tours</p>
          <h2 className="mt-3 text-3xl text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref(
                settings.whatsapp,
                "Assalam o Alaikum, I want to plan a trip with Al Raqeem."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              WhatsApp Us Now
            </a>
            <a
              href={telHref(settings.phone)}
              className="btn bg-white text-brand-blue-deep hover:bg-paper"
            >
              Call {settings.phone}
            </a>
            {officeIsExternal ? (
              <a
                href={officeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/40 text-white hover:bg-white/10"
              >
                Visit Our Office
              </a>
            ) : (
              <Link
                href={officeHref}
                className="btn border border-white/40 text-white hover:bg-white/10"
              >
                Visit Our Office
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
