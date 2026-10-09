import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArticleView } from "@/components/common/news/article-view";
import { ARTICLES, articleBySlug, readRole } from "../data";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/design-system/noticias/[slug]">,
): Promise<Metadata> {
  const article = articleBySlug((await props.params).slug);
  return { title: article ? `${article.title} — Notícias` : "Notícia não encontrada" };
}

/** EXAMPLE of a single article page. */
export default async function ArticlePage(props: PageProps<"/design-system/noticias/[slug]">) {
  const article = articleBySlug((await props.params).slug);
  if (!article) notFound();
  const role = readRole((await props.searchParams).perfil);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-8">
      <Button asChild variant="ghost" className="px-2">
        <Link href={`/design-system/noticias${role === "staff" ? "?perfil=staff" : ""}`}>
          <ArrowLeft aria-hidden="true" />
          Todas as notícias
        </Link>
      </Button>
      <ArticleView article={article} />
    </main>
  );
}
