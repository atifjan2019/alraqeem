export type CategoryType = "package" | "ticket";

export type CategoryItem = {
  id?: string;
  name: string;
  type: CategoryType;
  sortOrder?: number;
};

// Fallback categories used when Supabase is not configured.
export const seedCategories: CategoryItem[] = [
  { name: "Umrah & Hajj", type: "package", sortOrder: 10 },
  { name: "International", type: "package", sortOrder: 20 },
  { name: "Umrah & Hajj Flights", type: "ticket", sortOrder: 10 },
  { name: "International Flights", type: "ticket", sortOrder: 20 },
];

export function seedCategoryNames(type: CategoryType): string[] {
  return seedCategories
    .filter((c) => c.type === type)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((c) => c.name);
}
