// =====================================================================
// EDIT THIS FILE FIRST.
// Every placeholder for Al Raqeem Travel & Tours lives here.
// Change a value once and it updates across the entire website.
// =====================================================================

export const site = {
  name: "Al Raqeem Travel & Tours",
  shortName: "Al Raqeem",
  tagline: "Your trusted partner for Umrah, Hajj and worldwide travel",

  // Live domain. www.alraqeemtravels.com is retired — do not reintroduce it.
  url: "https://alraqeem.com.pk",

  // Primary mobile + WhatsApp (WhatsApp in international format, no + or spaces).
  phone: "03125446922",
  whatsapp: "923125446922",

  // Optional landline / office number. Leave blank if not used.
  landline: "",

  // PLACEHOLDER: replace with real email
  email: "info@alraqeem.com.pk",

  // PLACEHOLDER: replace with exact office address
  address: "Main Bazaar Road, Charsadda, Khyber Pakhtunkhwa, Pakistan",

  hours: "Monday to Saturday, 9:00 AM to 8:00 PM",

  // Sister company
  sisterCompany: "Al Nafi Travels",
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${site.phone.replace(/\s/g, "")}`;
}
