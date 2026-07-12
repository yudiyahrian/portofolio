export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Honeypot field — must be empty. Bots fill it, humans don't see it.
  _honey: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  data?: ContactFormData;
}

// Suspicious patterns commonly used in spam / injection attempts
const SPAM_PATTERNS = [
  /https?:\/\//gi,             // URLs in name field
  /\bviagra\b/i,
  /\bcasino\b/i,
  /\bseo\b.*\bservice/i,
  /\bclick here\b/i,
  /content-type:/i,            // Header injection
  /bcc:/i,
  /cc:/i,
  /<script/i,                  // XSS attempt
  /javascript:/i,
];

function containsSpam(text: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
}

function sanitize(str: string): string {
  return str
    .trim()
    .replace(/[\r\n]/g, " ")   // Prevent header injection via newlines
    .slice(0, 5000);            // Hard cap
}

const VALID_SUBJECTS = [
  "Freelance Project",
  "Full-time Opportunity",
  "Technical Consulting",
  "Open Source Collaboration",
  "General Inquiry",
];

export function validateContactForm(raw: Record<string, unknown>): ValidationResult {
  const errors: ValidationError[] = [];

  // ── Honeypot check (silent — don't reveal to caller why it failed) ──
  const honey = String(raw._honey ?? "");
  if (honey.length > 0) {
    // Return "valid" to the bot so it thinks it succeeded, but we won't send
    return { valid: false, errors: [] };
  }

  // ── Name ──
  const name = sanitize(String(raw.name ?? ""));
  if (!name) {
    errors.push({ field: "name", message: "Name is required." });
  } else if (name.length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters." });
  } else if (name.length > 100) {
    errors.push({ field: "name", message: "Name must be under 100 characters." });
  } else if (containsSpam(name)) {
    errors.push({ field: "name", message: "Name contains invalid content." });
  }

  // ── Email ──
  const email = sanitize(String(raw.email ?? "")).toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  } else if (email.length > 254) {
    errors.push({ field: "email", message: "Email address is too long." });
  }

  // ── Subject ──
  const subject = sanitize(String(raw.subject ?? ""));
  if (!subject) {
    errors.push({ field: "subject", message: "Please select a subject." });
  } else if (!VALID_SUBJECTS.includes(subject)) {
    errors.push({ field: "subject", message: "Please select a valid subject from the list." });
  }

  // ── Message ──
  const message = String(raw.message ?? "").trim().slice(0, 5000);
  if (!message) {
    errors.push({ field: "message", message: "Message is required." });
  } else if (message.length < 20) {
    errors.push({ field: "message", message: "Message must be at least 20 characters." });
  } else if (message.length > 5000) {
    errors.push({ field: "message", message: "Message must be under 5,000 characters." });
  } else if (containsSpam(message)) {
    errors.push({ field: "message", message: "Message contains invalid content." });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: { name, email, subject, message, _honey: honey },
  };
}
