// =====================================================================
// JSON-LD structured data builders.
// Each page renders the most specific schema that fits its content
// (see <JsonLd />). Keep TravelAgency for home/about only.
// =====================================================================
import { site } from "@/lib/site";
import type { TravelPackage } from "@/lib/packages";
import type { Post } from "@/lib/posts";
import type { City } from "@/lib/cities";

// Absolute URL for a given path, e.g. "/packages" -> "https://alraqeem.com.pk/packages"
export function absoluteUrl(path: string) {
  return `${site.url}${path}`;
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Main Bazaar Road",
  addressLocality: "Charsadda",
  addressRegion: "Khyber Pakhtunkhwa",
  addressCountry: "PK",
};

const organization = {
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo.png"),
  },
};

// Home + About only.
export function travelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: absoluteUrl("/logo.png"),
    address: postalAddress,
    areaServed: [
      "Islamabad",
      "Lahore",
      "Rawalpindi",
      "Peshawar",
      "Charsadda",
      "Tangi",
      "Shabqadar",
    ],
  };
}

// Package detail pages.
export function packageSchema(pkg: TravelPackage, image: string) {
  const url = absoluteUrl(`/packages/${pkg.slug}`);
  const description = pkg.description
    ? stripHtml(pkg.description)
    : `${pkg.title} — ${pkg.duration} from ${site.name}.`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.title,
    description,
    image,
    category: pkg.category,
    brand: { "@type": "Organization", name: site.name },
    url,
    ...(pkg.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: pkg.price,
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
            url,
            seller: { "@type": "Organization", name: site.name },
            ...(pkg.expiryDate
              ? { priceValidUntil: pkg.expiryDate }
              : {}),
          },
        }
      : {}),
  };
}

// Blog post pages.
export function blogPostingSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: organization,
    image: post.image ? post.image : absoluteUrl("/logo.png"),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

// Area / city pages.
export function localBusinessSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${site.name} — ${city.name}`,
    description: city.intro,
    url: absoluteUrl(`/areas/${city.slug}`),
    telephone: site.phone,
    email: site.email,
    image: absoluteUrl("/logo.png"),
    address: postalAddress,
    areaServed: { "@type": "City", name: city.name },
    openingHours: "Mo-Sa 09:00-20:00",
  };
}
