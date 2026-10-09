import {
  Building2,
  CalendarDays,
  FileUser,
  GraduationCap,
  House,
  Newspaper,
  ShieldAlert,
  UtensilsCrossed,
} from "lucide-react";

/** Menu icon for each module id (lib/modules). Unknown ids fall back to a generic icon. */
export const MODULE_ICONS = {
  portal: House,
  classes: GraduationCap,
  schedule: CalendarDays,
  secretariat: Building2,
  cafeteria: UtensilsCrossed,
  news: Newspaper,
  applications: FileUser,
  complaints: ShieldAlert,
};
