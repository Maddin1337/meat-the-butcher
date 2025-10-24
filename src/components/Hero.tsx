
import { IconChevronDown } from '@tabler/icons-react';
import FireAnimation from './FireAnimation';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-8 mb-0 hero-responsive">
      {/* Feuer-Canvas-Hintergrund */}
      <FireAnimation />
      
      <div
        className="absolute inset-0 bg-gradient-to-br from-butcher-black via-butcher-red-dark to-butcher-black opacity-70 md:opacity-70"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto fade-in flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="flex justify-center mb-2 md:mb-0 lg:mb-0 xl:mb-0">
          <img
            src="/logo-meatthebutcher.png"
            alt="Meat The Butcher"
            className="h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80 2xl:h-96 object-contain drop-shadow-2xl hero-logo-responsive hero-logo-mobile"
          />
        </div>

        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-roboto-slab font-semibold text-butcher-red-light mb-3 md:mb-4 lg:mb-6 xl:mb-8 text-shadow-strong hero-title-responsive hero-title-mobile">
          BBQ <span className="text-white mr-2 font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Catering</span>vom Profi
        </p>

        <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-300 mb-4 md:mb-6 lg:mb-8 xl:mb-10 max-w-3xl lg:max-w-4xl mx-auto font-bold px-2 hero-subtitle-responsive hero-subtitle-mobile">
          Ultimative Grill und BBQ Erlebnisse im "<span className="text-white">Open Kitchen Style</span>"
        </p>

        <div className="hero-button-container flex flex-col items-center mt-8 md:mt-0">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 lg:py-5 xl:py-6 rounded-none transition-all duration-300 transform hover:scale-105 glow-red mb-4 md:mb-6 lg:mb-8 xl:mb-10 hero-button-responsive hero-button-mobile"
          >
            JETZT ANFRAGEN
          </button>
          
          {/* Pulsierender Pfeil - auf mobilen Geräten direkt unter dem Button */}
          <div
            onClick={() => scrollToSection('features')}
            className="md:hidden cursor-pointer float-animation mb-6"
          >
            <IconChevronDown
              size={40}
              className="w-8 h-8 text-butcher-red"
              strokeWidth={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
