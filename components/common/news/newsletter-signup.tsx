"use client"

import { useId, useState } from "react"
import { CircleCheck, Mail } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type NewsletterSignupProps = {
  /** Topics the person can choose; the first ones start selected */
  topics?: string[]
  /** "dark" for the public site band, "light" inside the portal */
  tone?: "dark" | "light"
  className?: string
}

const DEFAULT_TOPICS = ["Notícias gerais", "Candidaturas & cursos", "Cultura & conferências"]

/** Newsletter subscription box. Example only: nothing is stored. */
export function NewsletterSignup({
  topics = DEFAULT_TOPICS,
  tone = "light",
  className,
}: NewsletterSignupProps) {
  const id = useId()
  const [email, setEmail] = useState("")
  const [chosen, setChosen] = useState<string[]>(topics.slice(0, 2))
  const [error, setError] = useState<string>()
  const [done, setDone] = useState(false)
  const dark = tone === "dark"

  function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Escreva um endereço de email válido.")
      document.getElementById(`${id}-email`)?.focus()
      return
    }
    if (chosen.length === 0) {
      setError("Escolha pelo menos um tema.")
      return
    }
    setError(undefined)
    setDone(true)
  }

  return (
    <section
      id="newsletter"
      aria-labelledby={`${id}-title`}
      className={cn(
        "scroll-mt-24 rounded-xl p-6 sm:p-10",
        dark ? "bg-inverted text-inverted-foreground" : "bg-card border",
        className
      )}
    >
      <div className={cn("mx-auto max-w-2xl space-y-5", dark && "text-center")}>
        <Badge>
          <Mail aria-hidden="true" />
          Newsletter semanal
        </Badge>
        <h2
          id={`${id}-title`}
          className={cn("text-2xl font-bold sm:text-3xl", dark && "text-inverted-foreground")}
        >
          Fique a par das novidades do Politécnico
        </h2>
        <p className={dark ? "text-inverted-foreground" : "text-foreground"}>
          Receba todas as segundas-feiras o resumo de notícias, prazos de candidatura, bolsas e
          eventos abertos ao público.
        </p>

        {done ? (
          <Alert variant="success" aria-live="polite" className="text-left">
            <CircleCheck aria-hidden="true" />
            <AlertTitle>Subscrição registada</AlertTitle>
            <AlertDescription>
              Vai receber a próxima edição em {email}. (Exemplo: nada foi guardado.)
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={subscribe} noValidate className="space-y-4">
            <div className={cn("flex flex-col gap-3 sm:flex-row", dark && "sm:justify-center")}>
              <Label htmlFor={`${id}-email`} className="sr-only">
                Endereço de email
              </Label>
              <Input
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                placeholder="O seu endereço de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={cn("sm:max-w-sm", dark && "bg-popover text-popover-foreground")}
              />
              <Button type="submit" className="sm:h-14">
                Subscrever
              </Button>
            </div>
            <fieldset className={cn("flex flex-wrap gap-x-6 gap-y-3", dark && "justify-center")}>
              <legend className="sr-only">Temas que quer receber</legend>
              {topics.map((topic, i) => (
                <div key={topic} className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-topic-${i}`}
                    checked={chosen.includes(topic)}
                    onCheckedChange={(v) =>
                      setChosen((list) =>
                        v === true ? [...list, topic] : list.filter((t) => t !== topic)
                      )
                    }
                    className={dark ? "bg-popover" : undefined}
                  />
                  <Label
                    htmlFor={`${id}-topic-${i}`}
                    className={cn("font-normal", dark && "text-inverted-foreground")}
                  >
                    {topic}
                  </Label>
                </div>
              ))}
            </fieldset>
            {error && (
              <p
                id={`${id}-error`}
                role="alert"
                className={cn("text-sm font-medium", dark ? "text-warning" : "text-destructive")}
              >
                {error}
              </p>
            )}
            <p className={cn("text-xs", dark ? "text-inverted-foreground" : "text-muted-foreground")}>
              Pode cancelar a subscrição a qualquer momento.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
