"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Star, Code2, Zap } from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";
import Typewriter from "@/components/ui/Typewriter";
import { siteConfig } from "@/data/site";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-pixel-grid opacity-40 dark:opacity-20"
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 dark:opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-10 dark:opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="max-w-4xl"
        >
          {/* Status badge */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 border-2 border-pixel-green bg-green-950/30 px-3 py-1.5">
              <div className="w-2 h-2 bg-pixel-green animate-pixel-blink" />
              <span className="font-pixel text-[8px] text-pixel-green">
                AVAILABLE FOR HIRE
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-dark-900 dark:text-white leading-relaxed mb-2">
              YUDIYA
            </h1>
            <h1 className="font-pixel text-3xl sm:text-4xl lg:text-5xl leading-relaxed mb-6">
              <span className="text-pixel-blue">AHRIAN</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-pixel-blue" aria-hidden="true" />
              <span className="font-pixel text-sm sm:text-base text-dark-600 dark:text-slate-400">
                <Typewriter
                  strings={siteConfig.roles}
                  speed={90}
                  deleteSpeed={50}
                  pauseTime={2000}
                />
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mb-8"
          >
            Full-Stack Developer with 2+ years of professional experience
            building cross-platform mobile and web applications. Specialized in{" "}
            <span className="text-pixel-cyan font-medium">Flutter</span> with
            expertise in{" "}
            <span className="text-pixel-blue font-medium">Next.js</span>,{" "}
            <span className="text-pixel-red font-medium">Laravel</span>, and{" "}
            <span className="text-pixel-yellow font-medium">Firebase</span>.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 mb-8"
          >
            {[
              {
                icon: Code2,
                value: `${siteConfig.stats.yearsExperience}+`,
                label: "Years Exp.",
              },
              {
                icon: Zap,
                value: `${siteConfig.stats.projectsShipped}+`,
                label: "Projects Shipped",
              },
              { icon: Star, value: "SMK", label: "Taruna Bhakti" },
              { icon: TbBrandGithub, value: "github", label: "/yudiyahrian" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  size={14}
                  className="text-pixel-blue"
                  aria-hidden="true"
                />
                <span className="font-pixel text-sm text-dark-900 dark:text-white">
                  {value}
                </span>
                <span className="text-slate-500 text-sm">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="pixel-btn-primary flex items-center gap-2"
            >
              VIEW PROJECTS
              <ArrowRight size={12} />
            </Link>
            <Link
              href="/contact"
              className="pixel-btn-secondary flex items-center gap-2"
            >
              CONTACT ME
            </Link>
            <a
              href="/resume"
              className="pixel-btn-green flex items-center gap-2"
            >
              <Download size={12} />
              RESUME
            </a>
          </motion.div>

          {/* Tech stack strip */}
          <motion.div variants={itemVariants} className="mt-12">
            <p className="font-pixel text-[8px] text-slate-500 mb-3">
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Flutter",
                "Dart",
                "Next.js",
                "TypeScript",
                "Laravel",
                "React JS",
                "Firebase",
                "MySQL",
                "Socket.io",
                "Figma",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono border border-dark-300 dark:border-dark-600 text-slate-600 dark:text-slate-400 hover:border-pixel-blue hover:text-pixel-blue transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative retro pixel art element */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-64 h-64"
          >
            <div className="w-48 h-48 border-3 border-dark-600 dark:border-dark-500 bg-dark-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-pixel-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-pixel text-[8px] text-pixel-cyan text-center leading-loose">
                  <div>░░▓▓▓▓░░</div>
                  <div>░▓░░░░▓░</div>
                  <div>░▓▓░▓▓▓░</div>
                  <div>░▓░░░░▓░</div>
                  <div>░▓▓▓▓▓▓░</div>
                  <div>░░▓░░▓░░</div>
                  <div>░░▓░░▓░░</div>
                  <div>▓▓▓░░▓▓▓</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-pixel-cyan border-2 border-cyan-600 px-2 py-1">
              <span className="font-pixel text-[7px] text-dark-900">
                FLUTTER
              </span>
            </div>
            <div className="absolute -bottom-3 -left-3 bg-pixel-blue border-2 border-blue-700 px-2 py-1">
              <span className="font-pixel text-[7px] text-white">
                FULLSTACK
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-hidden="true"
      >
        <span className="font-pixel text-[7px] text-slate-500">SCROLL</span>
        <div className="w-4 h-6 border-2 border-slate-600 flex items-start justify-center pt-1">
          <div className="w-1 h-2 bg-pixel-blue" />
        </div>
      </motion.div>
    </section>
  );
}
