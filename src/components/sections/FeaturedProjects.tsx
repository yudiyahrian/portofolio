import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";
import { getFeaturedProjects } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { categoryColors, categoryLabels } from "@/lib/utils";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <section className="section-container" aria-label="Featured projects">
      <ScrollReveal>
        <SectionHeader
          title="FEATURED PROJECTS"
          subtitle="A selection of production applications I've built and shipped."
          accent="// PROJECTS"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1}>
            <article className="pixel-card group h-full flex flex-col">
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
                {/* Featured star */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-pixel-yellow border-2 border-yellow-600 flex items-center justify-center">
                  <Star size={10} className="text-dark-900 fill-dark-900" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-pixel text-sm text-dark-900 dark:text-white mb-2 leading-relaxed group-hover:text-pixel-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono bg-dark-100 dark:bg-dark-700 border border-dark-200 dark:border-dark-600 text-slate-600 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 text-xs font-mono text-slate-500">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-dark-200 dark:border-dark-700">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-pixel text-[9px] text-pixel-blue hover:underline flex items-center gap-1"
                  >
                    CASE STUDY
                    <ArrowRight size={9} />
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-pixel-blue transition-colors ml-auto"
                      aria-label={`${project.title} GitHub repository`}
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
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* View all */}
      <ScrollReveal className="text-center mt-10">
        <Link href="/projects" className="pixel-btn-secondary inline-flex items-center gap-2">
          VIEW ALL PROJECTS
          <ArrowRight size={12} />
        </Link>
      </ScrollReveal>
    </section>
  );
}
