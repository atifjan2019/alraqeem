import Icon from "@/components/packages/DetailIcons";

type Fact = { icon: string; label: string; value: string };
type Trust = { icon: string; text: string };

// Desktop right column quote card. Pure CSS sticky, so it stays in view the
// whole way down the main content. No price, inquiry model only.
export default function StickyQuoteCard({
  facts,
  quoteHref,
  telHref,
  trust,
}: {
  facts: Fact[];
  quoteHref: string;
  telHref: string;
  trust: Trust[];
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-lift">
      <dl className="space-y-3.5">
        {facts.map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange-dark">
              <Icon name={f.icon} size={18} />
            </span>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {f.label}
              </dt>
              <dd className="font-semibold leading-tight text-brand-blue-deep">
                {f.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="my-5 h-px bg-black/10" />

      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Pricing
      </p>
      <p className="font-display text-2xl text-brand-blue-deep">
        Price on inquiry
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
        Rates update weekly. We quote the current best price for your dates.
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <a
          href={quoteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-orange w-full"
        >
          Get a quote
        </a>
        <a href={telHref} className="btn-outline w-full">
          Call
        </a>
      </div>

      <ul className="mt-5 space-y-3 border-t border-black/5 pt-5">
        {trust.map((t) => (
          <li
            key={t.text}
            className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600"
          >
            <Icon
              name={t.icon}
              size={16}
              className="mt-0.5 shrink-0 text-brand-orange-dark"
            />
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
