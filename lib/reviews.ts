// =====================================================================
// Social proof. REAL data only.
// Leave this file empty and the reviews section plus its Review and
// AggregateRating schema render nothing. Populate it with genuine Google
// or client testimonials and the section appears automatically.
// =====================================================================

export type Review = {
  // Reviewer name as shown publicly, e.g. "Imran Khan".
  author: string;
  // Whole or half number from 1 to 5.
  rating: number;
  // The review text in the reviewer's own words.
  text: string;
  // Optional context that ties the review to intent, e.g. "Umrah" or "Peshawar".
  context?: string;
  // Optional ISO date, yyyy-mm-dd.
  date?: string;
};

export type ReviewData = {
  // Public Google Business Profile URL. Shown as a "Read all reviews" link when set.
  profileUrl: string;
  // Overall Google rating, e.g. 4.9. Leave null to omit AggregateRating.
  ratingValue: number | null;
  // Total number of ratings behind ratingValue, e.g. 37. Leave null to omit AggregateRating.
  reviewCount: number | null;
  // Individual named reviews. Three to six reads best.
  reviews: Review[];
};

export const reviewData: ReviewData = {
  profileUrl: "",
  ratingValue: null,
  reviewCount: null,
  reviews: [],
};

// True only when there is genuine review content to show.
export function hasReviews(data: ReviewData = reviewData) {
  return data.reviews.length > 0;
}
