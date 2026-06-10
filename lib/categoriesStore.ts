import "server-only";
import { getReadClient, getAdminClient } from "@/lib/supabase";
import {
  seedCategories,
  seedCategoryNames,
  type CategoryItem,
  type CategoryType,
} from "@/lib/categories";

const TABLE = "categories";

type Row = {
  id: string;
  name: string;
  type: CategoryType;
  sort_order: number | null;
};

function rowTo(r: Row): CategoryItem {
  return { id: r.id, name: r.name, type: r.type, sortOrder: r.sort_order ?? 0 };
}

/** All categories (optionally filtered by type). Falls back to seed. */
export async function getCategories(
  type?: CategoryType
): Promise<CategoryItem[]> {
  const supabase = getReadClient();
  if (!supabase) {
    return type ? seedCategories.filter((c) => c.type === type) : seedCategories;
  }
  let query = supabase
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (type) query = query.eq("type", type);

  const { data, error } = await query;
  if (error || !data) {
    return type ? seedCategories.filter((c) => c.type === type) : seedCategories;
  }
  return (data as Row[]).map(rowTo);
}

/** Just the names of a category type (used by selects + grouping). */
export async function getCategoryNames(type: CategoryType): Promise<string[]> {
  const supabase = getReadClient();
  if (!supabase) return seedCategoryNames(type);
  const cats = await getCategories(type);
  return cats.map((c) => c.name);
}

export async function addCategory(
  name: string,
  type: CategoryType,
  sortOrder = 0
): Promise<CategoryItem> {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured.");
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ name: name.trim(), type, sort_order: sortOrder })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return rowTo(data as Row);
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured.");
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}
