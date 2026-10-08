"use client";

import { useState } from "react";
import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

/**
 * EXEMPLO VISUAL para a frente Dados e login.
 * A lógica (Supabase, sessão, redirecionar) é deles: aqui só se simula
 * o pedido para mostrar os estados "a entrar" e "erro".
 */
export function FormularioLogin() {
  const [aEntrar, setAEntrar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function entrar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    setAEntrar(true);
    // Simulação: no projeto real, aqui chama-se o login do Supabase.
    await new Promise((r) => setTimeout(r, 1200));
    setAEntrar(false);
    setErro("Email ou palavra-passe incorretos.");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Entrar</CardTitle>
        <CardDescription>Use o seu email institucional.</CardDescription>
      </CardHeader>

      <form onSubmit={entrar}>
        <CardContent className="space-y-4">
          {erro && (
            <Alert variant="destructive">
              <CircleAlert aria-hidden="true" />
              <AlertTitle>Não foi possível entrar</AlertTitle>
              <AlertDescription>{erro}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nome@ipt.pt"
              required
              aria-invalid={erro ? true : undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-pass">Palavra-passe</Label>
            <Input
              id="login-pass"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={erro ? true : undefined}
            />
          </div>
        </CardContent>

        <CardFooter className="mt-6">
          <Button type="submit" className="w-full" disabled={aEntrar}>
            {aEntrar && <Spinner role="presentation" aria-hidden="true" />}
            {aEntrar ? "A entrar…" : "Entrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
