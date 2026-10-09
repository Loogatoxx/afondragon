import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { PUBLISHER_ROLES, readRole } from "@/modules/news/data";
import { ArticleForm } from "@/modules/news/components/article-form";
import { RoleSwitcher } from "@/modules/news/components/role-switcher";

export const metadata: Metadata = {
  title: "Publicar artigo · UniPortal",
};

/**
 * Publishing area. The role is simulated through the URL in this prototype;
 * the real page calls requireRole([...]) and the server action checks it again.
 */
export default async function PublishPage(props: PageProps<"/noticias/publicar">) {
  const role = readRole((await props.searchParams).perfil);
  const canPublish = PUBLISHER_ROLES.includes(role);

  return (
    <div className="space-y-8">
      <RoleSwitcher role={role} path="/noticias/publicar" />

      <Button asChild variant="ghost" className="px-2">
        <Link href={`/noticias${canPublish ? "?perfil=staff" : ""}`}>
          <ArrowLeft aria-hidden="true" />
          Todas as notícias
        </Link>
      </Button>

      <PageHeader
        title="Publicar artigo"
        description="Escreva a notícia, escolha a imagem de capa e veja como fica antes de publicar."
      />

      {canPublish ? (
        <ArticleForm />
      ) : (
        <EmptyState
          icon={Lock}
          title="Não tem permissão para publicar"
          description="Só os funcionários com permissão de edição podem publicar artigos. Se precisa de acesso, fale com o Gabinete de Comunicação."
          action={
            <Button asChild variant="outline">
              <Link href="/noticias">Ver as notícias</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
