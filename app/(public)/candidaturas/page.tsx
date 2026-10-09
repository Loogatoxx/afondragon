import type { Metadata } from "next";

import { UnderConstruction } from "@/components/common/under-construction";

export const metadata: Metadata = {
  title: "Candidaturas · IPT",
};

export default function ApplicationsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <UnderConstruction title="Candidaturas" owner="Repositório e deploy (G2)" backHref="/" />
    </div>
  );
}
