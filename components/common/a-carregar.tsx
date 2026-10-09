import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type ACarregarProps = {
  texto?: string
  /** "spinner" (default) or "linhas" (skeleton rows) for lists and tables */
  variante?: "spinner" | "linhas"
  /** Number of rows in the "linhas" variant */
  linhas?: number
  className?: string
}

/** Show while data is being requested from the server. */
export function ACarregar({
  texto = "A carregar…",
  variante = "spinner",
  linhas = 3,
  className,
}: ACarregarProps) {
  if (variante === "linhas") {
    return (
      <div role="status" aria-live="polite" className={cn("space-y-3", className)}>
        <span className="sr-only">{texto}</span>
        {Array.from({ length: linhas }, (_, i) => (
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
      <span>{texto}</span>
    </div>
  )
}
