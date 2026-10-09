"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, CheckCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/** Fields the bell displays. A subset of Notification from lib/notifications (G3). */
export type BellNotification = {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  link?: string
}

type NotificationBellProps = {
  notifications: BellNotification[]
  /** Called when the person opens an alert (to mark it as read) */
  onMarkAsRead?: (id: string) => void
  /** Called by the "Marcar todas como lidas" button */
  onMarkAllAsRead?: () => void
  /** Page with the full list */
  viewAllHref?: string
  /** How many alerts to show in the panel */
  max?: number
}

const dotColour: Record<BellNotification["type"], string> = {
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
}

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/** Header bell: unread counter and list of the latest alerts. */
export function NotificationBell({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  viewAllHref = "/notificacoes",
  max = 5,
}: NotificationBellProps) {
  const unread = notifications.filter((n) => !n.read).length
  const visible = notifications.slice(0, max)
  const label = unread === 0 ? "Notificações, nenhuma por ler" : `Notificações, ${unread} por ler`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-10" aria-label={label}>
          <Bell aria-hidden="true" />
          {unread > 0 && (
            <Badge
              aria-hidden="true"
              className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 text-xs tabular-nums"
            >
              {unread > 9 ? "9+" : unread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <p className="font-heading text-heading font-semibold">Notificações</p>
          {unread > 0 && onMarkAllAsRead && (
            <Button variant="link" size="sm" className="h-auto px-0" onClick={onMarkAllAsRead}>
              <CheckCheck aria-hidden="true" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <Separator />

        {visible.length === 0 ? (
          <p className="text-muted-foreground px-4 py-8 text-center text-sm">
            Não tem notificações.
          </p>
        ) : (
          <ul className="max-h-80 overflow-y-auto">
            {visible.map((n) => {
              const content = (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      n.read ? "bg-transparent" : dotColour[n.type]
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
                      {formatWhen(n.createdAt)}
                    </span>
                  </span>
                </>
              )
              const itemClasses =
                "hover:bg-accent focus-visible:bg-accent flex w-full gap-3 px-4 py-3 text-left"

              return (
                <li key={n.id} className="border-b last:border-b-0">
                  {n.link ? (
                    <Link href={n.link} className={itemClasses} onClick={() => onMarkAsRead?.(n.id)}>
                      {content}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={itemClasses}
                      onClick={() => onMarkAsRead?.(n.id)}
                    >
                      {content}
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
            <Link href={viewAllHref}>Ver todas</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
