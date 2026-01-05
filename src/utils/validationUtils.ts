/**
 * Utility-Funktionen für Formular-Validierung
 */

import { VALIDATION } from '../constants';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FormField {
  name: string;
  value: string;
  required?: boolean;
  type?: 'email' | 'tel' | 'number' | 'date' | 'text';
  min?: number;
  max?: number;
}

/**
 * Validiert eine E-Mail-Adresse
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email);
}

/**
 * Validiert eine Telefonnummer (einfache Validierung)
 */
export function isValidPhone(phone: string): boolean {
  // Entferne Leerzeichen, Bindestriche und Pluszeichen für die Validierung
  const cleaned = phone.replace(/[\s\-+()]/g, '');
  // Mindestens 10 Ziffern
  return /^\d{10,}$/.test(cleaned);
}

/**
 * Validiert eine Anzahl (Gäste, etc.)
 */
export function isValidCount(value: string, min: number = VALIDATION.MIN_GUESTS): boolean {
  const num = Number(value);
  return !isNaN(num) && num >= min && Number.isInteger(num);
}

/**
 * Validiert ein Datum
 */
export function isValidDate(dateString: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validiert ein Pflichtfeld
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Generiert Validierungsfehler für ein Formular
 */
export function validateFormField(
  field: FormField,
  value: string
): string | undefined {
  if (field.required && !isRequired(value)) {
    return `${field.name} ist erforderlich`;
  }

  if (!value.trim()) {
    return undefined; // Leere nicht-pflichtige Felder sind OK
  }

  switch (field.type) {
    case 'email':
      if (!isValidEmail(value)) {
        return 'Ungültige E-Mail-Adresse';
      }
      break;
    case 'tel':
      if (!isValidPhone(value)) {
        return 'Ungültige Telefonnummer';
      }
      break;
    case 'number':
      if (!isValidCount(value, field.min)) {
        return field.min
          ? `Bitte geben Sie eine gültige Anzahl ein (mindestens ${field.min})`
          : 'Bitte geben Sie eine gültige Anzahl ein';
      }
      break;
    case 'date':
      if (!isValidDate(value)) {
        return 'Ungültiges Datum';
      }
      break;
  }

  return undefined;
}

