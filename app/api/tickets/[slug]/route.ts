import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateTicket, deleteTicket } from "@/lib/ticketsStore";
import { parseTicketBody } from "@/lib/ticketInput";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = parseTicketBody(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  try {
    const ticket = await updateTicket(slug, parsed.input);
    revalidatePath("/");
    revalidatePath("/tickets");
    return NextResponse.json({ ticket });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update ticket.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await deleteTicket(slug);
    revalidatePath("/");
    revalidatePath("/tickets");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete ticket.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
