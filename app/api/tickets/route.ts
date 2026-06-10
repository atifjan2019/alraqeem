import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTickets, addTicket } from "@/lib/ticketsStore";
import { parseTicketBody } from "@/lib/ticketInput";

export const dynamic = "force-dynamic";

export async function GET() {
  const tickets = await getTickets();
  return NextResponse.json({ tickets });
}

export async function POST(request: Request) {
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
    const ticket = await addTicket(parsed.input);
    revalidatePath("/");
    revalidatePath("/tickets");
    return NextResponse.json({ ticket }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add ticket.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
