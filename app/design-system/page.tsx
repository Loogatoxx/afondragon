import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, Info, Pencil, Search, Tag, Trash2, TriangleAlert, CircleAlert, Palette } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import { CabecalhoPagina } from "@/components/common/cabecalho-pagina";
import { EstadoVazio } from "@/components/common/estado-vazio";
import { ACarregar } from "@/components/common/a-carregar";
import { MensagemErro } from "@/components/common/mensagem-erro";
import { ExemploDialog, ExemploSelect } from "./exemplos-interativos";
import { ExemploTabela } from "./exemplo-tabela";

export const metadata: Metadata = {
  title: "Design System — Plataforma PI2",
};

const cores = [
  { nome: "primary", valor: "#416800", classe: "bg-primary text-primary-foreground" },
  { nome: "brand", valor: "#74B816", classe: "bg-brand text-brand-foreground" },
  { nome: "brand-light", valor: "#D5F5A6", classe: "bg-brand-light text-heading" },
  { nome: "inverted", valor: "#292D30", classe: "bg-inverted text-inverted-foreground" },
  { nome: "secondary", valor: "#E5E7E9", classe: "bg-secondary text-secondary-foreground" },
  { nome: "card", valor: "#ECEDEF", classe: "bg-card text-card-foreground border border-input" },
  { nome: "panel", valor: "#F4F6F8", classe: "bg-panel text-foreground border border-input" },
  { nome: "background", valor: "#D9DADB", classe: "bg-background text-foreground border border-input" },
  { nome: "success", valor: "#267647", classe: "bg-success text-success-foreground" },
  { nome: "warning", valor: "#E6A23C", classe: "bg-warning text-warning-foreground" },
  { nome: "destructive", valor: "#C91F26", classe: "bg-destructive text-destructive-foreground" },
  { nome: "info", valor: "#0369A1", classe: "bg-info text-info-foreground" },
];

function Seccao({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-panel space-y-4 rounded-lg border p-4 sm:p-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">{titulo}</h2>
        {descricao && <p className="text-muted-foreground">{descricao}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystem() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-8">
      <div className="space-y-4">
        <Badge>Design System</Badge>
        <CabecalhoPagina
          titulo="Componentes da Plataforma PI2"
          descricao="Tudo o que os grupos precisam para montar ecrãs. Usar só o que está nesta página."
          className="border-input"
        />
      </div>

      <Seccao
        titulo="Cores"
        descricao="Definidas em app/globals.css. Usar o nome da classe (ex.: bg-primary), nunca o código hexadecimal."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cores.map((c) => (
            <div
              key={c.nome}
              className={`${c.classe} flex h-24 flex-col justify-end rounded-md p-3 text-sm`}
            >
              <span className="font-semibold">{c.nome}</span>
              <span className="font-mono text-xs">{c.valor}</span>
            </div>
          ))}
        </div>
      </Seccao>

      <Seccao titulo="Painel principal" descricao="Exemplo de componentes estruturados com base nos tokens.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Campos de entrada</CardTitle>
              <CardDescription>Cada campo tem sempre um Label.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ds-pesquisa">Pesquisa</Label>
                <Input id="ds-pesquisa" type="search" placeholder="Escreve aqui…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds-erro">Campo com erro</Label>
                <Input
                  id="ds-erro"
                  aria-invalid="true"
                  aria-describedby="ds-erro-msg"
                  defaultValue="valor inválido"
                />
                <p id="ds-erro-msg" className="text-destructive text-sm">
                  Este campo é obrigatório.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Search aria-hidden="true" />
                Pesquisar
              </Button>
            </CardFooter>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>Botões</CardTitle>
              <CardDescription>Um só botão principal por ecrã.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button>Principal</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="inverted">Invertido</Button>
                <Button variant="outline">Contorno</Button>
                <Button variant="ghost">Discreto</Button>
                <Button variant="link">Ligação</Button>
                <Button disabled>Desativado</Button>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  Botões de ícone (precisam sempre de aria-label):
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="icon" variant="info" aria-label="Editar">
                    <Pencil aria-hidden="true" />
                  </Button>
                  <Button size="icon" aria-label="Design">
                    <Palette aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="inverted" aria-label="Etiquetar">
                    <Tag aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="destructive" aria-label="Eliminar">
                    <Trash2 aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Pequeno</Button>
                <Button>Normal</Button>
                <Button size="lg">Grande</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Alertas e etiquetas</CardTitle>
              <CardDescription>Cores semânticas para estados.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="success">
                <CircleCheck aria-hidden="true" />
                <AlertTitle>Sucesso</AlertTitle>
                <AlertDescription>Contrato guardado.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <TriangleAlert aria-hidden="true" />
                <AlertTitle>Aviso</AlertTitle>
                <AlertDescription>O contrato expira em 5 dias.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <CircleAlert aria-hidden="true" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>Não foi possível guardar.</AlertDescription>
              </Alert>
              <Alert variant="info">
                <Info aria-hidden="true" />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>Há uma nova versão disponível.</AlertDescription>
              </Alert>
              <div className="flex flex-wrap gap-2">
                <Badge>Novo</Badge>
                <Badge variant="success">Ativo</Badge>
                <Badge variant="warning">Pendente</Badge>
                <Badge variant="destructive">Expirado</Badge>
                <Badge variant="info">Rascunho</Badge>
                <Badge variant="outline">Arquivado</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </Seccao>

      <Seccao
        titulo="Seleção, diálogos e menu (Aula 2)"
        descricao="Todos funcionam só com teclado: Tab, setas, Enter e Esc."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Escolher uma opção de uma lista.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExemploSelect />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Confirmar ações ou formulários curtos.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExemploDialog />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ecrãs de exemplo</CardTitle>
              <CardDescription>Portal (menu, cabeçalho e sino), login e notícias com carrossel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/design-system/menu">Ver exemplo do portal</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/design-system/login">Ver exemplo de login</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/design-system/noticias">Ver exemplo de notícias</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Seccao>

      <Seccao
        titulo="Dados: tabela, etiquetas e separadores (Aula 3)"
        descricao="Um ecrã de lista completo. Mude de separador para ver os quatro estados."
      >
        <ExemploTabela />
      </Seccao>

      <Seccao
        titulo="Estados obrigatórios"
        descricao="Todos os ecrãs com dados mostram: vazio, a carregar e erro."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <EstadoVazio
            titulo="Sem contratos"
            descricao="Ainda não criou nenhum contrato."
            acao={<Button size="sm">Criar contrato</Button>}
          />
          <ACarregar />
          <MensagemErro
            acao={
              <Button size="sm" variant="outline">
                Tentar novamente
              </Button>
            }
          />
        </div>
      </Seccao>
    </main>
  );
}
