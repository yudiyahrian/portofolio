import type { Metadata } from "next";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";
import { siteConfig } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Experience",
  description: `${siteConfig.name}'s professional experience — 6 years of fullstack engineering, Flutter development, and technical leadership.`,
};

const typeColors: Record<string, string> = {
  "full-time": "#3B82F6",
  contract: "#F97316",
  freelance: "#A855F7",
  internship: "#22C55E",
};

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-20">
      <section className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="WORK EXPERIENCE"
            subtitle="My professional journey building production software across startups and agencies."
            accent="// CAREER_HISTORY.LOG"
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-dark-200 dark:bg-dark-600 hidden sm:block" aria-hidden="true" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.id} delay={i * 0.1}>
                <div className="flex gap-4 md:gap-8">
                  {/* Timeline node */}
                  <div className="hidden sm:flex flex-col items-center shrink-0">
                    <div
                      className={`w-12 h-12 md:w-24 border-3 flex items-center justify-center font-pixel text-xs z-10 ${
                        exp.current
                          ? "bg-pixel-blue border-blue-700 text-white"
                          : "bg-white dark:bg-dark-800 border-dark-500 text-slate-400"
                      }`}
                      aria-label={exp.company}
                    >
                      {exp.logo}
                    </div>
                  </div>

                  {/* Card */}
                  <article className="flex-1 pixel-card">
                    {/* Header */}
                    <div className="flex flex-wrap items-start gap-3 mb-4">
                      <div className="flex-1">
                        <h2 className="font-pixel text-sm md:text-base text-dark-900 dark:text-white leading-relaxed mb-1">
                          {exp.role}
                        </h2>
                        <div className="font-pixel text-[10px] text-pixel-blue mb-2">
                          {exp.company}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={12} />
                            <span
                              className="capitalize font-medium"
                              style={{ color: typeColors[exp.type] }}
                            >
                              {exp.type.replace("-", " ")}
                            </span>
                          </span>
                        </div>
                      </div>

                      {exp.current && (
                        <div className="shrink-0 inline-flex items-center gap-1.5 bg-green-950/40 border-2 border-pixel-green px-2.5 py-1.5">
                          <div className="w-2 h-2 bg-pixel-green animate-pixel-blink" />
                          <span className="font-pixel text-[8px] text-pixel-green">CURRENT</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h3 className="font-pixel text-[9px] text-slate-400 mb-2">KEY ACHIEVEMENTS</h3>
                      <ul className="space-y-2" role="list">
                        {exp.achievements.map((achievement, ai) => (
                          <li key={ai} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="text-pixel-blue mt-1 text-xs shrink-0">▶</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div className="pt-3 border-t border-dark-200 dark:border-dark-700">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-mono border border-dark-300 dark:border-dark-600 text-slate-500 dark:text-slate-500 bg-dark-50 dark:bg-dark-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
