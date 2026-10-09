import type { PortalModule, Role } from "./types";

// Copy of the G3 registry (g3/rules) used by this prototype.
// "news" is a PROPOSAL from the design system team: G3 must approve it.
export const MODULES: PortalModule[] = [
  {
    id: "portal",
    name: "Início",
    route: "/portal",
    description: "Página pessoal do utilizador.",
    roles: ["student", "teacher", "staff", "admin"],
    order: 0,
  },
  {
    id: "classes",
    name: "Aulas",
    route: "/aulas",
    description: "Gestão de aulas, presenças e materiais.",
    roles: ["student", "teacher"],
    order: 10,
  },
  {
    id: "schedule",
    name: "Horários",
    route: "/horarios",
    description: "Consulta de horários e disponibilidade.",
    roles: ["student", "teacher", "staff"],
    order: 20,
  },
  {
    id: "secretariat",
    name: "Secretaria",
    route: "/secretaria",
    description: "Atendimento e processos administrativos.",
    roles: ["student", "staff", "admin"],
    order: 30,
  },
  {
    id: "cafeteria",
    name: "Refeitório",
    route: "/refeitorio",
    description: "Menu e gestão de refeições.",
    roles: ["student", "staff", "admin"],
    order: 40,
  },
  {
    id: "news",
    name: "Notícias",
    route: "/noticias",
    description: "Notícias, comunicados e newsletter do campus.",
    roles: ["student", "teacher", "staff", "admin"],
    order: 45,
  },
  {
    id: "applications",
    name: "Candidaturas",
    route: "/candidaturas",
    description: "Gestão de candidaturas e inscrições.",
    roles: ["staff", "admin"],
    order: 50,
  },
  {
    id: "complaints",
    name: "Denúncias",
    route: "/denuncias",
    description: "Canal anónimo de denúncias e contacto.",
    roles: ["student", "teacher", "staff", "admin"],
    order: 60,
  },
];

export function modulesForRole(role: Role): PortalModule[] {
  return MODULES.filter((module) => module.roles.includes(role)).sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999),
  );
}

/** Module that owns a path, including sub-routes (/noticias/abc → news). */
export function moduleForPath(path: string): PortalModule | undefined {
  return MODULES.find((module) => path === module.route || path.startsWith(`${module.route}/`));
}
