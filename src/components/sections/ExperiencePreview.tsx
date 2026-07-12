import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ExperiencePreview() {
  const recentExp = experiences.slice(0, 3);

  return (
    <section className="section-container bg-dark-50 dark:bg-dark-800/50" aria-label="Experience preview">
      <div className="section-container py-0">
        <ScrollReveal>
          <SectionHeader
            title="EXPERIENCE"
            subtitle="My professional journey building production software."
            accent="// WORK HISTORY"
          />
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-dark-200 dark:bg-dark-600 hidden md:block" aria-hidden="true" />

          <div className="space-y-6">
            {recentExp.map((exp, i) => (
              <ScrollReveal key={exp.id} delay={i * 0.1}>
                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center">
                    <div
                      className={`w-12 h-12 border-3 flex items-center justify-center font-pixel text-xs z-10 ${
                        exp.current
                          ? "bg-pixel-blue border-blue-700 text-white"
                          : "bg-dark-800 border-dark-600 text-slate-400"
                      }`}
                    >
                      {exp.logo}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pixel-card">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-pixel text-sm text-dark-900 dark:text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span className="text-pixel-blue font-medium">{exp.company}</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-pixel text-[8px] text-slate-500 mb-1">
                          {exp.period}
                        </div>
                        {exp.current && (
                          <div className="inline-flex items-center gap-1 bg-green-900/30 border border-pixel-green px-2 py-0.5">
                            <div className="w-1.5 h-1.5 bg-pixel-green animate-pixel-blink" />
                            <span className="font-pixel text-[7px] text-pixel-green">CURRENT</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                      {exp.description}
                    </p>

                    {/* Achievements highlight */}
                    <ul className="space-y-1 mb-3">
                      {exp.achievements.slice(0, 2).map((achievement, ai) => (
                        <li key={ai} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="text-pixel-blue mt-1 text-xs">▶</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono border border-dark-300 dark:border-dark-600 text-slate-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link href="/experience" className="pixel-btn-secondary inline-flex items-center gap-2">
            VIEW FULL HISTORY
            <ArrowRight size={12} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
