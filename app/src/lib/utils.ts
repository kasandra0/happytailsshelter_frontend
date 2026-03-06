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
 * @param dob - Date of birth string (e.g. "2020-03-15", "03/15/2020", "March 15, 2020")
 * @param referenceDate - Date to calculate age from (defaults to today)
 */
export function calculateAge(dob: string, referenceDate: Date = new Date()): AgeResult {
  const birthDate = new Date(dob);

  if (isNaN(birthDate.getTime())) {
    throw new Error(`Invalid date of birth: "${dob}"`);
  }

  let years = referenceDate.getFullYear() - birthDate.getFullYear();
  let months = referenceDate.getMonth() - birthDate.getMonth();
  let days = referenceDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((referenceDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  const display = formatAgeDisplay(years, months, days);

  return { years, months, days, totalDays, display };
}

function formatAgeDisplay(years: number, months: number, days: number): string {
  if (years === 0 && months === 0) {
    return days === 1 ? "1 day" : `${days} days`;
  }
  if (years === 0 && months < 3) {
    const totalWeeks = Math.floor((months * 30 + days) / 7);
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