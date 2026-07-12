import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsPreview from "@/components/sections/SkillsPreview";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Flutter & Fullstack Developer`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <SkillsPreview />
      <ExperiencePreview />
      <AchievementsSection />
      <ContactCTA />
    </>
  );
}
