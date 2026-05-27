import { useEffect, useState } from "react";

/**
 * Cinematic loading overlay shown on first homepage visit.
 * "Entering THE GRDN" — fades out after ~1.6s.
 */
export function LoadingExperience() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.documentElement.classList.add("grdn-loading-lock");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => setFadingOut(true), 1400);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("grdn-loading-lock");
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.documentElement.classList.remove("grdn-loading-lock");
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="font-display text-5xl md:text-7xl tracking-tighter">
          THE <span className="grdn-gradient-text">GRDN</span>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">
          Entering the experience
        </div>
        <div className="relative w-40 h-px bg-border overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ animation: "grdn-loader-line 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
