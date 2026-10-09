import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { NewsCarousel } from "@/components/common/news/news-carousel";
import { NewsletterSignup } from "@/components/common/news/newsletter-signup";
import { ARTICLES, CATEGORIES, PUBLISHER_ROLES, readRole } from "@/modules/news/data";
import { NewsBrowser } from "@/modules/news/components/news-browser";
import { RoleSwitcher } from "@/modules/news/components/role-switcher";

export const metadata: Metadata = {
  title: "Notícias · UniPortal",
};

export default async function NewsPage(props: PageProps<"/noticias">) {
  const role = readRole((await props.searchParams).perfil);
  const canPublish = PUBLISHER_ROLES.includes(role);
  const suffix = canPublish ? "?perfil=staff" : "";
  const latest = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  const items = latest.map((article) => ({ article, href: `/noticias/${article.slug}${suffix}` }));

  return (
    <div className="space-y-8">
      <RoleSwitcher role={role} path="/noticias" />

      <PageHeader
        title="Notícias & Newsletter do Campus IPT"
        description="Acompanhe as novidades académicas, comunicados, eventos e publicações da comunidade."
        actions={
          canPublish && (
            <Button asChild>
              <Link href="/noticias/publicar?perfil=staff">
                <PenLine aria-hidden="true" />
                Publicar artigo
              </Link>
            </Button>
          )
        }
      />

      <NewsCarousel
        items={ARTICLES.filter((a) => a.featured).map((article) => ({
          article,
          href: `/noticias/${article.slug}${suffix}`,
        }))}
      />

      <section aria-labelledby="all-news" className="space-y-4">
        <h2 id="all-news" className="text-2xl font-semibold">
          Todas as notícias
        </h2>
        <NewsBrowser items={items} categories={CATEGORIES} />
      </section>

      <NewsletterSignup
        topics={["Eventos culturais", "Bolsas & apoios", "Investigação & projetos", "Menus do refeitório", "Torneios desportivos"]}
      />
    </div>
  );
}
