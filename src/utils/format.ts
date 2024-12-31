import { parse, isValid } from 'date-fns';

export const toCapitalized = (word: string): string => {
  if (word) {
    return word?.charAt(0)?.toUpperCase() + word.slice(1);
  } else {
    return "";
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