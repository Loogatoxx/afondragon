import * as React from "react"
import { Inbox } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

type EstadoVazioProps = {
  titulo?: string
  descricao?: string
  /** lucide-react icon; defaults to an empty inbox */
  icone?: React.ComponentType<{ className?: string }>
  /** Suggested action, e.g. <Button>Criar o primeiro</Button> */
  acao?: React.ReactNode
  className?: string
}

/** Show when a list or table has no data. Built on the shadcn Empty. */
export function EstadoVazio({
  titulo = "Ainda não há nada aqui",
  descricao,
  icone: Icone = Inbox,
  acao,
  className,
}: EstadoVazioProps) {
  return (
    <Empty className={cn("bg-card border", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icone aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{titulo}</EmptyTitle>
        {descricao && <EmptyDescription>{descricao}</EmptyDescription>}
      </EmptyHeader>
      {acao && <EmptyContent>{acao}</EmptyContent>}
    </Empty>
  )
}
