import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CabecalhoPagina } from "@/components/comuns/cabecalho-pagina";
import { EstadoVazio } from "@/components/comuns/estado-vazio";
import { CartaoArtigo } from "@/components/comuns/noticias/cartao-artigo";
import { CarrosselNoticias } from "@/components/comuns/noticias/carrossel-noticias";
import { ARTIGOS, lerPerfil } from "./dados";
import { SeletorPerfil } from "./seletor-perfil";

export const metadata: Metadata = {
  title: "Notícias (exemplo) — Design System",
};

/** EXEMPLO da newsletter: destaques em carrossel e lista de artigos. */
export default async function Noticias(props: PageProps<"/design-system/newsletter">) {
  const perfil = lerPerfil((await props.searchParams).perfil);
  const destaques = ARTIGOS.filter((a) => a.destaque);
  const recentes = [...ARTIGOS].sort((a, b) => b.data.localeCompare(a.data));
  const sufixo = perfil === "editor" ? "?perfil=editor" : "";

  return (
    <main className="mx-auto w-full max-w-[1100px] space-y-8 p-4 sm:p-8">
      <SeletorPerfil perfil={perfil} caminho="/design-system/newsletter" />

      <CabecalhoPagina
        titulo="Notícias"
        descricao="O que se passa no campus."
        acoes={
          perfil === "editor" && (
            <Button asChild>
              <Link href="/design-system/newsletter/publicar?perfil=editor">
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
          href: `/design-system/newsletter/${artigo.slug}${sufixo}`,
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
                href={`/design-system/newsletter/${artigo.slug}${sufixo}`}
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
