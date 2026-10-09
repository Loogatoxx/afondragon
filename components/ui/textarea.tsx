import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input bg-campo text-foreground placeholder:text-muted-foreground focus-visible:border-primary aria-invalid:border-destructive aria-invalid:border-2 flex field-sizing-content min-h-28 w-full rounded-sm border px-4 py-3 text-base transition-[color,border-color] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
