import Link from "next/link"
import { Lock, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BrandLogo } from "./brand-logo"

export type NavLink = { label: string; href: string }

const DEFAULT_LINKS: NavLink[] = [
  { label: "Notícias & Comunicados", href: "/#noticias" },
  { label: "Eventos", href: "/#eventos" },
  { label: "Newsletter", href: "/#newsletter" },
  { label: "Viver no IPT", href: "/#viver" },
  { label: "Denúncias", href: "/denuncias" },
]

/** Top bar of the public site. On mobile the links move into a side sheet. */
export function PublicHeader({ links = DEFAULT_LINKS }: { links?: NavLink[] }) {
  return (
    <header className="bg-panel/95 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4">
        <BrandLogo />

        <nav aria-label="Navegação principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Button asChild variant="ghost" size="sm">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild size="sm" className="ml-auto lg:ml-2">
          <Link href="/login">
            <Lock aria-hidden="true" />
            Área Reservada
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="size-10 lg:hidden" aria-label="Abrir menu">
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">Navegação do site público</SheetDescription>
            </SheetHeader>
            <nav aria-label="Navegação principal (telemóvel)" className="px-4">
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
