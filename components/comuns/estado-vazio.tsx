import * as React from "react"
import { Inbox } from "lucide-react"

import { cn } from "@/lib/utils"

type EstadoVazioProps = {
  titulo?: string
  descricao?: string
  /** Ação sugerida, ex.: <Button>Criar o primeiro</Button> */
  acao?: React.ReactNode
  className?: string
}

/** Mostrar quando uma lista ou tabela não tem dados. */
export function EstadoVazio({
  titulo = "Ainda não há nada aqui",
  descricao,
  acao,
  className,
}: EstadoVazioProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center",
        className
      )}
    >
      <Inbox className="text-muted-foreground size-10" aria-hidden="true" />
      <div className="space-y-1">
        <p className="font-medium">{titulo}</p>
        {descricao && (
          <p className="text-muted-foreground text-sm">{descricao}</p>
        )}
      </div>
      {acao}
    </div>
  )
}
