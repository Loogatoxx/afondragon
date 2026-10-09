"use client";

import { useState } from "react";
import {
  Building2,
  CalendarDays,
  GraduationCap,
  House,
  ShieldAlert,
  UtensilsCrossed,
} from "lucide-react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EmptyState } from "@/components/common/empty-state";
import { NotificationBell, type BellNotification } from "@/components/common/notification-bell";
import { PageHeader } from "@/components/common/page-header";
import { PortalHeader } from "@/components/common/portal-header";
import { SideMenu, type MenuItem } from "@/components/common/side-menu";

// EXAMPLE DATA. In the real portal it comes from the module registry
// (modulesForRole) and from notify(), owned by Contratos (G3).
const items: MenuItem[] = [
  { id: "portal", name: "Portal", route: "/design-system/menu" },
  { id: "classes", name: "Aulas", route: "/design-system/menu#aulas" },
  { id: "schedule", name: "Horários", route: "/design-system/menu#horarios" },
  { id: "secretariat", name: "Secretaria", route: "/design-system/menu#secretaria", count: 2 },
  { id: "cafeteria", name: "Refeitório", route: "/design-system/menu#refeitorio" },
  { id: "complaints", name: "Denúncias", route: "/design-system/menu#denuncias" },
];

const icons = {
  portal: House,
  classes: GraduationCap,
  schedule: CalendarDays,
  secretariat: Building2,
  cafeteria: UtensilsCrossed,
  complaints: ShieldAlert,
};

const initialAlerts: BellNotification[] = [
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

export function PortalExample({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState(initialAlerts);

  return (
    <SidebarProvider>
      <SideMenu items={items} icons={icons} onSignOut={() => {}} />
      <SidebarInset>
        <PortalHeader
          title="Portal"
          name="Ana Exemplo"
          roleLabel="Aluno"
          actions={
            <NotificationBell
              notifications={alerts}
              viewAllHref="/design-system/menu"
              onMarkAsRead={(id) =>
                setAlerts((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
              }
              onMarkAllAsRead={() => setAlerts((list) => list.map((n) => ({ ...n, read: true })))}
            />
          }
        />
        <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-8">
          <PageHeader
            title="Portal"
            description="Exemplo do portal: menu lateral, cabeçalho e sino. Ctrl+B abre e fecha o menu."
          />
          {children}
          <EmptyState
            title="Sem conteúdo ainda"
            description="Cada grupo coloca aqui o conteúdo do seu módulo."
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
