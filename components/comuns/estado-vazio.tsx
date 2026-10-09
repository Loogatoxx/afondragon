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
  /** Ícone do lucide-react; por defeito, uma caixa vazia */
  icone?: React.ComponentType<{ className?: string }>
  /** Ação sugerida, ex.: <Button>Criar o primeiro</Button> */
  acao?: React.ReactNode
  className?: string
}

/** Mostrar quando uma lista ou tabela não tem dados. Feito sobre o Empty do shadcn. */
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
