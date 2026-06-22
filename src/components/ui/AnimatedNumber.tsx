import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
}

export const AnimatedNumber = ({ value, duration = 1.5, delay = 0 }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
    }
  }, [isInView, value, motionValue, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
          maximumFractionDigits: Number.isInteger(value) ? 0 : 2
        }).format(latest);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}>0</span>;
};
