/**
 * useCountUp — Master Telemetry Utility
 *
 * Animates a number from 0 to a target value over 1.2s with an easeOut curve.
 * Returns a MotionValue<string> for zero-reflow display inside <motion.span>.
 *
 * Usage:
 *   const displayValue = useCountUp(142, { suffix: "" });
 *   <motion.span>{displayValue}</motion.span>
 *
 *   // With suffix:
 *   const displayPct = useCountUp(88, { suffix: "%" });
 */

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";

interface CountUpOptions {
  /** String appended after the number, e.g. "%" or " XP" */
  suffix?: string;
  /** Animation duration in seconds. Defaults to 1.2 */
  duration?: number;
  /** Delay before animation starts in seconds. Defaults to 0 */
  delay?: number;
}

/**
 * Returns a MotionValue<string> that animates from 0 → target.
 * Safe to drop directly into a <motion.span> children or as `children` prop.
 */
export function useCountUp(
  target: number,
  { suffix = "", duration = 1.2, delay = 0 }: CountUpOptions = {}
): MotionValue<string> {
  const motionValue = useMotionValue(0);

  // Transform the raw number MotionValue into a formatted string MotionValue
  const displayValue = useTransform(motionValue, (latest) => {
    const rounded = Math.round(latest);
    return `${rounded}${suffix}`;
  });

  const prevTarget = useRef<number | null>(null);

  useEffect(() => {
    // Only re-animate when the target actually changes
    if (prevTarget.current === target) return;
    prevTarget.current = target;

    // Reset to 0 before animating (handles target changes mid-flight cleanly)
    motionValue.set(0);

    const controls = animate(motionValue, target, {
      duration,
      delay,
      ease: "easeOut" as any,
    });

    return () => controls.stop();
  }, [target, duration, delay, motionValue]);

  return displayValue;
}

/**
 * Variant that returns a plain number MotionValue — use this when you need to
 * compose with useTransform for custom formatting (e.g. locale strings).
 */
export function useCountUpRaw(
  target: number,
  { duration = 1.2, delay = 0 }: Omit<CountUpOptions, "suffix"> = {}
): MotionValue<number> {
  const motionValue = useMotionValue(0);
  const prevTarget = useRef<number | null>(null);

  useEffect(() => {
    if (prevTarget.current === target) return;
    prevTarget.current = target;

    motionValue.set(0);

    const controls = animate(motionValue, target, {
      duration,
      delay,
      ease: "easeOut" as any,
    });

    return () => controls.stop();
  }, [target, duration, delay, motionValue]);

  return motionValue;
}
