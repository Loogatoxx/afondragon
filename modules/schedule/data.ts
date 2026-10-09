// EXAMPLE DATA for the schedule, all made up. The real module reads it in queries.ts.
export type ClassType = "T" | "PL" | "TP" | "TUT";

export type ClassSession = {
  id: string;
  /** 0 = Monday … 4 = Friday */
  day: number;
  start: string;
  end: string;
  title: string;
  type: ClassType;
  room: string;
  teacher?: string;
  note?: { label: string; tone: "success" | "warning" | "info" };
  changed?: boolean;
};

export const TYPE_LABELS: Record<ClassType, string> = {
  T: "Teórica",
  PL: "Prática / laboratório",
  TP: "Teórico-prática",
  TUT: "Tutorial",
};

export const SESSIONS: ClassSession[] = [
  { id: "es", day: 0, start: "10:00", end: "12:00", title: "Engenharia de Software", type: "T", room: "Anfiteatro 1", teacher: "Prof.ª Helena Silva" },
  { id: "so", day: 1, start: "09:00", end: "11:00", title: "Sistemas Operativos", type: "TP", room: "Sala A204", note: { label: "Confirmada", tone: "success" } },
  { id: "pw", day: 1, start: "14:00", end: "16:30", title: "Programação Web II", type: "PL", room: "Sala B102 (Lab)", teacher: "Prof. Carlos Marques", note: { label: "Entrega Lab 3", tone: "warning" } },
  { id: "bd", day: 2, start: "16:30", end: "18:30", title: "Bases de Dados", type: "PL", room: "Sala B105", teacher: "Prof. Mário Rui", changed: true, note: { label: "Sala alterada", tone: "warning" } },
  { id: "ia", day: 3, start: "10:30", end: "12:30", title: "Inteligência Artificial", type: "T", room: "Sala B201" },
  { id: "tut", day: 4, start: "15:00", end: "16:00", title: "Tutoria de Projeto Final", type: "TUT", room: "Sala A101", teacher: "Prof.ª Rita Costa" },
];

export const DELIVERIES = [
  { id: "d1", when: "13 OUT · 23:59", title: "Programação Web II", detail: "Entrega do Trabalho Prático 1 (GitHub Classroom)", urgent: true },
  { id: "d2", when: "16 OUT · 10:00", title: "Engenharia de Software", detail: "Mini-teste presencial (Anfiteatro 1)", urgent: false },
];

/** Monday of the example week (12 Oct 2026). "Today" is Tuesday 13 Oct. */
export const BASE_MONDAY = new Date(2026, 9, 12);
export const TODAY_INDEX = 1;
