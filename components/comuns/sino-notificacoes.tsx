"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, CheckCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/** Os campos que o sino mostra. Compatível com o tipo Notificacao da frente Contratos. */
export type NotificacaoSino = {
  id: string
  title: string
  message: string
  type: "info" | "sucesso" | "aviso" | "erro"
  read: boolean
  createdAt: string
  link?: string
}

type SinoNotificacoesProps = {
  notificacoes: NotificacaoSino[]
  /** Chamado quando a pessoa abre um aviso (para o marcar como lido) */
  onMarcarComoLida?: (id: string) => void
  /** Chamado no botão "Marcar todas como lidas" */
  onMarcarTodas?: () => void
  /** Página com a lista completa */
  verTodasHref?: string
  /** Quantos avisos mostrar no painel */
  maximo?: number
}

const corDoTipo: Record<NotificacaoSino["type"], string> = {
  info: "bg-info",
  sucesso: "bg-sucesso",
  aviso: "bg-aviso",
  erro: "bg-destructive",
}

function quandoFoi(iso: string) {
  const data = new Date(iso)
  return data.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/** Sino do cabeçalho: contador de avisos por ler e lista dos mais recentes. */
export function SinoNotificacoes({
  notificacoes,
  onMarcarComoLida,
  onMarcarTodas,
  verTodasHref = "/notificacoes",
  maximo = 5,
}: SinoNotificacoesProps) {
  const porLer = notificacoes.filter((n) => !n.read).length
  const visiveis = notificacoes.slice(0, maximo)
  const rotulo =
    porLer === 0
      ? "Notificações, nenhuma por ler"
      : `Notificações, ${porLer} por ler`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-10" aria-label={rotulo}>
          <Bell aria-hidden="true" />
          {porLer > 0 && (
            <Badge
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 text-xs tabular-nums"
            >
              {porLer > 9 ? "9+" : porLer}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] p-0">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <p className="font-heading text-heading font-semibold">Notificações</p>
          {porLer > 0 && onMarcarTodas && (
            <Button variant="link" size="sm" className="h-auto px-0" onClick={onMarcarTodas}>
              <CheckCheck aria-hidden="true" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <Separator />

        {visiveis.length === 0 ? (
          <p className="text-muted-foreground px-4 py-8 text-center text-sm">
            Não tem notificações.
          </p>
        ) : (
          <ul className="max-h-80 overflow-y-auto">
            {visiveis.map((n) => {
              const conteudo = (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      n.read ? "bg-transparent" : corDoTipo[n.type]
                    )}
                  />
                  <span className="min-w-0 flex-1 space-y-0.5">
                    <span className={cn("block text-sm", !n.read && "font-semibold")}>
                      {n.title}
                      {!n.read && <span className="sr-only"> (por ler)</span>}
                    </span>
                    <span className="text-muted-foreground line-clamp-2 block text-sm">
                      {n.message}
                    </span>
                    <span className="text-muted-foreground block text-xs">
                      {quandoFoi(n.createdAt)}
                    </span>
                  </span>
                </>
              )
              const classes =
                "hover:bg-accent focus-visible:bg-accent flex w-full gap-3 px-4 py-3 text-left"

              return (
                <li key={n.id} className="border-b last:border-b-0">
                  {n.link ? (
                    <Link
                      href={n.link}
                      className={classes}
                      onClick={() => onMarcarComoLida?.(n.id)}
                    >
                      {conteudo}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={classes}
                      onClick={() => onMarcarComoLida?.(n.id)}
                    >
                      {conteudo}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        <Separator />
        <div className="p-2">
          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link href={verTodasHref}>Ver todas</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
