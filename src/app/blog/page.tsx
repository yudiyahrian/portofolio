"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Eye, Tag, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

const categoryColors: Record<string, string> = {
  tutorial: "#3B82F6",
  opinion: "#A855F7",
  "case-study": "#22C55E",
  "deep-dive": "#F97316",
  tips: "#EAB308",
};

const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort();

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        activeCategory === "all" || post.category === activeCategory;
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [search, activeCategory, activeTag]);

  const featured = blogPosts.find((p) => p.featured);
  const categories = ["all", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  return (
    <div className="pt-24 pb-20">
      <section className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="BLOG"
            subtitle="Deep dives, tutorials, and opinions on software engineering and AI."
            accent="// DEV_BLOG"
          />
        </ScrollReveal>

        {/* Featured post */}
        {featured && (
          <ScrollReveal className="mb-12">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-3 border-dark-300 dark:border-dark-600 overflow-hidden hover:border-pixel-blue transition-colors"
                style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.2)" }}>
                <div className="relative aspect-video lg:aspect-auto">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-pixel-blue border-2 border-blue-700 px-2 py-1">
                    <span className="font-pixel text-[7px] text-white">FEATURED</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 bg-white dark:bg-dark-800 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="font-pixel text-[8px] px-2 py-1 border"
                      style={{
                        color: categoryColors[featured.category],
                        borderColor: categoryColors[featured.category],
                      }}
                    >
                      {featured.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {featured.readingTime} min read
                    </span>
                  </div>
                  <h2 className="font-pixel text-sm md:text-base text-dark-900 dark:text-white leading-relaxed mb-3 group-hover:text-pixel-blue transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{formatDate(featured.publishedAt)}</span>
                    <span className="font-pixel text-[9px] text-pixel-blue flex items-center gap-1">
                      READ MORE <ArrowRight size={9} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </ScrollReveal>
        )}

        {/* Controls */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border-2 border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-sm font-mono placeholder:text-slate-400 focus:border-pixel-blue outline-hidden text-dark-900 dark:text-white transition-colors"
              aria-label="Search blog posts"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-pixel text-[8px] px-3 py-2 border-2 transition-all duration-100 capitalize ${
                  activeCategory === cat
                    ? "bg-pixel-blue border-blue-700 text-white"
                    : "border-dark-300 dark:border-dark-600 text-slate-500 hover:border-pixel-blue hover:text-pixel-blue"
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat === "all" ? "ALL POSTS" : cat.replace("-", " ").toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-mono border transition-all ${
                  activeTag === tag
                    ? "border-pixel-blue text-pixel-blue bg-blue-950/30"
                    : "border-dark-200 dark:border-dark-600 text-slate-500 hover:border-pixel-blue hover:text-pixel-blue"
                }`}
              >
                <Tag size={9} />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <span className="font-pixel text-[9px] text-slate-400">
            {filtered.length} POST{filtered.length !== 1 ? "S" : ""} FOUND
          </span>
        </div>

        {/* Post grid */}
        <AnimatePresence mode="popLayout">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="pixel-card group block h-full flex flex-col">
                  {/* Cover image */}
                  <div className="relative aspect-video mb-4 overflow-hidden border-2 border-dark-200 dark:border-dark-700">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 border font-pixel text-[7px]"
                      style={{
                        color: categoryColors[post.category],
                        borderColor: categoryColors[post.category],
                        backgroundColor: `${categoryColors[post.category]}15`,
                      }}
                    >
                      {post.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h2 className="font-pixel text-[11px] text-dark-900 dark:text-white mb-2 leading-relaxed group-hover:text-pixel-blue transition-colors line-clamp-3">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs font-mono text-slate-400 border border-dark-200 dark:border-dark-600 px-1.5 py-0.5">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-dark-200 dark:border-dark-700 text-xs text-slate-400">
                      <span>{formatDate(post.publishedAt)}</span>
                      <div className="flex items-center gap-3">
                        {post.views && (
                          <span className="flex items-center gap-1">
                            <Eye size={10} />
                            {post.views.toLocaleString()}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readingTime}m
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="font-pixel text-4xl mb-4">404</div>
            <p className="font-pixel text-[10px] text-slate-400">NO POSTS FOUND</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); setActiveTag(null); }}
              className="mt-4 pixel-btn-secondary text-[9px]"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
