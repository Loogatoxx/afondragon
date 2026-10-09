import * as React from "react"
import { CircleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type MensagemErroProps = {
  titulo?: string
  mensagem?: string
  /** Ex.: <Button variant="outline" onClick={recarregar}>Tentar novamente</Button> */
  acao?: React.ReactNode
  className?: string
}

/**
 * Mostrar quando um pedido falha. Explicar o que aconteceu e o que fazer.
 * Feito sobre o Alert do shadcn, numa versão suave para não assustar.
 */
export function MensagemErro({
  titulo = "Ocorreu um erro",
  mensagem = "Não foi possível carregar os dados. Tente novamente.",
  acao,
  className,
}: MensagemErroProps) {
  return (
    <Alert className={cn("border-destructive/50 bg-destructive/5 p-4", className)}>
      <CircleAlert className="text-destructive!" aria-hidden="true" />
      <AlertTitle className="text-destructive">{titulo}</AlertTitle>
      <AlertDescription className="text-muted-foreground space-y-3">
        <p>{mensagem}</p>
        {acao}
      </AlertDescription>
    </Alert>
  )
}
