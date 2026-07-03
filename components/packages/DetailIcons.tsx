// Consistent inline stroke icon set for the package detail template.
// All icons share a 24x24 viewBox, round caps, and currentColor so they
// inherit the surrounding text color. No fills, no fabricated meaning.

const PATHS: Record<string, string> = {
  plane: "M22 2 11 13 M22 2 15 22l-4-9-9-4 20-7z",
  hotel: "M4 22V6l8-4 8 4v16 M4 22h16 M9 22v-4h6v4 M9 8h.01 M15 8h.01 M9 12h.01 M15 12h.01",
  document: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h4",
  pin: "M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  bus: "M4 4h12a2 2 0 0 1 2 2v9H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M18 8h2.5l1.5 3v4h-4 M4 11h14 M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M16 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  meal: "M4 3v7a2 2 0 0 0 4 0V3 M6 10v11 M18 3c-1.7 0-3 2.7-3 6s1.3 5 3 5v7",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  person: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  moon: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  check: "M20 6 9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01l-3-3",
  xCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M15 9l-6 6 M9 9l6 6",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  tag: "M20.59 13.41 12 22l-9-9V4a1 1 0 0 1 1-1h9z M7 7h.01",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  route: "M6 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M18 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M6 8v6a4 4 0 0 0 4 4h4",
  walk: "M13 5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z M9 21l2.5-6L14 17v4 M11.5 15 10 9l4-1.5 2 3.5 3 1",
};

export default function Icon({
  name,
  size = 22,
  className = "",
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name] ?? PATHS.check} />
    </svg>
  );
}

// Pick an icon from the real inclusion text. Order matters: the most specific
// stated item wins. A meal icon appears only when a meal is actually stated.
export function inclusionIcon(text: string): string {
  const s = text.toLowerCase();
  if (/airfare|flight|fly/.test(s)) return "plane";
  if (/hotel|haram|walking|facing|star|city center|room/.test(s)) return "hotel";
  if (/ziyarat/.test(s)) return "pin";
  if (/camp|mina|arafat|muzdalifah/.test(s)) return "pin";
  if (/safari|burj|mall|old city|flame|istanbul|cappadocia|balloon|cruise|dhow|bosphorus|marina|tour|sightseeing|cable|gabala|genting|phuket|beach|highlands|kuala|bangkok/.test(s))
    return "camera";
  if (/visa|processing|training|pre-departure|briefing/.test(s)) return "document";
  if (/transport|shuttle|bus|ground/.test(s)) return "bus";
  if (/breakfast|dinner|meal|buffet|halal|bbq/.test(s)) return "meal";
  if (/guide|leader|scholar/.test(s)) return "users";
  if (/ashra|itikaf|ramadan|laylat|taraweeh/.test(s)) return "moon";
  if (/flexible|duration/.test(s)) return "clock";
  if (/government|approved/.test(s)) return "shield";
  return "check";
}
