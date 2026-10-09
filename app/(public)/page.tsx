import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/common/news/newsletter-signup";
import { formatDate } from "@/components/common/news/types";
import { ARTICLES, CATEGORIES } from "@/modules/news/data";
import { NewsBrowser } from "@/modules/news/components/news-browser";
import { EventList } from "@/modules/public-site/components/event-list";
import { EVENTS, LIVING_LINKS } from "@/modules/public-site/data";

export const metadata: Metadata = {
  title: "Instituto Politécnico de Tomar",
  description: "Notícias, eventos e informação para estudantes, famílias e visitantes do IPT.",
};

export default function PublicHomePage() {
  const latest = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8">
      {/* Hero */}
      <section className="bg-panel grid gap-8 rounded-xl border p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Institucional</Badge>
            <time dateTime="2026-10-22" className="text-foreground text-sm">
              {formatDate("2026-10-22")}
            </time>
          </div>
          <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl">
            Inscrições abertas para novos cursos e atividades no Campus IPT
          </h1>
          <p className="text-foreground text-lg">
            O Instituto Politécnico de Tomar reforça a oferta letiva para 2026/2027 com novos
            programas práticos de tecnologia, design e gestão. Conheça as oportunidades de formação,
            bolsas de mérito e alojamento estudantil.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/candidaturas">
                Saber mais e candidatar-se
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#noticias">Consultar comunicados</Link>
            </Button>
          </div>
        </div>
        <figure className="bg-card overflow-hidden rounded-xl border shadow-md">
          <div className="relative aspect-video">
            <Image
              src="/images/campus-ipt.webp"
              alt="Estudantes a caminhar em frente ao edifício principal do campus do IPT"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-foreground flex items-center gap-2 p-3 text-sm">
            <MapPin aria-hidden="true" className="text-primary size-4" />
            Campus IPT Tomar & Abrantes: comunidade e inovação aplicada
          </figcaption>
        </figure>
      </section>

      {/* News */}
      <section id="noticias" aria-labelledby="news-title" className="bg-panel scroll-mt-24 space-y-6 rounded-xl border p-6 sm:p-10">
        <div className="space-y-2">
          <Badge>Comunicação oficial</Badge>
          <h2 id="news-title" className="text-3xl font-bold">
            Notícias & Comunicados
          </h2>
          <p className="text-muted-foreground">Acompanhe as novidades, avisos académicos e vida no campus.</p>
        </div>
        <NewsBrowser
          items={latest.map((article) => ({ article, href: `/noticias/${article.slug}` }))}
          categories={CATEGORIES}
          withSearch={false}
          limit={3}
        />
      </section>

      {/* Events and living at IPT */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section id="eventos" aria-labelledby="events-title" className="bg-panel min-w-0 scroll-mt-24 space-y-5 rounded-xl border p-6 sm:p-8 lg:col-span-2">
          <div>
            <p className="text-primary text-xs font-semibold tracking-wide uppercase">Calendário aberto</p>
            <h2 id="events-title" className="text-2xl font-bold">
              Próximos eventos & conferências
            </h2>
          </div>
          <EventList events={EVENTS} />
        </section>

        <section id="viver" aria-labelledby="living-title" className="bg-panel min-w-0 scroll-mt-24 space-y-5 rounded-xl border p-6 sm:p-8">
          <div className="space-y-1">
            <p className="text-primary text-xs font-semibold tracking-wide uppercase">Guia prático</p>
            <h2 id="living-title" className="text-2xl font-bold">
              Viver no IPT
            </h2>
            <p className="text-muted-foreground text-sm">
              Recursos essenciais para futuros estudantes, encarregados de educação e visitantes.
            </p>
          </div>
          <ul className="space-y-3">
            {LIVING_LINKS.map((link) => (
              <li key={link.title} className="bg-card rounded-lg border p-4">
                <p className="text-heading font-semibold">{link.title}</p>
                <p className="text-muted-foreground text-sm">{link.description}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            Dúvidas sobre ingressos? Gabinete de Apoio ao Estudante:{" "}
            <span className="text-primary font-semibold">gri@ipt.pt</span>
          </p>
        </section>
      </div>

      <NewsletterSignup tone="dark" />
    </div>
  );
}
