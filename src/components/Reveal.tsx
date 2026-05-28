"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger modifier — matches the .reveal.d1 / .d2 / .d3 CSS delays. */
  delay?: "d1" | "d2" | "d3";
  /** Render as something other than a <div> (e.g. "p", "h2", "li"). */
  as?: ElementType;
  className?: string;
};

/**
 * Fades + lifts its children into view once, via a single IntersectionObserver
 * (threshold 0.14, rootMargin '0px 0px -8% 0px') that adds the `in-view` class.
 */
export function Reveal({ children, delay, as: Tag = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = ["reveal", delay, className].filter(Boolean).join(" ");
  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
