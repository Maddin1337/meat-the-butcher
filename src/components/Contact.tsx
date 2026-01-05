import { useCallback, useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, RECIPIENT_EMAIL } from '../config/emailjs';
import SuccessModal from './SuccessModal';
import { isValidEmail, isValidCount, isValidDate, isRequired } from '../utils/validationUtils';
import { VALIDATION, ERROR_MESSAGES } from '../constants';

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

const FORM_STORAGE_KEY = 'meatthebutcher_contact_form';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(() => {
    // Lade gespeicherte Daten aus LocalStorage beim Initialisieren
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch {
        return {
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          guests: '',
          message: '',
        };
      }
    }
    return {
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      guests: '',
      message: '',
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const firstErrorRef = useRef<HTMLDivElement>(null);

  // Speichere Formulardaten im LocalStorage bei Änderungen
  useEffect(() => {
    const hasData = Object.values(formData).some(value => value.trim() !== '');
    if (hasData) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  // Validiere einzelnes Feld inline
  const validateField = useCallback((name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!isRequired(value)) {
          return 'Name ist erforderlich';
        }
        break;
      case 'email':
        if (!isRequired(value)) {
          return 'E-Mail ist erforderlich';
        } else if (!isValidEmail(value)) {
          return 'Ungültige E-Mail-Adresse';
        }
        break;
      case 'phone':
        if (!isRequired(value)) {
          return 'Telefonnummer ist erforderlich';
        }
        break;
      case 'eventDate':
        if (!isValidDate(value)) {
          return 'Event-Datum ist erforderlich';
        }
        break;
      case 'guests':
        if (!isRequired(value)) {
          return 'Anzahl der Gäste ist erforderlich';
        } else if (!isValidCount(value, VALIDATION.MIN_GUESTS)) {
          return 'Bitte geben Sie eine gültige Anzahl ein';
        }
        break;
      case 'message':
        if (!isRequired(value)) {
          return 'Nachricht ist erforderlich';
        }
        break;
    }
    return undefined;
  }, []);

  // Prüfe ob ein Feld gültig ist (für visuelles Feedback)
  const isFieldValid = useCallback((name: keyof FormData): boolean => {
    const value = formData[name];
    if (!touched[name] || !value) return false;
    return !validateField(name, value);
  }, [formData, touched, validateField]);

  /**
   * Validiert das gesamte Formular
   * @returns true wenn das Formular gültig ist, sonst false
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Name validieren
    if (!isRequired(formData.name)) {
      newErrors.name = 'Name ist erforderlich';
    }

    // E-Mail validieren
    if (!isRequired(formData.email)) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    // Telefon validieren
    if (!isRequired(formData.phone)) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    }

    // Datum validieren
    if (!isValidDate(formData.eventDate)) {
      newErrors.eventDate = 'Event-Datum ist erforderlich';
    }

    // Gäste validieren
    if (!isRequired(formData.guests)) {
      newErrors.guests = 'Anzahl der Gäste ist erforderlich';
    } else if (!isValidCount(formData.guests, VALIDATION.MIN_GUESTS)) {
      newErrors.guests = 'Bitte geben Sie eine gültige Anzahl ein';
    }

    // Nachricht validieren
    if (!isRequired(formData.message)) {
      newErrors.message = 'Nachricht ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Markiere alle Felder als "touched"
    const allFields: (keyof FormData)[] = ['name', 'email', 'phone', 'eventDate', 'guests', 'message'];
    setTouched(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as Record<string, boolean>)
    );

    if (!validateForm()) {
      // Scrolle zum ersten Fehler
      setTimeout(() => {
        const firstErrorElement = formRef.current?.querySelector('.error-field') as HTMLElement;
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorElement.focus();
        }
      }, 100);
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
        // Lösche gespeicherte Daten nach erfolgreichem Senden
        localStorage.removeItem(FORM_STORAGE_KEY);
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          guests: '',
          message: '',
        });
        setTouched({});
        setErrors({});
      } else {
        throw new Error('E-Mail konnte nicht gesendet werden');
      }
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail:', error);
      alert(ERROR_MESSAGES.EMAIL_SEND_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    
    // Markiere Feld als "touched" wenn der Benutzer etwas eingibt
    if (!touched[fieldName]) {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
    }
    
    // Inline-Validierung
    const error = validateField(fieldName, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [errors, touched, validateField]);

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    
    // Markiere Feld als "touched" beim Verlassen
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    
    // Validiere beim Verlassen des Feldes
    const error = validateField(fieldName, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [validateField]);

  return (
    <section id="contact" className="py-20 px-4" style={{backgroundColor: '#000000'}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-6xl md:text-7xl text-white mb-4 tracking-wider">
            KONTAKT
          </h2>
          <div className="w-32 h-1 bg-butcher-red mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Bereit für ein unvergessliches BBQ-Erlebnis? Kontaktiert uns für euer Event Catering in Euskirchen, Region Euskirchen und Umgebung!
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
                  <span>Grillkunst mit Leidenschaft und Präzision - Ihr Catering Service in Euskirchen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Premium-Fleisch & Zutaten in Spitzenqualität</span>
                </li>
                <li className="flex items-start">
                  <span className="text-butcher-red mr-2">▸</span>
                  <span>Individuelle BBQ-Konzepte für jedes Event in Euskirchen, Kreis Euskirchen und Umgebung</span>
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>

              <div ref={errors.name ? firstErrorRef : null} className={errors.name ? 'error-field' : ''}>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : isFieldValid('name') ? 'name-success' : undefined}
                    className={`w-full bg-butcher-black border-2 ${
                      errors.name 
                        ? 'border-red-500' 
                        : isFieldValid('name')
                        ? 'border-green-500'
                        : 'border-gray-600'
                    } text-white px-4 py-3 pr-10 focus:border-butcher-red focus:outline-none transition-colors`}
                    placeholder="Ihr Name"
                  />
                  {isFieldValid('name') && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
                  )}
                </div>
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={errors.email ? 'error-field' : ''}>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  E-Mail *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : isFieldValid('email') ? 'email-success' : undefined}
                    className={`w-full bg-butcher-black border-2 ${
                      errors.email 
                        ? 'border-red-500' 
                        : isFieldValid('email')
                        ? 'border-green-500'
                        : 'border-gray-600'
                    } text-white px-4 py-3 pr-10 focus:border-butcher-red focus:outline-none transition-colors`}
                    placeholder="ihre@email.de"
                  />
                  {isFieldValid('email') && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
                  )}
                </div>
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className={errors.phone ? 'error-field' : ''}>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                  Telefon *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : isFieldValid('phone') ? 'phone-success' : undefined}
                    className={`w-full bg-butcher-black border-2 ${
                      errors.phone 
                        ? 'border-red-500' 
                        : isFieldValid('phone')
                        ? 'border-green-500'
                        : 'border-gray-600'
                    } text-white px-4 py-3 pr-10 focus:border-butcher-red focus:outline-none transition-colors`}
                    placeholder="+49 123 456789"
                  />
                  {isFieldValid('phone') && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
                  )}
                </div>
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={errors.eventDate ? 'error-field' : ''}>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Event-Datum *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.eventDate ? 'true' : 'false'}
                      aria-describedby={errors.eventDate ? 'eventDate-error' : isFieldValid('eventDate') ? 'eventDate-success' : undefined}
                      className={`w-full bg-butcher-black border-2 ${
                        errors.eventDate 
                          ? 'border-red-500' 
                          : isFieldValid('eventDate')
                          ? 'border-green-500'
                          : 'border-gray-600'
                      } text-white px-4 py-3 pr-10 focus:border-butcher-red focus:outline-none transition-colors`}
                    />
                    {isFieldValid('eventDate') && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
                    )}
                  </div>
                  {errors.eventDate && (
                    <p id="eventDate-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.eventDate}
                    </p>
                  )}
                </div>

                <div className={errors.guests ? 'error-field' : ''}>
                  <label htmlFor="guests" className="block text-sm font-semibold text-gray-300 mb-2">
                    Anzahl Gäste *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.guests ? 'true' : 'false'}
                      aria-describedby={errors.guests ? 'guests-error' : isFieldValid('guests') ? 'guests-success' : undefined}
                      className={`w-full bg-butcher-black border-2 ${
                        errors.guests 
                          ? 'border-red-500' 
                          : isFieldValid('guests')
                          ? 'border-green-500'
                          : 'border-gray-600'
                      } text-white px-4 py-3 pr-10 focus:border-butcher-red focus:outline-none transition-colors`}
                      placeholder="50"
                      min="1"
                    />
                    {isFieldValid('guests') && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" aria-hidden="true" />
                    )}
                  </div>
                  {errors.guests && (
                    <p id="guests-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.guests}
                    </p>
                  )}
                </div>
              </div>

              <div className={errors.message ? 'error-field' : ''}>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Nachricht *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : isFieldValid('message') ? 'message-success' : undefined}
                    className={`w-full bg-butcher-black border-2 ${
                      errors.message 
                        ? 'border-red-500' 
                        : isFieldValid('message')
                        ? 'border-green-500'
                        : 'border-gray-600'
                    } text-white px-4 py-3 pr-10 focus:border-butcher-red focus:outline-none transition-colors resize-none`}
                    placeholder="Erzählen Sie uns von Ihrem Event..."
                  />
                  {isFieldValid('message') && (
                    <Check className="absolute right-3 top-3 w-5 h-5 text-green-500" aria-hidden="true" />
                  )}
                </div>
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-2xl py-4 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-butcher-black"
                aria-label="Kontaktanfrage senden"
                aria-busy={isSubmitting}
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
