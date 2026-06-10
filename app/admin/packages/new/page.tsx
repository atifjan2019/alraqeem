import PackageForm from "@/components/admin/PackageForm";
import { isSupabaseConfigured } from "@/lib/packagesStore";
import { getCategoryNames } from "@/lib/categoriesStore";

export const dynamic = "force-dynamic";

export default async function NewPackagePage() {
  const categoryOptions = await getCategoryNames("package");
  return (
    <div>
      <p className="eyebrow">Packages</p>
      <h1 className="mt-2 text-3xl">Add a package</h1>
      <div className="gold-rule mt-5" />
      <div className="mt-8">
        <PackageForm
          mode="create"
          configured={isSupabaseConfigured}
          categoryOptions={categoryOptions}
        />
      </div>
    </div>
  );
}
