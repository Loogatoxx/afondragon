"use client"

import { useActionState, useId, useState } from "react"
import { CircleAlert, Eye, EyeOff, Info, KeyRound } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import type { LoginAction, LoginErrorCode, LoginState } from "./types"

// Portuguese messages for the English error codes returned by the server.
const MESSAGES: Record<LoginErrorCode, string> = {
  email_required: "Escreva o seu email.",
  email_not_institutional: "Use o seu email institucional (termina em @ipt.pt).",
  password_required: "Escreva a sua palavra-passe.",
  invalid_credentials: "Email ou palavra-passe incorretos.",
  unexpected: "Não foi possível entrar. Tente novamente dentro de momentos.",
}

type LoginFormProps = {
  /** Server action that signs the person in (Dados e login, G1) */
  action: LoginAction
}

/** Sign-in form. Presentation only: authentication happens in `action`. */
export function LoginForm({ action }: LoginFormProps) {
  const id = useId()
  const [state, formAction, pending] = useActionState<LoginState, FormData>(action, {})
  const [showPassword, setShowPassword] = useState(false)
  const [cmdInfo, setCmdInfo] = useState(false)

  const emailError = state.fieldErrors?.email
  const passwordError = state.fieldErrors?.password

  return (
    <div className="space-y-6">
      <form action={formAction} noValidate className="space-y-5">
        {state.error && (
          <Alert variant="destructive">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Não foi possível entrar</AlertTitle>
            <AlertDescription>{MESSAGES[state.error]}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor={`${id}-email`}>Email</Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="username"
            placeholder="nome@ipt.pt"
            defaultValue={state.email}
            required
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? `${id}-email-error` : undefined}
          />
          {emailError && (
            <p id={`${id}-email-error`} className="text-destructive text-sm">
              {MESSAGES[emailError]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={`${id}-password`}>Palavra-passe</Label>
            <RecoverPasswordDialog />
          </div>
          <div className="relative">
            <Input
              id={`${id}-password`}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="pr-14"
              aria-invalid={passwordError ? true : undefined}
              aria-describedby={passwordError ? `${id}-password-error` : undefined}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 size-10 -translate-y-1/2"
              aria-label={showPassword ? "Esconder palavra-passe" : "Mostrar palavra-passe"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </Button>
          </div>
          {passwordError && (
            <p id={`${id}-password-error`} className="text-destructive text-sm">
              {MESSAGES[passwordError]}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Checkbox id={`${id}-remember`} name="remember" />
          <Label htmlFor={`${id}-remember`} className="font-normal">
            Lembrar-me neste dispositivo
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending && <Spinner role="presentation" aria-hidden="true" />}
          {pending ? "A entrar…" : "Entrar"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">Ou autentique-se com</span>
        <Separator className="flex-1" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-auto min-h-12 w-full py-3 whitespace-normal"
        onClick={() => setCmdInfo(true)}
      >
        <KeyRound aria-hidden="true" />
        Chave Móvel Digital / Cartão de Cidadão
      </Button>
      {cmdInfo && (
        <Alert variant="info" aria-live="polite">
          <Info aria-hidden="true" />
          <AlertTitle>Brevemente disponível</AlertTitle>
          <AlertDescription>
            A autenticação com Chave Móvel Digital ainda não está ativa. Use o email institucional.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

/** "Forgot password?" link that opens a small dialog (example flow). */
function RecoverPasswordDialog() {
  const id = useId()
  const [sent, setSent] = useState(false)

  return (
    <Dialog onOpenChange={(open) => !open && setSent(false)}>
      <DialogTrigger asChild>
        <Button type="button" variant="link" size="sm" className="h-auto px-0">
          Esqueceu-se da palavra-passe?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recuperar palavra-passe</DialogTitle>
          <DialogDescription>
            Enviamos uma ligação para o seu email institucional para definir uma nova palavra-passe.
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <Alert variant="success" aria-live="polite">
            <AlertTitle>Pedido enviado</AlertTitle>
            <AlertDescription>
              Se o email existir, recebe a ligação dentro de minutos (exemplo).
            </AlertDescription>
          </Alert>
        ) : (
          <form
            id={`${id}-form`}
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <Label htmlFor={`${id}-email`}>Email institucional</Label>
            <Input id={`${id}-email`} type="email" placeholder="nome@ipt.pt" required />
          </form>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {sent ? "Fechar" : "Cancelar"}
            </Button>
          </DialogClose>
          {!sent && (
            <Button type="submit" form={`${id}-form`}>
              Enviar ligação
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

