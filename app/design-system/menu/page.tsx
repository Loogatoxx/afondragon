import type { Metadata } from "next";
import Link from "next/link";
import { FileText, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CabecalhoPagina } from "@/components/comuns/cabecalho-pagina";
import { EstadoVazio } from "@/components/comuns/estado-vazio";

export const metadata: Metadata = {
  title: "Exemplo de menu — Design System",
};

const itens = [
  { titulo: "Painel", href: "#", icone: LayoutDashboard, ativo: true },
  { titulo: "Contratos", href: "#", icone: FileText, contador: 3 },
  { titulo: "Utilizadores", href: "#", icone: Users },
  { titulo: "Definições", href: "#", icone: Settings },
];

export default function ExemploMenu() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex h-12 items-center gap-2 px-2">
            <span className="bg-marca text-marca-foreground flex size-8 shrink-0 items-center justify-center rounded-md font-heading font-bold">
              P
            </span>
            <span className="font-heading text-heading truncate font-semibold group-data-[collapsible=icon]:hidden">
              Plataforma PI2
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {itens.map((item) => (
                  <SidebarMenuItem key={item.titulo}>
                    <SidebarMenuButton asChild isActive={item.ativo} tooltip={item.titulo}>
                      <Link href={item.href}>
                        <item.icone aria-hidden="true" />
                        <span>{item.titulo}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.contador && <SidebarMenuBadge>{item.contador}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sair">
                <LogOut aria-hidden="true" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-6!" />
          <span className="text-muted-foreground text-sm">Painel</span>
        </header>
        <div className="mx-auto w-full max-w-[1100px] space-y-6 p-4 sm:p-8">
          <CabecalhoPagina
            titulo="Painel"
            descricao="Exemplo de ecrã com o menu lateral. Ctrl+B abre e fecha o menu."
            acoes={
              <Button asChild variant="outline">
                <Link href="/design-system">Voltar ao Design System</Link>
              </Button>
            }
          />
          <EstadoVazio
            titulo="Sem dados ainda"
            descricao="Cada grupo coloca aqui o conteúdo do seu módulo."
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
