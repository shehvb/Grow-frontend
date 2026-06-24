import { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface CountUpOptions {
  suffix?: string;
  duration?: number;
  delay?: number;
}

export function useCountUp(
  target: number,
  { suffix = "", duration = 1.2, delay = 0 }: CountUpOptions = {}
): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    let controls: any;

    const timeout = setTimeout(() => {
      if (!active) return;
      controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (active) {
            setCount(Math.round(latest));
          }
        },
      });
    }, delay * 1000);

    return () => {
      active = false;
      clearTimeout(timeout);
      if (controls) controls.stop();
    };
  }, [target, duration, delay]);

  return `${count}${suffix}`;
}

export function useCountUpRaw(
  target: number,
  { duration = 1.2, delay = 0 }: Omit<CountUpOptions, "suffix"> = {}
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    let controls: any;

    const timeout = setTimeout(() => {
      if (!active) return;
      controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (active) {
            setCount(Math.round(latest));
          }
        },
      });
    }, delay * 1000);

    return () => {
      active = false;
      clearTimeout(timeout);
      if (controls) controls.stop();
    };
  }, [target, duration, delay]);

  return count;
}
