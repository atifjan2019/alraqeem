import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseCalculatorItemBody } from "@/lib/calculatorItemInput";
import {
  deleteCalculatorItem,
  updateCalculatorItem,
} from "@/lib/calculatorItemsStore";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = parseCalculatorItemBody(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  try {
    const item = await updateCalculatorItem(id, parsed.input);
    revalidatePath("/admin/calculator");
    revalidatePath("/package-calculator");
    return NextResponse.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update item.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteCalculatorItem(id);
    revalidatePath("/admin/calculator");
    revalidatePath("/package-calculator");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete item.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
