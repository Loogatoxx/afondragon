import { redirect } from "next/navigation";

import { getUser, ROLE_LABELS } from "@/lib/auth";
import { modulesForRole } from "@/lib/modules";
import { listNotifications } from "@/lib/notifications";
import { PortalShell } from "@/modules/portal/components/portal-shell";

// Portal layout: session, menu (from the module registry) and bell.
export default async function PortalLayout({ children }: LayoutProps<"/">) {
  const user = await getUser();
  if (!user) redirect("/login");

  const items = modulesForRole(user.role).map(({ id, name, route }) => ({ id, name, route }));
  const notifications = await listNotifications(user.id);
  const roleLabel = [ROLE_LABELS[user.role], user.detail].filter(Boolean).join(" · ");

  return (
    <PortalShell
      items={items}
      userName={user.name}
      roleLabel={roleLabel}
      notifications={notifications}
    >
      {children}
    </PortalShell>
  );
}
