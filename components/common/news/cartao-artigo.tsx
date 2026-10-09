import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatarData, semOtimizar, type Artigo } from "./tipos"

type CartaoArtigoProps = {
  artigo: Artigo
  /** Click target; without it the card is not clickable (e.g. a preview) */
  href?: string
  className?: string
}

/** Article card for a news list. The whole card is clickable. */
export function CartaoArtigo({ artigo, href, className }: CartaoArtigoProps) {
  return (
    <Card
      className={cn(
        "group relative gap-0 overflow-hidden py-0 transition-shadow focus-within:shadow-md hover:shadow-md",
        className
      )}
    >
      <div className="bg-muted relative aspect-video overflow-hidden">
        {artigo.imagem.src && (
          <Image
            src={artigo.imagem.src}
            alt={artigo.imagem.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized={semOtimizar(artigo.imagem.src)}
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{artigo.categoria}</Badge>
          <time dateTime={artigo.data} className="text-muted-foreground text-sm">
            {formatarData(artigo.data)}
          </time>
        </div>
        <h3 className="text-xl leading-snug font-semibold">
          {href ? (
            // The ::after stretches the link over the whole card
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {artigo.titulo}
            </Link>
          ) : (
            artigo.titulo
          )}
        </h3>
        <p className="text-muted-foreground line-clamp-3">{artigo.resumo}</p>
      </div>
    </Card>
  )
}
