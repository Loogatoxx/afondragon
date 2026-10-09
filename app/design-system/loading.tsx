import { ACarregar } from "@/components/common/a-carregar";

// Shown while a /design-system page is loading (streaming).
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl p-4 sm:p-8">
      <ACarregar variante="linhas" linhas={4} texto="A carregar o design system…" />
    </main>
  );
}
