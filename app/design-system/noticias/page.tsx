import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CabecalhoPagina } from "@/components/common/cabecalho-pagina";
import { EstadoVazio } from "@/components/common/estado-vazio";
import { CartaoArtigo } from "@/components/common/news/cartao-artigo";
import { CarrosselNoticias } from "@/components/common/news/carrossel-noticias";
import { ARTIGOS, readRole } from "./dados";
import { SeletorPerfil } from "./seletor-perfil";

export const metadata: Metadata = {
  title: "Notícias (exemplo) — Design System",
};

/** EXAMPLE of the news page: featured carousel and article list. */
export default async function Noticias(props: PageProps<"/design-system/noticias">) {
  const perfil = readRole((await props.searchParams).perfil);
  const destaques = ARTIGOS.filter((a) => a.destaque);
  const recentes = [...ARTIGOS].sort((a, b) => b.data.localeCompare(a.data));
  const sufixo = perfil === "staff" ? "?perfil=staff" : "";

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-8">
      <SeletorPerfil perfil={perfil} caminho="/design-system/noticias" />

      <CabecalhoPagina
        titulo="Notícias"
        descricao="O que se passa no campus."
        acoes={
          perfil === "staff" && (
            <Button asChild>
              <Link href="/design-system/noticias/publicar?perfil=staff">
                <PenLine aria-hidden="true" />
                Publicar artigo
              </Link>
            </Button>
          )
        }
      />

      <CarrosselNoticias
        itens={destaques.map((artigo) => ({
          artigo,
          href: `/design-system/noticias/${artigo.slug}${sufixo}`,
        }))}
      />

      <section aria-labelledby="titulo-recentes" className="space-y-4">
        <h2 id="titulo-recentes" className="text-2xl font-semibold">
          Mais recentes
        </h2>
        {recentes.length === 0 ? (
          <EstadoVazio titulo="Ainda não há notícias" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentes.map((artigo) => (
              <CartaoArtigo
                key={artigo.slug}
                artigo={artigo}
                href={`/design-system/noticias/${artigo.slug}${sufixo}`}
              />
            ))}
          </div>
        )}
      </section>

      <Button asChild variant="link" className="px-0">
        <Link href="/design-system">Voltar ao Design System</Link>
      </Button>
    </main>
  );
}
