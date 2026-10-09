import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatarData, semOtimizar, type Artigo } from "./tipos"

/** Article reading view: cover, title, author, date and body. */
export function ArtigoNoticia({ artigo }: { artigo: Artigo }) {
  return (
    <article className="bg-card mx-auto w-full max-w-3xl overflow-hidden rounded-xl shadow-sm">
      <div className="bg-muted relative aspect-video">
        <Image
          src={artigo.imagem.src}
          alt={artigo.imagem.alt}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          unoptimized={semOtimizar(artigo.imagem.src)}
          className="object-cover"
        />
      </div>
      <div className="space-y-6 p-5 sm:p-10">
        <header className="space-y-3">
          <Badge>{artigo.categoria}</Badge>
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl">{artigo.titulo}</h1>
          <p className="text-muted-foreground text-lg">{artigo.resumo}</p>
          <p className="text-sm">
            Por <span className="text-heading font-medium">{artigo.autor}</span> ·{" "}
            <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
          </p>
        </header>
        <Separator className="bg-input" />
        <div className="space-y-4 text-base leading-relaxed sm:text-lg">
          {artigo.corpo.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
