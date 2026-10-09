import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { PerfilExemplo } from "./dados";

/** Só para o exemplo: troca o perfil simulado para ver o que cada pessoa vê. */
export function SeletorPerfil({ perfil, caminho }: { perfil: PerfilExemplo; caminho: string }) {
  return (
    <div
      role="group"
      aria-label="Ver a página como"
      className="bg-painel flex flex-wrap items-center gap-2 rounded-lg border p-2 text-sm"
    >
      <span className="text-muted-foreground px-2">Ver como (exemplo):</span>
      {(["aluno", "editor"] as const).map((p) => (
        <Button
          key={p}
          asChild
          size="sm"
          variant={perfil === p ? "default" : "ghost"}
          aria-current={perfil === p ? "true" : undefined}
        >
          <Link href={`${caminho}?perfil=${p}`}>
            {p === "aluno" ? "Aluno (só lê)" : "Editor (pode publicar)"}
          </Link>
        </Button>
      ))}
    </div>
  );
}
