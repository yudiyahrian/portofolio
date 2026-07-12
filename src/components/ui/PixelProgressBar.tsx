"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelProgressBarProps {
  value: number;
  label?: string;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export default function PixelProgressBar({
  value,
  label,
  color = "#3B82F6",
  showLabel = true,
  className = "",
}: PixelProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className={cn("space-y-1", className)}>
      {label && showLabel && (
        <div className="flex justify-between items-center">
          <span className="font-mono text-sm text-dark-700 dark:text-slate-300">{label}</span>
          <span className="font-pixel text-[9px]" style={{ color }}>
            {value}%
          </span>
        </div>
      )}
      <div className="pixel-progress">
        <motion.div
          className="pixel-progress-fill"
          style={{ color, width: isInView ? `${value}%` : "0%" }}
          initial={{ width: "0%" }}
          animate={{ width: isInView ? `${value}%` : "0%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        />
        {/* Pixel grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(0,0,0,0.5) 11px, rgba(0,0,0,0.5) 12px)",
          }}
        />
      </div>
    </div>
  );
}
