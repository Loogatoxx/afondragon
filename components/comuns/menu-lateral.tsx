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

/** Um item do menu. Compatível com o tipo Modulo da frente Contratos (id, name, route). */
export type ItemMenu = {
  id: string
  name: string
  route: string
  /** Número opcional ao lado do item (ex.: pedidos pendentes) */
  contador?: number
}

type MenuLateralProps = {
  /** Os módulos que a pessoa pode ver, já filtrados pelo perfil (ex.: modulosDe(perfil)) */
  itens: ItemMenu[]
  /** Ícone de cada módulo, pelo id. Os que faltarem usam um ícone genérico. */
  icones?: Record<string, Icone>
  /** Nome curto mostrado no topo do menu */
  marca?: string
  /** Função de sair; se faltar, o botão "Sair" não aparece */
  onSair?: () => void
}

/**
 * Menu lateral do portal. Só desenha: quem decide os itens é o registo de
 * módulos da frente Contratos. Tem de estar dentro de um <SidebarProvider>.
 */
export function MenuLateral({ itens, icones = {}, marca = "UniPortal", onSair }: MenuLateralProps) {
  const rotaAtual = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-12 items-center gap-2 px-2">
          {/* Logótipo: trocar aqui ao mudar de universidade */}
          <span
            aria-hidden="true"
            className="bg-marca text-marca-foreground font-heading flex size-8 shrink-0 items-center justify-center rounded-md font-bold"
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
