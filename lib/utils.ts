import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names while resolving Tailwind conflicts.
 * Used by every UI component (shadcn convention).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
