"use client";

import { useState } from "react";

// Generic on-page FAQ accordion. Rendered as plain content, no FAQPage markup.
// `accent` adds a gold left border on the open item (detail pages opt in).
export default function FaqAccordion({
  items,
  idBase = "faq",
  accent = false,
}: {
  items: { q: string; a: string }[];
  idBase?: string;
  accent?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mx-auto mt-10 max-w-3xl space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li
            key={f.q}
            className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card transition-all ${
              accent && isOpen ? "border-l-4 border-l-brand-orange" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`${idBase}-panel-${i}`}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-base text-brand-blue-deep sm:text-lg">
                {f.q}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8853A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen && (
              <div
                id={`${idBase}-panel-${i}`}
                className="px-5 pb-5 text-sm leading-relaxed text-slate-600"
              >
                {f.a}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
