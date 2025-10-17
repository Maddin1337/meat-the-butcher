import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, RECIPIENT_EMAIL } from '../config/emailjs';
import SuccessModal from './SuccessModal';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  guests?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guests: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event-Datum ist erforderlich';
    }

    if (!formData.guests.trim()) {
      newErrors.guests = 'Anzahl der Gäste ist erforderlich';
    } else if (isNaN(Number(formData.guests)) || Number(formData.guests) <= 0) {
      newErrors.guests = 'Bitte geben Sie eine gültige Anzahl ein';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS initialisieren
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      
      // E-Mail-Parameter vorbereiten
      const emailParams = {
        to_email: RECIPIENT_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        event_date: formData.eventDate,
        guests: formData.guests,
        message: formData.message,
      };

      // E-Mail senden
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        emailParams
      );

      if (response.status === 200) {
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          guests: '',
          message: '',
        });
      } else {
        throw new Error('E-Mail konnte nicht gesendet werden');
      }
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail:', error);
      alert('Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 px-4" style={{backgroundColor: '#000000'}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-6xl md:text-7xl text-white mb-4 tracking-wider">
            KONTAKT
          </h2>
          <div className="w-32 h-1 bg-butcher-red mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Bereit für ein unvergessliches BBQ-Erlebnis? Kontaktiert uns für euer Event!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-butcher-red p-3 rounded-full mt-1">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bebas text-2xl text-butcher-red-light mb-2">E-MAIL</h3>
                <p className="text-gray-300">meatthebutcher@web.de</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-butcher-red p-3 rounded-full mt-1">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bebas text-2xl text-butcher-red-light mb-2">TELEFON</h3>
                <p className="text-gray-300">+49 (0) 163 265 6288</p>
              </div>
            </div>


            <div className="bg-butcher-black-light p-8 border-2 border-butcher-red mt-8">
              <h3 className="font-bebas text-3xl text-white mb-4 tracking-wide">
                WARUM UNS WÄHLEN?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Grillkunst mit Leidenschaft und Präzision</span>
                </li>
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Premium-Fleisch & Zutaten in Spitzenqualität</span>
                </li>
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Individuelle BBQ-Konzepte für jedes Event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Live-Cooking mit Showfaktor und Flammenmagie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Genussmomente auch für Veganer & Vegetarier</span>
                </li>
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Rundum-Service für ein unvergessliches BBQ-Erlebnis</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-butcher-black-light p-8 border-2 border-butcher-red">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-butcher-black border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } text-white px-4 py-3 focus:border-butcher-red focus:outline-none transition-colors`}
                  placeholder="Ihr Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-butcher-black border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } text-white px-4 py-3 focus:border-butcher-red focus:outline-none transition-colors`}
                  placeholder="ihre@email.de"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-butcher-black border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  } text-white px-4 py-3 focus:border-butcher-red focus:outline-none transition-colors`}
                  placeholder="+49 123 456789"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Event-Datum *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={`w-full bg-butcher-black border-2 ${
                      errors.eventDate ? 'border-red-500' : 'border-gray-600'
                    } text-white px-4 py-3 focus:border-butcher-red focus:outline-none transition-colors`}
                  />
                  {errors.eventDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-semibold text-gray-300 mb-2">
                    Anzahl Gäste *
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className={`w-full bg-butcher-black border-2 ${
                      errors.guests ? 'border-red-500' : 'border-gray-600'
                    } text-white px-4 py-3 focus:border-butcher-red focus:outline-none transition-colors`}
                    placeholder="50"
                    min="1"
                  />
                  {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-butcher-black border-2 ${
                    errors.message ? 'border-red-500' : 'border-gray-600'
                  } text-white px-4 py-3 focus:border-butcher-red focus:outline-none transition-colors resize-none`}
                  placeholder="Erzählen Sie uns von Ihrem Event..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-2xl py-4 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>WIRD GESENDET...</span>
                ) : (
                  <>
                    <span>ANFRAGE SENDEN</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* SuccessModal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </section>
  );
}
