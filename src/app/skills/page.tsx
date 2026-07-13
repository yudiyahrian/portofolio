import type { Metadata } from "next";
import { skillCategories, getSkillsByCategory } from "@/data/skills";
import { siteConfig } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PixelProgressBar from "@/components/ui/PixelProgressBar";

export const metadata: Metadata = {
  title: "Skills",
  description: `${siteConfig.name}'s technical skills — Flutter, Next.js, Laravel, Firebase, and more.`,
};

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="SKILLS & EXPERTISE"
            subtitle="Technologies I work with daily in production environments, from mobile to fullstack."
            accent="// ABILITIES_TREE"
          />
        </ScrollReveal>

        {/* Overview stat cards */}
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              const catSkills = getSkillsByCategory(cat.id);
              const avg = Math.round(
                catSkills.reduce((s, k) => s + k.level, 0) / catSkills.length
              );
              return (
                <div
                  key={cat.id}
                  className="pixel-card text-center p-4"
                  style={{ borderColor: cat.color, boxShadow: `4px 4px 0px ${cat.color}50` }}
                >
                  <div className="flex justify-center mb-3">
                    <div
                      className="w-10 h-10 border-2 flex items-center justify-center"
                      style={{ borderColor: cat.color }}
                    >
                      <Icon size={20} style={{ color: cat.color }} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="font-pixel text-[9px] text-dark-900 dark:text-white mb-1">
                    {cat.label}
                  </div>
                  <div className="font-pixel text-sm" style={{ color: cat.color }}>
                    {avg}%
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{catSkills.length} skills</div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Skills by category */}
        <div className="space-y-16">
          {skillCategories.map((cat, ci) => {
            const Icon = cat.icon;
            const catSkills = getSkillsByCategory(cat.id).sort((a, b) => b.level - a.level);
            return (
              <ScrollReveal key={cat.id} delay={ci * 0.05}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 border-3 flex items-center justify-center"
                      style={{ borderColor: cat.color }}
                    >
                      <Icon size={20} style={{ color: cat.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-pixel text-sm text-dark-900 dark:text-white leading-relaxed">
                        {cat.label}
                      </h2>
                      <p className="text-xs text-slate-500">{catSkills.length} technologies</p>
                    </div>
                    <div
                      className="ml-auto h-0.5 flex-1 max-w-xs hidden sm:block"
                      style={{ backgroundColor: cat.color, opacity: 0.3 }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catSkills.map((skill, si) => (
                      <ScrollReveal key={skill.name} delay={si * 0.04}>
                        <div className="pixel-card p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-sm font-medium text-dark-900 dark:text-white">
                              {skill.name}
                            </span>
                            <span className="font-pixel text-[8px]" style={{ color: skill.color }}>
                              {skill.level}%
                            </span>
                          </div>
                          <PixelProgressBar value={skill.level} color={skill.color} showLabel={false} />
                          <div className="mt-2 text-xs text-slate-500">
                            {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : skill.level >= 70 ? "Proficient" : "Familiar"}
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Currently learning */}
        <ScrollReveal className="mt-20">
          <div className="pixel-card" style={{ borderColor: "#3B82F6", boxShadow: "6px 6px 0px #1D4ED8" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-pixel-blue animate-pixel-blink" />
              <h3 className="font-pixel text-[10px] text-pixel-blue">CURRENTLY LEARNING</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Next.js 15", "Go (Golang)", "Rust basics", "AI Integration", "System Design"].map((item) => (
                <div key={item} className="flex items-center gap-2 px-3 py-1.5 border-2 border-dashed border-dark-400 dark:border-dark-500">
                  <div className="w-1.5 h-1.5 bg-pixel-yellow animate-pixel-blink" />
                  <span className="font-mono text-sm text-slate-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
