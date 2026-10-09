"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { formatarData, semOtimizar, type Artigo } from "./tipos"

type CarrosselNoticiasProps = {
  /** Cada artigo com a ligação para a sua página */
  itens: { artigo: Artigo; href: string }[]
  /** Título lido pelos leitores de ecrã */
  rotulo?: string
}

/**
 * Carrossel de notícias em destaque. Cada imagem é clicável e abre o artigo.
 * Muda com as setas, com os pontos, com as teclas ← → ou arrastando.
 * Não avança sozinho (quem lê devagar não perde a notícia).
 */
export function CarrosselNoticias({
  itens,
  rotulo = "Notícias em destaque",
}: CarrosselNoticiasProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [atual, setAtual] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const aoMudar = () => setAtual(api.selectedScrollSnap())
    aoMudar()
    api.on("select", aoMudar)
    api.on("reInit", aoMudar)
    return () => {
      api.off("select", aoMudar)
      api.off("reInit", aoMudar)
    }
  }, [api])

  if (itens.length === 0) return null

  return (
    <section aria-label={rotulo} className="space-y-3">
      <Carousel setApi={setApi} opts={{ loop: true }} className="group/carrossel">
        <CarouselContent>
          {itens.map(({ artigo, href }, i) => (
            <CarouselItem key={artigo.slug} aria-label={`${i + 1} de ${itens.length}`}>
              <Link
                href={href}
                tabIndex={i === atual ? 0 : -1}
                aria-hidden={i === atual ? undefined : true}
                className="bg-muted relative block aspect-[16/9] overflow-hidden rounded-xl sm:aspect-[21/9]"
              >
                <Image
                  src={artigo.imagem.src}
                  alt={artigo.imagem.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1100px) 1100px, 100vw"
                  unoptimized={semOtimizar(artigo.imagem.src)}
                  className="object-cover"
                />
                {/* Faixa escura por baixo do texto, para garantir contraste sobre qualquer imagem */}
                <div className="bg-sobreposicao/80 absolute inset-x-0 bottom-0 space-y-1 p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{artigo.categoria}</Badge>
                    <time
                      dateTime={artigo.data}
                      className="text-invertido-foreground text-xs sm:text-sm"
                    >
                      {formatarData(artigo.data)}
                    </time>
                  </div>
                  <p className="font-heading text-invertido-foreground text-lg leading-tight font-semibold sm:text-2xl">
                    {artigo.titulo}
                  </p>
                  <p className="text-invertido-foreground hidden max-w-2xl text-sm sm:line-clamp-2">
                    {artigo.resumo}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Setas por dentro da imagem, para caberem no telemóvel */}
        <CarouselPrevious className="top-1/3 left-3 sm:top-1/2" />
        <CarouselNext className="top-1/3 right-3 sm:top-1/2" />
      </Carousel>

      <div className="flex justify-center gap-1" role="group" aria-label="Escolher notícia">
        {itens.map(({ artigo }, i) => (
          <button
            key={artigo.slug}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Notícia ${i + 1}: ${artigo.titulo}`}
            aria-current={i === atual ? "true" : undefined}
            className="flex size-6 items-center justify-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-2 rounded-full transition-all",
                i === atual ? "bg-primary w-6" : "bg-muted-foreground/60 w-2"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
