"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const offsets = {
  up: { x: 0, y: 40 },
  left: { x: -72, y: 0 },
  right: { x: 72, y: 0 },
  scale: { x: 0, y: 28 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  duration = 0.8,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -8% 0px" });
  const offset = offsets[direction] || offsets.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: direction === "scale" ? 0.96 : 1,
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              scale: direction === "scale" ? 0.96 : 1,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
