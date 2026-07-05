"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const ShinyCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !hasFinePointer) return;
    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        background: useMotionTemplate`radial-gradient(300px circle at ${cursorX}px ${cursorY}px, rgba(29, 78, 216, 0.15), transparent 80%)`
      }}
    />
  );
};
