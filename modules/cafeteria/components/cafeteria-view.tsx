"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  Apple,
  CircleAlert,
  Beef,
  CircleCheck,
  Fish,
  Leaf,
  QrCode,
  ShoppingCart,
  Soup,
  Tag,
  Ticket,
  Timer,
  Wallet,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/common/page-header";
import { SegmentedControl } from "@/components/common/segmented-control";
import {
  CATEGORY_LABELS,
  HISTORY,
  MENUS,
  PRICES,
  TODAY_KEY,
  WEEK,
  euros,
  type MenuCategory,
  type TicketEntry,
} from "../data";

type DayKey = (typeof WEEK)[number]["key"];

const CATEGORY_ICON: Record<MenuCategory, React.ComponentType<{ className?: string }>> = {
  soup: Soup,
  fish: Fish,
  meat: Beef,
  vegan: Leaf,
  dessert: Apple,
};

const STATUS_VARIANT = { Disponível: "success", Agendada: "warning", Consumida: "outline" } as const;

/** Cafeteria screen (G5). Example: balance and tickets change only in this page. */
export function CafeteriaView() {
  const [balance, setBalance] = useState(14.5);
  const [history, setHistory] = useState<TicketEntry[]>(HISTORY);
  const [day, setDay] = useState<DayKey>(TODAY_KEY);
  const [message, setMessage] = useState<{ tone: "success" | "destructive"; text: string }>();
  const tickets = history.filter((h) => h.status !== "Consumida").length;
  const dayLabel = WEEK.find((d) => d.key === day)?.label ?? "";

  function book(meal: "Almoço" | "Jantar", dayKey: DayKey) {
    const label = WEEK.find((d) => d.key === dayKey)?.label ?? "";
    if (balance < PRICES.student) {
      setMessage({ tone: "destructive", text: "Saldo insuficiente. Carregue o cartão para marcar a refeição." });
      return;
    }
    setBalance((b) => Math.round((b - PRICES.student) * 100) / 100);
    setHistory((list) => [
      {
        code: `#IPT-${90000 + list.length}`,
        when: `${label} · ${meal === "Almoço" ? "12:00" : "19:30"}`,
        meal: `${meal} central`,
        choice: "A escolher no balcão",
        price: PRICES.student,
        status: "Agendada",
      },
      ...list,
    ]);
    setMessage({ tone: "success", text: `${meal} de ${label} marcado. Foram descontados ${euros(PRICES.student)}.` });
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Refeitório do Campus IPT"
        description="Consulte a ementa semanal, marque refeições com antecedência e acompanhe o saldo do cartão."
        actions={
          <>
            <ActiveTicketDialog />
            <TopUpDialog onTopUp={(amount) => setBalance((b) => b + amount)} />
          </>
        }
      />

      {message && (
        <Alert variant={message.tone} aria-live="polite">
          {message.tone === "success" ? <CircleCheck aria-hidden="true" /> : <CircleAlert aria-hidden="true" />}
          <AlertTitle>{message.tone === "success" ? "Refeição marcada" : "Não foi possível marcar"}</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Saldo do cartão" icon={Wallet} value={euros(balance)}>
          Suficiente para {Math.floor(balance / PRICES.student)} refeições sociais
        </Stat>
        <Stat label="Senhas reservadas" icon={Ticket} value={`${tickets} senhas`}>
          Disponíveis ou agendadas
        </Stat>
        <Stat label="Fila em tempo real" icon={Timer} value="5–8 min">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="bg-success size-2 rounded-full" />
            Fluxo normal
          </span>
        </Stat>
        <Stat label="Tabela SAS-IPT" icon={Tag} value={euros(PRICES.student)}>
          Estudante · docente/técnico {euros(PRICES.staff)}
        </Stat>
      </div>

      <section aria-labelledby="menu-title" className="bg-panel space-y-6 rounded-xl border p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge>Semana letiva · 12 a 16 de outubro</Badge>
            <h2 id="menu-title" className="mt-2 text-2xl font-semibold">
              Ementa das cantinas & Refeitório Central
            </h2>
          </div>
          <SegmentedControl<DayKey>
            label="Dia da ementa"
            value={day}
            onValueChange={setDay}
            options={WEEK.map((d) => ({
              value: d.key,
              label: d.label,
              srHint: d.key === TODAY_KEY ? "(hoje)" : undefined,
            }))}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <figure className="relative aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src="/images/refeitorio-prato.webp"
                alt="Tabuleiro com filete de pescada, legumes, quinoa, sopa e fruta"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <figcaption className="bg-overlay/80 text-inverted-foreground absolute inset-x-0 bottom-0 p-4">
                <span className="text-brand-light text-xs font-semibold tracking-wide uppercase">
                  Sugestão do chef
                </span>
                <span className="font-heading block text-lg font-semibold">
                  Filete de pescada grelhado com legumes e quinoa
                </span>
              </figcaption>
            </figure>
            <dl className="bg-card grid grid-cols-4 rounded-lg border p-3 text-center text-sm">
              {[
                ["Calorias", "540 kcal"],
                ["Proteína", "38 g"],
                ["Hidratos", "46 g"],
                ["Lípidos", "12 g"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted-foreground text-xs uppercase">{k}</dt>
                  <dd className="text-heading font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <ul className="space-y-3" aria-label={`Ementa de ${dayLabel}`}>
              {MENUS[day].map((item) => {
                const Icon = CATEGORY_ICON[item.category];
                return (
                  <li key={item.category} className="bg-card flex gap-3 rounded-lg border p-4">
                    <span className="bg-panel text-primary flex size-10 shrink-0 items-center justify-center rounded-md">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-primary text-xs font-semibold tracking-wide uppercase">
                          {CATEGORY_LABELS[item.category]}
                        </p>
                        <span className="flex gap-1">
                          {item.tags.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </span>
                      </div>
                      <p className="text-heading font-semibold">{item.name}</p>
                      <p className="text-muted-foreground text-sm">{item.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <p className="text-foreground text-sm sm:mr-auto">Reserva até às 11h30 do próprio dia.</p>
              <Button variant="secondary" onClick={() => book("Jantar", day)}>
                Marcar jantar ({euros(PRICES.student)})
              </Button>
              <Button onClick={() => book("Almoço", day)}>
                <ShoppingCart aria-hidden="true" />
                Marcar almoço ({euros(PRICES.student)})
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="history-title" className="bg-panel space-y-4 rounded-xl border p-4 sm:p-6">
        <div>
          <h2 id="history-title" className="text-2xl font-semibold">
            Histórico de senhas & consumos
          </h2>
          <p className="text-muted-foreground text-sm">Movimentos registados na plataforma SAS-IPT.</p>
        </div>
        <div className="bg-card rounded-lg border">
          <Table>
            <TableCaption className="mb-4">Últimos movimentos (exemplo).</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Data e hora</TableHead>
                <TableHead>Refeição</TableHead>
                <TableHead>Menu</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((h) => (
                <TableRow key={h.code}>
                  <TableCell className="font-mono">{h.code}</TableCell>
                  <TableCell>{h.when}</TableCell>
                  <TableCell>{h.meal}</TableCell>
                  <TableCell>{h.choice}</TableCell>
                  <TableCell className="text-right">{euros(h.price)}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[h.status]}>{h.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  children,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Card className="gap-2">
      <CardHeader className="flex items-start justify-between gap-2">
        <CardDescription className="text-xs font-semibold tracking-wide uppercase">{label}</CardDescription>
        <span className="bg-brand-light text-primary flex size-9 items-center justify-center rounded-md">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-3xl font-bold" aria-live="polite">
          {value}
        </CardTitle>
        <p className="text-muted-foreground mt-1 text-sm">{children}</p>
      </CardContent>
    </Card>
  );
}

function ActiveTicketDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <QrCode aria-hidden="true" />
          Senha ativa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Código de validação</DialogTitle>
          <DialogDescription>Mostre este código no leitor à entrada do refeitório.</DialogDescription>
        </DialogHeader>
        <div className="bg-card flex flex-col items-center gap-3 rounded-lg border p-6">
          <QrCode aria-hidden="true" className="text-heading size-40" />
          <p className="font-mono text-lg font-semibold">#IPT-89241</p>
          <p className="text-muted-foreground text-sm">Almoço central · hoje, 13 de outubro</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function TopUpDialog({ onTopUp }: { onTopUp: (amount: number) => void }) {
  const id = useId();
  const [amount, setAmount] = useState("10");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Wallet aria-hidden="true" />
          Carregar saldo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Carregar saldo do cartão</DialogTitle>
          <DialogDescription>Pagamento por MB Way ou referência Multibanco (exemplo).</DialogDescription>
        </DialogHeader>
        <RadioGroup value={amount} onValueChange={setAmount} aria-label="Valor a carregar" className="grid-cols-3">
          {["5", "10", "20"].map((v) => (
            <Label
              key={v}
              htmlFor={`${id}-${v}`}
              className="bg-card has-data-[state=checked]:border-primary flex cursor-pointer items-center gap-3 rounded-lg border p-4"
            >
              <RadioGroupItem id={`${id}-${v}`} value={v} />
              {euros(Number(v))}
            </Label>
          ))}
        </RadioGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => {
              onTopUp(Number(amount));
              setOpen(false);
            }}
          >
            Carregar {euros(Number(amount))}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
