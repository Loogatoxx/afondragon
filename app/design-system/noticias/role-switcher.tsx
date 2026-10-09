import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ExampleRole } from "./data";

/** Example only: switches the simulated role to show what each person sees. */
export function RoleSwitcher({ role, path }: { role: ExampleRole; path: string }) {
  return (
    <div
      role="group"
      aria-label="Ver a página como"
      className="bg-panel flex flex-wrap items-center gap-2 rounded-lg border p-2 text-sm"
    >
      <span className="text-muted-foreground px-2">Ver como (exemplo):</span>
      {(["student", "staff"] as const).map((r) => (
        <Button
          key={r}
          asChild
          size="sm"
          variant={role === r ? "default" : "ghost"}
          aria-current={role === r ? "true" : undefined}
        >
          <Link href={`${path}?perfil=${r}`}>
            {r === "student" ? "Aluno (só lê)" : "Funcionário (pode publicar)"}
          </Link>
        </Button>
      ))}
    </div>
  );
}
