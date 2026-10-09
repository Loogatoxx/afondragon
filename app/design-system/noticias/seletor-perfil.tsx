import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ExampleRole } from "./dados";

/** Example only: switches the simulated role to show what each person sees. */
export function SeletorPerfil({ perfil, caminho }: { perfil: ExampleRole; caminho: string }) {
  return (
    <div
      role="group"
      aria-label="Ver a página como"
      className="bg-panel flex flex-wrap items-center gap-2 rounded-lg border p-2 text-sm"
    >
      <span className="text-muted-foreground px-2">Ver como (exemplo):</span>
      {(["student", "staff"] as const).map((p) => (
        <Button
          key={p}
          asChild
          size="sm"
          variant={perfil === p ? "default" : "ghost"}
          aria-current={perfil === p ? "true" : undefined}
        >
          <Link href={`${caminho}?perfil=${p}`}>
            {p === "student" ? "Aluno (só lê)" : "Funcionário (pode publicar)"}
          </Link>
        </Button>
      ))}
    </div>
  );
}
