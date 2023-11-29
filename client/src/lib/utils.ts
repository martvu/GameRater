import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @param {ClassValue[]} inputs - tailwind classnames as array
 * @returns tailwind classnames that are merged properly with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(unixTimestampStr: string) {
  const date = new Date(Number(unixTimestampStr) * 1000);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
