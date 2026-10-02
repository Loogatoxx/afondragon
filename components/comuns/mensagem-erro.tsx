import * as React from "react"
import { CircleAlert } from "lucide-react"

import { cn } from "@/lib/utils"

type MensagemErroProps = {
  titulo?: string
  mensagem?: string
  /** Ex.: <Button variant="outline" onClick={recarregar}>Tentar novamente</Button> */
  acao?: React.ReactNode
  className?: string
}

/** Mostrar quando um pedido falha. Explicar o que aconteceu e o que fazer. */
export function MensagemErro({
  titulo = "Ocorreu um erro",
  mensagem = "Não foi possível carregar os dados. Tente novamente.",
  acao,
  className,
}: MensagemErroProps) {
  return (
    <div
      role="alert"
      className={cn(
        "border-destructive/50 bg-destructive/5 flex gap-3 rounded-lg border p-4",
        className
      )}
    >
      <CircleAlert className="text-destructive size-5 shrink-0" aria-hidden="true" />
      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <p className="text-destructive font-medium">{titulo}</p>
          <p className="text-muted-foreground text-sm">{mensagem}</p>
        </div>
        {acao}
      </div>
    </div>
  )
}
