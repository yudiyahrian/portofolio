import { achievements } from "@/data/achievements";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AchievementsSection() {
  return (
    <section className="section-container" aria-label="Achievements">
      <ScrollReveal>
        <SectionHeader
          title="ACHIEVEMENTS"
          subtitle="Milestones unlocked throughout my developer journey."
          accent="// UNLOCKED"
        />
      </ScrollReveal>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {achievements.map((achievement, i) => (
          <ScrollReveal key={achievement.id} delay={i * 0.08}>
            <div
              className="pixel-card flex flex-col items-center text-center gap-3 p-4 group cursor-default"
              style={{
                borderColor: achievement.color,
                boxShadow: `4px 4px 0px ${achievement.color}60`,
              }}
            >
              <div
                className="text-3xl group-hover:animate-pixel-float"
                role="img"
                aria-label={achievement.title}
              >
                {achievement.icon}
              </div>
              <div>
                <h3 className="font-pixel text-[8px] text-dark-900 dark:text-white mb-1 leading-relaxed">
                  {achievement.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {achievement.description}
                </p>
              </div>
              {achievement.unlocked && (
                <div
                  className="w-full py-1 border-t"
                  style={{ borderColor: `${achievement.color}40` }}
                >
                  <span
                    className="font-pixel text-[7px]"
                    style={{ color: achievement.color }}
                  >
                    ✓ UNLOCKED
                  </span>
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
