/**
 * Utility-Funktionen für Scroll-Operationen
 */

import { SECTION_IDS, SCROLL_BEHAVIOR } from '../constants';

/**
 * Scrollt zu einem Element mit der angegebenen ID
 * @param id - Die ID des Elements, zu dem gescrollt werden soll
 * @param behavior - Das Scroll-Verhalten (default: 'smooth')
 */
export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = SCROLL_BEHAVIOR.SMOOTH
): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior });
    // Fokus auf das Element setzen für bessere Accessibility
    element.focus({ preventScroll: true });
  }
}

/**
 * Scrollt zur Hero-Sektion
 */
export function scrollToHero(): void {
  scrollToSection(SECTION_IDS.HERO);
}

/**
 * Scrollt zur Features-Sektion
 */
export function scrollToFeatures(): void {
  scrollToSection(SECTION_IDS.FEATURES);
}

/**
 * Scrollt zur Galerie-Sektion
 */
export function scrollToGallery(): void {
  scrollToSection(SECTION_IDS.GALLERY);
}

/**
 * Scrollt zur Kontakt-Sektion
 */
export function scrollToContact(): void {
  scrollToSection(SECTION_IDS.CONTACT);
}

/**
 * Scrollt zur Social-Media-Sektion
 */
export function scrollToSocial(): void {
  scrollToSection(SECTION_IDS.SOCIAL);
}

