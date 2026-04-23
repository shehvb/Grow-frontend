import { useState, useEffect, useRef, type RefObject } from "react";

// ── useInView ─────────────────────────────────────────────────────────────────
export function useInView(threshold = 0.15): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref as RefObject<HTMLDivElement>, visible];
}

// ── useCountUp ────────────────────────────────────────────────────────────────
export function useCountUp(
  target: string,
  active: boolean,
  suffix: string = ""
): string {
  const [val, setVal] = useState<string>("0" + suffix);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const duration = 1600;
    const isFloat = target.includes(".");
    const numericTarget = parseFloat(target);

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isFloat
        ? (eased * numericTarget).toFixed(1)
        : String(Math.floor(eased * numericTarget));
      setVal(current + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, target, suffix]);

  return val;
}

// ── useScrolled ───────────────────────────────────────────────────────────────
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
