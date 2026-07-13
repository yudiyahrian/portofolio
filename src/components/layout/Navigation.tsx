"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Download, Terminal } from "lucide-react";
import { TbBrandGithub, TbBrandTwitter, TbBrandLinkedin } from "react-icons/tb";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-dark-900/95 backdrop-blur-sm border-b-3 border-dark-700 dark:border-dark-600"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Yudiya Portfolio - Home">
            <div className="w-8 h-8 bg-pixel-blue border-2 border-blue-400 flex items-center justify-center relative overflow-hidden group-hover:animate-pixel-float">
              <Terminal size={14} className="text-white" />
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
            </div>
            <span className="font-pixel text-xs text-dark-900 dark:text-white hidden sm:block leading-relaxed">
              YUDIYA<span className="text-pixel-blue">.DEV</span>
            </span>
          </Link>

          {/* Desktop nav — icon is now a LucideIcon component */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const Icon = item.icon; // LucideIcon component
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={cn(
                    "flex items-center gap-1.5 font-pixel text-[9px] px-3 py-2 transition-all duration-100 relative group",
                    isActive
                      ? "text-pixel-blue"
                      : "text-dark-600 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={12} aria-hidden="true" />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pixel-blue"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                    />
                  )}
                  <span className="absolute inset-0 border-2 border-transparent group-hover:border-dark-200 dark:group-hover:border-dark-700 transition-colors duration-100" />
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: siteConfig.social.github,   Icon: TbBrandGithub,   label: "GitHub"   },
                { href: siteConfig.social.twitter,   Icon: TbBrandTwitter,  label: "Twitter"  },
                { href: siteConfig.social.linkedin,  Icon: TbBrandLinkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center text-dark-600 dark:text-slate-400 hover:text-pixel-blue dark:hover:text-pixel-blue transition-colors border-2 border-transparent hover:border-dark-300 dark:hover:border-dark-600"
                  aria-label={label}>
                  <Icon size={15} />
                </a>
              ))}
            </div>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 flex items-center justify-center text-dark-600 dark:text-slate-400 hover:text-pixel-blue dark:hover:text-pixel-blue transition-colors border-2 border-transparent hover:border-dark-300 dark:hover:border-dark-600"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            <a href="/resume" className="hidden sm:flex pixel-btn-primary items-center gap-1.5 text-[8px]">
              <Download size={10} />
              RESUME
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center border-3 border-dark-300 dark:border-dark-600 text-dark-900 dark:text-white hover:border-pixel-blue hover:text-pixel-blue transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-out */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)} aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-dark-900 border-l-3 border-dark-600 z-50 lg:hidden flex flex-col"
              role="dialog" aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between p-4 border-b-3 border-dark-700">
                <div className="font-pixel text-[10px] text-pixel-blue">NAVIGATION</div>
                <button onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border-2 border-dark-600 text-white hover:border-pixel-red hover:text-pixel-red transition-colors"
                  aria-label="Close menu">
                  <X size={14} />
                </button>
              </div>

              <div className="px-4 py-2 bg-dark-800 border-b border-dark-700 flex gap-2 items-center">
                <div className="w-3 h-3 bg-pixel-red border border-red-700" />
                <div className="w-3 h-3 bg-pixel-yellow border border-yellow-700" />
                <div className="w-3 h-3 bg-pixel-green border border-green-700" />
                <div className="ml-2 font-pixel text-[8px] text-slate-500">SELECT_SCREEN.EXE</div>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {siteConfig.nav.map((item, i) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon; // LucideIcon component
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 border-2 font-pixel text-[10px] transition-all duration-100",
                            isActive
                              ? "bg-pixel-blue/20 border-pixel-blue text-pixel-blue"
                              : "border-dark-700 text-slate-400 hover:border-dark-500 hover:text-white hover:bg-dark-800"
                          )}
                        >
                          <Icon size={14} aria-hidden="true" />
                          {item.label}
                          {isActive && <span className="ml-auto text-pixel-blue animate-pixel-blink">◀</span>}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              <div className="p-4 border-t-3 border-dark-700 space-y-3">
                <a href="/resume" className="pixel-btn-primary flex items-center justify-center gap-2 w-full text-[9px]">
                  <Download size={12} />DOWNLOAD RESUME
                </a>
                <div className="flex justify-center gap-4">
                  {[
                    { href: siteConfig.social.github,  Icon: TbBrandGithub,   label: "GitHub"   },
                    { href: siteConfig.social.twitter,  Icon: TbBrandTwitter,  label: "Twitter"  },
                    { href: siteConfig.social.linkedin, Icon: TbBrandLinkedin, label: "LinkedIn" },
                  ].map(({ href, Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="text-slate-400 hover:text-pixel-blue transition-colors" aria-label={label}>
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
                <div className="font-pixel text-[7px] text-dark-600 text-center">
                  © {new Date().getFullYear()} YUDIYA AHRIAN
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
