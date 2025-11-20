"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  label: string
}

export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-lg border border-border bg-card/50 text-sm font-medium hover:bg-accent/10 hover:border-accent hover:text-accent transition-colors cursor-default inline-block"
    >
      {label}
    </motion.span>
  )
}
