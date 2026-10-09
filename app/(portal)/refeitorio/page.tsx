import type { Metadata } from "next";

import { CafeteriaView } from "@/modules/cafeteria/components/cafeteria-view";

export const metadata: Metadata = {
  title: "Refeitório · UniPortal",
};

export default function CafeteriaPage() {
  return <CafeteriaView />;
}
