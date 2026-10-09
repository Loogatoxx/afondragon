import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArtigoNoticia } from "@/components/common/news/artigo-noticia";
import { ARTIGOS, artigoPorSlug, readRole } from "../dados";

export function generateStaticParams() {
  return ARTIGOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/design-system/noticias/[slug]">,
): Promise<Metadata> {
  const artigo = artigoPorSlug((await props.params).slug);
  return { title: artigo ? `${artigo.titulo} — Notícias` : "Notícia não encontrada" };
}

/** EXAMPLE of a single article page. */
export default async function PaginaArtigo(props: PageProps<"/design-system/noticias/[slug]">) {
  const artigo = artigoPorSlug((await props.params).slug);
  if (!artigo) notFound();
  const perfil = readRole((await props.searchParams).perfil);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-8">
      <Button asChild variant="ghost" className="px-2">
        <Link href={`/design-system/noticias${perfil === "staff" ? "?perfil=staff" : ""}`}>
          <ArrowLeft aria-hidden="true" />
          Todas as notícias
        </Link>
      </Button>
      <ArtigoNoticia artigo={artigo} />
    </main>
  );
}
