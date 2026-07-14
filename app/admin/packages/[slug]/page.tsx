import { notFound } from "next/navigation";
import PackageForm from "@/components/admin/PackageForm";
import { getDbPackage, isSupabaseConfigured } from "@/lib/packagesStore";
import { getCategoryNames } from "@/lib/categoriesStore";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getDbPackage(slug);
  if (!pkg) notFound();
  const categoryOptions = await getCategoryNames("package");

  return (
    <div>
      <p className="eyebrow">Packages</p>
      <h1 className="mt-2 text-3xl">Edit package</h1>
      <p className="mt-1 text-sm text-slate-500">{pkg.title}</p>
      <div className="gold-rule mt-5" />
      <div className="mt-8">
        <PackageForm
          mode="edit"
          initial={pkg}
          configured={isSupabaseConfigured}
          categoryOptions={categoryOptions}
        />
      </div>
    </div>
  );
}
