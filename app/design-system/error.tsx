"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/common/error-message";

// Shown when a /design-system page throws. Never shows the raw error to the user.
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-6xl p-4 sm:p-8">
      <ErrorMessage
        title="Não foi possível abrir esta página"
        message="Ocorreu um erro inesperado. Tente novamente; se continuar, avise a equipa do design system."
        action={
          <Button size="sm" variant="outline" onClick={() => retry()}>
            Tentar novamente
          </Button>
        }
      />
    </main>
  );
}
