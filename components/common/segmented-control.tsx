"use client"

import { cn } from "@/lib/utils"

type Option<T extends string> = {
  value: T
  label: React.ReactNode
  /** Extra text for screen readers (e.g. "(hoje)") */
  srHint?: string
}

type SegmentedControlProps<T extends string> = {
  value: T
  onValueChange: (value: T) => void
  options: Option<T>[]
  /** Accessible name of the group, e.g. "Filtrar por categoria" */
  label: string
  className?: string
}

/**
 * Row of toggle buttons for filters and view switches. Looks like TabsList but
 * uses aria-pressed, because a filter is not a tab with its own panel.
 */
export function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  label,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "bg-secondary inline-flex max-w-full flex-wrap items-center gap-1 rounded-md p-1",
        className
      )}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "inline-flex h-9 items-center justify-center gap-1.5 rounded-sm px-3 text-sm font-medium whitespace-nowrap transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground hover:bg-accent"
            )}
          >
            {option.label}
            {option.srHint && <span className="sr-only"> {option.srHint}</span>}
          </button>
        )
      })}
    </div>
  )
}
