import {
  calculatorCategories,
  calculatorUnits,
  roomTypes,
  type CalculatorCategory,
  type CalculatorItem,
  type CalculatorUnit,
  type DateRate,
  type RoomType,
} from "@/lib/calculatorItems";

export type CalculatorItemInput = Omit<CalculatorItem, "id">;
type ParseResult = { input: CalculatorItemInput } | { error: string };

export function parseCalculatorItemBody(
  body: Record<string, unknown>
): ParseResult {
  const name = String(body.name ?? "").trim();
  const category = String(body.category ?? "") as CalculatorCategory;
  const location = String(body.location ?? "").trim();
  const requestedRoomType = String(body.roomType ?? "").toLowerCase() as RoomType;
  const unit = String(body.unit ?? "") as CalculatorUnit;
  const description = String(body.description ?? "").trim();
  const price = Number(body.price);
  const sortOrder = Number(body.sortOrder ?? 0);

  if (!name) return { error: "Name is required." };
  if (!calculatorCategories.includes(category)) {
    return { error: "Choose a valid item category." };
  }
  if (!calculatorUnits.includes(unit)) {
    return { error: "Choose a valid charging basis." };
  }
  if (
    category === "visa" &&
    (unit === "per_person_night" || unit === "per_room_night")
  ) {
    return { error: "Visa prices cannot use a per-night charging basis." };
  }
  if (category === "hotel" && !roomTypes.includes(requestedRoomType)) {
    return { error: "Choose Sharing, Quad, Triple, or Double room type." };
  }
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Price must be zero or a positive number." };
  }

  const dateRates: DateRate[] = [];
  if (Array.isArray(body.dateRates)) {
    for (const raw of body.dateRates) {
      if (!raw || typeof raw !== "object") continue;
      const rate = raw as Record<string, unknown>;
      const startDate = String(rate.startDate ?? "");
      const endDate = String(rate.endDate ?? "");
      const rawRatePrice = rate.price;
      const ratePrice = Number(rawRatePrice);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(startDate) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(endDate) ||
        endDate < startDate ||
        rawRatePrice === "" ||
        rawRatePrice === null ||
        rawRatePrice === undefined ||
        !Number.isFinite(ratePrice) ||
        ratePrice < 0
      ) {
        return { error: "Every date rate needs valid From, To, and Price values." };
      }
      dateRates.push({ startDate, endDate, price: Math.round(ratePrice) });
    }
  }
  dateRates.sort((a, b) => a.startDate.localeCompare(b.startDate));
  for (let index = 1; index < dateRates.length; index += 1) {
    if (dateRates[index].startDate <= dateRates[index - 1].endDate) {
      return { error: "Date-based price periods cannot overlap." };
    }
  }

  return {
    input: {
      name,
      category,
      roomType: category === "hotel" ? requestedRoomType : null,
      location: category === "visa" ? "" : location,
      price: Math.round(price),
      dateRates:
        unit === "per_room_night" || unit === "per_person_night"
          ? dateRates
          : [],
      unit,
      description,
      active: body.active !== false,
      sortOrder: Number.isFinite(sortOrder) ? Math.round(sortOrder) : 0,
    },
  };
}
