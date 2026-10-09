"use client";

import { useId, useState } from "react";
import {
  BookOpen,
  CircleCheck,
  ClipboardList,
  CreditCard,
  Download,
  FileText,
  MapPin,
  Plus,
  Video,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/common/page-header";
import { CERTIFICATES, REQUEST_TYPES, REQUESTS, type SecretariatRequest } from "../data";
import { RequestsTable } from "./requests-table";

/** Virtual secretariat screen (G5). Example: changes live only in this page. */
export function SecretariatView() {
  const [requests, setRequests] = useState<SecretariatRequest[]>(REQUESTS);
  const active = requests.filter((r) => r.status === "Pendente").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Secretaria Virtual do IPT"
        description="Requerimentos, certidões com assinatura digital, pedidos de equivalência e consulta do estado dos processos."
        actions={
          <>
            <DeadlinesDialog />
            <NewRequestDialog
              onCreate={(title) =>
                setRequests((list) => [
                  {
                    number: `2026-0${190 + list.length}`,
                    title,
                    service: "Serviços Académicos",
                    date: new Date().toLocaleDateString("pt-PT"),
                    status: "Pendente",
                  },
                  ...list,
                ])
              }
            />
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Requerimentos ativos" value={String(active)} icon={ClipboardList}>
          <Badge variant="warning">{active} em análise</Badge>
          <p className="text-muted-foreground mt-2 text-sm">Tempo médio de resposta: 48h úteis</p>
        </StatCard>
        <StatCard label="Concluídos (2025/2026)" value="8" icon={CircleCheck}>
          <Badge variant="success">100% digital</Badge>
          <p className="text-muted-foreground mt-2 text-sm">Última certidão emitida há 3 dias</p>
        </StatCard>
        <StatCard label="Propinas & mensalidades" value="Em dia" icon={CreditCard}>
          <p className="text-muted-foreground text-sm">Próxima prestação: 30 nov</p>
          <p className="text-muted-foreground mt-2 font-mono text-sm">Ref. 218 942 018 (MB)</p>
        </StatCard>
      </div>

      <section aria-labelledby="requests-title" className="bg-panel space-y-4 rounded-xl border p-4 sm:p-6">
        <div>
          <h2 id="requests-title" className="text-2xl font-semibold">
            Pedidos e requerimentos submetidos
          </h2>
          <p className="text-muted-foreground text-sm">Acompanhe o estado de cada pedido.</p>
        </div>
        <RequestsTable requests={requests} showService />
      </section>

      <section aria-labelledby="certificates-title" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="certificates-title" className="text-2xl font-semibold">
              Certidões imediatas digitais
            </h2>
            <p className="text-foreground text-sm">
              Documentos autenticados com código QR de validação.
            </p>
          </div>
          <Badge variant="success">Assinatura Gov.pt</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {CERTIFICATES.map((c) => (
            <CertificateCard key={c.id} title={c.title} description={c.description} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin aria-hidden="true" className="text-primary size-5" />
              Atendimento presencial · Edifício Central
            </CardTitle>
            <CardDescription>Campus da Quinta do Contador, Estrada da Serra, Tomar</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="bg-panel grid grid-cols-2 gap-2 rounded-md p-4 text-sm">
              <dt>Segunda a sexta</dt>
              <dd className="text-right font-medium">09h30–12h30 · 14h00–16h30</dd>
              <dt>Telefone</dt>
              <dd className="text-right font-mono">+351 249 328 100</dd>
              <dt>Email</dt>
              <dd className="text-primary text-right font-mono">academicos@ipt.pt</dd>
            </dl>
          </CardContent>
        </Card>
        <VirtualDeskCard />
      </div>
    </div>
  );
}

function StatCard({
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
    <Card className="gap-3">
      <CardHeader className="flex items-start justify-between gap-2">
        <div>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">{label}</p>
          <p className="font-heading text-heading mt-1 text-3xl font-bold">{value}</p>
        </div>
        <span className="bg-brand-light text-primary flex size-10 items-center justify-center rounded-md">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function CertificateCard({ title, description }: { title: string; description: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  return (
    <Card>
      <CardHeader>
        <FileText aria-hidden="true" className="text-primary size-6" />
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex items-center justify-between gap-2">
        <Badge variant="success">Gratuita</Badge>
        <Button
          size="sm"
          disabled={state === "busy"}
          aria-live="polite"
          onClick={() => {
            setState("busy");
            setTimeout(() => setState("done"), 900);
          }}
        >
          {state === "busy" ? (
            <Spinner role="presentation" aria-hidden="true" />
          ) : state === "done" ? (
            <CircleCheck aria-hidden="true" />
          ) : (
            <Download aria-hidden="true" />
          )}
          {state === "done" ? "Emitida" : state === "busy" ? "A emitir…" : "Emitir PDF"}
        </Button>
      </CardContent>
    </Card>
  );
}

function VirtualDeskCard() {
  const [ticket, setTicket] = useState<string>();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Video aria-hidden="true" className="text-info size-5" />
          Balcão virtual por videoconferência
        </CardTitle>
        <CardDescription>Atendimento individual com os Serviços Académicos.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          Tire uma senha virtual e seja atendido sem se deslocar ao campus. Próxima vaga estimada:{" "}
          <strong>12 minutos</strong>.
        </p>
        {ticket && (
          <Alert variant="success" aria-live="polite">
            <CircleCheck aria-hidden="true" />
            <AlertTitle>Senha {ticket}</AlertTitle>
            <AlertDescription>Recebe a ligação para a videochamada quando chegar a sua vez.</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setTicket(`V-${Math.floor(100 + Math.random() * 900)}`)} disabled={!!ticket}>
            Tirar senha virtual
          </Button>
          <Button variant="secondary">Agendar sessão</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DeadlinesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BookOpen aria-hidden="true" />
          Guia de emolumentos & prazos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Emolumentos e prazos</DialogTitle>
          <DialogDescription>Valores de exemplo para o ano letivo 2026/2027.</DialogDescription>
        </DialogHeader>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt>Declaração de matrícula</dt>
          <dd className="text-right">Gratuita · imediata</dd>
          <dt>Certificado de notas</dt>
          <dd className="text-right">€ 10,00 · 3 dias úteis</dd>
          <dt>Pedido de equivalência</dt>
          <dd className="text-right">€ 25,00 · 30 dias</dd>
          <dt>Cartão de estudante (2.ª via)</dt>
          <dd className="text-right">€ 8,00 · 5 dias úteis</dd>
        </dl>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NewRequestDialog({ onCreate }: { onCreate: (title: string) => void }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>();
  const [error, setError] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setType(undefined);
          setError(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus aria-hidden="true" />
          Novo pedido
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo pedido / requerimento</DialogTitle>
          <DialogDescription>O pedido fica pendente até ser analisado pelos serviços.</DialogDescription>
        </DialogHeader>
        <form
          id={`${id}-form`}
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!type) {
              setError(true);
              return;
            }
            onCreate(type);
            setOpen(false);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor={`${id}-type`}>Tipo de pedido</Label>
            <Select
              value={type}
              onValueChange={(v) => {
                setType(v);
                setError(false);
              }}
            >
              <SelectTrigger
                id={`${id}-type`}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-type-error` : undefined}
              >
                <SelectValue placeholder="Escolha o tipo de pedido" />
              </SelectTrigger>
              <SelectContent>
                {REQUEST_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p id={`${id}-type-error`} className="text-destructive text-sm">
                Escolha o tipo de pedido.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-notes`}>Observações (opcional)</Label>
            <Textarea id={`${id}-notes`} className="min-h-24" />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form={`${id}-form`}>
            Submeter pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
