import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Download,
  Laptop2,
  Bean,
  Bug,
  Smartphone,
  BookOpen,
  Gamepad2,
  Star,
  Package,
  SmartphoneIcon,
  Axe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { achievements } from "@/data/achievements";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name} — Flutter Developer and Fullstack Engineer based in Depok, Indonesia.`,
};

interface FunFact {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

const funFacts: FunFact[] = [
  { icon: Bean, label: "Mango consumed", value: "Too many", color: "#F97316" },
  { icon: Laptop2, label: "Lines of code", value: "~500K", color: "#3B82F6" },
  { icon: Bug, label: "Bugs squashed", value: "Lost count", color: "#EF4444" },
  { icon: Smartphone, label: "Apps shipped", value: "10+", color: "#06B6D4" },
  { icon: BookOpen, label: "Tech docs read", value: "Many", color: "#A855F7" },
  { icon: Gamepad2, label: "Hours gaming", value: "Some", color: "#22C55E" },
];

const values = [
  {
    icon: Package,
    title: "Clean Architecture First",
    description:
      "I believe structure isn't overhead — it's investment. Every project I build uses clean architecture principles so it stays maintainable as it grows.",
  },
  {
    icon: SmartphoneIcon,
    title: "Cross-Platform by Default",
    description:
      "Flutter lets me build once and ship everywhere without compromise. I design for both web and mobile from day one, not as an afterthought.",
  },
  {
    icon: Axe,
    title: "Ship Early, Iterate Fast",
    description:
      "Real feedback from real users beats speculation. I focus on getting working software deployed quickly, then refining based on what I learn.",
  },
  {
    icon: BookOpen,
    title: "Always Learning",
    description:
      "The tech stack changes fast. I dedicate time every week to exploring new tools, reading documentation, and building small experiments.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-pixel-blue animate-pixel-blink" />
              <span className="font-pixel text-[9px] text-pixel-blue">
                // ABOUT_ME.EXE
              </span>
            </div>
            <h1 className="font-pixel text-3xl sm:text-4xl text-dark-900 dark:text-white leading-relaxed mb-6">
              HELLO, I&apos;M
              <br />
              <span className="text-pixel-blue">YUDIYA</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
              I&apos;m a Fullstack Developer and Flutter specialist based in{" "}
              <strong className="text-dark-900 dark:text-white">
                Depok, West Java, Indonesia
              </strong>
              . I&apos;ve been building software professionally for{" "}
              <strong className="text-dark-900 dark:text-white">
                2+ years
              </strong>
              , working across mobile apps, web platforms, and real-time
              systems.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
              My primary expertise is{" "}
              <strong className="text-pixel-cyan">Flutter</strong> — building
              cross-platform mobile and web applications with clean architecture
              and scalable state management. On the web side, I work with{" "}
              <strong className="text-pixel-blue">Next.js</strong> and{" "}
              <strong className="text-pixel-red">Laravel</strong> to build
              full-stack products.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              I graduated from SMK Taruna Bhakti in 2024 and have been working
              in the industry since my internship in 2023. I care deeply about
              clean code, maintainable architecture, and delivering quality
              software on time.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={14} className="text-pixel-blue" />
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Calendar size={14} className="text-pixel-blue" />
                Available for new projects
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/contact"
                className="pixel-btn-primary flex items-center gap-2"
              >
                CONTACT ME
              </Link>
              <a
                href="/resume"
                className="pixel-btn-secondary flex items-center gap-2"
              >
                <Download size={12} />
                RESUME
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="left">
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  className="w-72 h-72 sm:w-80 sm:h-80 border-3 border-pixel-blue overflow-hidden"
                  style={{ boxShadow: "8px 8px 0px #1D4ED8" }}
                >
                  <Image
                    src="/my.jpeg"
                    alt="Yudiya Ahrian — Profile photo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-pixel-blue" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-pixel-blue" />
                <div className="absolute -bottom-4 left-4 bg-dark-900 border-2 border-pixel-yellow px-3 py-1.5">
                  <span className="font-pixel text-[8px] text-pixel-yellow">
                    2+ YRS EXP <Star color="yellow"></Star>
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section className="section-container py-0 mt-20">
        <ScrollReveal>
          <SectionHeader
            title="MY VALUES"
            subtitle="The principles that guide how I build software."
            accent="// PRINCIPLES"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 0.1}>
              <div className="pixel-card flex gap-4">
                <div
                  className="text-3xl shrink-0"
                  role="img"
                  aria-label={value.title}
                >
                  <value.icon></value.icon>
                </div>
                <div>
                  <h3 className="font-pixel text-[10px] text-dark-900 dark:text-white mb-2 leading-relaxed">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Fun Facts — Lucide icons ──────────────────────────────────── */}
      <section className="section-container mt-20">
        <ScrollReveal>
          <SectionHeader
            title="FUN FACTS"
            subtitle="A few numbers from my developer journey."
            accent="// STATS"
          />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {funFacts.map((fact, i) => {
            const Icon = fact.icon;
            return (
              <ScrollReveal key={fact.label} delay={i * 0.08}>
                <div className="pixel-card text-center group hover:scale-[1.02] transition-transform">
                  {/* Icon box styled to match achievement cards */}
                  <div className="flex justify-center mb-3">
                    <div
                      className="w-11 h-11 border-2 flex items-center justify-center transition-colors"
                      style={{ borderColor: fact.color }}
                    >
                      <Icon
                        size={22}
                        style={{ color: fact.color }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div
                    className="font-pixel text-sm mb-1"
                    style={{ color: fact.color }}
                  >
                    {fact.value}
                  </div>
                  <div className="text-xs text-slate-500">{fact.label}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── Achievements — Lucide icons ───────────────────────────────── */}
      <section className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="ACHIEVEMENTS"
            subtitle="Milestones unlocked along the way."
            accent="// UNLOCKED"
          />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievements.map((achievement, i) => {
            const Icon = achievement.icon;
            return (
              <ScrollReveal key={achievement.id} delay={i * 0.08}>
                <div
                  className="pixel-card flex flex-col items-center text-center gap-3 p-4 group hover:scale-[1.02] transition-transform"
                  style={{
                    borderColor: achievement.color,
                    boxShadow: `4px 4px 0px ${achievement.color}60`,
                  }}
                >
                  {/* Icon inside a pixel-bordered box */}
                  <div
                    className="w-11 h-11 border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: achievement.color }}
                  >
                    <Icon
                      size={22}
                      style={{ color: achievement.color }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-pixel text-[8px] text-dark-900 dark:text-white mb-1 leading-relaxed">
                      {achievement.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                  {/* Unlocked ribbon */}
                  <div
                    className="w-full pt-2 border-t"
                    style={{ borderColor: `${achievement.color}30` }}
                  >
                    <span
                      className="font-pixel text-[7px]"
                      style={{ color: achievement.color }}
                    >
                      ✓ UNLOCKED
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
