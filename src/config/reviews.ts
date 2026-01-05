/**
 * Google Reviews Konfiguration
 * 
 * Diese Datei enthält die aktuellen Google Review-Daten.
 * Aktualisieren Sie diese Werte regelmäßig, wenn neue Reviews hinzukommen.
 * 
 * Die Werte finden Sie in Ihrem Google Business Profile:
 * - ratingValue: Durchschnittsbewertung (z.B. 5.0)
 * - reviewCount: Anzahl der Reviews (z.B. 33)
 */

export const GOOGLE_REVIEWS = {
  ratingValue: '5.0',
  reviewCount: '33',
  bestRating: '5',
  worstRating: '1',
} as const;

/**
 * Gibt das AggregateRating Schema-Objekt zurück
 */
export const getAggregateRating = () => ({
  '@type': 'AggregateRating' as const,
  ratingValue: GOOGLE_REVIEWS.ratingValue,
  reviewCount: GOOGLE_REVIEWS.reviewCount,
  bestRating: GOOGLE_REVIEWS.bestRating,
  worstRating: GOOGLE_REVIEWS.worstRating,
});

