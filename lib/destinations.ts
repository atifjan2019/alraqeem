// One data file for the two column destination directory. Each entry is a
// destination, its slug, the category, and whether the page is live. The
// directory block reads this, so adding a destination is a new entry here, and
// it appears as a link only when live is true. Roadmap entries (live false) are
// listed so the queue is in one place, but the block omits them, never a dead
// link. The href derives from the slug through the silo route map.
export type DirectoryCategory = "international" | "pakistan";

export type Destination = {
  name: string;
  slug: string;
  category: DirectoryCategory;
  live: boolean;
};

export const destinations: Destination[] = [
  // International, live
  { name: "Dubai", slug: "dubai-5-days", category: "international", live: true },
  { name: "Turkey", slug: "turkey-7-days", category: "international", live: true },
  { name: "Baku", slug: "baku-5-days", category: "international", live: true },
  { name: "Malaysia", slug: "malaysia", category: "international", live: true },
  { name: "Thailand", slug: "thailand", category: "international", live: true },
  { name: "Singapore", slug: "singapore", category: "international", live: true },
  { name: "Malaysia and Thailand", slug: "malaysia-thailand-8-days", category: "international", live: true },
  { name: "Malaysia, Thailand and Singapore", slug: "malaysia-thailand-singapore", category: "international", live: true },
  // International, roadmap
  { name: "Maldives", slug: "maldives", category: "international", live: false },
  { name: "Saudi Arabia", slug: "saudi-arabia", category: "international", live: false },
  { name: "Indonesia", slug: "indonesia", category: "international", live: false },
  { name: "Sri Lanka", slug: "sri-lanka", category: "international", live: false },
  { name: "Egypt", slug: "egypt", category: "international", live: false },
  { name: "Morocco", slug: "morocco", category: "international", live: false },
  { name: "Uzbekistan", slug: "uzbekistan", category: "international", live: false },
  { name: "Georgia", slug: "georgia", category: "international", live: false },
  { name: "Qatar", slug: "qatar", category: "international", live: false },

  // Pakistan, live
  { name: "Swat", slug: "swat", category: "pakistan", live: true },
  { name: "Kumrat Valley", slug: "kumrat-valley", category: "pakistan", live: true },
  { name: "Kalash Valley", slug: "kalash-valley", category: "pakistan", live: true },
  { name: "Chitral", slug: "chitral", category: "pakistan", live: true },
  { name: "Naran and Kaghan", slug: "naran-kaghan", category: "pakistan", live: true },
  { name: "Hunza", slug: "hunza", category: "pakistan", live: true },
  { name: "Skardu", slug: "skardu", category: "pakistan", live: true },
  // Pakistan, roadmap
  { name: "Kalam", slug: "kalam", category: "pakistan", live: false },
  { name: "Malam Jabba", slug: "malam-jabba", category: "pakistan", live: false },
  { name: "Shogran", slug: "shogran", category: "pakistan", live: false },
  { name: "Dir", slug: "dir", category: "pakistan", live: false },
  { name: "Fairy Meadows", slug: "fairy-meadows", category: "pakistan", live: false },
  { name: "Gilgit", slug: "gilgit", category: "pakistan", live: false },
  { name: "Kashmir", slug: "kashmir", category: "pakistan", live: false },
  { name: "Neelum Valley", slug: "neelum-valley", category: "pakistan", live: false },
  { name: "Murree", slug: "murree", category: "pakistan", live: false },
  { name: "Lahore", slug: "lahore", category: "pakistan", live: false },
];

// Live destinations for one column, in the file's priority order, capped so the
// block stays tight; the rest sit on the sub hub behind View more.
export function liveDestinations(
  category: DirectoryCategory,
  cap = 14
): Destination[] {
  return destinations
    .filter((d) => d.category === category && d.live)
    .slice(0, cap);
}
