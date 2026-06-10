import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteCategory } from "@/lib/categoriesStore";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteCategory(id);
    revalidatePath("/");
    revalidatePath("/packages");
    revalidatePath("/tickets");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
