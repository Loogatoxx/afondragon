// Mirrors the module contract from the Contratos team (G3, branch g3/rules).
export type Role = "student" | "teacher" | "staff" | "admin";

export interface PortalModule {
  id: string;
  name: string;
  route: string;
  description: string;
  roles: Role[];
  order?: number;
}

export const ROLES: Role[] = ["student", "teacher", "staff", "admin"];
