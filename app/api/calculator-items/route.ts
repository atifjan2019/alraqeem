import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { parseCalculatorItemBody } from "@/lib/calculatorItemInput";
import {
  addCalculatorItem,
  getCalculatorItems,
} from "@/lib/calculatorItemsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: await getCalculatorItems(true) });
}

export async function POST(request: Request) {
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
    const item = await addCalculatorItem(parsed.input);
    revalidatePath("/admin/calculator");
    revalidatePath("/package-calculator");
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add item.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
