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
import { ArticleCard } from "@/components/common/news/article-card";
import type { Article } from "@/components/common/news/types";
import { CATEGORIES } from "../data";

type Field = "title" | "summary" | "body" | "category" | "image" | "alt";
type Errors = Partial<Record<Field, string>>;

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;

/**
 * EXAMPLE of the publishing form. Validates and shows a live preview,
 * but saves NOTHING: storing the article and the image is the module's job.
 */
export function ArticleForm() {
  const id = useId();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<string>();
  const [alt, setAlt] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  // Free the preview object URL when the image changes.
  useEffect(() => () => void (image && URL.revokeObjectURL(image)), [image]);

  function chooseImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      setErrors((x) => ({ ...x, image: "Escolha uma imagem JPG, PNG ou WebP." }));
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setErrors((x) => ({ ...x, image: `A imagem tem mais de ${MAX_MB} MB.` }));
      return;
    }
    setErrors((x) => ({ ...x, image: undefined }));
    setImage(URL.createObjectURL(file));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (title.trim().length < 10) e.title = "O título tem de ter pelo menos 10 caracteres.";
    if (summary.trim().length < 20) e.summary = "O resumo tem de ter pelo menos 20 caracteres.";
    if (body.trim().length < 50) e.body = "O texto tem de ter pelo menos 50 caracteres.";
    if (!category) e.category = "Escolha uma categoria.";
    if (!image) e.image = "Escolha uma imagem de capa.";
    if (image && alt.trim().length < 5) e.alt = "Descreva a imagem para quem não a consegue ver.";
    return e;
  }

  async function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPublished(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Move focus to the first invalid field.
      const first = Object.keys(e)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setPublishing(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulated server request
    setPublishing(false);
    setPublished(true);
  }

  const preview: Article = {
    slug: "preview",
    title: title || "Título do artigo",
    summary: summary || "O resumo aparece aqui, por baixo do título.",
    body: [],
    category: category ?? "Categoria",
    date: new Date().toISOString().slice(0, 10),
    author: "Editor",
    image: { src: image, alt },
    featured,
  };

  // Editing a field clears that field's error.
  const clearError = (field: Field) =>
    setErrors((x) => (x[field] ? { ...x, [field]: undefined } : x));

  const fieldProps = (field: Field) => ({
    id: `${id}-${field}`,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
  });
  const fieldError = (field: Field) =>
    errors[field] && (
      <p id={`${id}-${field}-error`} className="text-destructive text-sm">
        {errors[field]}
      </p>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form
        onSubmit={publish}
        noValidate
        className="bg-card space-y-6 rounded-xl p-5 shadow-sm sm:p-8 lg:col-span-2"
      >
        {published && (
          <Alert variant="success">
            <CircleCheck aria-hidden="true" />
            <AlertTitle>Artigo publicado</AlertTitle>
            <AlertDescription>Isto é só um exemplo: o artigo não foi guardado.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor={`${id}-title`}>Título</Label>
          <Input
            {...fieldProps("title")}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              clearError("title");
            }}
            maxLength={120}
          />
          {fieldError("title")}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-summary`}>Resumo</Label>
          <Textarea
            {...fieldProps("summary")}
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
              clearError("summary");
            }}
            maxLength={240}
            className="min-h-20"
          />
          <p className="text-muted-foreground text-sm">
            Uma ou duas frases. Aparece nos cartões e no carrossel. ({summary.length}/240)
          </p>
          {fieldError("summary")}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${id}-category`}>Categoria</Label>
          <Select
            value={category}
            onValueChange={(v) => {
              setCategory(v);
              clearError("category");
            }}
          >
            <SelectTrigger {...fieldProps("category")} className="sm:w-72">
              <SelectValue placeholder="Escolha uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError("category")}
        </div>

        <fieldset className="space-y-4 rounded-lg border p-4">
          <legend className="text-heading px-1 font-medium">Imagem de capa</legend>
          <div className="space-y-2">
            <Label htmlFor={`${id}-image`} className="sr-only">
              Ficheiro da imagem
            </Label>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline">
                <label htmlFor={`${id}-image`} className="cursor-pointer">
                  <ImagePlus aria-hidden="true" />
                  {image ? "Trocar imagem" : "Escolher imagem"}
                </label>
              </Button>
              <span className="text-muted-foreground text-sm">
                JPG, PNG ou WebP, até {MAX_MB} MB.
              </span>
            </div>
            <input
              {...fieldProps("image")}
              type="file"
              accept={IMAGE_TYPES.join(",")}
              onChange={chooseImage}
              className="sr-only"
            />
            {fieldError("image")}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-alt`}>Descrição da imagem</Label>
            <Input
              {...fieldProps("alt")}
              value={alt}
              onChange={(e) => {
                setAlt(e.target.value);
                clearError("alt");
              }}
              placeholder="Ex.: Estudantes no auditório durante a sessão de abertura"
            />
            <p className="text-muted-foreground text-sm">
              Lida por quem usa leitor de ecrã. Descreva o que se vê, não escreva «imagem de».
            </p>
            {fieldError("alt")}
          </div>
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor={`${id}-body`}>Texto</Label>
          <Textarea
            {...fieldProps("body")}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              clearError("body");
            }}
            className="min-h-48"
          />
          <p className="text-muted-foreground text-sm">
            Separe os parágrafos com uma linha em branco.
          </p>
          {fieldError("body")}
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id={`${id}-featured`}
            checked={featured}
            onCheckedChange={(v) => setFeatured(v === true)}
          />
          <Label htmlFor={`${id}-featured`}>Mostrar no carrossel de destaques</Label>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button type="button" variant="outline">
            Guardar rascunho
          </Button>
          <Button type="submit" disabled={publishing}>
            {publishing && <Spinner role="presentation" aria-hidden="true" />}
            {publishing ? "A publicar…" : "Publicar"}
          </Button>
        </div>
      </form>

      <aside
        aria-labelledby={`${id}-preview`}
        className="space-y-3 lg:sticky lg:top-6 lg:self-start"
      >
        <Card className="bg-panel gap-4 py-4">
          <CardHeader className="px-4">
            <CardTitle id={`${id}-preview`} className="text-base">
              Pré-visualização
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <ArticleCard article={preview} />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
