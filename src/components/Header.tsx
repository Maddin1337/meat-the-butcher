import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollUtils';
import { SECTION_IDS, ARIA_LABELS } from '../constants';

/**
 * Header-Komponente - Navigation der Website
 * Enthält Desktop- und Mobile-Navigation mit Scroll-Funktionalität
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleScrollToSection = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-butcher-black/90 backdrop-blur-sm border-b border-butcher-red/20">
      <div className="container mx-auto px-4 py-6">
        <div className="relative flex items-center justify-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Hauptnavigation">
            {isHomePage ? (
              <>
                <button
                  onClick={() => handleScrollToSection(SECTION_IDS.HERO)}
                  className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
                  aria-label="Zur Startseite scrollen"
                >
                  HOME
                </button>
                <button
                  onClick={() => handleScrollToSection(SECTION_IDS.FEATURES)}
                  className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
                  aria-label="Zu Features scrollen"
                >
                  FEATURES
                </button>
                <button
                  onClick={() => handleScrollToSection(SECTION_IDS.GALLERY)}
                  className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
                  aria-label="Zur Galerie scrollen"
                >
                  GALERIE
                </button>
                <button
                  onClick={() => handleScrollToSection(SECTION_IDS.CONTACT)}
                  className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
                  aria-label="Zum Kontaktformular scrollen"
                >
                  KONTAKT
                </button>
                <button
                  onClick={() => handleScrollToSection(SECTION_IDS.SOCIAL)}
                  className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
                  aria-label="Zu Social Media scrollen"
                >
                  SOCIAL
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
                aria-label="Zur Startseite"
              >
                HOME
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="absolute right-0 md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? ARIA_LABELS.MENU_CLOSE : ARIA_LABELS.MENU_OPEN}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            id="mobile-navigation"
            className="md:hidden mt-4 pb-4 border-t border-butcher-red/20 pt-4"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col space-y-4">
              {isHomePage ? (
                <>
                  <button
                    onClick={() => handleScrollToSection(SECTION_IDS.HERO)}
                    className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
                    aria-label="Zur Startseite scrollen"
                  >
                    HOME
                  </button>
                  <button
                    onClick={() => handleScrollToSection(SECTION_IDS.FEATURES)}
                    className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
                    aria-label="Zu Features scrollen"
                  >
                    FEATURES
                  </button>
                  <button
                    onClick={() => handleScrollToSection(SECTION_IDS.GALLERY)}
                    className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
                    aria-label="Zur Galerie scrollen"
                  >
                    GALERIE
                  </button>
                  <button
                    onClick={() => handleScrollToSection(SECTION_IDS.CONTACT)}
                    className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
                    aria-label="Zum Kontaktformular scrollen"
                  >
                    KONTAKT
                  </button>
                  <button
                    onClick={() => handleScrollToSection(SECTION_IDS.SOCIAL)}
                    className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
                    aria-label="Zu Social Media scrollen"
                  >
                    SOCIAL
                  </button>
                </>
              ) : (
                <Link
                  to="/"
                  className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Zur Startseite"
                >
                  HOME
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}