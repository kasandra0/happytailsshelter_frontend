// shadCn Utils --------------------------------------------------------------------------
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// --------------------------------------------------------------------------

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  display: string;
}

/**
 * Calculates age from a date of birth string
 * @param dob - Date of birth ISO string (e.g. "2020-03-15")
 * @param referenceDate - Date to calculate age from (defaults to today)
 */
export function calculateAge(dob: string, referenceDate: Date = new Date()): AgeResult {
  // Strip time component before parsing so the date is always treated as local
  // midnight regardless of timezone. Without this, ISO strings like
  // "2025-11-14T00:00:00.000Z" are parsed as UTC midnight, which shifts the
  // date by one day in timezones behind UTC.
  const datePart = dob.split("T")[0];
  const parts = datePart.split("-").map(Number);
  const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);

  if (isNaN(birthDate.getTime()) || parts.length !== 3) {
    throw new Error(`Invalid date of birth: "${dob}"`);
  }

  // Normalise referenceDate to local midnight
  const ref = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  let years = ref.getFullYear() - birthDate.getFullYear();
  let months = ref.getMonth() - birthDate.getMonth();
  let days = ref.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((ref.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  const display = formatAgeDisplay(years, months, days, totalDays);

  return { years, months, days, totalDays, display };
}

function formatAgeDisplay(years: number, months: number, days: number, totalDays: number): string {
  if (years === 0 && months === 0) {
    return days === 1 ? "1 day" : `${days} days`;
  }
  if (years === 0 && months < 3) {
    const totalWeeks = Math.floor(totalDays / 7);
    return totalWeeks === 1 ? "1 week" : `${totalWeeks} weeks`;
  }
  if (years === 0) {
    return months === 1 ? "1 month" : `${months} months`;
  }
  if (years < 2) {
    const monthStr = months > 0 ? ` ${months}mo` : "";
    return `${years}yr${monthStr}`;
  }
  return `${years} years`;
}