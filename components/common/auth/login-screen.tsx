import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Quote } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LoginForm } from "./login-form"
import type { LoginAction } from "./types"

/**
 * Full sign-in screen: campus photo on the left (desktop) and the form on the
 * right. Dados e login (G1) only passes its server action.
 */
export function LoginScreen({ action }: { action: LoginAction }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Photo panel: decorative, hidden on small screens */}
      <section
        aria-label="Bem-vindo ao UniPortal"
        className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex"
      >
        <Image
          src="/images/campus-ipt.webp"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="bg-overlay/75 absolute inset-0" />

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-brand text-brand-foreground font-heading flex size-12 items-center justify-center rounded-lg text-sm font-extrabold">
              IPT
            </span>
            <span className="text-inverted-foreground text-sm font-semibold tracking-wide uppercase">
              Instituto Politécnico de Tomar
            </span>
          </div>
          <Badge variant="outline" className="text-inverted-foreground border-inverted-foreground/40">
            <span aria-hidden="true" className="bg-brand size-2 rounded-full" />
            Sistemas digitais ativos
          </Badge>
        </div>

        <div className="relative max-w-xl space-y-6">
          <Badge variant="outline" className="text-inverted-foreground border-inverted-foreground/40">
            <BookOpen aria-hidden="true" />
            Comunidade Académica · Tomar
          </Badge>
          <h2 className="text-inverted-foreground text-5xl leading-tight font-bold">
            Bem-vindo ao UniPortal IPT
          </h2>
          <p className="text-inverted-foreground text-lg">
            Plataforma digital integrada de apoio académico e docente.
          </p>
          <Separator className="bg-inverted-foreground/30" />
          <p className="text-inverted-foreground flex items-center gap-2 italic">
            <Quote aria-hidden="true" className="text-brand size-5" />
            Inovação, Tecnologia e Proximidade
          </p>
        </div>

        <div className="text-inverted-foreground relative flex gap-8 border-t border-inverted-foreground/30 pt-6">
          <div>
            <p className="font-semibold">ESTT · ESGT</p>
            <p className="text-sm">Escolas Superiores</p>
          </div>
          <div>
            <p className="font-semibold">Campus Tomar</p>
            <p className="text-sm">Quinta do Contador</p>
          </div>
        </div>
      </section>

      {/* Form panel */}
      <main className="bg-panel flex min-w-0 flex-col justify-center px-4 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="bg-brand text-brand-foreground font-heading flex size-12 items-center justify-center rounded-lg text-sm font-extrabold"
              >
                IPT
              </span>
              <div className="leading-tight">
                <p className="text-primary text-xs font-semibold tracking-wide uppercase">
                  UniPortal
                </p>
                <p className="text-heading font-semibold">Instituto Politécnico de Tomar</p>
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Entrar no UniPortal</h1>
              <p className="text-foreground">Use o seu email institucional (@ipt.pt).</p>
            </div>
          </div>

          <Card className="py-0">
            <CardContent className="p-6 sm:p-8">
              <LoginForm action={action} />
            </CardContent>
          </Card>

          <Link
            href="/"
            className="text-primary flex items-center justify-center gap-2 font-semibold hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar ao Portal Público
          </Link>

          <Separator />
          <p className="text-foreground text-center text-sm">
            Problemas no acesso? <span className="text-primary font-medium">ci@ipt.pt</span> · Tel.
            +351 249 328 100
          </p>
        </div>
      </main>
    </div>
  )
}
