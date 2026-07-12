import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";
import { projects, getProjectBySlug } from "@/data/projects";
import { categoryColors, categoryLabels } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image, width: 800, height: 450 }],
    },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const categoryColor = categoryColors[project.category];
  const otherProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        {/* Back link */}
        <ScrollReveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-pixel text-[9px] text-slate-400 hover:text-pixel-blue transition-colors mb-8"
          >
            <ArrowLeft size={12} />
            BACK TO PROJECTS
          </Link>
        </ScrollReveal>

        {/* Hero */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div
                className="px-3 py-1 border-2"
                style={{
                  borderColor: categoryColor,
                  backgroundColor: `${categoryColor}15`,
                }}
              >
                <span
                  className="font-pixel text-[8px]"
                  style={{ color: categoryColor }}
                >
                  {categoryLabels[project.category]}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                <Calendar size={12} />
                <span>{project.year}</span>
              </div>
              <div
                className={`px-2 py-0.5 border font-pixel text-[7px] ${
                  project.status === "completed"
                    ? "border-pixel-green text-pixel-green"
                    : "border-pixel-yellow text-pixel-yellow"
                }`}
              >
                {project.status.toUpperCase()}
              </div>
            </div>

            <h1 className="font-pixel text-2xl sm:text-3xl text-dark-900 dark:text-white leading-relaxed mb-3">
              {project.title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn-secondary flex items-center gap-2 text-[9px]"
                >
                  <TbBrandGithub size={12} />
                  VIEW SOURCE
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn-green flex items-center gap-2 text-[9px]"
                >
                  <ExternalLink size={12} />
                  LIVE DEMO
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Main image */}
        <ScrollReveal>
          <div
            className="relative aspect-video w-full mb-12 border-3 border-dark-300 dark:border-dark-600 overflow-hidden"
            style={{ boxShadow: "8px 8px 0px rgba(0,0,0,0.2)" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </ScrollReveal>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <ScrollReveal>
              <div>
                <h2 className="font-pixel text-[11px] text-pixel-blue mb-4">
                  // OVERVIEW
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {project.longDescription.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4"
                    >
                      {para.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Challenge & Solution */}
            {project.challenges && (
              <ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border-l-4 border-pixel-red pl-4">
                    <h3 className="font-pixel text-[9px] text-pixel-red mb-2">
                      CHALLENGE
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                  {project.solution && (
                    <div className="border-l-4 border-pixel-green pl-4">
                      <h3 className="font-pixel text-[9px] text-pixel-green mb-2">
                        SOLUTION
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Image gallery */}
            {project.images.length > 1 && (
              <ScrollReveal>
                <h2 className="font-pixel text-[11px] text-pixel-blue mb-4">
                  // GALLERY
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-video border-2 border-dark-300 dark:border-dark-600 overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            {project.achievements && (
              <ScrollReveal delay={0.1}>
                <div className="pixel-card">
                  <h3 className="font-pixel text-[9px] text-pixel-blue mb-4">
                    KEY RESULTS
                  </h3>
                  <ul className="space-y-3">
                    {project.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span className="text-pixel-green text-xs mt-1 shrink-0">
                          ✓
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            )}

            {/* Tech Stack */}
            <ScrollReveal delay={0.15}>
              <div className="pixel-card">
                <h3 className="font-pixel text-[9px] text-pixel-blue mb-4">
                  <Tag size={10} className="inline mr-1" />
                  TECH STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono border-2 border-dark-300 dark:border-dark-600 text-slate-600 dark:text-slate-400 bg-dark-50 dark:bg-dark-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Links */}
            <ScrollReveal delay={0.2}>
              <div className="pixel-card">
                <h3 className="font-pixel text-[9px] text-pixel-blue mb-4">
                  LINKS
                </h3>
                <div className="space-y-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-pixel-blue transition-colors"
                    >
                      <TbBrandGithub size={14} />
                      Source Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-pixel-green transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Other projects */}
        <div className="mt-20">
          <ScrollReveal>
            <h2 className="font-pixel text-lg text-dark-900 dark:text-white mb-8">
              OTHER <span className="text-pixel-blue">PROJECTS</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="pixel-card group block"
                >
                  <div className="relative aspect-video mb-3 overflow-hidden border-2 border-dark-200 dark:border-dark-700">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-pixel text-[10px] text-dark-900 dark:text-white group-hover:text-pixel-blue transition-colors leading-relaxed">
                    {p.title}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
