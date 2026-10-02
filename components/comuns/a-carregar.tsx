import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

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
      <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  )
}
