"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorMessage } from "@/components/common/error-message";
import { LoadingState } from "@/components/common/loading-state";
import { STATUS_VARIANT, type SecretariatRequest } from "../data";

type RequestsTableProps = {
  requests: SecretariatRequest[];
  /** Show the "Serviço" column (full secretariat page) */
  showService?: boolean;
  /** Show the 4-state tabs, as a live example of the mandatory states */
  showStateTabs?: boolean;
};

/** Requests list with a details dialog. */
export function RequestsTable({ requests, showService = false, showStateTabs = true }: RequestsTableProps) {
  const table = (
    <div className="bg-card rounded-lg border">
      <Table>
        <TableCaption className="mb-4">Pedidos à secretaria (exemplo).</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Pedido</TableHead>
            {showService && <TableHead>Serviço</TableHead>}
            <TableHead>Data</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((r) => (
            <TableRow key={r.number}>
              <TableCell className="font-mono">{r.number}</TableCell>
              <TableCell>{r.title}</TableCell>
              {showService && <TableCell className="text-muted-foreground">{r.service}</TableCell>}
              <TableCell>{r.date}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <RequestDetails request={r} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  if (!showStateTabs) {
    return requests.length === 0 ? <EmptyState title="Ainda não fez pedidos" /> : table;
  }

  return (
    <Tabs defaultValue="data">
      <TabsList aria-label="Estado da lista (exemplo)">
        <TabsTrigger value="data">Com dados</TabsTrigger>
        <TabsTrigger value="empty">Vazio</TabsTrigger>
        <TabsTrigger value="loading">A carregar</TabsTrigger>
        <TabsTrigger value="error">Erro</TabsTrigger>
      </TabsList>
      <TabsContent value="data">{table}</TabsContent>
      <TabsContent value="empty">
        <EmptyState title="Ainda não fez pedidos" description="Os pedidos à secretaria aparecem aqui." />
      </TabsContent>
      <TabsContent value="loading">
        <LoadingState variant="rows" rows={4} label="A carregar pedidos…" />
      </TabsContent>
      <TabsContent value="error">
        <ErrorMessage message="Não foi possível carregar os pedidos. Verifique a ligação e tente novamente." />
      </TabsContent>
    </Tabs>
  );
}

function RequestDetails({ request }: { request: SecretariatRequest }) {
  const editable = request.status === "Rascunho";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" aria-label={`${editable ? "Editar" : "Ver"} pedido ${request.number}`}>
          {editable ? "Editar" : "Ver"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido {request.number}</DialogTitle>
          <DialogDescription>{request.title}</DialogDescription>
        </DialogHeader>
        <dl className="grid grid-cols-3 gap-3 text-sm">
          <dt className="text-muted-foreground">Serviço</dt>
          <dd className="col-span-2">{request.service}</dd>
          <dt className="text-muted-foreground">Data</dt>
          <dd className="col-span-2">{request.date}</dd>
          <dt className="text-muted-foreground">Estado</dt>
          <dd className="col-span-2">
            <Badge variant={STATUS_VARIANT[request.status]}>{request.status}</Badge>
          </dd>
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
