import type { Role } from "@/lib/modules";

// PROVISIONAL: the real getUser() reads the Supabase session and belongs to
// Dados e login (G1). This fake user lets the prototype render the portal.
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** Short description shown under the name, e.g. course */
  detail?: string;
};

const FAKE_USER: User = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Ana Exemplo",
  email: "ana.exemplo@ipt.pt",
  role: "student",
  detail: "Eng. Informática",
};

export async function getUser(): Promise<User | null> {
  return FAKE_USER;
}

/** Portuguese label for each role, as shown to the user. */
export const ROLE_LABELS: Record<Role, string> = {
  student: "Aluno",
  teacher: "Docente",
  staff: "Funcionário",
  admin: "Administrador",
};
