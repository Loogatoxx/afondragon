import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormularioLogin } from "./formulario-login";

export const metadata: Metadata = {
  title: "Exemplo de login — Design System",
};

/**
 * EXAMPLE login screen. The real page (/login) belongs to Dados e login (G1):
 * they copy this layout and connect it to Supabase.
 */
export default function ExemploLogin() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <span
          className="bg-brand text-brand-foreground font-heading flex size-12 items-center justify-center rounded-lg text-xl font-bold"
          aria-hidden="true"
        >
          P
        </span>
        <h1 className="text-2xl font-semibold">Plataforma PI2</h1>
        <Badge variant="outline">Exemplo do Design System</Badge>
      </div>

      <FormularioLogin />

      <Button asChild variant="link">
        <Link href="/design-system">Voltar ao Design System</Link>
      </Button>
    </main>
  );
}
