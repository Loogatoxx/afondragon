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
 * VISUAL EXAMPLE for the Dados e login team (G1).
 * The logic (Supabase, session, redirect) is theirs: this only simulates
 * the request to show the "signing in" and "error" states.
 */
export function LoginForm() {
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSigningIn(true);
    // Simulated: the real page calls Supabase sign-in here.
    await new Promise((r) => setTimeout(r, 1200));
    setSigningIn(false);
    setError("Email ou palavra-passe incorretos.");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Entrar</CardTitle>
        <CardDescription>Use o seu email institucional.</CardDescription>
      </CardHeader>

      <form onSubmit={signIn}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <CircleAlert aria-hidden="true" />
              <AlertTitle>Não foi possível entrar</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
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
              aria-invalid={error ? true : undefined}
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
              aria-invalid={error ? true : undefined}
            />
          </div>
        </CardContent>

        <CardFooter className="mt-6">
          <Button type="submit" className="w-full" disabled={signingIn}>
            {signingIn && <Spinner role="presentation" aria-hidden="true" />}
            {signingIn ? "A entrar…" : "Entrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
