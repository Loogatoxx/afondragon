import type { Metadata } from "next";

import { SecretariatView } from "@/modules/secretariat/components/secretariat-view";

export const metadata: Metadata = {
  title: "Secretaria · UniPortal",
};

export default function SecretariatPage() {
  return <SecretariatView />;
}
