import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { liveDepartureCities } from "@/lib/departureCities";
import { liveUmrahPlus } from "@/lib/umrahPlus";
import { liveSeasonalUmrah } from "@/lib/seasonalUmrah";
import { liveDestinations } from "@/lib/destinations";
import { packageHrefBySlug } from "@/lib/packages";
import { tourFacets } from "@/lib/tourFacets";
import { getPosts } from "@/lib/postsStore";

type Freq = "weekly" | "monthly" | "yearly";

// Changefreq and priority by path, the pillars highest, driven by the path so
// it stays consistent as pages are added from the data files.
function meta(path: string): { changeFrequency: Freq; priority: number } {
  if (path === "") return { changeFrequency: "weekly", priority: 1 };
  if (path === "/umrah" || path === "/hajj" || path === "/tours")
    return { changeFrequency: "weekly", priority: 0.9 };
  if (path === "/tours/international-tours" || path === "/tours/pakistan")
    return { changeFrequency: "weekly", priority: 0.8 };
  if (path.startsWith("/umrah/"))
    return { changeFrequency: "weekly", priority: 0.7 };
  if (path.startsWith("/tours/"))
    return { changeFrequency: "monthly", priority: 0.7 };
  if (path === "/packages" || path === "/visa-services" || path === "/tickets")
    return { changeFrequency: "weekly", priority: 0.6 };
  if (path === "/blog") return { changeFrequency: "weekly", priority: 0.6 };
  if (path === "/about" || path === "/contact")
    return { changeFrequency: "monthly", priority: 0.4 };
  if (path === "/terms-and-refunds" || path === "/photo-credits")
    return { changeFrequency: "yearly", priority: 0.3 };
  return { changeFrequency: "monthly", priority: 0.5 };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  // Stable singletons, the hubs, sub hubs, the Muslim friendly facet, the Umrah
  // package children, the verticals, and the site pages.
  const staticPaths = [
    "",
    "/umrah",
    "/umrah/economy-15-days",
    "/umrah/premium-21-days",
    "/umrah/ramadan",
    "/hajj",
    "/tours",
    "/tours/international-tours",
    "/tours/pakistan",
    "/tours/muslim-friendly-tours",
    "/visa-services",
    "/tickets",
    "/packages",
    "/about",
    "/blog",
    "/contact",
    "/terms-and-refunds",
    "/photo-credits",
  ];

  // Data driven, so a destination, facet, city, combo, or season renders in the
  // sitemap only while live, in sync with the pages, no hardcoded drift.
  const tourDestPaths = [
    ...liveDestinations("international"),
    ...liveDestinations("pakistan"),
  ].map((d) => packageHrefBySlug(d.slug));
  const facetPaths = Object.values(tourFacets).map((f) => `/tours/${f.slug}`);
  const umrahCityPaths = liveDepartureCities().map((c) => `/umrah/${c.slug}`);
  const umrahPlusPaths = liveUmrahPlus().map((c) => `/umrah/${c.slug}`);
  const seasonalPaths = liveSeasonalUmrah().map((s) => `/umrah/${s.slug}`);

  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    ...staticPaths,
    ...tourDestPaths,
    ...facetPaths,
    ...umrahCityPaths,
    ...umrahPlusPaths,
    ...seasonalPaths,
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    ...meta(path),
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...pages, ...postPages];
}
