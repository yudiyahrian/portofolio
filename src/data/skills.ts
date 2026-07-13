import {
  Monitor,
  Server,
  Smartphone,
  Wrench,
  Database,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Skill } from "@/types";

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  // Frontend
  { name: "Next.js",      level: 88, category: "frontend", color: "#3B82F6" },
  { name: "React JS",     level: 85, category: "frontend", color: "#06B6D4" },
  { name: "TypeScript",   level: 82, category: "frontend", color: "#3B82F6" },
  { name: "Tailwind CSS", level: 90, category: "frontend", color: "#06B6D4" },
  { name: "JavaScript",   level: 85, category: "frontend", color: "#EAB308" },

  // Backend
  { name: "Laravel",           level: 82, category: "backend", color: "#EF4444" },
  { name: "Next.js API",       level: 80, category: "backend", color: "#3B82F6" },
  { name: "REST API",          level: 90, category: "backend", color: "#22C55E" },
  { name: "Socket.io",         level: 75, category: "backend", color: "#A855F7" },
  { name: "Prisma ORM",        level: 78, category: "backend", color: "#06B6D4" },

  // Mobile
  { name: "Flutter",            level: 92, category: "mobile", color: "#06B6D4" },
  { name: "Dart",               level: 90, category: "mobile", color: "#3B82F6" },
  { name: "Clean Architecture", level: 85, category: "mobile", color: "#A855F7" },
  { name: "State Management",   level: 85, category: "mobile", color: "#22C55E" },
  { name: "Responsive UI",      level: 88, category: "mobile", color: "#F97316" },
  { name: "Local Database",     level: 80, category: "mobile", color: "#EAB308" },

  // DevOps / Tools
  { name: "Git & GitHub", level: 85, category: "devops", color: "#F97316" },
  { name: "Figma",        level: 80, category: "devops", color: "#EC4899" },
  { name: "Agile / Scrum", level: 78, category: "devops", color: "#22C55E" },

  // Databases
  { name: "MySQL",      level: 82, category: "tools", color: "#F97316" },
  { name: "PostgreSQL", level: 75, category: "tools", color: "#3B82F6" },
  { name: "Firebase",   level: 85, category: "tools", color: "#EAB308" },

  // Languages
  { name: "Dart",       level: 90, category: "languages", color: "#06B6D4" },
  { name: "TypeScript", level: 82, category: "languages", color: "#3B82F6" },
  { name: "JavaScript", level: 85, category: "languages", color: "#EAB308" },
  { name: "PHP",        level: 78, category: "languages", color: "#A855F7" },
];

export const skillCategories: SkillCategory[] = [
  { id: "frontend",  label: "Frontend",      color: "#3B82F6", icon: Monitor       },
  { id: "backend",   label: "Backend",       color: "#22C55E", icon: Server        },
  { id: "mobile",    label: "Mobile",        color: "#06B6D4", icon: Smartphone    },
  { id: "devops",    label: "Tools & Design",color: "#F97316", icon: Wrench        },
  { id: "tools",     label: "Databases",     color: "#EAB308", icon: Database      },
  { id: "languages", label: "Languages",     color: "#EC4899", icon: MessageSquare },
];

export const getSkillsByCategory = (category: string) =>
  skills.filter((s) => s.category === category);
