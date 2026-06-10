import CategoriesManager from "@/components/admin/CategoriesManager";
import { getCategories } from "@/lib/categoriesStore";
import { isSupabaseConfigured } from "@/lib/packagesStore";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <p className="eyebrow">Categories</p>
      <h1 className="mt-2 text-3xl">Manage categories</h1>
      <p className="mt-1 text-sm text-slate-500">
        Categories power the filters and grouping for packages and flight deals.
      </p>
      <div className="gold-rule mt-5" />
      <div className="mt-8">
        <CategoriesManager
          initial={categories}
          configured={isSupabaseConfigured}
        />
      </div>
    </div>
  );
}
