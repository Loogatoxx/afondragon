import type { Artigo } from "@/components/common/news/tipos";

// EXAMPLE ARTICLES, all made up. In the real module they come from the database.
const IMG = "/design-system/noticias";

export const ARTIGOS: Artigo[] = [
  {
    slug: "abertura-do-ano-letivo",
    titulo: "Arranca o ano letivo 2026/2027",
    resumo: "Mais de 300 novos estudantes foram recebidos no campus com uma sessão de boas-vindas e visitas guiadas.",
    corpo: [
      "A sessão de abertura decorreu no auditório principal e contou com a presença da direção, docentes e associações de estudantes.",
      "Durante a tarde, os novos estudantes participaram em visitas guiadas aos laboratórios, à biblioteca e aos serviços de apoio.",
      "Os horários das primeiras semanas já estão disponíveis no portal, na secção Horários.",
    ],
    categoria: "Institucional",
    data: "2026-09-21",
    autor: "Gabinete de Comunicação",
    imagem: { src: `${IMG}/abertura-ano-letivo.svg`, alt: "Ilustração do edifício principal do campus com árvores à volta" },
    destaque: true,
  },
  {
    slug: "hackathon-tpsi",
    titulo: "Hackathon de 24 horas junta 12 equipas",
    resumo: "Estudantes de TPSI criaram aplicações para melhorar a vida no campus. A equipa vencedora fez um mapa de salas livres.",
    corpo: [
      "O hackathon decorreu durante um fim de semana e juntou estudantes de vários cursos em equipas de três a cinco pessoas.",
      "O júri valorizou a utilidade das propostas, a qualidade do código e a apresentação final.",
      "As três melhores equipas vão apresentar os projetos na próxima Semana da Tecnologia.",
    ],
    categoria: "Eventos",
    data: "2026-10-05",
    autor: "Núcleo de Estudantes de TPSI",
    imagem: { src: `${IMG}/hackathon.svg`, alt: "Ilustração de um portátil aberto com linhas de código coloridas" },
    destaque: true,
  },
  {
    slug: "torneio-interescolas",
    titulo: "Inscrições abertas para o torneio interescolas",
    resumo: "Futsal, voleibol e xadrez: as equipas podem inscrever-se até 30 de outubro.",
    corpo: [
      "O torneio interescolas regressa este semestre com três modalidades e jogos às quartas-feiras à tarde.",
      "Cada equipa deve ter pelo menos um elemento de cada ano do curso.",
      "As inscrições fazem-se na secretaria ou através do portal.",
    ],
    categoria: "Desporto",
    data: "2026-10-08",
    autor: "Associação Académica",
    imagem: { src: `${IMG}/torneio-desportivo.svg`, alt: "Ilustração de uma bola de futebol sobre um campo verde" },
    destaque: true,
  },
  {
    slug: "entrega-de-diplomas",
    titulo: "Cerimónia de entrega de diplomas a 14 de novembro",
    resumo: "Os diplomados de 2025/2026 e as famílias estão convidados para a cerimónia no auditório.",
    corpo: [
      "A cerimónia começa às 15h00 e termina com um momento de convívio no átrio.",
      "Cada diplomado pode trazer até três convidados. A confirmação de presença é obrigatória.",
    ],
    categoria: "Institucional",
    data: "2026-10-10",
    autor: "Serviços Académicos",
    imagem: { src: `${IMG}/entrega-diplomas.svg`, alt: "Ilustração de um capelo de finalista e de um diploma enrolado" },
  },
  {
    slug: "novo-menu-refeitorio",
    titulo: "Refeitório passa a ter opção vegetariana todos os dias",
    resumo: "A partir de novembro, o menu diário inclui sempre um prato vegetariano e sopa do dia.",
    corpo: [
      "A mudança responde aos pedidos dos estudantes no inquérito de satisfação do ano passado.",
      "O menu da semana pode ser consultado no portal, na secção Refeitório.",
    ],
    categoria: "Serviços",
    data: "2026-10-12",
    autor: "Serviços de Ação Social",
    imagem: { src: `${IMG}/refeitorio-menu.svg`, alt: "Ilustração de um prato com legumes, talheres e fundo amarelo" },
  },
];

export const CATEGORIAS = ["Institucional", "Eventos", "Desporto", "Serviços"];

export function artigoPorSlug(slug: string) {
  return ARTIGOS.find((a) => a.slug === slug);
}

/**
 * Role simulated through the URL (?perfil=staff). Uses the project roles
 * (student | teacher | staff | admin). The real page calls requireRole() from lib/auth.
 */
export type ExampleRole = "student" | "staff";

/** Roles allowed to publish articles (to confirm with the module owner). */
export const PUBLISHER_ROLES: ExampleRole[] = ["staff"];

export function readRole(value: string | string[] | undefined): ExampleRole {
  return value === "staff" ? "staff" : "student";
}
