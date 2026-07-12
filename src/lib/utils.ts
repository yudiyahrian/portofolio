import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export const categoryColors: Record<string, string> = {
  web: "#3B82F6",
  mobile: "#06B6D4",
  backend: "#22C55E",
  ai: "#A855F7",
  fullstack: "#F97316",
  "open-source": "#EAB308",
};

export const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  backend: "Backend",
  ai: "AI/ML",
  fullstack: "Fullstack",
  "open-source": "Open Source",
};
