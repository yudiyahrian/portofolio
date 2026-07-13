import type { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  tech: string[];
  category: ProjectCategory;
  github?: string;
  demo?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "concept";
  year: number;
  achievements?: string[];
  challenges?: string;
  solution?: string;
}

export type ProjectCategory =
  | "web"
  | "mobile"
  | "backend"
  | "ai"
  | "fullstack"
  | "open-source";

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string | null;
  location: string;
  type: "full-time" | "contract" | "freelance" | "internship";
  description: string;
  achievements: string[];
  tech: string[];
  logo: string;
  current: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  icon?: LucideIcon;
  color: string;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "devops"
  | "ai"
  | "tools"
  | "languages";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  category: BlogCategory;
  featured: boolean;
  views?: number;
}

export type BlogCategory =
  | "tutorial"
  | "opinion"
  | "case-study"
  | "deep-dive"
  | "tips";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  shortcut?: string;
}

export interface FunFact {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
