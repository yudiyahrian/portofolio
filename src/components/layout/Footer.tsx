import Link from "next/link";
import { Terminal } from "lucide-react";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-dark-900 border-t-3 border-dark-700 mt-20"
      role="contentinfo"
    >
      <div className="pixel-divider" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-pixel-blue border-2 border-blue-400 flex items-center justify-center">
                <Terminal size={14} className="text-white" />
              </div>
              <span className="font-pixel text-xs text-white">
                YUDIYA<span className="text-pixel-blue">.DEV</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Flutter Developer & Fullstack Engineer. Building cross-platform
              apps and web products from Depok, Indonesia.
            </p>
            {siteConfig.openToWork && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-green-900/30 border-2 border-pixel-green">
                <div className="w-2 h-2 bg-pixel-green animate-pixel-blink" />
                <span className="font-pixel text-[8px] text-pixel-green">
                  OPEN TO WORK
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-pixel text-[9px] text-slate-300 mb-4">
              NAVIGATION
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-pixel-blue text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-pixel-blue text-xs">
                        ▶
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-pixel text-[9px] text-slate-300 mb-4">
              CONNECT
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-slate-400 hover:text-pixel-blue text-sm transition-colors block"
              >
                {siteConfig.email}
              </a>
              <p className="text-slate-500 text-sm">{siteConfig.location}</p>
              <div className="flex gap-3 pt-2">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border-2 border-dark-600 flex items-center justify-center text-slate-400 hover:border-pixel-blue hover:text-pixel-blue transition-all"
                  aria-label="GitHub"
                >
                  <TbBrandGithub size={16} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border-2 border-dark-600 flex items-center justify-center text-slate-400 hover:border-pixel-blue hover:text-pixel-blue transition-all"
                  aria-label="LinkedIn"
                >
                  <TbBrandLinkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-pixel text-[7px] text-slate-600 text-center sm:text-left">
            © {currentYear} MUHAMAD YUDIYA AHRIAN. ALL RIGHTS RESERVED.
          </p>
          <div className="font-pixel text-[7px] text-slate-700">
            INSERT COIN TO CONTINUE
          </div>
        </div>
      </div>
    </footer>
  );
}
