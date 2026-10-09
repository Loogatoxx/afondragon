import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArtigoNoticia } from "@/components/comuns/noticias/artigo-noticia";
import { ARTIGOS, artigoPorSlug, lerPerfil } from "../dados";

export function generateStaticParams() {
  return ARTIGOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/design-system/newsletter/[slug]">,
): Promise<Metadata> {
  const artigo = artigoPorSlug((await props.params).slug);
  return { title: artigo ? `${artigo.titulo} — Notícias` : "Notícia não encontrada" };
}

/** EXEMPLO da página de um artigo. */
export default async function PaginaArtigo(props: PageProps<"/design-system/newsletter/[slug]">) {
  const artigo = artigoPorSlug((await props.params).slug);
  if (!artigo) notFound();
  const perfil = lerPerfil((await props.searchParams).perfil);

  return (
    <main className="mx-auto w-full max-w-[1100px] space-y-6 p-4 sm:p-8">
      <Button asChild variant="ghost" className="px-2">
        <Link href={`/design-system/newsletter${perfil === "editor" ? "?perfil=editor" : ""}`}>
          <ArrowLeft aria-hidden="true" />
          Todas as notícias
        </Link>
      </Button>
      <ArtigoNoticia artigo={artigo} />
    </main>
  );
}
