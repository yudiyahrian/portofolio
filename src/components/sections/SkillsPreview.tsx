import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skills, skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PixelProgressBar from "@/components/ui/PixelProgressBar";

export default function SkillsPreview() {
  const topSkills = skills
    .filter((s) => s.level >= 82)
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  return (
    <section className="section-container" aria-label="Skills preview">
      <ScrollReveal>
        <SectionHeader
          title="SKILLS & EXPERTISE"
          subtitle="The technologies I work with daily in production environments."
          accent="// ABILITIES"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Progress bars */}
        <ScrollReveal>
          <div className="space-y-4">
            {topSkills.map((skill) => (
              <PixelProgressBar
                key={skill.name}
                label={skill.name}
                value={skill.level}
                color={skill.color}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-4">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon; // LucideIcon component
            const count = skills.filter((s) => s.category === cat.id).length;
            const avgLevel = Math.round(
              skills
                .filter((s) => s.category === cat.id)
                .reduce((sum, s) => sum + s.level, 0) / count || 0
            );
            return (
              <ScrollReveal key={cat.id} delay={i * 0.08}>
                <div
                  className="border-2 p-4 hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors"
                  style={{ borderColor: cat.color }}
                >
                  <div
                    className="w-9 h-9 border-2 flex items-center justify-center mb-3"
                    style={{ borderColor: cat.color }}
                  >
                    <Icon size={18} style={{ color: cat.color }} aria-hidden="true" />
                  </div>
                  <h3 className="font-pixel text-[9px] text-dark-900 dark:text-white mb-1">
                    {cat.label}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{count} skills</span>
                    <span className="font-pixel text-[7px]" style={{ color: cat.color }}>
                      ~{avgLevel}%
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <ScrollReveal className="text-center">
        <Link href="/skills" className="pixel-btn-secondary inline-flex items-center gap-2">
          VIEW ALL SKILLS
          <ArrowRight size={12} />
        </Link>
      </ScrollReveal>
    </section>
  );
}
