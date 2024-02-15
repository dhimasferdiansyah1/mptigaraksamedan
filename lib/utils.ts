import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid";
import { formatISO9075 } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuidModified() {
  return uuidv4().replace(/-/gi, "");
}

export const formatTimeAndDateIsoFetch = (from: string) => {
  return formatISO9075(from, { format: "extended" });
};

export const formatDateIsoFetch = (from: string) => {
  return formatISO9075(from, { representation: "date" });
};

