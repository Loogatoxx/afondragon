import * as React from "react"

import { cn } from "@/lib/utils"

type CabecalhoPaginaProps = {
  titulo: string
  descricao?: string
  /** Botões ou links à direita do título (ex.: "Novo contrato") */
  acoes?: React.ReactNode
  className?: string
}

/** Título de topo de cada página. Usar um por ecrã. */
export function CabecalhoPagina({
  titulo,
  descricao,
  acoes,
  className,
}: CabecalhoPaginaProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{titulo}</h1>
        {descricao && (
          <p className="text-muted-foreground text-sm">{descricao}</p>
        )}
      </div>
      {acoes && <div className="flex flex-wrap gap-2">{acoes}</div>}
    </header>
  )
}
