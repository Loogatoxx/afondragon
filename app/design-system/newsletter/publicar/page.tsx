import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CabecalhoPagina } from "@/components/comuns/cabecalho-pagina";
import { EstadoVazio } from "@/components/comuns/estado-vazio";
import { lerPerfil } from "../dados";
import { SeletorPerfil } from "../seletor-perfil";
import { FormularioArtigo } from "./formulario-artigo";

export const metadata: Metadata = {
  title: "Publicar artigo (exemplo) — Design System",
};

/**
 * EXEMPLO da zona de publicação. A permissão aqui é simulada pelo endereço;
 * no projeto verdadeiro a página chama exigirPerfil([...]) da frente Dados e login,
 * e o servidor volta a verificar a permissão ao gravar.
 */
export default async function Publicar(props: PageProps<"/design-system/newsletter/publicar">) {
  const perfil = lerPerfil((await props.searchParams).perfil);

  return (
    <main className="mx-auto w-full max-w-[1100px] space-y-8 p-4 sm:p-8">
      <SeletorPerfil perfil={perfil} caminho="/design-system/newsletter/publicar" />

      <Button asChild variant="ghost" className="px-2">
        <Link href={`/design-system/newsletter${perfil === "editor" ? "?perfil=editor" : ""}`}>
          <ArrowLeft aria-hidden="true" />
          Todas as notícias
        </Link>
      </Button>

      <CabecalhoPagina
        titulo="Publicar artigo"
        descricao="Escreva a notícia, escolha a imagem de capa e veja como fica antes de publicar."
      />

      {perfil === "editor" ? (
        <FormularioArtigo />
      ) : (
        <EstadoVazio
          icone={Lock}
          titulo="Não tem permissão para publicar"
          descricao="Só os editores da newsletter podem publicar artigos. Se precisa de acesso, fale com o Gabinete de Comunicação."
          acao={
            <Button asChild variant="outline">
              <Link href="/design-system/newsletter">Ver as notícias</Link>
            </Button>
          }
        />
      )}
    </main>
  );
}
