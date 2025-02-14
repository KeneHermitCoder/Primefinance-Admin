import { parse, isValid } from 'date-fns';

export const toCapitalized = (word: string): string => {
  if (word) {
    return word?.charAt(0)?.toUpperCase() + word.slice(1);
  } else {
    return "";
  }
}

export function isValidDate(dateString: string | Date) {
  const date = new Date(dateString);
  return date && date.toISOString() === dateString;
}

export function formatDateToDDMMYYYY(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatNumberToMultipleCommas(number: number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")?? number;
}

export function formatNumberToMultiplesOfTenString(number: number) {
  if (number >= 1000000000) {
    return `${(number / 1000000000).toFixed(1)}B`;
  } else if (number >= 1000000) {
    return `${(number / 1000000).toFixed(0)}M`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(0)}K`;
  } else {
    return number;
  }
}

/**
 * Parses a date string into a valid JavaScript Date object.
 * Supports multiple date formats.
 * @param dateString - The date string to parse.
 * @returns A valid Date object or null if the date string is invalid.
 */
export function parseDate(dateString: string): Date | null {
  const formats = ['MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd', 'yyyy/MM/dd', 'MM/dd/yy'];

  for (const format of formats) {
    const parsedDate = parse(dateString, format, new Date());
    if (isValid(parsedDate)) return parsedDate;
  }

  return null;
}