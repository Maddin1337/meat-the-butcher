import { Instagram, Facebook } from 'lucide-react';

interface SocialLinkProps {
  icon: React.ReactNode;
  name: string;
  href: string;
}

function SocialLink({ icon, name, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center space-y-3 transition-transform duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-butcher-black rounded-lg p-2"
      aria-label={`${name} Profil von Meat The Butcher öffnen (öffnet in neuem Tab)`}
    >
      <div className="bg-butcher-black-light border-2 border-butcher-red p-6 rounded-full transition-all duration-300 group-hover:bg-butcher-red group-hover:border-butcher-red-light group-hover:shadow-xl group-hover:shadow-butcher-red/50">
        {icon}
      </div>
      <span className="font-bebas text-xl text-gray-300 group-hover:text-butcher-red-light transition-colors">
        {name}
      </span>
    </a>
  );
}

export default function SocialMedia() {
  return (
    <section id="social" className="py-20 px-4 bg-butcher-black-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-6xl md:text-7xl text-white mb-4 tracking-wider">
            FOLGE UNS
          </h2>
          <div className="w-32 h-1 bg-butcher-red mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Bleib auf dem Laufenden über unsere neuesten Events in Euskirchen und Umgebung.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-md mx-auto">
          <SocialLink
            icon={<Instagram className="w-12 h-12 text-white" strokeWidth={2} />}
            name="INSTAGRAM"
            href="https://instagram.com/meatthebutcher2"
          />
          <SocialLink
            icon={<Facebook className="w-12 h-12 text-white" strokeWidth={2} />}
            name="FACEBOOK"
            href="https://www.facebook.com/Meatthebutcher2/"
          />
        </div>

        <div className="mt-16 bg-gradient-to-r from-butcher-red-dark to-butcher-red p-8 md:p-12 text-center">
          <h3 className="font-bebas text-3xl md:text-4xl text-white mb-4 tracking-wide">
            #MEATTHEBUTCHER2
          </h3>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Teile deine BBQ-Erlebnisse mit uns! Markiere uns auf Social Media und nutze unseren
            Hashtag, um Teil unserer Grill-Community zu werden.
          </p>
        </div>
      </div>
    </section>
  );
}
