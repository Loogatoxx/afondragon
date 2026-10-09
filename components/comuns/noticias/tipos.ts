/** Um artigo da newsletter. Os nomes finais dos campos ficam para quem fizer a tabela na base de dados. */
export type Artigo = {
  slug: string
  titulo: string
  resumo: string
  /** Parágrafos do texto */
  corpo: string[]
  categoria: string
  /** Data de publicação em ISO, ex.: "2026-10-12" */
  data: string
  autor: string
  imagem: {
    src: string
    /** Texto alternativo: descreve a imagem para quem não a vê. Obrigatório. */
    alt: string
  }
  /** Aparece no carrossel de destaques */
  destaque?: boolean
}

export function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/** SVG e pré-visualizações locais (blob:) não passam pelo otimizador de imagens. */
export function semOtimizar(src: string) {
  return src.endsWith(".svg") || src.startsWith("blob:")
}
