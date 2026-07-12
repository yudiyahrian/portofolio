"use client";

export default function CRTOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </div>
  );
}
