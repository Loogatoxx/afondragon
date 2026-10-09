import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { PUBLISHER_ROLES, readRole } from "../data";
import { RoleSwitcher } from "../role-switcher";
import { ArticleForm } from "./article-form";

export const metadata: Metadata = {
  title: "Publicar artigo (exemplo) — Design System",
};

/**
 * EXAMPLE of the publishing area. The permission is simulated through the URL;
 * the real page calls requireRole([...]) from lib/auth (Dados e login, G1),
 * and the server action checks the role again before saving.
 */
export default async function PublishPage(props: PageProps<"/design-system/noticias/publicar">) {
  const role = readRole((await props.searchParams).perfil);
  const canPublish = PUBLISHER_ROLES.includes(role);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-8">
      <RoleSwitcher role={role} path="/design-system/noticias/publicar" />

      <Button asChild variant="ghost" className="px-2">
        <Link href={`/design-system/noticias${canPublish ? "?perfil=staff" : ""}`}>
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
              <Link href="/design-system/noticias">Ver as notícias</Link>
            </Button>
          }
        />
      )}
    </main>
  );
}
