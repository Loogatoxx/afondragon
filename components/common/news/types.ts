/** A news article. Final field names are up to whoever creates the database table. */
export type Article = {
  slug: string
  title: string
  summary: string
  /** Body paragraphs */
  body: string[]
  category: string
  /** Publication date in ISO format, e.g. "2026-10-12" */
  date: string
  author: string
  image: {
    src: string
    /** Alt text describing the image for people who cannot see it. Required. */
    alt: string
  }
  /** Shown in the featured carousel */
  featured?: boolean
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/** SVGs and local previews (blob:) skip the image optimizer. */
export function skipOptimization(src: string) {
  return src.endsWith(".svg") || src.startsWith("blob:")
}
