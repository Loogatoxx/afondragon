import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate, skipOptimization, type Article } from "./types"

/** Article reading view: cover, title, author, date and body. */
export function ArticleView({ article }: { article: Article }) {
  return (
    <article className="bg-card mx-auto w-full max-w-3xl overflow-hidden rounded-xl shadow-sm">
      <div className="bg-muted relative aspect-video">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          unoptimized={skipOptimization(article.image.src)}
          className="object-cover"
        />
      </div>
      <div className="space-y-6 p-5 sm:p-10">
        <header className="space-y-3">
          <Badge>{article.category}</Badge>
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl">{article.title}</h1>
          <p className="text-muted-foreground text-lg">{article.summary}</p>
          <p className="text-sm">
            Por <span className="text-heading font-medium">{article.author}</span> ·{" "}
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
        </header>
        <Separator className="bg-input" />
        <div className="space-y-4 text-base leading-relaxed sm:text-lg">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
