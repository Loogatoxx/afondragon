import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CabecalhoPagina } from "@/components/comuns/cabecalho-pagina";
import { EstadoVazio } from "@/components/comuns/estado-vazio";
import { ACarregar } from "@/components/comuns/a-carregar";
import { MensagemErro } from "@/components/comuns/mensagem-erro";

export const metadata: Metadata = {
  title: "Design System — Plataforma PI2",
};

const cores = [
  { nome: "primary", classe: "bg-primary", texto: "text-primary-foreground" },
  { nome: "secondary", classe: "bg-secondary", texto: "text-secondary-foreground" },
  { nome: "muted", classe: "bg-muted", texto: "text-muted-foreground" },
  { nome: "accent", classe: "bg-accent", texto: "text-accent-foreground" },
  { nome: "destructive", classe: "bg-destructive", texto: "text-destructive-foreground" },
  { nome: "sucesso", classe: "bg-sucesso", texto: "text-sucesso-foreground" },
  { nome: "aviso", classe: "bg-aviso", texto: "text-aviso-foreground" },
  { nome: "card", classe: "bg-card border", texto: "text-card-foreground" },
];

function Seccao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{titulo}</h2>
      {children}
    </section>
  );
}

export default function DesignSystem() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 p-4 sm:p-8">
      <CabecalhoPagina
        titulo="Design System"
        descricao="Componentes partilhados por todos os grupos. Usar só o que está nesta página."
      />

      <Seccao titulo="Cores (variáveis em app/globals.css)">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cores.map((c) => (
            <div
              key={c.nome}
              className={`${c.classe} ${c.texto} flex h-20 items-end rounded-lg p-3 text-sm font-medium`}
            >
              {c.nome}
            </div>
          ))}
        </div>
      </Seccao>

      <Seccao titulo="Botões">
        <div className="flex flex-wrap gap-3">
          <Button>Principal</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Contorno</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="destructive">Apagar</Button>
          <Button variant="link">Ligação</Button>
          <Button disabled>Desativado</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Pequeno</Button>
          <Button>Normal</Button>
          <Button size="lg">Grande</Button>
        </div>
      </Seccao>

      <Seccao titulo="Formulário (exemplo de login)">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Use o seu email institucional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ds-email">Email</Label>
              <Input id="ds-email" type="email" placeholder="nome@ipt.pt" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ds-pass">Palavra-passe</Label>
              <Input id="ds-pass" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ds-erro">Campo com erro</Label>
              <Input id="ds-erro" aria-invalid="true" aria-describedby="ds-erro-msg" defaultValue="valor inválido" />
              <p id="ds-erro-msg" className="text-destructive text-sm">
                Este campo é obrigatório.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Entrar</Button>
          </CardFooter>
        </Card>
      </Seccao>

      <Seccao titulo="Estados obrigatórios: vazio, a carregar, erro">
        <div className="grid gap-4 md:grid-cols-3">
          <EstadoVazio
            titulo="Sem contratos"
            descricao="Ainda não criou nenhum contrato."
            acao={<Button size="sm">Criar contrato</Button>}
          />
          <ACarregar />
          <MensagemErro acao={<Button size="sm" variant="outline">Tentar novamente</Button>} />
        </div>
      </Seccao>
    </main>
  );
}
