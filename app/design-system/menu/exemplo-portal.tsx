"use client";

import { useState } from "react";
import { Building2, CalendarDays, GraduationCap, House, ShieldAlert, UtensilsCrossed } from "lucide-react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CabecalhoPortal } from "@/components/comuns/cabecalho-portal";
import { CabecalhoPagina } from "@/components/comuns/cabecalho-pagina";
import { EstadoVazio } from "@/components/comuns/estado-vazio";
import { MenuLateral, type ItemMenu } from "@/components/comuns/menu-lateral";
import { SinoNotificacoes, type NotificacaoSino } from "@/components/comuns/sino-notificacoes";

// DADOS DE EXEMPLO. No portal verdadeiro vêm do registo de módulos e de
// notificar(), da frente Contratos do núcleo.
const itens: ItemMenu[] = [
  { id: "portal", name: "Início", route: "/design-system/menu" },
  { id: "aulas", name: "Aulas", route: "/design-system/menu#aulas" },
  { id: "horarios", name: "Horários", route: "/design-system/menu#horarios" },
  { id: "secretaria", name: "Secretaria", route: "/design-system/menu#secretaria", contador: 2 },
  { id: "refeitorio", name: "Refeitório", route: "/design-system/menu#refeitorio" },
  { id: "denuncias", name: "Denúncias", route: "/design-system/menu#denuncias" },
];

const icones = {
  portal: House,
  aulas: GraduationCap,
  horarios: CalendarDays,
  secretaria: Building2,
  refeitorio: UtensilsCrossed,
  denuncias: ShieldAlert,
};

const avisosIniciais: NotificacaoSino[] = [
  {
    id: "1",
    title: "Nota lançada",
    message: "Já pode consultar a nota de Programação Web.",
    type: "sucesso",
    read: false,
    createdAt: "2026-10-15T09:30:00",
  },
  {
    id: "2",
    title: "Aula alterada",
    message: "A aula de Bases de Dados de quinta passa para a sala B2.04.",
    type: "aviso",
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
          perfil="aluno"
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
        <div className="mx-auto w-full max-w-[1100px] space-y-6 p-4 sm:p-8">
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
