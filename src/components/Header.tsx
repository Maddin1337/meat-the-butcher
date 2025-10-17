import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-butcher-black/90 backdrop-blur-sm border-b border-butcher-red/20">
      <div className="container mx-auto px-4 py-6">
        <div className="relative flex items-center justify-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
            >
              FEATURES
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
            >
              GALERIE
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
            >
              KONTAKT
            </button>
            <button
              onClick={() => scrollToSection('social')}
              className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide"
            >
              SOCIAL
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="absolute right-0 md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-butcher-red/20 pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
              >
                FEATURES
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
              >
                GALERIE
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
              >
                KONTAKT
              </button>
              <button
                onClick={() => scrollToSection('social')}
                className="text-white hover:text-butcher-red transition-colors font-bebas text-xl tracking-wide text-left"
              >
                SOCIAL
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}