"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/common/error-message";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-md p-4 sm:p-8">
      <ErrorMessage
        title="Não foi possível abrir a página de entrada"
        message="Ocorreu um erro inesperado. Tente novamente."
        action={
          <Button size="sm" variant="outline" onClick={() => retry()}>
            Tentar novamente
          </Button>
        }
      />
    </main>
  );
}
