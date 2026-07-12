import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";

import { siteConfig } from "@/data/site";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactCTA() {
  return (
    <section className="section-container" aria-label="Contact call to action">
      <ScrollReveal>
        <div
          className="relative border-3 border-pixel-blue p-8 md:p-12 text-center overflow-hidden"
          style={{ boxShadow: "8px 8px 0px #1D4ED8" }}
        >
          <div
            className="absolute inset-0 bg-pixel-grid opacity-10"
            aria-hidden="true"
          />
          <div
            className="absolute top-0 left-0 w-4 h-4 bg-pixel-blue"
            aria-hidden="true"
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 bg-pixel-blue"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 bg-pixel-blue"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-pixel-blue"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-pixel-blue animate-pixel-blink" />
              <span className="font-pixel text-[9px] text-pixel-blue">
                // LET&apos;S BUILD TOGETHER
              </span>
            </div>
            <h2 className="font-pixel text-2xl sm:text-3xl text-dark-900 dark:text-white leading-relaxed mb-4">
              HAVE A PROJECT
              <br />
              <span className="text-pixel-blue">IN MIND?</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              I&apos;m open to freelance work, full-time roles, and interesting
              collaborations. Whether it&apos;s a Flutter app or a fullstack web
              project, let&apos;s talk.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="pixel-btn-primary flex items-center gap-2"
              >
                <Mail size={12} />
                GET IN TOUCH
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="pixel-btn-secondary flex items-center gap-2"
              >
                {siteConfig.email}
                <ArrowRight size={12} />
              </a>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-dark-600 flex items-center justify-center text-slate-400 hover:border-pixel-blue hover:text-pixel-blue transition-all"
                aria-label="GitHub"
              >
                <TbBrandGithub size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-dark-600 flex items-center justify-center text-slate-400 hover:border-pixel-blue hover:text-pixel-blue transition-all"
                aria-label="LinkedIn"
              >
                <TbBrandLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
