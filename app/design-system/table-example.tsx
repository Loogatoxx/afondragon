import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

// Made-up data, for the example only.
const requests = [
  { number: "2026-0142", type: "Declaração de matrícula", date: "12/10/2026", status: "Concluído" },
  { number: "2026-0157", type: "Certificado de notas", date: "13/10/2026", status: "Pendente" },
  { number: "2026-0163", type: "Mudança de turma", date: "14/10/2026", status: "Recusado" },
  { number: "2026-0170", type: "Cartão de estudante", date: "15/10/2026", status: "Rascunho" },
] as const;

const statusVariant = {
  Concluído: "success",
  Pendente: "warning",
  Recusado: "destructive",
  Rascunho: "outline",
} as const;

/** A list screen with the 4 states: with data, empty, loading and error. */
export function TableExample() {
  return (
    <Tabs defaultValue="data">
      <TabsList aria-label="Estado da lista de exemplo">
        <TabsTrigger value="data">Com dados</TabsTrigger>
        <TabsTrigger value="empty">Vazio</TabsTrigger>
        <TabsTrigger value="loading">A carregar</TabsTrigger>
        <TabsTrigger value="error">Erro</TabsTrigger>
      </TabsList>

      <TabsContent value="data">
        <div className="bg-card rounded-lg border">
          <Table>
            <TableCaption className="mb-4">Pedidos à secretaria (exemplo).</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((r) => (
                <TableRow key={r.number}>
                  <TableCell className="font-mono">{r.number}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" size="sm" aria-label={`Ver pedido ${r.number}`}>
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="empty">
        <EmptyState
          title="Ainda não fez pedidos"
          description="Os pedidos à secretaria aparecem aqui."
          action={<Button size="sm">Novo pedido</Button>}
        />
      </TabsContent>

      <TabsContent value="loading">
        <LoadingState variant="rows" rows={4} label="A carregar pedidos…" />
      </TabsContent>

      <TabsContent value="error">
        <ErrorMessage
          message="Não foi possível carregar os pedidos. Verifique a ligação e tente novamente."
          action={
            <Button size="sm" variant="outline">
              Tentar novamente
            </Button>
          }
        />
      </TabsContent>
    </Tabs>
  );
}
