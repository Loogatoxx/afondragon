"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/common/error-message";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-8">
      <ErrorMessage
        title="Não foi possível abrir esta página"
        message="Ocorreu um erro inesperado. Tente novamente."
        action={
          <Button size="sm" variant="outline" onClick={() => retry()}>
            Tentar novamente
          </Button>
        }
      />
    </div>
  );
}
