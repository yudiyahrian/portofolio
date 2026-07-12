"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  strings: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function Typewriter({
  strings,
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentString = strings[currentIndex];

    const tick = () => {
      if (!isDeleting) {
        if (displayText.length < currentString.length) {
          setDisplayText(currentString.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(tick, speed);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % strings.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, currentIndex, isDeleting, strings, speed, deleteSpeed, pauseTime]);

  return (
    <span className={className} aria-label={strings[currentIndex]}>
      {displayText}
      <span className="animate-pixel-blink text-pixel-blue ml-0.5">█</span>
    </span>
  );
}
