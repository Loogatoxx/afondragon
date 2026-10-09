// EXAMPLE DATA for the whistleblowing channel (G1). Nothing here is real.
export const CATEGORIES = [
  "Assédio ou discriminação",
  "Fraude académica",
  "Uso indevido de recursos",
  "Segurança e instalações",
  "Proteção de dados",
  "Outra situação",
];

export const PLACES = [
  "Campus de Tomar",
  "Campus de Abrantes",
  "Biblioteca",
  "Laboratórios",
  "Refeitório",
  "Online / plataformas digitais",
];

export const PROCESS_STATES = [
  { label: "Em averiguação inicial", status: "Pendente", variant: "warning" },
  { label: "Investigação concluída", status: "Concluído", variant: "success" },
  { label: "Não admitida / incompleta", status: "Recusado", variant: "destructive" },
  { label: "Rascunho não enviado", status: "Rascunho", variant: "outline" },
] as const;

export const FAQ = [
  {
    q: "O que acontece depois de submeter?",
    a: "A comissão independente confirma a receção em 7 dias e inicia averiguações se a denúncia for admissível.",
  },
  {
    q: "Quem tem acesso aos dados?",
    a: "Apenas as pessoas designadas para instruir o processo. Numa denúncia anónima não fica registado nenhum dado pessoal.",
  },
  {
    q: "Como é garantido o anonimato?",
    a: "O acompanhamento é feito só com o código que recebe no fim, sem ligação ao seu perfil ou credenciais.",
  },
];
