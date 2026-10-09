"use client";

import { useState } from "react";
import { Building2, CalendarDays, GraduationCap, House, ShieldAlert, UtensilsCrossed } from "lucide-react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CabecalhoPortal } from "@/components/common/cabecalho-portal";
import { CabecalhoPagina } from "@/components/common/cabecalho-pagina";
import { EstadoVazio } from "@/components/common/estado-vazio";
import { MenuLateral, type ItemMenu } from "@/components/common/menu-lateral";
import { SinoNotificacoes, type NotificacaoSino } from "@/components/common/sino-notificacoes";

// EXAMPLE DATA. In the real portal it comes from the module registry
// (modulesForRole) and from notify(), owned by Contratos (G3).
const itens: ItemMenu[] = [
  { id: "portal", name: "Portal", route: "/design-system/menu" },
  { id: "classes", name: "Aulas", route: "/design-system/menu#aulas" },
  { id: "schedule", name: "Horários", route: "/design-system/menu#horarios" },
  { id: "secretariat", name: "Secretaria", route: "/design-system/menu#secretaria", contador: 2 },
  { id: "cafeteria", name: "Refeitório", route: "/design-system/menu#refeitorio" },
  { id: "complaints", name: "Denúncias", route: "/design-system/menu#denuncias" },
];

const icones = {
  portal: House,
  classes: GraduationCap,
  schedule: CalendarDays,
  secretariat: Building2,
  cafeteria: UtensilsCrossed,
  complaints: ShieldAlert,
};

const avisosIniciais: NotificacaoSino[] = [
  {
    id: "1",
    title: "Nota lançada",
    message: "Já pode consultar a nota de Programação Web.",
    type: "success",
    read: false,
    createdAt: "2026-10-15T09:30:00",
  },
  {
    id: "2",
    title: "Aula alterada",
    message: "A aula de Bases de Dados de quinta passa para a sala B2.04.",
    type: "warning",
    read: false,
    createdAt: "2026-10-14T17:05:00",
  },
  {
    id: "3",
    title: "Pedido recebido",
    message: "A secretaria recebeu o seu pedido de declaração.",
    type: "info",
    read: true,
    createdAt: "2026-10-12T11:20:00",
  },
];

export function ExemploPortal({ children }: { children: React.ReactNode }) {
  const [avisos, setAvisos] = useState(avisosIniciais);

  return (
    <SidebarProvider>
      <MenuLateral itens={itens} icones={icones} onSair={() => {}} />
      <SidebarInset>
        <CabecalhoPortal
          titulo="Início"
          nome="Ana Exemplo"
          perfil="Aluno"
          acoes={
            <SinoNotificacoes
              notificacoes={avisos}
              verTodasHref="/design-system/menu"
              onMarcarComoLida={(id) =>
                setAvisos((a) => a.map((n) => (n.id === id ? { ...n, read: true } : n)))
              }
              onMarcarTodas={() => setAvisos((a) => a.map((n) => ({ ...n, read: true })))}
            />
          }
        />
        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-8">
          <CabecalhoPagina
            titulo="Início"
            descricao="Exemplo do portal: menu lateral, cabeçalho e sino. Ctrl+B abre e fecha o menu."
          />
          {children}
          <EstadoVazio
            titulo="Sem conteúdo ainda"
            descricao="Cada grupo coloca aqui o conteúdo do seu módulo."
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
