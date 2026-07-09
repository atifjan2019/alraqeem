import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the CMS and the API endpoints out of the index. Public pages stay
      // crawlable, so nothing here carries a global disallow to production. The
      // Vercel preview noindex is a platform header on preview only, not here.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
