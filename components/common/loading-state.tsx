import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type LoadingStateProps = {
  /** Text announced to the user */
  label?: string
  /** "spinner" (default) or "rows" (skeleton rows) for lists and tables */
  variant?: "spinner" | "rows"
  /** Number of rows in the "rows" variant */
  rows?: number
  className?: string
}

/** Show while data is being requested from the server. */
export function LoadingState({
  label = "A carregar…",
  variant = "spinner",
  rows = 3,
  className,
}: LoadingStateProps) {
  if (variant === "rows") {
    return (
      <div role="status" aria-live="polite" className={cn("space-y-3", className)}>
        <span className="sr-only">{label}</span>
        {Array.from({ length: rows }, (_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "text-muted-foreground flex items-center justify-center gap-2 p-8 text-sm",
        className
      )}
    >
      <Spinner className="size-5" role="presentation" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
