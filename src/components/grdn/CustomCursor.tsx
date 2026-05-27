import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;

    const move = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      const target = event.target;
      setHidden(target instanceof Element && Boolean(target.closest("input, textarea, select")));
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    const updateTarget = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, label"),
      );
      const isTextInput = Boolean(target.closest("input, textarea, select"));
      setActive(isInteractive);
      setHidden(isTextInput);
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", updateTarget);
    window.addEventListener("pointerout", updateTarget);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", updateTarget);
      window.removeEventListener("pointerout", updateTarget);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`grdn-cursor-ring ${active ? "is-active" : ""} ${hidden ? "is-hidden" : ""}`}
      />
      <div
        ref={dotRef}
        className={`grdn-cursor-dot ${active ? "is-active" : ""} ${hidden ? "is-hidden" : ""}`}
      />
    </>
  );
}
