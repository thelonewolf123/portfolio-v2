interface SkillBadgeProps {
  label: string
}

export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="px-4 py-2 rounded-lg border border-border bg-card/50 text-sm font-medium hover:bg-card hover:border-accent transition-all">
      {label}
    </span>
  )
}
