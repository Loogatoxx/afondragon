// EXAMPLE DATA for the public site, all made up.
export type CampusEvent = {
  id: string;
  day: string;
  month: string;
  tag: string;
  tagVariant: "brand" | "info" | "secondary";
  title: string;
  place: string;
  action: "register" | "details";
};

export const EVENTS: CampusEvent[] = [
  {
    id: "simposio",
    day: "28",
    month: "OUT",
    tag: "Conferência aberta",
    tagVariant: "brand",
    title: "Simpósio Ibérico de Tecnologias Digitais e Património Cultural",
    place: "Auditório Principal · 09h30–18h00",
    action: "register",
  },
  {
    id: "robotica",
    day: "04",
    month: "NOV",
    tag: "Workshop",
    tagVariant: "info",
    title: "Oficina Prática de Robótica Colaborativa e FabLab",
    place: "Laboratório Central de Eletrotecnia · 14h00–17h30",
    action: "register",
  },
  {
    id: "exposicao",
    day: "18",
    month: "NOV",
    tag: "Cultura",
    tagVariant: "secondary",
    title: "Exposição Anual de Design de Comunicação & Multimédia",
    place: "Galeria de Exposições do Campus · Entrada livre",
    action: "details",
  },
];

export const LIVING_LINKS = [
  {
    title: "Oferta formativa (CTeSP, Licenciaturas, Mestrados)",
    description: "Conheça todos os cursos disponíveis nas várias escolas.",
  },
  {
    title: "Alojamento e residências estudantis",
    description: "Condições de candidatura, preços e quartos equipados.",
  },
  {
    title: "Campus de Tomar & Abrantes",
    description: "Como chegar, mapas de transportes públicos e estacionamento.",
  },
];
