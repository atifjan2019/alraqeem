"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  calculatorCategories,
  calculatorUnits,
  categoryLabels,
  formatCalculatorPrice,
  unitLabels,
  type CalculatorCategory,
  type CalculatorItem,
  type CalculatorUnit,
} from "@/lib/calculatorItems";

const blank = {
  name: "",
  category: "hotel" as CalculatorCategory,
  location: "",
  price: "",
  unit: "per_room_night" as CalculatorUnit,
  description: "",
  active: true,
  sortOrder: "0",
};

export default function CalculatorItemsManager({
  initial,
  configured,
}: {
  initial: CalculatorItem[];
  configured: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function edit(item: CalculatorItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      location: item.location,
      price: String(item.price),
      unit: item.unit,
      description: item.description,
      active: item.active,
      sortOrder: String(item.sortOrder),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditingId(null);
    setForm(blank);
    setError("");
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        editingId ? `/api/calculator-items/${editingId}` : "/api/calculator-items",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save item.");
      reset();
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save item.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(item: CalculatorItem) {
    if (!confirm(`Delete “${item.name}”?`)) return;
    const response = await fetch(`/api/calculator-items/${item.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error || "Failed to delete item.");
      return;
    }
    if (editingId === item.id) reset();
    router.refresh();
  }

  return (
    <div className="grid items-start gap-10 xl:grid-cols-[minmax(320px,0.8fr)_minmax(560px,1.4fr)]">
      <form onSubmit={save} className="space-y-5 rounded-2xl bg-white p-6 shadow-card">
        <div>
          <h2 className="text-2xl">{editingId ? "Edit price item" : "Add price item"}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a hotel, visa, flight, transport service, or any package extra.
          </p>
        </div>
        {!configured && (
          <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Connect Supabase and run the calculator migration before adding prices.
          </p>
        )}
        <div>
          <label htmlFor="calc-name">Name</label>
          <input id="calc-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Makkah 4-star hotel" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="calc-category">Category</label>
            <select id="calc-category" value={form.category} onChange={(e) => update("category", e.target.value as CalculatorCategory)}>
              {calculatorCategories.map((category) => <option key={category} value={category}>{categoryLabels[category]}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="calc-location">Location</label>
            <input id="calc-location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Makkah" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="calc-price">Price (PKR)</label>
            <input id="calc-price" type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} required />
          </div>
          <div>
            <label htmlFor="calc-unit">Charging basis</label>
            <select id="calc-unit" value={form.unit} onChange={(e) => update("unit", e.target.value as CalculatorUnit)}>
              {calculatorUnits.map((unit) => <option key={unit} value={unit}>{unitLabels[unit]}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="calc-description">Description</label>
          <textarea id="calc-description" rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Room type, inclusions, restrictions…" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="calc-order">Sort order</label>
            <input id="calc-order" type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", e.target.value)} />
          </div>
          <label className="flex items-center gap-3 self-end rounded-xl bg-paper px-4 py-3">
            <input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} className="h-4 w-4" />
            <span className="text-sm font-semibold">Show in calculator</span>
          </label>
        </div>
        {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={!configured || busy} className="btn-orange disabled:opacity-50">
            {busy ? "Saving…" : editingId ? "Save Changes" : "Add Price Item"}
          </button>
          {editingId && <button type="button" onClick={reset} className="btn-outline">Cancel</button>}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card">
        <div className="border-b border-black/5 px-5 py-4">
          <h2 className="text-xl">Calculator prices</h2>
          <p className="text-sm text-slate-500">{initial.length} item{initial.length === 1 ? "" : "s"}</p>
        </div>
        <div className="divide-y divide-black/5">
          {initial.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-brand-blue-deep">{item.name}</p>
                  {!item.active && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">Hidden</span>}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {categoryLabels[item.category]}{item.location ? ` · ${item.location}` : ""} · {unitLabels[item.unit]}
                </p>
                <p className="mt-1 font-display text-lg text-brand-orange-dark">{formatCalculatorPrice(item.price)}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => edit(item)} className="btn-outline !px-3 !py-2 text-xs">Edit</button>
                <button type="button" onClick={() => remove(item)} disabled={!configured} className="rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40">Delete</button>
              </div>
            </div>
          ))}
          {initial.length === 0 && <p className="px-5 py-10 text-center text-sm text-slate-500">No prices yet. Add your first hotel or service.</p>}
        </div>
      </div>
    </div>
  );
}
