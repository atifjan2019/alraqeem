export type TripType = "One-way" | "Return";

export type Ticket = {
  slug: string;
  airline: string;
  sector: string; // e.g. "Islamabad → Jeddah"
  category: string; // dynamic ticket category
  tripType: TripType;
  fare: number | null; // PKR; null = "Call for fare"
  baggage: string; // e.g. "40 kg"
  description: string;
  image?: string;
  featured?: boolean;
  expiryDate?: string | null; // fare validity (ISO yyyy-mm-dd)
};

export const tripTypes: TripType[] = ["One-way", "Return"];

export function formatFare(fare: number | null) {
  if (fare === null) return "Call for fare";
  return `PKR ${fare.toLocaleString("en-PK")}`;
}

// Fallback flight deals used when Supabase is not configured.
export const seedTickets: Ticket[] = [
  {
    slug: "isb-jed-umrah-return",
    airline: "Saudia",
    sector: "Islamabad → Jeddah",
    category: "Umrah & Hajj Flights",
    tripType: "Return",
    fare: 165000,
    baggage: "40 kg",
    description:
      "Direct return fares to Jeddah for Umrah travellers from Islamabad. Limited seats at this rate.",
    featured: true,
    expiryDate: null,
  },
  {
    slug: "pew-jed-umrah-return",
    airline: "Airblue",
    sector: "Peshawar → Jeddah",
    category: "Umrah & Hajj Flights",
    tripType: "Return",
    fare: 158000,
    baggage: "30 kg",
    description:
      "Convenient return fares from Peshawar to Jeddah, ideal for Umrah groups from KP.",
    featured: true,
    expiryDate: null,
  },
  {
    slug: "isb-dxb-return",
    airline: "Emirates",
    sector: "Islamabad → Dubai",
    category: "International Flights",
    tripType: "Return",
    fare: 135000,
    baggage: "30 kg",
    description:
      "Return tickets to Dubai with checked baggage. Great for tourism and visit-visa travellers.",
    featured: true,
    expiryDate: null,
  },
  {
    slug: "lhe-ist-return",
    airline: "Turkish Airlines",
    sector: "Lahore → Istanbul",
    category: "International Flights",
    tripType: "Return",
    fare: 215000,
    baggage: "30 kg",
    description:
      "Return fares to Istanbul on Turkish Airlines. Connect onward across Europe at competitive rates.",
    expiryDate: null,
  },
];
