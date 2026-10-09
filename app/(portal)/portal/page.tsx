import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Info,
  Monitor,
  Plus,
  TriangleAlert,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { ArticleCard } from "@/components/common/news/article-card";
import { NewsCarousel } from "@/components/common/news/news-carousel";
import { getUser } from "@/lib/auth";
import { listNotifications } from "@/lib/notifications";
import { ARTICLES } from "@/modules/news/data";
import { LibraryCard } from "@/modules/portal/components/library-card";
import { REQUESTS } from "@/modules/secretariat/data";
import { RequestsTable } from "@/modules/secretariat/components/requests-table";

export const metadata: Metadata = {
  title: "Início · UniPortal",
};

const QUICK_LINKS = [
  { tag: "Secretaria virtual", title: "NEPTA", text: "Processos académicos, matrículas, inscrições e tesouraria.", href: "/secretaria", cta: "Aceder ao NEPTA", icon: BookOpen },
  { tag: "E-learning", title: "Doctrino", text: "Materiais de estudo e submissão de trabalhos.", href: "/aulas", cta: "Aceder ao Doctrino", icon: Monitor },
  { tag: "Pedagógico", title: "Sumários", text: "Assiduidade, presenças e sumários das unidades curriculares.", href: "/aulas", cta: "Consultar sumários", icon: ClipboardCheck },
];

export default async function PortalHomePage() {
  const user = await getUser();
  const alerts = user ? await listNotifications(user.id) : [];
  const latest = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  const items = latest.map((article) => ({ article, href: `/noticias/${article.slug}` }));

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Olá, ${user?.name.split(" ")[0] ?? ""}`}
        description="Portal do estudante IPT: sumários, notícias do campus e estado dos pedidos."
        actions={
          <Button asChild>
            <Link href="/secretaria">
              <Plus aria-hidden="true" />
              Novo pedido
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Alert variant="info">
          <Info aria-hidden="true" />
          <AlertTitle>Informação académica</AlertTitle>
          <AlertDescription>Renovação de propinas e validação de inscrições disponível até 31 de outubro.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <TriangleAlert aria-hidden="true" />
          <AlertTitle>Aviso importante</AlertTitle>
          <AlertDescription>O prazo para entrega de temas de Projeto Final termina em 5 dias.</AlertDescription>
        </Alert>
      </div>

      <section aria-labelledby="quick-title" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="quick-title" className="text-xl font-semibold">
              Acessos rápidos & plataformas académicas
            </h2>
            <p className="text-foreground text-sm">Plataformas essenciais para o seu percurso no IPT.</p>
          </div>
          <Badge variant="secondary">Portais do aluno</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {QUICK_LINKS.map(({ icon: Icon, ...q }) => (
            <Card key={q.title} className="gap-3">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <span className="bg-brand-light text-primary flex size-10 items-center justify-center rounded-md">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <Badge variant="outline">{q.tag}</Badge>
                </div>
                <CardTitle className="text-lg">{q.title}</CardTitle>
                <CardDescription>{q.text}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto border-t pt-3">
                <Link href={q.href} className="text-primary inline-flex items-center gap-1 text-sm font-semibold hover:underline">
                  {q.cta}
                  <ChevronRight aria-hidden="true" className="size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <NewsCarousel
        items={ARTICLES.filter((a) => a.featured).map((article) => ({
          article,
          href: `/noticias/${article.slug}`,
        }))}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="gap-3">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardDescription className="text-xs font-semibold tracking-wide uppercase">Próxima aula</CardDescription>
              <Badge>Hoje</Badge>
            </div>
            <CardTitle className="text-lg">Programação Web II</CardTitle>
            <CardDescription>Docente: Prof. Carlos Marques</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto flex items-center justify-between gap-2 border-t pt-3 text-sm">
            <span className="flex items-center gap-1">
              <Clock aria-hidden="true" className="size-4" />
              14:00–16:30
            </span>
            <Link href="/horarios" className="text-primary font-semibold hover:underline">
              Sala B102 (Lab)
            </Link>
          </CardContent>
        </Card>
        <Card className="gap-3">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardDescription className="text-xs font-semibold tracking-wide uppercase">Menu do refeitório</CardDescription>
              <Badge variant="success">Aberto</Badge>
            </div>
            <CardTitle className="text-lg">Prato do dia</CardTitle>
            <CardDescription>Filete de pescada grelhado ou caril de grão vegan.</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto flex items-center justify-between gap-2 border-t pt-3 text-sm">
            <span>
              Saldo: <strong>€ 14,50</strong>
            </span>
            <Link href="/refeitorio" className="text-primary font-semibold hover:underline">
              Carregar
            </Link>
          </CardContent>
        </Card>
        <LibraryCard />
      </div>

      <section aria-labelledby="requests-title" className="bg-panel space-y-4 rounded-xl border p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="requests-title" className="text-xl font-semibold">
              Pedidos à secretaria
            </h2>
            <p className="text-muted-foreground text-sm">Acompanhe o estado dos seus certificados e requerimentos.</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/secretaria">Ver todos</Link>
          </Button>
        </div>
        <RequestsTable requests={REQUESTS.slice(0, 4)} />
      </section>

      <section id="avisos" aria-labelledby="alerts-title" className="scroll-mt-24 space-y-4">
        <h2 id="alerts-title" className="text-xl font-semibold">
          Avisos recentes
        </h2>
        <ul className="bg-card divide-y rounded-xl border">
          {alerts.map((a) => (
            <li key={a.id} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-heading font-semibold">{a.title}</p>
                <p className="text-muted-foreground text-sm">{a.message}</p>
              </div>
              {a.link && (
                <Link href={a.link} className="text-primary text-sm font-semibold hover:underline">
                  Abrir
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="latest-title" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="latest-title" className="text-xl font-semibold">
              Notícias recentes
            </h2>
            <p className="text-foreground text-sm">O que se passa no campus do Politécnico de Tomar.</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/noticias">Todas as notícias</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map(({ article, href }) => (
            <ArticleCard key={article.slug} article={article} href={href} />
          ))}
        </div>
      </section>
    </div>
  );
}
