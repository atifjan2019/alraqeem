import Link from "next/link";
import CalculatorItemsManager from "@/components/admin/CalculatorItemsManager";
import { getCalculatorItems } from "@/lib/calculatorItemsStore";
import { isSupabaseConfigured } from "@/lib/packagesStore";
import { calculatorCategories, categoryLabels } from "@/lib/calculatorItems";

export const dynamic = "force-dynamic";

export default async function AdminCalculatorPage() {
  const items = await getCalculatorItems();
  const active = items.filter((item) => item.active).length;
  const categoryCount = calculatorCategories.filter((category) =>
    items.some((item) => item.category === category)
  ).length;
  const hotelCount = items.filter((item) => item.category === "hotel").length;

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="overflow-hidden rounded-3xl bg-ink shadow-lift">
        <div className="relative px-6 py-7 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
                Package calculator
              </p>
              <h1 className="mt-2 text-3xl text-white sm:text-4xl">
                Pricing workspace
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                Manage every rate used by the public package builder. Update a
                price, hide unavailable options, and publish changes instantly.
              </p>
            </div>
            <Link
              href="/package-calculator"
              target="_blank"
              className="btn-orange shrink-0"
            >
              View Public Calculator
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </Link>
          </div>
        </div>
        <div className="grid border-t border-white/10 sm:grid-cols-3">
          {[
            { label: "Total price items", value: items.length },
            { label: "Live on calculator", value: active },
            { label: `${categoryCount} categories · ${categoryLabels.hotel}`, value: hotelCount },
          ].map((stat) => (
            <div key={stat.label} className="border-b border-white/10 px-6 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <p className="font-display text-2xl text-white">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <CalculatorItemsManager initial={items} configured={isSupabaseConfigured} />
      </div>
    </div>
  );
}
