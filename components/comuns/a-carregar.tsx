import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

type ACarregarProps = {
  texto?: string
  className?: string
}

/** Mostrar enquanto os dados estão a ser pedidos ao servidor. */
export function ACarregar({ texto = "A carregar…", className }: ACarregarProps) {
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
