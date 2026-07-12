"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, Send,
  CheckCircle, AlertCircle, Loader, RefreshCw,
} from "lucide-react";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { siteConfig } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  form?: string;   // global / network error
}

// ── Client-side validation (mirrors server rules) ────────────────────────────

const SUBJECTS = [
  "Freelance Project",
  "Full-time Opportunity",
  "Technical Consulting",
  "Open Source Collaboration",
  "General Inquiry",
] as const;

function validateFields(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (fields.name.trim().length > 100) {
    errors.name = "Name must be under 100 characters.";
  }

  const emailRe = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRe.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.subject) {
    errors.subject = "Please select a subject.";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 20) {
    errors.message = `Message is too short (${fields.message.trim().length}/20 characters minimum).`;
  } else if (fields.message.trim().length > 5000) {
    errors.message = "Message must be under 5,000 characters.";
  }

  return errors;
}

// ── Input class helper ───────────────────────────────────────────────────────

function inputCls(error?: string, touched?: boolean): string {
  const base =
    "w-full px-4 py-3 border-2 bg-white dark:bg-dark-800 " +
    "text-dark-900 dark:text-white placeholder:text-slate-400 " +
    "focus:outline-hidden transition-colors font-mono text-sm";
  if (error && touched) return `${base} border-pixel-red focus:border-pixel-red`;
  return `${base} border-dark-300 dark:border-dark-600 focus:border-pixel-blue`;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [fields, setFields] = useState<FormFields>({
    name: "", email: "", subject: "", message: "",
  });
  const [touched, setTouched] = useState<Record<keyof FormFields, boolean>>({
    name: false, email: false, subject: false, message: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  // Honeypot ref — hidden from real users, bots fill it in
  const honeyRef = useRef<HTMLInputElement>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const next = { ...fields, [name]: value };
    setFields(next);
    // Live-validate only after the field has been touched
    if (touched[name as keyof FormFields]) {
      setErrors(validateFields(next));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target as { name: keyof FormFields };
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateFields(fields));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Mark everything as touched so all errors are visible
    setTouched({ name: true, email: true, subject: true, message: true });
    const clientErrors = validateFields(fields);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      // Focus the first invalid field
      const firstField = Object.keys(clientErrors)[0];
      (document.querySelector(`[name="${firstField}"]`) as HTMLElement)?.focus();
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          _honey: honeyRef.current?.value ?? "",
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        // Server returned a field-level error
        if (json.field && json.field !== "form") {
          setErrors({ [json.field]: json.error });
          setTouched((prev) => ({ ...prev, [json.field]: true }));
          (document.querySelector(`[name="${json.field}"]`) as HTMLElement)?.focus();
          setStatus("idle");
        } else {
          // Rate-limit or generic error
          setServerError(json.error ?? "Something went wrong. Please try again.");
          setStatus("error");
        }
        return;
      }

      setStatus("success");
      // Reset
      setFields({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, subject: false, message: false });
      setErrors({});
    } catch {
      setServerError(
        "Network error — please check your connection or email me directly at " +
        siteConfig.email
      );
      setStatus("error");
    }
  }

  function resetForm() {
    setStatus("idle");
    setServerError("");
    setErrors({});
  }

  const msgLen = fields.message.length;
  const msgMax = 5000;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="pt-24 pb-20">
      <section className="section-container">
        <ScrollReveal>
          <SectionHeader
            title="GET IN TOUCH"
            subtitle="Have a project in mind or want to chat? I respond within 24 hours."
            accent="// CONTACT.EXE"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left column: info ──────────────────────────────────────────── */}
          <ScrollReveal>
            <div className="space-y-8">

              {/* Availability badge */}
              <div
                className="pixel-card"
                style={{ borderColor: "#22C55E", boxShadow: "4px 4px 0px #15803D" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-pixel-green animate-pixel-blink" />
                  <span className="font-pixel text-[9px] text-pixel-green">
                    CURRENTLY AVAILABLE
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Open to freelance projects, full-time opportunities, and technical
                  consulting. Typical response time within 24 hours.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 group p-3 border-2 border-transparent
                             hover:border-dark-300 dark:hover:border-dark-600 transition-colors"
                >
                  <div className="w-10 h-10 border-2 border-pixel-blue flex items-center
                                  justify-center text-pixel-blue group-hover:bg-pixel-blue
                                  group-hover:text-white transition-all">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-pixel text-[8px] text-slate-400 mb-0.5">EMAIL</p>
                    <p className="text-sm text-dark-900 dark:text-white font-mono">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 border-2 border-pixel-blue flex items-center
                                  justify-center text-pixel-blue">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-pixel text-[8px] text-slate-400 mb-0.5">LOCATION</p>
                    <p className="text-sm text-dark-900 dark:text-white">{siteConfig.location}</p>
                    <p className="text-xs text-slate-400">Open to remote worldwide</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="font-pixel text-[9px] text-slate-400 mb-3">FIND ME ON</p>
                <div className="flex gap-3">
                  {[
                    { icon: TbBrandGithub, href: siteConfig.social.github, label: "GitHub" },
                    { icon: TbBrandLinkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 border-3 border-dark-300 dark:border-dark-600
                                 flex items-center justify-center text-slate-400
                                 hover:border-pixel-blue hover:text-pixel-blue transition-all"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Retro terminal decoration */}
              <div className="retro-window hidden lg:block">
                <div className="retro-window-header">
                  <div className="retro-window-btn bg-pixel-red border border-red-700" />
                  <div className="retro-window-btn bg-pixel-yellow border border-yellow-700" />
                  <div className="retro-window-btn bg-pixel-green border border-green-700" />
                  <span className="ml-2 font-pixel text-[7px] text-slate-400">STATUS.SYS</span>
                </div>
                <div className="bg-dark-900 p-4 font-mono text-xs space-y-1">
                  <p>
                    <span className="text-slate-500">$ </span>
                    <span className="text-slate-300">availability --check</span>
                  </p>
                  <p className="text-pixel-green">✓ Available for new projects</p>
                  <p>
                    <span className="text-slate-500">$ </span>
                    <span className="text-slate-300">timezone --get</span>
                  </p>
                  <p className="text-pixel-blue">UTC+7 (WIB — Jakarta)</p>
                  <p>
                    <span className="text-slate-500">$ </span>
                    <span className="text-slate-300">response --time</span>
                  </p>
                  <p className="text-pixel-yellow">~24h response time</p>
                  <p className="animate-pixel-blink text-green-400">█</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right column: form ─────────────────────────────────────────── */}
          <ScrollReveal delay={0.2}>
            <div className="pixel-card">
              <AnimatePresence mode="wait">

                {/* ── SUCCESS ── */}
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle size={52} className="text-pixel-green mb-5" />
                    <h3 className="font-pixel text-sm text-dark-900 dark:text-white mb-3 leading-relaxed">
                      MESSAGE SENT!
                    </h3>
                    <p className="text-slate-500 text-sm mb-2 leading-relaxed">
                      Thanks for reaching out. I&apos;ll reply within 24 hours.
                    </p>
                    <p className="text-slate-400 text-xs mb-8">
                      Check your inbox — I&apos;ve sent you a confirmation email too.
                    </p>
                    <button onClick={resetForm} className="pixel-btn-secondary flex items-center gap-2">
                      <RefreshCw size={12} />
                      SEND ANOTHER
                    </button>
                  </motion.div>
                )}

                {/* ── ERROR (network / rate-limit) ── */}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <AlertCircle size={52} className="text-pixel-red mb-5" />
                    <h3 className="font-pixel text-sm text-dark-900 dark:text-white mb-3 leading-relaxed">
                      SEND FAILED
                    </h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-xs">
                      {serverError}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button onClick={resetForm} className="pixel-btn-secondary flex items-center gap-2">
                        <RefreshCw size={12} />
                        TRY AGAIN
                      </button>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="pixel-btn-primary flex items-center gap-2"
                      >
                        <Mail size={12} />
                        EMAIL DIRECT
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* ── FORM ── */}
                {(status === "idle" || status === "loading") && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                  >
                    <h3 className="font-pixel text-[11px] text-pixel-blue mb-6">
                      SEND A MESSAGE
                    </h3>

                    {/* ── Honeypot (hidden from humans, visible to bots) ── */}
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
                      tabIndex={-1}
                    >
                      <label htmlFor="website">Leave this blank</label>
                      <input
                        ref={honeyRef}
                        id="website"
                        name="_honey"
                        type="text"
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    <div className="space-y-5">

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-pixel text-[8px] text-slate-400 mb-2"
                        >
                          NAME *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={fields.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your full name"
                          className={inputCls(errors.name, touched.name)}
                          aria-describedby={errors.name && touched.name ? "name-err" : undefined}
                          aria-invalid={!!(errors.name && touched.name)}
                          required
                          disabled={status === "loading"}
                        />
                        <AnimatePresence>
                          {errors.name && touched.name && (
                            <motion.p
                              id="name-err"
                              role="alert"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1.5 text-xs text-pixel-red font-mono flex items-center gap-1"
                            >
                              <span>▶</span> {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-pixel text-[8px] text-slate-400 mb-2"
                        >
                          EMAIL *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={fields.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="your@email.com"
                          className={inputCls(errors.email, touched.email)}
                          aria-describedby={errors.email && touched.email ? "email-err" : undefined}
                          aria-invalid={!!(errors.email && touched.email)}
                          required
                          disabled={status === "loading"}
                        />
                        <AnimatePresence>
                          {errors.email && touched.email && (
                            <motion.p
                              id="email-err"
                              role="alert"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1.5 text-xs text-pixel-red font-mono flex items-center gap-1"
                            >
                              <span>▶</span> {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="block font-pixel text-[8px] text-slate-400 mb-2"
                        >
                          SUBJECT *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={fields.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputCls(errors.subject, touched.subject)} appearance-none cursor-pointer`}
                          aria-describedby={errors.subject && touched.subject ? "subject-err" : undefined}
                          aria-invalid={!!(errors.subject && touched.subject)}
                          required
                          disabled={status === "loading"}
                        >
                          <option value="" disabled>Select a topic...</option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <AnimatePresence>
                          {errors.subject && touched.subject && (
                            <motion.p
                              id="subject-err"
                              role="alert"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-1.5 text-xs text-pixel-red font-mono flex items-center gap-1"
                            >
                              <span>▶</span> {errors.subject}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block font-pixel text-[8px] text-slate-400 mb-2"
                        >
                          MESSAGE *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={fields.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Tell me about your project or inquiry..."
                          className={`${inputCls(errors.message, touched.message)} resize-none`}
                          aria-describedby={
                            errors.message && touched.message
                              ? "message-err"
                              : "message-counter"
                          }
                          aria-invalid={!!(errors.message && touched.message)}
                          required
                          disabled={status === "loading"}
                        />
                        <div className="flex items-start justify-between mt-1.5">
                          <AnimatePresence>
                            {errors.message && touched.message ? (
                              <motion.p
                                id="message-err"
                                role="alert"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-pixel-red font-mono flex items-center gap-1"
                              >
                                <span>▶</span> {errors.message}
                              </motion.p>
                            ) : (
                              <span />
                            )}
                          </AnimatePresence>
                          <span
                            id="message-counter"
                            className={`text-xs font-mono tabular-nums shrink-0 ml-2 ${
                              msgLen > msgMax * 0.9
                                ? msgLen >= msgMax
                                  ? "text-pixel-red"
                                  : "text-pixel-yellow"
                                : "text-slate-400"
                            }`}
                            aria-live="polite"
                          >
                            {msgLen.toLocaleString()}/{msgMax.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full pixel-btn-primary flex items-center justify-center gap-2
                                   disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-busy={status === "loading"}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader size={12} className="animate-spin" aria-hidden="true" />
                            SENDING...
                          </>
                        ) : (
                          <>
                            <Send size={12} aria-hidden="true" />
                            SEND MESSAGE
                          </>
                        )}
                      </button>

                      {/* Privacy note */}
                      <p className="text-center text-xs text-slate-500 font-mono leading-relaxed">
                        Your email is only used to reply to you.
                        <br />
                        It is never shared or stored in a database.
                      </p>

                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
}
