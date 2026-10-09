import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ExemploPortal } from "./exemplo-portal";

export const metadata: Metadata = {
  title: "Exemplo do portal — Design System",
};

/**
 * Ecrã de EXEMPLO do portal (menu lateral, cabeçalho e sino).
 * O layout verdadeiro é app/(portal)/layout.tsx, ligado pelas frentes
 * Dados e login e Contratos do núcleo.
 */
export default function ExemploMenu() {
  return (
    <ExemploPortal>
      <Button asChild variant="outline" className="w-fit">
        <Link href="/design-system">Voltar ao Design System</Link>
      </Button>
    </ExemploPortal>
  );
}
