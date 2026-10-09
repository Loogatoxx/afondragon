import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl p-4 sm:p-8">
      <PageHeader
        title="UniPortal"
        description="Página inicial provisória. Cada grupo acrescenta aqui as suas rotas."
        actions={
          <Button asChild>
            <Link href="/design-system">Ver Design System</Link>
          </Button>
        }
      />
    </main>
  );
}
