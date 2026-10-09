"use client";

import { useId, useState } from "react";
import { KeyRound, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROCESS_STATES } from "../data";

/** Looks up a complaint by its tracking code (example: any valid code is "Pendente"). */
export function ProcessTracker() {
  const id = useId();
  const [code, setCode] = useState("");
  const [result, setResult] = useState<"found" | "invalid">();

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <KeyRound aria-hidden="true" className="text-primary size-5" />
          Acompanhar processo
        </CardTitle>
        <CardDescription>Use o código que recebeu ao submeter.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setResult(/^IPT-2026-[A-Z0-9]{4}$/i.test(code.trim()) ? "found" : "invalid");
          }}
        >
          <Label htmlFor={`${id}-code`}>Código de acompanhamento</Label>
          <Input
            id={`${id}-code`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex.: IPT-2026-X9A2"
            className="font-mono"
            aria-describedby={result ? `${id}-result` : undefined}
          />
          <Button type="submit" variant="inverted" className="w-full">
            <Search aria-hidden="true" />
            Consultar estado
          </Button>
        </form>
        {result && (
          <p id={`${id}-result`} aria-live="polite" className="text-sm">
            {result === "found" ? (
              <>
                Processo <span className="font-mono">{code.toUpperCase()}</span>:{" "}
                <Badge variant="warning">Em averiguação inicial</Badge>
              </>
            ) : (
              <span className="text-destructive">Código inválido. Confirme o formato IPT-2026-XXXX.</span>
            )}
          </p>
        )}
        <div className="space-y-2 border-t pt-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Estados do processo</p>
          <ul className="space-y-2">
            {PROCESS_STATES.map((s) => (
              <li key={s.label} className="bg-panel flex items-center justify-between gap-2 rounded-md p-2 text-sm">
                {s.label}
                <Badge variant={s.variant}>{s.status}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
