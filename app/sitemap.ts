import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { liveDepartureCities } from "@/lib/departureCities";
import { liveUmrahPlus } from "@/lib/umrahPlus";
import { liveSeasonalUmrah } from "@/lib/seasonalUmrah";
import { getPosts } from "@/lib/postsStore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticPages = [
    "",
    // Silo hubs and their package children.
    "/umrah",
    "/umrah/economy-15-days",
    "/umrah/premium-21-days",
    "/umrah/ramadan",
    "/hajj",
    "/tours",
    "/tours/international-tours",
    "/tours/pakistan",
    "/tours/dubai",
    "/tours/turkey",
    "/tours/baku",
    "/tours/malaysia-thailand",
    "/tours/malaysia",
    "/tours/thailand",
    "/tours/singapore",
    "/tours/malaysia-thailand-singapore",
    "/tours/muslim-friendly-tours",
    "/tours/honeymoon-packages",
    "/tours/family-packages",
    "/tours/group-tours",
    "/tours/beach-and-adventure-tours",
    "/tours/swat",
    "/tours/kumrat-valley",
    "/tours/kalash-valley",
    "/tours/chitral",
    "/tours/hunza",
    "/tours/skardu",
    "/tours/naran-kaghan",
    "/visa-services",
    "/tickets",
    // Lightweight browse-all index.
    "/packages",
    "/about",
    "/blog",
    "/contact",
    "/terms-and-refunds",
    "/photo-credits",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const umrahCityPages = liveDepartureCities().map((c) => ({
    url: `${site.url}/umrah/${c.slug}`,
    lastModified: new Date(),
  }));

  const umrahPlusPages = liveUmrahPlus().map((c) => ({
    url: `${site.url}/umrah/${c.slug}`,
    lastModified: new Date(),
  }));

  const seasonalUmrahPages = liveSeasonalUmrah().map((s) => ({
    url: `${site.url}/umrah/${s.slug}`,
    lastModified: new Date(),
  }));

  const postPages = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticPages, ...umrahCityPages, ...umrahPlusPages, ...seasonalUmrahPages, ...postPages];
}
