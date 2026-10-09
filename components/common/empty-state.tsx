import * as React from "react"
import { Inbox } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  title?: string
  description?: string
  /** lucide-react icon; defaults to an empty inbox */
  icon?: React.ComponentType<{ className?: string }>
  /** Suggested action, e.g. <Button>Criar o primeiro</Button> */
  action?: React.ReactNode
  className?: string
}

/** Show when a list or table has no data. Built on the shadcn Empty. */
export function EmptyState({
  title = "Ainda não há nada aqui",
  description,
  icon: Icon = Inbox,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={cn("bg-card border", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  )
}
