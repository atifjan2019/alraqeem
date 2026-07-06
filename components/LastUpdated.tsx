import { site } from "@/lib/site";

// Visible freshness signal. Shows the month and year the content was last
// reviewed, carried from lib/site.ts so one edit updates every page.
export default function LastUpdated({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const color = tone === "dark" ? "text-slate-300" : "text-slate-500";
  return (
    <p
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${color} ${className}`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2" />
      </svg>
      Last updated {site.lastUpdated}
    </p>
  );
}
