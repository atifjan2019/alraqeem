import CalculatorItemsManager from "@/components/admin/CalculatorItemsManager";
import { getCalculatorItems } from "@/lib/calculatorItemsStore";
import { isSupabaseConfigured } from "@/lib/packagesStore";

export const dynamic = "force-dynamic";

export default async function AdminCalculatorPage() {
  const items = await getCalculatorItems();
  return (
    <div>
      <p className="eyebrow">Package calculator</p>
      <h1 className="mt-2 text-3xl">Manage calculator prices</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        These prices power the public package builder. Hide an item when its rate is temporarily unavailable.
      </p>
      <div className="gold-rule mt-5" />
      <div className="mt-8">
        <CalculatorItemsManager initial={items} configured={isSupabaseConfigured} />
      </div>
    </div>
  );
}
