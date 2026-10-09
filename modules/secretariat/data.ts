// EXAMPLE DATA for the secretariat, all made up. The real module reads it in queries.ts.
export type RequestStatus = "Concluído" | "Pendente" | "Recusado" | "Rascunho";

export type SecretariatRequest = {
  number: string;
  title: string;
  service: string;
  date: string;
  status: RequestStatus;
};

export const STATUS_VARIANT = {
  Concluído: "success",
  Pendente: "warning",
  Recusado: "destructive",
  Rascunho: "outline",
} as const;

export const REQUESTS: SecretariatRequest[] = [
  { number: "2026-0142", title: "Declaração de matrícula e frequência", service: "Serviços Académicos", date: "12/10/2026", status: "Concluído" },
  { number: "2026-0157", title: "Certificado de notas e unidades curriculares", service: "Serviços Académicos", date: "13/10/2026", status: "Pendente" },
  { number: "2026-0163", title: "Mudança de turma (Engenharia de Software)", service: "Conselho Pedagógico", date: "14/10/2026", status: "Recusado" },
  { number: "2026-0170", title: "Cartão de estudante (2.ª via)", service: "Tesouraria Central", date: "15/10/2026", status: "Rascunho" },
  { number: "2026-0182", title: "Estatuto Trabalhador-Estudante", service: "Direção Pedagógica", date: "20/10/2026", status: "Pendente" },
];

export const REQUEST_TYPES = [
  "Declaração de matrícula",
  "Certificado de notas",
  "Mudança de turma",
  "Cartão de estudante (2.ª via)",
  "Estatuto Trabalhador-Estudante",
  "Pedido de equivalência",
];

export const CERTIFICATES = [
  { id: "matricula", title: "Declaração simples de matrícula", description: "Comprova a inscrição no ano curricular atual, com código de autenticação." },
  { id: "transportes", title: "Declaração Sub23 / Transportes", description: "Formato aceite pelos operadores de transporte para o passe de estudante." },
  { id: "abono", title: "Declaração para abono de família", description: "Certidão normalizada com carimbo digital para a Segurança Social." },
];
