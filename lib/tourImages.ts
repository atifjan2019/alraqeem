// Real, openly licensed photos for the tour cards, one entry per slug, arrays
// in the same order as the itinerary, attractions, and gallery data. Every file
// lives under public/images/tours and is sourced from Wikimedia Commons under a
// free licence (CC BY, CC BY SA, CC0, or public domain). Attribution for each
// file sits in the matching public/images/tours/<slug>/_credits.json and on the
// photo credits page. A slot with no entry falls back to the branded panel, so
// nothing ever breaks. The caption still names the entity and feeds the alt.
export type TourImageSet = {
  itinerary?: string[];
  attractions?: string[];
  gallery?: string[];
};

export const tourImages: Record<string, TourImageSet> = {
  "dubai-5-days": {
    itinerary: [
      "/images/tours/dubai/burj-khalifa.jpg",
      "/images/tours/dubai/dubai-mall.jpg",
      "/images/tours/dubai/desert-safari.jpg",
      "/images/tours/dubai/dubai-marina.jpg",
      "/images/tours/dubai/burj-khalifa.jpg",
    ],
    attractions: [
      "/images/tours/dubai/burj-khalifa.jpg",
      "/images/tours/dubai/dubai-mall.jpg",
      "/images/tours/dubai/desert-safari.jpg",
      "/images/tours/dubai/dubai-marina.jpg",
      "/images/tours/dubai/palm-jumeirah.jpg",
      "/images/tours/dubai/abu-dhabi-mosque.jpg",
    ],
    gallery: [
      "/images/tours/dubai/burj-khalifa.jpg",
      "/images/tours/dubai/dubai-mall.jpg",
      "/images/tours/dubai/desert-safari.jpg",
      "/images/tours/dubai/dubai-marina.jpg",
      "/images/tours/dubai/palm-jumeirah.jpg",
      "/images/tours/dubai/abu-dhabi-mosque.jpg",
    ],
  },
};
