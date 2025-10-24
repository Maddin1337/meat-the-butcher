import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-butcher-black-dark border-t-2 border-butcher-red py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <img
                src="/logo-meatthebutcher.png"
                alt="Meat the Butcher Logo"
                className="w-8 h-8"
              />
              <h3 className="font-bebas text-2xl text-white tracking-wider">
                MEAT THE BUTCHER
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              BBQ Catering vom Profi - Open Kitchen Style für unvergessliche Events
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bebas text-xl text-butcher-red-light mb-4 tracking-wide">
              RECHTLICHES
            </h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <Link
                to="/impressum"
                className="block hover:text-butcher-red transition-colors"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="block hover:text-butcher-red transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Meat the Butcher. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
