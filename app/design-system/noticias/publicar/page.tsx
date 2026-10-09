import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CabecalhoPagina } from "@/components/common/cabecalho-pagina";
import { EstadoVazio } from "@/components/common/estado-vazio";
import { readRole } from "../dados";
import { SeletorPerfil } from "../seletor-perfil";
import { FormularioArtigo } from "./formulario-artigo";

export const metadata: Metadata = {
  title: "Publicar artigo (exemplo) — Design System",
};

/**
 * EXAMPLE of the publishing area. The permission is simulated through the URL;
 * the real page calls requireRole([...]) from lib/auth (Dados e login, G1),
 * and the server action checks the role again before saving.
 */
export default async function Publicar(props: PageProps<"/design-system/noticias/publicar">) {
  const perfil = readRole((await props.searchParams).perfil);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-8">
      <SeletorPerfil perfil={perfil} caminho="/design-system/noticias/publicar" />

      <Button asChild variant="ghost" className="px-2">
        <Link href={`/design-system/noticias${perfil === "staff" ? "?perfil=staff" : ""}`}>
          <ArrowLeft aria-hidden="true" />
          Todas as notícias
        </Link>
      </Button>

      <CabecalhoPagina
        titulo="Publicar artigo"
        descricao="Escreva a notícia, escolha a imagem de capa e veja como fica antes de publicar."
      />

      {perfil === "staff" ? (
        <FormularioArtigo />
      ) : (
        <EstadoVazio
          icone={Lock}
          titulo="Não tem permissão para publicar"
          descricao="Só os editores da newsletter podem publicar artigos. Se precisa de acesso, fale com o Gabinete de Comunicação."
          acao={
            <Button asChild variant="outline">
              <Link href="/design-system/noticias">Ver as notícias</Link>
            </Button>
          }
        />
      )}
    </main>
  );
}
