import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { BrandLogo } from "./brand-logo"

const USEFUL_LINKS = [
  "Escola Superior de Tecnologia de Tomar",
  "Escola Superior de Gestão de Tomar",
  "Escola Superior de Tecnologia de Abrantes",
  "Serviços de Ação Social (SAS IPT)",
]

/** Footer of the public site. Contact data is example data. */
export function PublicFooter() {
  return (
    <footer className="bg-panel mt-16 border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <BrandLogo subtitle="Politécnico de Tomar" />
          <p className="text-muted-foreground text-sm">
            Uma instituição de ensino superior público de referência, orientada para a
            qualificação de pessoas, inovação e desenvolvimento regional.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="text-heading text-sm font-semibold tracking-wide uppercase">
            Campus principal
          </h2>
          <address className="text-muted-foreground space-y-1 not-italic">
            <p>Estrada da Serra, Quinta do Contador</p>
            <p>2300-313 Tomar, Portugal</p>
            <p>Tel.: +351 249 328 100</p>
            <p>Email: geral@ipt.pt</p>
          </address>
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="text-heading text-sm font-semibold tracking-wide uppercase">
            Ligações úteis
          </h2>
          <ul className="text-muted-foreground space-y-1">
            {USEFUL_LINKS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <h2 className="text-heading text-sm font-semibold tracking-wide uppercase">
            Acesso privado
          </h2>
          <p className="text-muted-foreground">
            Se é estudante ou colaborador, use a sua conta institucional para aceder ao UniPortal.
          </p>
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Autenticação institucional IPT →
          </Link>
        </div>
      </div>
      <Separator />
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:justify-between">
        <p>© 2026 Instituto Politécnico de Tomar. Todos os direitos reservados.</p>
        <p className="flex gap-4">
          <span>Privacidade & RGPD</span>
          <span>Acessibilidade</span>
        </p>
      </div>
    </footer>
  )
}
