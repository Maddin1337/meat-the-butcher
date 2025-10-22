import { useEffect, useRef, useState } from 'react';

interface FeatureSectionProps {
  title: string;
  description: string;
  imagePosition: 'left' | 'right';
  delay?: number;
  image?: string;
}

function FeatureSection({ title, description, imagePosition, delay = 0, image }: FeatureSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 mb-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex-1 relative overflow-hidden rounded-lg shadow-2xl group">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-96 object-cover"
          />
        ) : (
          <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-butcher-red-dark to-butcher-red">
            <div className="w-full h-96 flex items-center justify-center">
              <span className="text-white/30 text-lg font-semibold">Platzhalter Bild</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-butcher-black-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="flex-1 space-y-6">
        <h3 className="font-bebas text-5xl md:text-6xl text-butcher-red-light tracking-wide">
          {title}
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const erlebnisText = "Meat the Butcher steht für authentische Grillkunst, Leidenschaft und kulinarische Perfektion. Wir bieten euch ultimative Grill- und BBQ-Erlebnisse im Open Kitchen Style, bei denen Genuss, Handwerk und Entertainment zu einem unvergesslichen Erlebnis verschmelzen. Direkt vor euren Augen grillen unsere Profis auf Feuerplatten, im Holzbackofen oder auf Kamado-Grills – die Hitze, der Duft und das Knistern der Flammen werden zum Teil des Events.";
  
  const konzeptText = "Ganz gleich ob Fingerfood, exklusive Tapas, frisches Seafood, saftige Steaks oder aromatisches Grillgemüse – wir gestalten gemeinsam mit euch ein maßgeschneidertes BBQ-Event, das perfekt zu eurer Veranstaltung passt. Jedes Detail wird individuell geplant: von der Menüauswahl über kreative Showelemente bis hin zur Präsentation. Dabei stehen Qualität, Regionalität und das besondere Geschmackserlebnis immer im Mittelpunkt.";
  
  const genussText = "Unser Repertoire ist randvoll mit erstklassigen Fleischsorten, talentierten Grillmeistern und den neuesten Trends aus der BBQ-Welt. Doch wir können mehr als nur Fleisch: Auch vegetarische und vegane Grillkreationen gehören zu unserem kulinarischen Repertoire und begeistern mit Raffinesse und Geschmack. BBQ-Entertainment in kulinarischer Perfektion ist unsere Leidenschaft – vom zarten Steak bis zur perfekt gegrillten Aubergine. Wir bringen Feuer, Emotion und Geschmack auf den Punkt und verwandeln euer Event in ein BBQ-Erlebnis, das in Erinnerung bleibt.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="features" className="py-20 px-4" style={{backgroundColor: '#000000'}}>
        <div className="max-w-7xl mx-auto">
          <div
            ref={ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="font-bebas text-6xl md:text-7xl text-white mb-4 tracking-wider">
              FEATURES
            </h2>
            <div className="w-32 h-1 bg-butcher-red mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Entdeckt unsere BBQ-Welt: Erlebnis, Konzept und Genuss in perfekter Harmonie
            </p>
          </div>
          
          <div className="space-y-32">
            <FeatureSection
              title="Born to BBQ"
              description={erlebnisText}
              imagePosition="left"
              delay={0}
              image="/lasse-mo.webp"
            />

            <FeatureSection
              title="Taste the fire"
              description={konzeptText}
              imagePosition="right"
              delay={200}
              image="/burger.webp"
            />

            <FeatureSection
              title="BBQ Experience"
              description={genussText}
              imagePosition="left"
              delay={400}
              image="/grill-beach.webp"
            />
          </div>
        </div>
      </section>
    </>
  );
}
