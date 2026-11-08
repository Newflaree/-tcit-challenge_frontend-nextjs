import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Composición de clases Tailwind con deduplicación. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
