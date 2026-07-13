import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, MapPin } from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";
import { experiences } from "@/data/experience";
import { skills, skillCategories } from "@/data/skills";
import { siteConfig } from "@/data/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Resume",
  description: `${siteConfig.name}'s resume — Flutter Developer and Fullstack Engineer with 2+ years of experience.`,
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-pixel-blue animate-pixel-blink" />
                <span className="font-pixel text-[9px] text-pixel-blue">
                  // RESUME.PDF
                </span>
              </div>
              <h1 className="font-pixel text-2xl sm:text-3xl text-dark-900 dark:text-white leading-relaxed">
                CURRICULUM VITAE
              </h1>
            </div>
            <a
              href="/resume/Muhamad_Yudiya_Ahrian_Resume.pdf"
              download="Muhamad_Yudiya_Ahrian_Resume.pdf"
              className="pixel-btn-primary flex items-center gap-2"
              aria-label="Download resume PDF"
            >
              <Download size={12} />
              DOWNLOAD PDF
            </a>
          </div>
        </ScrollReveal>

        {/* Resume document */}
        <div className="max-w-4xl mx-auto">
          <div className="retro-window">
            {/* Window header */}
            <div className="retro-window-header">
              <div className="retro-window-btn bg-pixel-red border border-red-700" />
              <div className="retro-window-btn bg-pixel-yellow border border-yellow-700" />
              <div className="retro-window-btn bg-pixel-green border border-green-700" />
              <span className="ml-3 font-pixel text-[8px] text-slate-400">
                YUDIYA_AHRIAN_RESUME.EXE
              </span>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-dark-800 p-8 md:p-12">
              {/* Name & Contact */}
              <ScrollReveal>
                <div className="border-b-3 border-pixel-blue pb-6 mb-8">
                  <h2 className="font-pixel text-2xl sm:text-3xl text-dark-900 dark:text-white mb-1 leading-relaxed">
                    MUHAMAD YUDIYA AHRIAN
                  </h2>
                  <p className="text-lg text-pixel-blue font-medium mb-4">
                    Flutter Developer &amp; Fullstack Engineer
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-1.5 hover:text-pixel-blue transition-colors"
                    >
                      <Mail size={12} />
                      {siteConfig.email}
                    </a>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {siteConfig.location}
                    </span>
                    <a
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-pixel-blue transition-colors"
                    >
                      <TbBrandGithub size={12} />
                      github.com/yudiyahrian
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Summary */}
              <ScrollReveal>
                <section className="mb-8" aria-label="Professional summary">
                  <h3 className="font-pixel text-[11px] text-pixel-blue mb-3">
                    SUMMARY
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Full-Stack Developer with 2+ years of professional
                    experience building cross-platform mobile and web
                    applications. Specialized in Flutter development with
                    additional expertise in Next.js, Laravel, PostgreSQL, and
                    Firebase. Experienced in designing scalable software
                    architectures, integrating APIs, optimizing application
                    performance, and delivering maintainable solutions in agile
                    environments. Strong problem-solving skills with a focus on
                    creating reliable, user-centric applications.
                  </p>
                </section>
              </ScrollReveal>

              {/* Experience */}
              <ScrollReveal>
                <section className="mb-8" aria-label="Work experience">
                  <h3 className="font-pixel text-[11px] text-pixel-blue mb-4">
                    EXPERIENCE
                  </h3>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="border-l-2 border-dark-200 dark:border-dark-600 pl-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div>
                            <h4 className="font-semibold text-dark-900 dark:text-white">
                              {exp.role}
                            </h4>
                            <div className="text-pixel-blue text-sm font-medium">
                              {exp.company}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500 font-mono">
                              {exp.period}
                            </div>
                            <div className="text-xs text-slate-400">
                              {exp.location}
                            </div>
                          </div>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.slice(0, 3).map((a, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                            >
                              <span className="text-pixel-blue mt-1 text-xs">
                                •
                              </span>
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.tech.slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs text-slate-400 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>

              {/* Skills */}
              <ScrollReveal>
                <section className="mb-8" aria-label="Technical skills">
                  <h3 className="font-pixel text-[11px] text-pixel-blue mb-4">
                    TECHNICAL SKILLS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillCategories.map((cat) => {
                      const catSkills = skills.filter(
                        (s) => s.category === cat.id && s.level >= 75,
                      );
                      if (catSkills.length === 0) return null;
                      return (
                        <div key={cat.id}>
                          <div className="text-xs font-semibold text-dark-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                            <cat.icon/>
                            {cat.label}
                          </div>
                          <p className="text-sm text-slate-500 font-mono">
                            {catSkills.map((s) => s.name).join(", ")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </ScrollReveal>

              {/* Education */}
              <ScrollReveal>
                <section aria-label="Education">
                  <h3 className="font-pixel text-[11px] text-pixel-blue mb-3">
                    EDUCATION
                  </h3>
                  <div className="border-l-2 border-dark-200 dark:border-dark-600 pl-4">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-dark-900 dark:text-white">
                          Vocational High School — Software Engineering
                        </h4>
                        <p className="text-pixel-blue text-sm">
                          SMK Taruna Bhakti
                        </p>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        2021 — 2024
                      </span>
                    </div>
                  </div>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
