"use client"

import { useEffect } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

export const ShinyCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 transition duration-300"
      style={{
        background: useMotionTemplate`radial-gradient(300px circle at ${cursorX}px ${cursorY}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  )
}
