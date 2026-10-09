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

type Icon = React.ComponentType<{ className?: string }>

/** A menu item. Compatible with PortalModule from lib/modules (id, name, route). */
export type MenuItem = {
  id: string
  name: string
  route: string
  /** Optional count next to the item (e.g. pending requests) */
  count?: number
}

type SideMenuProps = {
  /** Modules the person can see, already filtered by role (e.g. modulesForRole(role)) */
  items: MenuItem[]
  /** Icon for each module, keyed by id. Missing ones get a generic icon. */
  icons?: Record<string, Icon>
  /** Short name shown at the top of the menu */
  brandName?: string
  /** Sign-out handler; without it the "Sair" button is hidden */
  onSignOut?: () => void
}

/**
 * Portal side menu. Presentation only: the items come from the module
 * registry (lib/modules, G3). Must be rendered inside a <SidebarProvider>.
 */
export function SideMenu({ items, icons = {}, brandName = "UniPortal", onSignOut }: SideMenuProps) {
  const currentPath = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-12 items-center gap-2 px-2">
          {/* Logo: replace here when rebranding for another university */}
          <span
            aria-hidden="true"
            className="bg-brand text-brand-foreground font-heading flex size-8 shrink-0 items-center justify-center rounded-md font-bold"
          >
            {brandName.charAt(0)}
          </span>
          <span className="font-heading text-heading truncate font-semibold group-data-[collapsible=icon]:hidden">
            {brandName}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav aria-label="Menu principal">
              <SidebarMenu>
                {items.map((item) => {
                  const ItemIcon = icons[item.id] ?? LayoutGrid
                  // Sub-routes (e.g. /aulas/123) keep the module highlighted
                  const isActive =
                    currentPath === item.route || currentPath.startsWith(`${item.route}/`)
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                        <Link href={item.route}>
                          <ItemIcon aria-hidden="true" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                      {!!item.count && <SidebarMenuBadge>{item.count}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {onSignOut && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sair" onClick={onSignOut}>
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
