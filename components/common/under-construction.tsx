import Link from "next/link"
import { Construction } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/common/empty-state"
import { PageHeader } from "@/components/common/page-header"

type UnderConstructionProps = {
  title: string
  /** Team that owns the page, e.g. "Contratos (G3)" */
  owner: string
  backHref?: string
}

/** Placeholder for module pages that another team has not built yet. */
export function UnderConstruction({ title, owner, backHref = "/portal" }: UnderConstructionProps) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} />
      <EmptyState
        icon={Construction}
        title="Em construção"
        description={`Esta página é da equipa ${owner} e ainda está a ser preparada.`}
        action={
          <Button asChild variant="outline">
            <Link href={backHref}>Voltar ao início</Link>
          </Button>
        }
      />
    </div>
  )
}
