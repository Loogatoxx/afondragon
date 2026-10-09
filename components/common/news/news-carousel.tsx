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
import { formatDate, skipOptimization, type Article } from "./types"

type NewsCarouselProps = {
  /** Each article with the link to its page */
  items: { article: Article; href: string }[]
  /** Label read by screen readers */
  label?: string
}

/**
 * Featured news carousel. Each slide is clickable and opens the article.
 * Moves with the arrow buttons, the dots, the ← → keys or by dragging.
 * It never autoplays (slow readers must not lose the story).
 */
export function NewsCarousel({ items, label = "Notícias em destaque" }: NewsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  if (items.length === 0) return null

  return (
    <section aria-label={label} className="space-y-3">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {items.map(({ article, href }, i) => (
            <CarouselItem key={article.slug} aria-label={`${i + 1} de ${items.length}`}>
              <Link
                href={href}
                tabIndex={i === current ? 0 : -1}
                aria-hidden={i === current ? undefined : true}
                className="bg-muted relative block aspect-video overflow-hidden rounded-xl sm:aspect-auto sm:h-96"
              >
                <Image
                  src={article.image.src}
                  alt={article.image.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  unoptimized={skipOptimization(article.image.src)}
                  className="object-cover"
                />
                {/* Dark band behind the text guarantees contrast over any image */}
                <div className="bg-overlay/80 absolute inset-x-0 bottom-0 space-y-1 p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{article.category}</Badge>
                    <time
                      dateTime={article.date}
                      className="text-inverted-foreground text-xs sm:text-sm"
                    >
                      {formatDate(article.date)}
                    </time>
                  </div>
                  <p className="font-heading text-inverted-foreground text-lg leading-tight font-semibold sm:text-2xl">
                    {article.title}
                  </p>
                  <p className="text-inverted-foreground hidden max-w-2xl text-sm sm:line-clamp-2">
                    {article.summary}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Arrows inside the image so they fit on mobile */}
        <CarouselPrevious className="top-1/3 left-3 sm:top-1/2" />
        <CarouselNext className="top-1/3 right-3 sm:top-1/2" />
      </Carousel>

      <div className="flex justify-center gap-1" role="group" aria-label="Escolher notícia">
        {items.map(({ article }, i) => (
          <button
            key={article.slug}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Notícia ${i + 1}: ${article.title}`}
            aria-current={i === current ? "true" : undefined}
            className="flex size-6 items-center justify-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-2 rounded-full transition-all",
                i === current ? "bg-primary w-6" : "bg-muted-foreground/60 w-2"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
