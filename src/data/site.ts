import {
  Home,
  User,
  Briefcase,
  Rocket,
  Zap,
  BookOpen,
  Mail,
} from "lucide-react";

export const siteConfig = {
  name: "Yudiya Ahrian",
  title: "Yudiya Ahrian Portfolio",
  description:
    "Full-Stack Developer with 2+ years of experience building cross-platform mobile and web applications. Specialized in Flutter, Next.js, Laravel, and Firebase.",
  tagline: "Fullstack & Mobile Developer",
  url: "https://yudiya-porto.vercel.app",
  ogImage: "https://yudiya-porto.vercel.app/og-image.png",
  email: "yudiyaahrian@gmail.com",
  location: "Depok, Jawa Barat, Indonesia",
  openToWork: true,
  social: {
    github: "https://github.com/yudiyahrian",
    twitter: "https://twitter.com/yudiyahrian",
    linkedin: "https://linkedin.com/in/yudiyahrian",
  },
  nav: [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: User },
    { label: "Experience", href: "/experience", icon: Briefcase },
    { label: "Projects", href: "/projects", icon: Rocket },
    { label: "Skills", href: "/skills", icon: Zap },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Contact", href: "/contact", icon: Mail },
  ],
  roles: [
    "Flutter Developer",
    "Fullstack Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Mobile Developer",
    "React JS Developer",
  ],
  stats: {
    yearsExperience: 2,
    projectsShipped: 12,
    githubStars: 0,
    happyClients: 5,
  },
};
