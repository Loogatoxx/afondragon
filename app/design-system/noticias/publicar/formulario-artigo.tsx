"use client";

import { useEffect, useId, useState } from "react";
import { CircleCheck, ImagePlus } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { CartaoArtigo } from "@/components/common/news/cartao-artigo";
import type { Artigo } from "@/components/common/news/tipos";
import { CATEGORIAS } from "../dados";

type Erros = Partial<Record<"titulo" | "resumo" | "corpo" | "categoria" | "imagem" | "alt", string>>;

const TIPOS_IMAGEM = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;

/**
 * EXAMPLE of the publishing form. Validates and shows a live preview,
 * but saves NOTHING: storing the article and the image is the module's job.
 */
export function FormularioArtigo() {
  const id = useId();
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [categoria, setCategoria] = useState<string>();
  const [alt, setAlt] = useState("");
  const [destaque, setDestaque] = useState(false);
  const [imagem, setImagem] = useState<string>("");
  const [erros, setErros] = useState<Erros>({});
  const [aPublicar, setAPublicar] = useState(false);
  const [publicado, setPublicado] = useState(false);

  // Free the preview object URL when the image changes.
  useEffect(() => () => void (imagem && URL.revokeObjectURL(imagem)), [imagem]);

  function escolherImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const ficheiro = e.target.files?.[0];
    if (!ficheiro) return;
    if (!TIPOS_IMAGEM.includes(ficheiro.type)) {
      setErros((x) => ({ ...x, imagem: "Escolha uma imagem JPG, PNG ou WebP." }));
      return;
    }
    if (ficheiro.size > MAX_MB * 1024 * 1024) {
      setErros((x) => ({ ...x, imagem: `A imagem tem mais de ${MAX_MB} MB.` }));
      return;
    }
    setErros((x) => ({ ...x, imagem: undefined }));
    setImagem(URL.createObjectURL(ficheiro));
  }

  function validar(): Erros {
    const e: Erros = {};
    if (titulo.trim().length < 10) e.titulo = "O título tem de ter pelo menos 10 caracteres.";
    if (resumo.trim().length < 20) e.resumo = "O resumo tem de ter pelo menos 20 caracteres.";
    if (corpo.trim().length < 50) e.corpo = "O texto tem de ter pelo menos 50 caracteres.";
    if (!categoria) e.categoria = "Escolha uma categoria.";
    if (!imagem) e.imagem = "Escolha uma imagem de capa.";
    if (imagem && alt.trim().length < 5)
      e.alt = "Descreva a imagem para quem não a consegue ver.";
    return e;
  }

  async function publicar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setPublicado(false);
    const e = validar();
    setErros(e);
    if (Object.keys(e).length > 0) {
      // Move focus to the first invalid field.
      const primeiro = Object.keys(e)[0];
      document.getElementById(`${id}-${primeiro}`)?.focus();
      return;
    }
    setAPublicar(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulated server request
    setAPublicar(false);
    setPublicado(true);
  }

  const previsao: Artigo = {
    slug: "previsao",
    titulo: titulo || "Título do artigo",
    resumo: resumo || "O resumo aparece aqui, por baixo do título.",
    corpo: [],
    categoria: categoria ?? "Categoria",
    data: new Date().toISOString().slice(0, 10),
    autor: "Editor",
    imagem: { src: imagem, alt },
    destaque,
  };

  // Editing a field clears that field's error.
  const limpar = (nome: keyof Erros) => setErros((x) => (x[nome] ? { ...x, [nome]: undefined } : x));

  const campo = (nome: keyof Erros) => ({
    id: `${id}-${nome}`,
    "aria-invalid": erros[nome] ? true : undefined,
    "aria-describedby": erros[nome] ? `${id}-${nome}-erro` : undefined,
  });
  const erro = (nome: keyof Erros) =>
    erros[nome] && (
      <p id={`${id}-${nome}-erro`} className="text-destructive text-sm">
        {erros[nome]}
      </p>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form
        onSubmit={publicar}
        noValidate
        className="bg-card space-y-6 rounded-xl p-5 shadow-sm sm:p-8 lg:col-span-2"
      >
        {publicado && (
          <Alert variant="success">
            <CircleCheck aria-hidden="true" />
            <AlertTitle>Artigo publicado</AlertTitle>
            <AlertDescription>
              Isto é só um exemplo: o artigo não foi guardado.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor={`${id}-titulo`}>Título</Label>
          <Input {...campo("titulo")} value={titulo} onChange={(e) => {
              setTitulo(e.target.value);
              limpar("titulo");
            }} maxLength={120} />
          {erro("titulo")}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-resumo`}>Resumo</Label>
          <Textarea
            {...campo("resumo")}
            value={resumo}
            onChange={(e) => {
              setResumo(e.target.value);
              limpar("resumo");
            }}
            maxLength={240}
            className="min-h-20"
          />
          <p className="text-muted-foreground text-sm">
            Uma ou duas frases. Aparece nos cartões e no carrossel. ({resumo.length}/240)
          </p>
          {erro("resumo")}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-categoria`}>Categoria</Label>
          <Select
            value={categoria}
            onValueChange={(v) => {
              setCategoria(v);
              limpar("categoria");
            }}
          >
            <SelectTrigger {...campo("categoria")} className="sm:w-72">
              <SelectValue placeholder="Escolha uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {erro("categoria")}
        </div>

        <fieldset className="space-y-4 rounded-lg border p-4">
          <legend className="text-heading px-1 font-medium">Imagem de capa</legend>
          <div className="space-y-2">
            <Label htmlFor={`${id}-imagem`} className="sr-only">
              Ficheiro da imagem
            </Label>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline">
                <label htmlFor={`${id}-imagem`} className="cursor-pointer">
                  <ImagePlus aria-hidden="true" />
                  {imagem ? "Trocar imagem" : "Escolher imagem"}
                </label>
              </Button>
              <span className="text-muted-foreground text-sm">JPG, PNG ou WebP, até {MAX_MB} MB.</span>
            </div>
            <input
              {...campo("imagem")}
              type="file"
              accept={TIPOS_IMAGEM.join(",")}
              onChange={escolherImagem}
              className="sr-only"
            />
            {erro("imagem")}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-alt`}>Descrição da imagem</Label>
            <Input
              {...campo("alt")}
              value={alt}
              onChange={(e) => {
                setAlt(e.target.value);
                limpar("alt");
              }}
              placeholder="Ex.: Estudantes no auditório durante a sessão de abertura"
            />
            <p className="text-muted-foreground text-sm">
              Lida por quem usa leitor de ecrã. Descreva o que se vê, não escreva «imagem de».
            </p>
            {erro("alt")}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor={`${id}-corpo`}>Texto</Label>
          <Textarea
            {...campo("corpo")}
            value={corpo}
            onChange={(e) => {
              setCorpo(e.target.value);
              limpar("corpo");
            }}
            className="min-h-48"
          />
          <p className="text-muted-foreground text-sm">Separe os parágrafos com uma linha em branco.</p>
          {erro("corpo")}
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id={`${id}-destaque`}
            checked={destaque}
            onCheckedChange={(v) => setDestaque(v === true)}
          />
          <Label htmlFor={`${id}-destaque`}>Mostrar no carrossel de destaques</Label>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button type="button" variant="outline">
            Guardar rascunho
          </Button>
          <Button type="submit" disabled={aPublicar}>
            {aPublicar && <Spinner role="presentation" aria-hidden="true" />}
            {aPublicar ? "A publicar…" : "Publicar"}
          </Button>
        </div>
      </form>

      <aside aria-labelledby={`${id}-previsao`} className="space-y-3 lg:sticky lg:top-6 lg:self-start">
        <Card className="bg-panel gap-4 py-4">
          <CardHeader className="px-4">
            <CardTitle id={`${id}-previsao`} className="text-base">
              Pré-visualização
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <CartaoArtigo artigo={previsao} />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
