import "server-only";
import { getReadClient, getAdminClient } from "@/lib/supabase";
import { seedTickets, type Ticket, type TripType } from "@/lib/tickets";
import type { TicketInput } from "@/lib/ticketInput";

const TABLE = "tickets";

type Row = {
  slug: string;
  airline: string;
  sector: string;
  category: string;
  trip_type: TripType;
  fare: number | null;
  baggage: string | null;
  description: string | null;
  image: string | null;
  featured: boolean | null;
  expiry_date: string | null;
  sort_order: number | null;
};

function rowTo(r: Row): Ticket {
  return {
    slug: r.slug,
    airline: r.airline,
    sector: r.sector,
    category: r.category,
    tripType: r.trip_type,
    fare: r.fare,
    baggage: r.baggage ?? "",
    description: r.description ?? "",
    image: r.image ?? undefined,
    featured: r.featured ?? false,
    expiryDate: r.expiry_date ?? null,
  };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export async function getTickets(): Promise<Ticket[]> {
  const supabase = getReadClient();
  if (!supabase) return seedTickets;
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("airline", { ascending: true });
  if (error || !data) return seedTickets;
  return (data as Row[]).map(rowTo);
}

export async function getTicket(slug: string): Promise<Ticket | undefined> {
  return (await getTickets()).find((t) => t.slug === slug);
}

function toRow(input: TicketInput) {
  return {
    airline: input.airline,
    sector: input.sector,
    category: input.category,
    trip_type: input.tripType,
    fare: input.fare,
    baggage: input.baggage ?? "",
    description: input.description ?? "",
    image: input.image ?? null,
    featured: input.featured ?? false,
    expiry_date: input.expiryDate || null,
  };
}

export async function addTicket(input: TicketInput): Promise<Ticket> {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured.");
  const slug =
    input.slug?.trim() || slugify(`${input.airline}-${input.sector}`);
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ slug, ...toRow(input) })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return rowTo(data as Row);
}

export async function updateTicket(
  slug: string,
  input: TicketInput
): Promise<Ticket> {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured.");
  const { data, error } = await supabase
    .from(TABLE)
    .update(toRow(input))
    .eq("slug", slug)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return rowTo(data as Row);
}

export async function deleteTicket(slug: string): Promise<void> {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured.");
  const { error } = await supabase.from(TABLE).delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}
