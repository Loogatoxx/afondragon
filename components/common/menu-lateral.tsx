"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

type Icone = React.ComponentType<{ className?: string }>

/** A menu item. Compatible with PortalModule from lib/modules (id, name, route). */
export type ItemMenu = {
  id: string
  name: string
  route: string
  /** Optional count next to the item (e.g. pending requests) */
  contador?: number
}

type MenuLateralProps = {
  /** Modules the person can see, already filtered by role (e.g. modulesForRole(role)) */
  itens: ItemMenu[]
  /** Icon for each module, keyed by id. Missing ones get a generic icon. */
  icones?: Record<string, Icone>
  /** Short name shown at the top of the menu */
  marca?: string
  /** Sign-out handler; without it the "Sair" button is hidden */
  onSair?: () => void
}

/**
 * Portal side menu. Presentation only: the items come from the module
 * registry (lib/modules, G3). Must be rendered inside a <SidebarProvider>.
 */
export function MenuLateral({ itens, icones = {}, marca = "UniPortal", onSair }: MenuLateralProps) {
  const rotaAtual = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-12 items-center gap-2 px-2">
          {/* Logo: replace here when rebranding for another university */}
          <span
            aria-hidden="true"
            className="bg-brand text-brand-foreground font-heading flex size-8 shrink-0 items-center justify-center rounded-md font-bold"
          >
            {marca.charAt(0)}
          </span>
          <span className="font-heading text-heading truncate font-semibold group-data-[collapsible=icon]:hidden">
            {marca}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav aria-label="Menu principal">
              <SidebarMenu>
                {itens.map((item) => {
                  const IconeItem = icones[item.id] ?? LayoutGrid
                  const ativo =
                    rotaAtual === item.route || rotaAtual.startsWith(`${item.route}/`)
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={ativo} tooltip={item.name}>
                        <Link href={item.route}>
                          <IconeItem aria-hidden="true" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                      {!!item.contador && <SidebarMenuBadge>{item.contador}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {onSair && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sair" onClick={onSair}>
                <LogOut aria-hidden="true" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
