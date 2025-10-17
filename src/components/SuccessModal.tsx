import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Automatisches Schließen nach 5 Sekunden
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      // Escape-Taste zum Schließen
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Hintergrund-Overlay mit Blur-Effekt */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal-Container */}
      <div className="relative bg-butcher-black border-2 border-butcher-red rounded-lg p-8 max-w-md w-full mx-4 transform transition-all duration-300 animate-scale-in">
        {/* Erfolgs-Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-butcher-red rounded-full p-4 animate-bounce-in">
            <Check className="w-12 h-12 text-white" />
          </div>
        </div>
        
        {/* Erfolgsmeldung */}
        <div className="text-center">
          <h2 className="font-bebas text-3xl md:text-4xl text-white mb-4 tracking-wider">
            ANFRAGE ERFOLGREICH GESENDET
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Vielen Dank! Wir melden uns in Kürze bei Ihnen.
          </p>
          
          {/* Schließen-Button */}
          <button
            onClick={onClose}
            className="bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-xl py-3 px-8 rounded transition-all duration-300 transform hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}