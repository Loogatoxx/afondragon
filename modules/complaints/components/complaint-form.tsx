"use client";

import { useId, useState } from "react";
import { CircleCheck, Lock, Upload } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, PLACES } from "../data";

type Field = "category" | "title" | "date" | "place" | "description" | "declaration" | "name" | "email";
type Errors = Partial<Record<Field, string>>;

const MIN_DESCRIPTION = 50;

/** Complaint form. Example only: nothing is sent; the code is made up. */
export function ComplaintForm() {
  const id = useId();
  const [mode, setMode] = useState<"anonymous" | "identified">("anonymous");
  const [category, setCategory] = useState<string>();
  const [place, setPlace] = useState<string>();
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [declared, setDeclared] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [code, setCode] = useState<string>();
  const [draftSaved, setDraftSaved] = useState(false);

  const clear = (field: Field) => setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const e: Errors = {};
    if (!category) e.category = "Escolha a categoria da ocorrência.";
    if (String(form.get("title") ?? "").trim().length < 5) e.title = "Escreva um título curto (pelo menos 5 caracteres).";
    if (!form.get("date")) e.date = "Indique a data ou o início do período.";
    if (!place) e.place = "Escolha o local.";
    if (description.trim().length < MIN_DESCRIPTION) e.description = `Descreva os factos com pelo menos ${MIN_DESCRIPTION} caracteres.`;
    if (mode === "identified") {
      if (!String(form.get("name") ?? "").trim()) e.name = "Escreva o seu nome.";
      if (!/^\S+@\S+\.\S+$/.test(String(form.get("email") ?? ""))) e.email = "Escreva um email válido.";
    }
    if (!declared) e.declaration = "Tem de confirmar a declaração para submeter.";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById(`${id}-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 900)); // simulated secure submission
    setSending(false);
    setCode(`IPT-2026-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
  }

  if (code) {
    return (
      <Alert variant="success" aria-live="polite">
        <CircleCheck aria-hidden="true" />
        <AlertTitle>Denúncia submetida em segurança</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>
            Guarde este código para acompanhar o processo: <strong className="font-mono">{code}</strong>
          </p>
          <p>Isto é só um exemplo: nada foi enviado.</p>
        </AlertDescription>
      </Alert>
    );
  }

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
    <form onSubmit={submit} noValidate className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="text-heading font-medium">Tipo de participação</legend>
        <RadioGroup value={mode} onValueChange={(v) => setMode(v as typeof mode)} className="sm:grid-cols-2">
          {[
            { value: "anonymous", title: "Denúncia anónima", text: "Sem registo de dados pessoais." },
            { value: "identified", title: "Denúncia identificada", text: "Os dados só são vistos por quem instrui o processo." },
          ].map((o) => (
            <Label
              key={o.value}
              htmlFor={`${id}-${o.value}`}
              className="bg-card has-data-[state=checked]:border-primary flex cursor-pointer items-start gap-3 rounded-lg border p-4"
            >
              <RadioGroupItem id={`${id}-${o.value}`} value={o.value} className="mt-0.5" />
              <span className="space-y-1">
                <span className="text-heading block font-semibold">{o.title}</span>
                <span className="text-muted-foreground block text-sm font-normal">{o.text}</span>
              </span>
            </Label>
          ))}
        </RadioGroup>
      </fieldset>

      {mode === "identified" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Nome</Label>
            <Input {...fieldProps("name")} name="name" autoComplete="name" onChange={() => clear("name")} />
            {fieldError("name")}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input {...fieldProps("email")} name="email" type="email" autoComplete="email" onChange={() => clear("email")} />
            {fieldError("email")}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${id}-category`}>Categoria da ocorrência</Label>
        <Select value={category} onValueChange={(v) => { setCategory(v); clear("category"); }}>
          <SelectTrigger {...fieldProps("category")}>
            <SelectValue placeholder="Selecione a categoria" />
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

      <div className="space-y-2">
        <Label htmlFor={`${id}-title`}>Título do relato</Label>
        <Input {...fieldProps("title")} name="title" placeholder="Ex.: Situação ocorrida no laboratório de informática" onChange={() => clear("title")} />
        {fieldError("title")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${id}-date`}>Data da ocorrência</Label>
          <Input {...fieldProps("date")} name="date" type="date" onChange={() => clear("date")} />
          {fieldError("date")}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-place`}>Local da ocorrência</Label>
          <Select value={place} onValueChange={(v) => { setPlace(v); clear("place"); }}>
            <SelectTrigger {...fieldProps("place")}>
              <SelectValue placeholder="Selecione o local" />
            </SelectTrigger>
            <SelectContent>
              {PLACES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError("place")}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={`${id}-description`}>Descrição dos factos</Label>
          <span className="text-muted-foreground text-xs" aria-live="polite">
            {description.trim().length}/{MIN_DESCRIPTION} caracteres mínimos
          </span>
        </div>
        <Textarea
          {...fieldProps("description")}
          name="description"
          value={description}
          onChange={(e) => { setDescription(e.target.value); clear("description"); }}
          placeholder="Descreva os acontecimentos de forma cronológica e objetiva: quem participou, o que aconteceu e possíveis testemunhas."
          className="min-h-36"
        />
        <p className="text-muted-foreground text-sm">Evite incluir dados de terceiros que não sejam necessários.</p>
        {fieldError("description")}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-files`}>Provas ou documentos (opcional)</Label>
        <label
          htmlFor={`${id}-files`}
          className="bg-panel hover:border-primary flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-6 text-center"
        >
          <Upload aria-hidden="true" className="text-primary size-6" />
          <span className="text-heading text-sm font-semibold">Clique para escolher ficheiros</span>
          <span className="text-muted-foreground text-xs">PDF, PNG, JPG ou DOCX, até 10 MB por ficheiro.</span>
        </label>
        <input
          id={`${id}-files`}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.docx"
          className="sr-only"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
        />
        {files.length > 0 && (
          <ul className="text-sm" aria-label="Ficheiros escolhidos">
            {files.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-panel space-y-2 rounded-lg border p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            {...fieldProps("declaration")}
            checked={declared}
            onCheckedChange={(v) => { setDeclared(v === true); clear("declaration"); }}
            className="mt-0.5"
          />
          <Label htmlFor={`${id}-declaration`} className="leading-relaxed font-normal">
            Declaro, sob compromisso de honra, que as informações são verdadeiras e prestadas de
            boa-fé.
          </Label>
        </div>
        {fieldError("declaration")}
      </div>

      {draftSaved && (
        <p className="text-success text-sm font-medium" aria-live="polite">
          Rascunho guardado neste dispositivo (exemplo).
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary" onClick={() => setDraftSaved(true)}>
          Guardar rascunho
        </Button>
        <Button type="submit" disabled={sending}>
          {sending ? <Spinner role="presentation" aria-hidden="true" /> : <Lock aria-hidden="true" />}
          {sending ? "A submeter…" : "Submeter denúncia com segurança"}
        </Button>
      </div>
    </form>
  );
}
