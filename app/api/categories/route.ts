import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCategories, addCategory } from "@/lib/categoriesStore";
import type { CategoryType } from "@/lib/categories";

export const dynamic = "force-dynamic";

const TYPES: CategoryType[] = ["package", "ticket"];

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") as
    | CategoryType
    | null;
  const categories = await getCategories(type ?? undefined);
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const name = String(body.name ?? "").trim();
  const type = String(body.type ?? "") as CategoryType;
  const sortOrder = Number(body.sortOrder ?? 0) || 0;

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!TYPES.includes(type)) {
    return NextResponse.json(
      { error: "Type must be 'package' or 'ticket'." },
      { status: 400 }
    );
  }
  try {
    const category = await addCategory(name, type, sortOrder);
    revalidatePath("/");
    revalidatePath("/packages");
    revalidatePath("/tickets");
    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
