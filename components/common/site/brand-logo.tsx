import Link from "next/link"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  /** Small text under the name */
  subtitle?: string
  href?: string
  className?: string
}

/** IPT logo block. Rebranding: change the mark and the texts here. */
export function BrandLogo({
  subtitle = "Instituto Politécnico de Tomar",
  href = "/",
  className,
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="bg-primary text-primary-foreground font-heading flex size-10 shrink-0 items-center justify-center rounded-md text-sm font-extrabold"
      >
        IPT
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-heading font-bold">IPT</span>
        <span className="text-foreground text-xs">{subtitle}</span>
      </span>
    </Link>
  )
}
