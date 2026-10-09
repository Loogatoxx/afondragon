import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CabecalhoPagina } from "@/components/common/cabecalho-pagina";

export default function Inicio() {
  return (
    <main className="mx-auto w-full max-w-5xl p-4 sm:p-8">
      <CabecalhoPagina
        titulo="Plataforma PI2"
        descricao="Página inicial provisória. Cada grupo acrescenta aqui as suas rotas."
        acoes={
          <Button asChild>
            <Link href="/design-system">Ver Design System</Link>
          </Button>
        }
      />
    </main>
  );
}
