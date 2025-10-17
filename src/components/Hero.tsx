import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex items-start justify-center overflow-hidden pt-16 md:pt-20 lg:pt-24 pb-0 mb-0">
      <div
        className="absolute inset-0 bg-gradient-to-br from-butcher-black via-butcher-red-dark to-butcher-black opacity-90 md:opacity-90"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto fade-in">
        <div className="flex justify-center mb-4 md:mb-6 lg:mb-8">
          <img
            src="/logo-meatthebutcher.png"
            alt="Meat The Butcher"
            className="h-80 md:h-72 lg:h-80 xl:h-96 2xl:h-[24rem] object-contain drop-shadow-2xl"
          />
        </div>

        <p className="text-3xl md:text-4xl lg:text-5xl font-roboto-slab font-semibold text-butcher-red-light mb-4 md:mb-6 lg:mb-8 text-shadow-strong">
          BBQ <span className="text-white mr-2 font-bebas text-4xl md:text-5xl lg:text-6xl font-bold">Catering</span>vom Profi
        </p>

        <p className="text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-300 mb-6 md:mb-8 lg:mb-10 max-w-3xl lg:max-w-4xl mx-auto font-bold px-2">
          Ultimative Grill und BBQ Erlebnisse im "<span className="text-white">Open Kitchen Style</span>"
        </p>

        <button
          onClick={() => scrollToSection('contact')}
          className="bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-2xl md:text-3xl lg:text-3xl xl:text-4xl px-12 py-4 md:py-5 lg:py-5 xl:py-6 rounded-none transition-all duration-300 transform hover:scale-105 glow-red mb-6 md:mb-8 lg:mb-10"
        >
          JETZT ANFRAGEN
        </button>
      </div>

      <div
        onClick={() => scrollToSection('features')}
        className="absolute bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer float-animation"
      >
        <ChevronDown className="w-8 h-8 md:w-10 md:h-10 text-butcher-red" strokeWidth={2} />
      </div>
    </section>
  );
}
