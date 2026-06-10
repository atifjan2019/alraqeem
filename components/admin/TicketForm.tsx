"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { tripTypes, type Ticket } from "@/lib/tickets";

type MediaItem = { name: string; path: string; url: string };

export default function TicketForm({
  mode,
  initial,
  configured,
  categoryOptions,
}: {
  mode: "create" | "edit";
  initial?: Ticket;
  configured: boolean;
  categoryOptions: string[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    airline: initial?.airline ?? "",
    sector: initial?.sector ?? "",
    category: initial?.category ?? categoryOptions[0] ?? "",
    tripType: initial?.tripType ?? "Return",
    fare: initial?.fare != null ? String(initial.fare) : "",
    baggage: initial?.baggage ?? "",
    image: initial?.image ?? "",
    expiryDate: initial?.expiryDate ?? "",
    description: initial?.description ?? "",
    featured: initial?.featured ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (showPicker && media.length === 0) {
      fetch("/api/media")
        .then((r) => r.json())
        .then((d) => setMedia(d.media ?? []))
        .catch(() => {});
    }
  }, [showPicker, media.length]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url =
        mode === "create" ? "/api/tickets" : `/api/tickets/${initial!.slug}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save.");
      router.push("/admin/tickets");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {!configured && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Supabase isn&apos;t connected, so saving is disabled.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="airline">Airline</label>
          <input
            id="airline"
            value={form.airline}
            onChange={(e) => update("airline", e.target.value)}
            placeholder="e.g. Saudia"
            required
          />
        </div>
        <div>
          <label htmlFor="sector">Sector / Route</label>
          <input
            id="sector"
            value={form.sector}
            onChange={(e) => update("sector", e.target.value)}
            placeholder="e.g. Islamabad → Jeddah"
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tripType">Trip type</label>
          <select
            id="tripType"
            value={form.tripType}
            onChange={(e) => update("tripType", e.target.value as typeof form.tripType)}
          >
            {tripTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="fare">Fare (PKR)</label>
          <input
            id="fare"
            type="number"
            value={form.fare}
            onChange={(e) => update("fare", e.target.value)}
            placeholder="Empty = 'Call for fare'"
          />
        </div>
        <div>
          <label htmlFor="baggage">Baggage</label>
          <input
            id="baggage"
            value={form.baggage}
            onChange={(e) => update("baggage", e.target.value)}
            placeholder="e.g. 40 kg"
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Fare valid until</label>
          <input
            id="expiryDate"
            type="date"
            value={form.expiryDate ?? ""}
            onChange={(e) => update("expiryDate", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="image">Image URL (optional)</label>
        <div className="flex gap-2">
          <input
            id="image"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            placeholder="Paste a URL or pick from Media"
          />
          <button
            type="button"
            onClick={() => setShowPicker((s) => !s)}
            className="btn-outline shrink-0 !px-4 !py-2 text-sm"
          >
            Media
          </button>
        </div>
        {showPicker && (
          <div className="mt-3 grid max-h-56 grid-cols-3 gap-2 overflow-y-auto rounded-xl border border-black/10 bg-white p-3 sm:grid-cols-4">
            {media.length === 0 && (
              <p className="col-span-full text-sm text-slate-500">
                No images yet. Upload some on the Media page.
              </p>
            )}
            {media.map((m) => (
              <button
                key={m.path}
                type="button"
                onClick={() => {
                  update("image", m.url);
                  setShowPicker(false);
                }}
                className="overflow-hidden rounded-lg ring-1 ring-black/10 transition hover:ring-2 hover:ring-brand-orange"
              >
                <img src={m.url} alt={m.name} className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 !text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="!w-auto"
        />
        Feature on homepage
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!configured || saving}
          className="btn-orange disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving…" : mode === "create" ? "Add Ticket" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/tickets")}
          className="btn-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
