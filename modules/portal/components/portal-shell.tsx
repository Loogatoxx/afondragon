"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MODULE_ICONS } from "@/components/common/module-icons";
import { NotificationBell, type BellNotification } from "@/components/common/notification-bell";
import { PortalHeader } from "@/components/common/portal-header";
import { SideMenu, type MenuItem } from "@/components/common/side-menu";

type PortalShellProps = {
  items: MenuItem[];
  userName: string;
  roleLabel: string;
  notifications: BellNotification[];
  children: React.ReactNode;
};

/** Client part of the portal layout: menu, top bar and bell state. */
export function PortalShell({ items, userName, roleLabel, notifications, children }: PortalShellProps) {
  const router = useRouter();
  const path = usePathname();
  const [alerts, setAlerts] = useState(notifications);
  const current = items.find((item) => path === item.route || path.startsWith(`${item.route}/`));

  return (
    <SidebarProvider>
      <SideMenu
        items={items}
        icons={MODULE_ICONS}
        // Prototype: the real sign-out is a G1 server action.
        onSignOut={() => router.push("/login")}
      />
      <SidebarInset>
        <PortalHeader
          title={current?.name}
          name={userName}
          roleLabel={roleLabel}
          actions={
            <NotificationBell
              notifications={alerts}
              viewAllHref="/portal#avisos"
              onMarkAsRead={(id) =>
                setAlerts((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
              }
              onMarkAllAsRead={() => setAlerts((list) => list.map((n) => ({ ...n, read: true })))}
            />
          }
        />
        <div className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
