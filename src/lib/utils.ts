import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTweetLink(url: string) {
  const tweetRegex =
    /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+$/;
  return tweetRegex.test(url);
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}
