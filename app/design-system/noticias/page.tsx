import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { ArticleCard } from "@/components/common/news/article-card";
import { NewsCarousel } from "@/components/common/news/news-carousel";
import { ARTICLES, PUBLISHER_ROLES, readRole } from "./data";
import { RoleSwitcher } from "./role-switcher";

export const metadata: Metadata = {
  title: "Notícias (exemplo) — Design System",
};

/** EXAMPLE of the news page: featured carousel and article list. */
export default async function NewsPage(props: PageProps<"/design-system/noticias">) {
  const role = readRole((await props.searchParams).perfil);
  const canPublish = PUBLISHER_ROLES.includes(role);
  const featured = ARTICLES.filter((a) => a.featured);
  const latest = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  const suffix = role === "staff" ? "?perfil=staff" : "";

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-8">
      <RoleSwitcher role={role} path="/design-system/noticias" />

      <PageHeader
        title="Notícias"
        description="O que se passa no campus."
        actions={
          canPublish && (
            <Button asChild>
              <Link href="/design-system/noticias/publicar?perfil=staff">
                <PenLine aria-hidden="true" />
                Publicar artigo
              </Link>
            </Button>
          )
        }
      />

      <NewsCarousel
        items={featured.map((article) => ({
          article,
          href: `/design-system/noticias/${article.slug}${suffix}`,
        }))}
      />

      <section aria-labelledby="latest-title" className="space-y-4">
        <h2 id="latest-title" className="text-2xl font-semibold">
          Mais recentes
        </h2>
        {latest.length === 0 ? (
          <EmptyState title="Ainda não há notícias" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                href={`/design-system/noticias/${article.slug}${suffix}`}
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
