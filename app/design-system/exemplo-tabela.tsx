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
import { ACarregar } from "@/components/comuns/a-carregar";
import { EstadoVazio } from "@/components/comuns/estado-vazio";
import { MensagemErro } from "@/components/comuns/mensagem-erro";

// Dados inventados, só para o exemplo.
const pedidos = [
  { numero: "2026-0142", tipo: "Declaração de matrícula", data: "12/10/2026", estado: "Concluído" },
  { numero: "2026-0157", tipo: "Certificado de notas", data: "13/10/2026", estado: "Pendente" },
  { numero: "2026-0163", tipo: "Mudança de turma", data: "14/10/2026", estado: "Recusado" },
  { numero: "2026-0170", tipo: "Cartão de estudante", data: "15/10/2026", estado: "Rascunho" },
] as const;

const varianteDoEstado = {
  Concluído: "sucesso",
  Pendente: "aviso",
  Recusado: "destructive",
  Rascunho: "outline",
} as const;

/** Um ecrã de lista com os 4 estados: com dados, vazio, a carregar e erro. */
export function ExemploTabela() {
  return (
    <Tabs defaultValue="dados">
      <TabsList aria-label="Estado da lista de exemplo">
        <TabsTrigger value="dados">Com dados</TabsTrigger>
        <TabsTrigger value="vazio">Vazio</TabsTrigger>
        <TabsTrigger value="carregar">A carregar</TabsTrigger>
        <TabsTrigger value="erro">Erro</TabsTrigger>
      </TabsList>

      <TabsContent value="dados">
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
              {pedidos.map((p) => (
                <TableRow key={p.numero}>
                  <TableCell className="font-mono">{p.numero}</TableCell>
                  <TableCell>{p.tipo}</TableCell>
                  <TableCell>{p.data}</TableCell>
                  <TableCell>
                    <Badge variant={varianteDoEstado[p.estado]}>{p.estado}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" size="sm" aria-label={`Ver pedido ${p.numero}`}>
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="vazio">
        <EstadoVazio
          titulo="Ainda não fez pedidos"
          descricao="Os pedidos à secretaria aparecem aqui."
          acao={<Button size="sm">Novo pedido</Button>}
        />
      </TabsContent>

      <TabsContent value="carregar">
        <ACarregar variante="linhas" linhas={4} texto="A carregar pedidos…" />
      </TabsContent>

      <TabsContent value="erro">
        <MensagemErro
          mensagem="Não foi possível carregar os pedidos. Verifique a ligação e tente novamente."
          acao={
            <Button size="sm" variant="outline">
              Tentar novamente
            </Button>
          }
        />
      </TabsContent>
    </Tabs>
  );
}
