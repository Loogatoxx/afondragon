// PROVISIONAL: mirrors the Notification contract from G3 (lib/notifications).
// The real list comes from notify() / the notifications table.
export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  recipientId: string;
  moduleId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  link?: string;
}

export async function listNotifications(recipientId: string): Promise<Notification[]> {
  return [
    {
      id: "n1",
      recipientId,
      moduleId: "schedule",
      title: "Sala alterada",
      message: "A aula de Bases de Dados (PL) de quarta-feira passa para a sala B105.",
      type: "warning",
      read: false,
      createdAt: "2026-10-13T08:15:00",
      link: "/horarios",
    },
    {
      id: "n2",
      recipientId,
      moduleId: "secretariat",
      title: "Declaração emitida",
      message: "A sua declaração de matrícula já está disponível.",
      type: "success",
      read: false,
      createdAt: "2026-10-12T16:40:00",
      link: "/secretaria",
    },
    {
      id: "n3",
      recipientId,
      moduleId: "cafeteria",
      title: "Senha confirmada",
      message: "Almoço de amanhã reservado no Refeitório Central.",
      type: "info",
      read: true,
      createdAt: "2026-10-12T12:05:00",
      link: "/refeitorio",
    },
  ];
}
