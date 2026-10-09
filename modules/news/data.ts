import type { Article } from "@/components/common/news/types";

// EXAMPLE ARTICLES, all made up. The real module reads them in queries.ts.
const IMG = "/images/noticias";

export const ARTICLES: Article[] = [
  {
    slug: "abertura-do-ano-letivo",
    title: "Arranca o ano letivo 2026/2027",
    summary: "Mais de 300 novos estudantes foram recebidos no campus com uma sessão de boas-vindas e visitas guiadas.",
    body: [
      "A sessão de abertura decorreu no auditório principal e contou com a presença da direção, docentes e associações de estudantes.",
      "Durante a tarde, os novos estudantes participaram em visitas guiadas aos laboratórios, à biblioteca e aos serviços de apoio.",
      "Os horários das primeiras semanas já estão disponíveis no portal, na secção Horários.",
    ],
    category: "Institucional",
    date: "2026-09-21",
    author: "Gabinete de Comunicação",
    image: { src: "/images/campus-ipt.webp", alt: "Estudantes a caminhar em frente ao edifício principal do campus do IPT" },
    featured: true,
  },
  {
    slug: "hackathon-tpsi",
    title: "Hackathon de 24 horas junta 12 equipas",
    summary: "Estudantes de TPSI criaram aplicações para melhorar a vida no campus. A equipa vencedora fez um mapa de salas livres.",
    body: [
      "O hackathon decorreu durante um fim de semana e juntou estudantes de vários cursos em equipas de três a cinco pessoas.",
      "O júri valorizou a utilidade das propostas, a qualidade do código e a apresentação final.",
      "As três melhores equipas vão apresentar os projetos na próxima Semana da Tecnologia.",
    ],
    category: "Eventos",
    date: "2026-10-05",
    author: "Núcleo de Estudantes de TPSI",
    image: { src: `${IMG}/hackathon.svg`, alt: "Ilustração de um portátil aberto com linhas de código coloridas" },
    featured: true,
  },
  {
    slug: "torneio-interescolas",
    title: "Inscrições abertas para o torneio interescolas",
    summary: "Futsal, voleibol e xadrez: as equipas podem inscrever-se até 30 de outubro.",
    body: [
      "O torneio interescolas regressa este semestre com três modalidades e jogos às quartas-feiras à tarde.",
      "Cada equipa deve ter pelo menos um elemento de cada ano do curso.",
      "As inscrições fazem-se na secretaria ou através do portal.",
    ],
    category: "Desporto",
    date: "2026-10-08",
    author: "Associação Académica",
    image: { src: `${IMG}/torneio-desportivo.svg`, alt: "Ilustração de uma bola de futebol sobre um campo verde" },
    featured: true,
  },
  {
    slug: "entrega-de-diplomas",
    title: "Cerimónia de entrega de diplomas a 14 de novembro",
    summary: "Os diplomados de 2025/2026 e as famílias estão convidados para a cerimónia no auditório.",
    body: [
      "A cerimónia começa às 15h00 e termina com um momento de convívio no átrio.",
      "Cada diplomado pode trazer até três convidados. A confirmação de presença é obrigatória.",
    ],
    category: "Institucional",
    date: "2026-10-10",
    author: "Serviços Académicos",
    image: { src: `${IMG}/entrega-diplomas.svg`, alt: "Ilustração de um capelo de finalista e de um diploma enrolado" },
  },
  {
    slug: "novo-menu-refeitorio",
    title: "Refeitório passa a ter opção vegetariana todos os dias",
    summary: "A partir de novembro, o menu diário inclui sempre um prato vegetariano e sopa do dia.",
    body: [
      "A mudança responde aos pedidos dos estudantes no inquérito de satisfação do ano passado.",
      "O menu da semana pode ser consultado no portal, na secção Refeitório.",
    ],
    category: "Serviços",
    date: "2026-10-12",
    author: "Serviços de Ação Social",
    image: { src: "/images/refeitorio-prato.webp", alt: "Tabuleiro do refeitório com peixe grelhado, legumes, sopa e fruta" },
  },
];

export const CATEGORIES = ["Institucional", "Eventos", "Desporto", "Serviços"];

export function articleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

/**
 * Role simulated through the URL (?perfil=staff) so the prototype can show both
 * views. The real pages read the role from getUser() and call requireRole().
 */
export type ExampleRole = "student" | "staff";

/** Roles allowed to publish articles (to confirm with the module owner). */
export const PUBLISHER_ROLES: ExampleRole[] = ["staff"];

export function readRole(value: string | string[] | undefined): ExampleRole {
  return value === "staff" ? "staff" : "student";
}
