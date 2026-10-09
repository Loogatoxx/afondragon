import { LoadingState } from "@/components/common/loading-state";

// Shown while a /design-system page is loading (streaming).
export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl p-4 sm:p-8">
      <LoadingState variant="rows" rows={4} label="A carregar o design system…" />
    </main>
  );
}
