import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type PortalHeaderProps = {
  /** Current section name (e.g. "Aulas") */
  title?: string
  /** Signed-in person's name */
  name?: string
  /** Role label shown to the user, in Portuguese (e.g. "Aluno" for student) */
  roleLabel?: string
  /** Right-hand slot: usually <NotificationBell /> */
  actions?: React.ReactNode
  className?: string
}

/**
 * Portal top bar: menu button, current section, bell and person.
 * Must be rendered inside a <SidebarProvider>.
 */
export function PortalHeader({ title, name, roleLabel, actions, className }: PortalHeaderProps) {
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <header
      className={cn(
        "bg-background/95 sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-3 backdrop-blur sm:px-4",
        className
      )}
    >
      <SidebarTrigger />
      {title && (
        <>
          <Separator orientation="vertical" className="mx-1 h-6!" />
          <span className="text-heading truncate font-medium">{title}</span>
        </>
      )}

      <div className="ml-auto flex items-center gap-2">
        {actions}
        {name && (
          <div className="flex items-center gap-2 pl-1">
            <span
              aria-hidden="true"
              className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-semibold"
            >
              {initials}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-heading text-sm font-medium">{name}</span>
              {roleLabel && <span className="text-foreground text-xs">{roleLabel}</span>}
            </span>
            <span className="sr-only sm:hidden">
              {name}
              {roleLabel ? `, ${roleLabel}` : ""}
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
