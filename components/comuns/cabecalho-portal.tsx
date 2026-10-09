import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type CabecalhoPortalProps = {
  /** Nome da secção atual (ex.: "Aulas") */
  titulo?: string
  /** Nome da pessoa com sessão iniciada */
  nome?: string
  /** Perfil da pessoa (ex.: "aluno") */
  perfil?: string
  /** Coisas à direita: normalmente o <SinoNotificacoes /> */
  acoes?: React.ReactNode
  className?: string
}

/**
 * Barra de topo do portal: botão do menu, secção atual, sino e pessoa.
 * Tem de estar dentro de um <SidebarProvider>.
 */
export function CabecalhoPortal({ titulo, nome, perfil, acoes, className }: CabecalhoPortalProps) {
  const iniciais = nome
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("")

  return (
    <header
      className={cn(
        "bg-background/95 sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-3 backdrop-blur sm:px-4",
        className
      )}
    >
      <SidebarTrigger />
      {titulo && (
        <>
          <Separator orientation="vertical" className="mx-1 h-6!" />
          <span className="text-heading truncate font-medium">{titulo}</span>
        </>
      )}

      <div className="ml-auto flex items-center gap-2">
        {acoes}
        {nome && (
          <div className="flex items-center gap-2 pl-1">
            <span
              aria-hidden="true"
              className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-semibold"
            >
              {iniciais}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-heading text-sm font-medium">{nome}</span>
              {perfil && <span className="text-foreground text-xs capitalize">{perfil}</span>}
            </span>
            <span className="sr-only sm:hidden">
              {nome}
              {perfil ? `, ${perfil}` : ""}
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
