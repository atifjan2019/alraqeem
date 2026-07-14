import {
  calculatorCategories,
  calculatorUnits,
  type CalculatorCategory,
  type CalculatorItem,
  type CalculatorUnit,
} from "@/lib/calculatorItems";

export type CalculatorItemInput = Omit<CalculatorItem, "id">;
type ParseResult = { input: CalculatorItemInput } | { error: string };

export function parseCalculatorItemBody(
  body: Record<string, unknown>
): ParseResult {
  const name = String(body.name ?? "").trim();
  const category = String(body.category ?? "") as CalculatorCategory;
  const location = String(body.location ?? "").trim();
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
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Price must be zero or a positive number." };
  }

  return {
    input: {
      name,
      category,
      location,
      price: Math.round(price),
      unit,
      description,
      active: body.active !== false,
      sortOrder: Number.isFinite(sortOrder) ? Math.round(sortOrder) : 0,
    },
  };
}
