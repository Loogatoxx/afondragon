import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input bg-campo text-foreground h-14 w-full min-w-0 rounded-sm border px-4 py-1 text-base transition-[color,border-color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary",
        "aria-invalid:border-destructive aria-invalid:border-2",
        className
      )}
      {...props}
    />
  )
}

export { Input }
