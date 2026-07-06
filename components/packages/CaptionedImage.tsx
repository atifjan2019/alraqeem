import Icon from "@/components/packages/DetailIcons";

// A captioned visual slot, the sitewide standard for any named place, day, or
// hotel. Ships a real photo when one is supplied, else a branded motif panel,
// never a gray box, never a gradient block, and never stock. The caption names
// the entity and doubles as the alt text; real photos also feed ImageObject.
export default function CaptionedImage({
  src,
  caption,
  icon = "camera",
  aspect = "aspect-[4/3]",
  className = "",
}: {
  src?: string;
  caption: string;
  icon?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      {src ? (
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className={`${aspect} w-full rounded-2xl object-cover`}
        />
      ) : (
        <div
          role="img"
          aria-label={caption}
          className={`${aspect} flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-brand-orange/25 bg-brand-blue-deep p-4 text-center`}
        >
          <Icon name={icon} size={26} className="text-brand-orange" />
          <span className="text-xs font-medium leading-snug text-slate-200">
            {caption}
          </span>
        </div>
      )}
      <figcaption className="mt-2 text-xs leading-snug text-slate-500">
        {caption}
      </figcaption>
    </figure>
  );
}
