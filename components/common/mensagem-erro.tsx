import * as React from "react"
import { CircleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type MensagemErroProps = {
  titulo?: string
  mensagem?: string
  /** E.g. <Button variant="outline" onClick={reload}>Tentar novamente</Button> */
  acao?: React.ReactNode
  className?: string
}

/**
 * Show when a request fails. Say what happened and what to do next.
 * Built on the shadcn Alert, in a soft variant so it does not alarm.
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
