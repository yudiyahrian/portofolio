import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  accent,
  className = "",
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered ? "text-center" : "", "mb-12", className)}>
      {accent && (
        <div className="flex items-center gap-2 mb-4" style={{ justifyContent: centered ? "center" : "flex-start" }}>
          <div className="w-2 h-2 bg-pixel-blue animate-pixel-blink" aria-hidden="true" />
          <span className="font-pixel text-[9px] text-pixel-blue uppercase tracking-wider">
            {accent}
          </span>
        </div>
      )}
      <h2 className="font-pixel text-2xl sm:text-3xl text-dark-900 dark:text-white leading-relaxed mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed"
          style={{ margin: centered ? "0 auto" : undefined }}>
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "h-1 w-16 mt-4 bg-pixel-blue",
          centered && "mx-auto"
        )}
      />
    </div>
  );
}
