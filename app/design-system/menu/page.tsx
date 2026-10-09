import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PortalExample } from "./portal-example";

export const metadata: Metadata = {
  title: "Exemplo do portal — Design System",
};

/**
 * EXAMPLE portal screen (side menu, header and bell).
 * The real layout is app/(portal)/layout.tsx, wired up by the
 * Dados e login (G1) and Contratos (G3) teams.
 */
export default function PortalExamplePage() {
  return (
    <PortalExample>
      <Button asChild variant="outline" className="w-fit">
        <Link href="/design-system">Voltar ao Design System</Link>
      </Button>
    </PortalExample>
  );
}
