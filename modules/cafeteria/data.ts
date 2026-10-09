// EXAMPLE DATA for the cafeteria, all made up. The real module reads it in queries.ts.
export type MenuCategory = "soup" | "fish" | "meat" | "vegan" | "dessert";

export type MenuItem = { category: MenuCategory; name: string; detail: string; tags: string[] };

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  soup: "Sopa do dia",
  fish: "Opção peixe",
  meat: "Opção carne",
  vegan: "Opção vegetariana / vegan",
  dessert: "Sobremesa",
};

export const PRICES = { student: 2.95, staff: 4.8 };

export const WEEK = [
  { key: "seg", label: "Seg 12/10" },
  { key: "ter", label: "Ter 13/10" },
  { key: "qua", label: "Qua 14/10" },
  { key: "qui", label: "Qui 15/10" },
  { key: "sex", label: "Sex 16/10" },
] as const;

export const TODAY_KEY = "ter";

const DESSERT: MenuItem = {
  category: "dessert",
  name: "Fruta da época fatiada ou gelatina",
  detail: "Opção de peça inteira de fruta da época.",
  tags: ["À escolha"],
};

export const MENUS: Record<(typeof WEEK)[number]["key"], MenuItem[]> = {
  seg: [
    { category: "soup", name: "Sopa de feijão-verde", detail: "Sem glúten.", tags: ["Vegetal"] },
    { category: "fish", name: "Bacalhau com broa", detail: "Com batata a murro e grelos.", tags: ["Peixe"] },
    { category: "meat", name: "Frango estufado com cogumelos", detail: "Acompanha arroz branco.", tags: ["Carne branca"] },
    { category: "vegan", name: "Hambúrguer de grão com salada", detail: "Pão integral e molho de iogurte vegetal.", tags: ["Vegan"] },
    DESSERT,
  ],
  ter: [
    { category: "soup", name: "Creme de legumes da horta com abóbora e curgete", detail: "Sem glúten, sem lactose.", tags: ["100% vegetal"] },
    { category: "fish", name: "Filete de pescada grelhado com legumes salteados e quinoa", detail: "Couves de Bruxelas e tomate cherry confitado.", tags: ["Peixe", "Ómega-3"] },
    { category: "meat", name: "Lombo de porco assado com alecrim e batata rústica", detail: "Acompanhado por salada mista.", tags: ["Carne"] },
    { category: "vegan", name: "Caril de grão com espinafres e arroz basmati", detail: "Leite de coco e especiarias.", tags: ["Vegan"] },
    DESSERT,
  ],
  qua: [
    { category: "soup", name: "Sopa de cenoura e gengibre", detail: "Sem glúten.", tags: ["Vegetal"] },
    { category: "fish", name: "Dourada grelhada com batata cozida", detail: "Legumes salteados.", tags: ["Peixe"] },
    { category: "meat", name: "Jardineira de vitela", detail: "Ervilhas, cenoura e batata.", tags: ["Carne"] },
    { category: "vegan", name: "Tofu à Gomes de Sá", detail: "Batata, cebola e azeitona.", tags: ["Vegan"] },
    DESSERT,
  ],
  qui: [
    { category: "soup", name: "Canja de legumes", detail: "Sem lactose.", tags: ["Vegetal"] },
    { category: "fish", name: "Arroz de polvo malandrinho", detail: "Com coentros.", tags: ["Peixe"] },
    { category: "meat", name: "Bife de peru com molho de cogumelos", detail: "Batata frita caseira.", tags: ["Carne branca"] },
    { category: "vegan", name: "Estufado de seitan", detail: "Com puré de batata-doce.", tags: ["Vegan"] },
    DESSERT,
  ],
  sex: [
    { category: "soup", name: "Sopa de espinafres", detail: "Sem glúten.", tags: ["Vegetal"] },
    { category: "fish", name: "Salmão no forno com batata-doce", detail: "Brócolos ao vapor.", tags: ["Peixe"] },
    { category: "meat", name: "Lasanha de carne", detail: "Salada verde.", tags: ["Carne"] },
    { category: "vegan", name: "Lasanha vegetariana de espinafres", detail: "Molho de tomate caseiro.", tags: ["Vegetariano"] },
    DESSERT,
  ],
};

export type TicketEntry = { code: string; when: string; meal: string; choice: string; price: number; status: "Disponível" | "Agendada" | "Consumida" };

export const HISTORY: TicketEntry[] = [
  { code: "#IPT-89241", when: "Hoje, 13 out · 12:45", meal: "Almoço central", choice: "Peixe (pescada grelhada)", price: 2.95, status: "Disponível" },
  { code: "#IPT-89305", when: "Amanhã, 14 out · 13:00", meal: "Almoço central", choice: "Vegetariano (lasanha)", price: 2.95, status: "Agendada" },
  { code: "#IPT-88912", when: "12 out · 13:10", meal: "Almoço central", choice: "Carne (frango assado)", price: 2.95, status: "Consumida" },
  { code: "#IPT-88744", when: "09 out · 16:20", meal: "Bar Edifício D", choice: "Café + tosta de queijo", price: 1.8, status: "Consumida" },
];

export const euros = (value: number) =>
  value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
