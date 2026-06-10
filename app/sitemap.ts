import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { getPosts } from "@/lib/postsStore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticPages = [
    "",
    "/packages",
    "/tickets",
    "/visa-services",
    "/about",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const cityPages = cities.map((c) => ({
    url: `${site.url}/areas/${c.slug}`,
    lastModified: new Date(),
  }));

  const postPages = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticPages, ...cityPages, ...postPages];
}
