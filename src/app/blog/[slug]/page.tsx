import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Eye, Tag, Calendar } from "lucide-react";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BlogContent from "@/components/blog/BlogContent";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

const categoryColors: Record<string, string> = {
  tutorial: "#3B82F6",
  opinion: "#A855F7",
  "case-study": "#22C55E",
  "deep-dive": "#F97316",
  tips: "#EAB308",
};

export default function BlogDetailPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedAt,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-pixel text-[9px] text-slate-400 hover:text-pixel-blue transition-colors mb-8"
            >
              <ArrowLeft size={12} />
              BACK TO BLOG
            </Link>
          </ScrollReveal>

          {/* Meta */}
          <ScrollReveal>
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="font-pixel text-[8px] px-2 py-1 border"
                  style={{
                    color: categoryColors[post.category],
                    borderColor: categoryColors[post.category],
                  }}
                >
                  {post.category.replace("-", " ").toUpperCase()}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={10} />
                  {post.readingTime} min read
                </span>
                {post.views && (
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Eye size={10} />
                    {post.views.toLocaleString()} views
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={10} />
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h1 className="font-pixel text-xl sm:text-2xl text-dark-900 dark:text-white leading-relaxed mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </ScrollReveal>

          {/* Cover image */}
          <ScrollReveal>
            <div className="relative aspect-video w-full mb-10 border-3 border-dark-300 dark:border-dark-600 overflow-hidden"
              style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.2)" }}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal>
            <BlogContent content={post.content} />
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal>
            <div className="mt-10 pt-6 border-t border-dark-200 dark:border-dark-700">
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1 text-xs text-slate-400 mr-2">
                  <Tag size={11} />
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="text-xs font-mono text-slate-500 border border-dark-300 dark:border-dark-600 px-2 py-0.5 hover:border-pixel-blue hover:text-pixel-blue transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Author */}
          <ScrollReveal>
            <div className="mt-8 pixel-card flex items-center gap-4">
              <div className="w-14 h-14 border-3 border-pixel-blue flex items-center justify-center bg-dark-800 shrink-0">
                <span className="font-pixel text-xs text-pixel-blue">YA</span>
              </div>
              <div>
                <div className="font-pixel text-[10px] text-dark-900 dark:text-white mb-1">
                  {post.author}
                </div>
                <p className="text-sm text-slate-500">
                  Flutter Developer & Fullstack Engineer. Writing about Flutter, Next.js, Laravel, and mobile development.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <ScrollReveal>
                <h2 className="font-pixel text-sm text-dark-900 dark:text-white mb-6">
                  RELATED <span className="text-pixel-blue">POSTS</span>
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rp, i) => (
                  <ScrollReveal key={rp.id} delay={i * 0.1}>
                    <Link href={`/blog/${rp.slug}`} className="pixel-card group block">
                      <div className="relative aspect-video mb-3 overflow-hidden border-2 border-dark-200 dark:border-dark-700">
                        <Image
                          src={rp.coverImage}
                          alt={rp.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <h3 className="font-pixel text-[9px] text-dark-900 dark:text-white group-hover:text-pixel-blue transition-colors leading-relaxed line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock size={9} />
                        {rp.readingTime} min
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
