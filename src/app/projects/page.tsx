"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, ArrowRight, Filter } from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";
import { projects } from "@/data/projects";
import { categoryColors, categoryLabels } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = [
  { id: "all", label: "ALL" },
  { id: "fullstack", label: "FULLSTACK" },
  { id: "ai", label: "AI/ML" },
  { id: "mobile", label: "MOBILE" },
  { id: "backend", label: "BACKEND" },
  { id: "web", label: "WEB" },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-24 pb-20">
      <section className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="ALL PROJECTS"
            subtitle="Production applications and open-source projects I've built."
            accent="// PROJECT_VAULT"
          />
        </ScrollReveal>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border-2 border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-pixel-blue outline-hidden transition-colors font-mono"
              aria-label="Search projects"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-pixel text-[8px] px-3 py-2 border-2 transition-all duration-100 ${
                  activeCategory === cat.id
                    ? "bg-pixel-blue border-blue-700 text-white"
                    : "border-dark-300 dark:border-dark-600 text-slate-500 hover:border-pixel-blue hover:text-pixel-blue"
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center gap-2">
          <Filter size={12} className="text-slate-400" />
          <span className="font-pixel text-[9px] text-slate-400">
            {filtered.length} PROJECT{filtered.length !== 1 ? "S" : ""} FOUND
          </span>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="pixel-card group flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-video mb-4 overflow-hidden border-2 border-dark-200 dark:border-dark-700">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Category badge */}
                    <div
                      className="absolute top-2 right-2 px-2 py-1 border-2"
                      style={{
                        borderColor: categoryColors[project.category],
                        backgroundColor: `${categoryColors[project.category]}20`,
                      }}
                    >
                      <span
                        className="font-pixel text-[7px]"
                        style={{ color: categoryColors[project.category] }}
                      >
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                    {/* Status */}
                    {project.status === "in-progress" && (
                      <div className="absolute top-2 left-2 bg-pixel-yellow/90 border border-yellow-600 px-2 py-0.5">
                        <span className="font-pixel text-[7px] text-dark-900">WIP</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-pixel text-[8px] text-slate-400">{project.year}</span>
                    </div>
                    <h2 className="font-pixel text-sm text-dark-900 dark:text-white mb-2 leading-relaxed group-hover:text-pixel-blue transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Achievements */}
                    {project.achievements && project.achievements.length > 0 && (
                      <ul className="mb-4 space-y-1">
                        {project.achievements.slice(0, 2).map((a, ai) => (
                          <li key={ai} className="flex items-start gap-1.5 text-xs text-slate-500">
                            <span className="text-pixel-green text-xs mt-0.5">✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-xs font-mono border border-dark-200 dark:border-dark-600 text-slate-500 bg-dark-50 dark:bg-dark-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-1.5 py-0.5 text-xs font-mono text-slate-500">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-3 border-t border-dark-200 dark:border-dark-700">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-pixel text-[9px] text-pixel-blue hover:underline flex items-center gap-1"
                      >
                        DETAILS
                        <ArrowRight size={9} />
                      </Link>
                      <div className="flex items-center gap-2 ml-auto">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-pixel-blue transition-colors"
                            aria-label={`${project.title} GitHub`}
                          >
                            <TbBrandGithub size={15} />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-pixel-green transition-colors"
                            aria-label={`${project.title} live demo`}
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="font-pixel text-4xl mb-4">404</div>
              <p className="font-pixel text-[10px] text-slate-400 mb-2">NO PROJECTS FOUND</p>
              <p className="text-slate-500 text-sm">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-4 pixel-btn-secondary text-[9px]"
              >
                RESET FILTERS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
