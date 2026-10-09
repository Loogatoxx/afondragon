/** A news article. Final field names are up to whoever creates the database table. */
export type Artigo = {
  slug: string
  titulo: string
  resumo: string
  /** Body paragraphs */
  corpo: string[]
  categoria: string
  /** Publication date in ISO format, e.g. "2026-10-12" */
  data: string
  autor: string
  imagem: {
    src: string
    /** Alt text describing the image for people who cannot see it. Required. */
    alt: string
  }
  /** Shown in the featured carousel */
  destaque?: boolean
}

export function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/** SVGs and local previews (blob:) skip the image optimizer. */
export function semOtimizar(src: string) {
  return src.endsWith(".svg") || src.startsWith("blob:")
}
