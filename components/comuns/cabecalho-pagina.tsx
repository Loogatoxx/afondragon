import * as React from "react"

import { Separator } from "@/components/ui/separator"
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
    <header className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{titulo}</h1>
          {descricao && <p className="text-foreground">{descricao}</p>}
        </div>
        {acoes && <div className="flex flex-wrap gap-2">{acoes}</div>}
      </div>
      <Separator className="bg-input" />
    </header>
  )
}
