# Protótipo do site UniPortal (a partir do Stitch)

Montado pela frente Design system (G4 e G5) com os ecrãs do Stitch, só com componentes de
`components/ui` e `components/common`, e seguindo as regras do `AGENTS.md` (branch `g3/rules`).
Os dados são **todos de exemplo**: nada é gravado.

## Rotas

| Rota | Ecrã | Grupo de rotas | Dono no projeto final |
|---|---|---|---|
| `/` | Portal público (destaque, notícias, eventos, newsletter) | `(public)` | G2 |
| `/denuncias` | Canal de denúncias (anónimo) | `(public)` | G1 |
| `/candidaturas` | Em construção | `(public)` | G2 |
| `/login` | Entrar no UniPortal | `(auth)` | G1 (ecrã do design system) |
| `/portal` | Início do estudante | `(portal)` | G1 |
| `/aulas` | Em construção | `(portal)` | G3 |
| `/horarios` | Horários académicos | `(portal)` | **G4** |
| `/secretaria` | Secretaria virtual | `(portal)` | **G5** |
| `/refeitorio` | Refeitório | `(portal)` | **G5** |
| `/noticias`, `/noticias/[slug]`, `/noticias/publicar` | Notícias, artigo e publicação | `(portal)` | a definir |

Navegação: o botão «Área Reservada» do site público abre `/login`; entrar abre `/portal`; o menu
lateral nasce de `modulesForRole(role)` e liga a todos os módulos; «Sair» volta a `/login`.

## Onde está cada coisa

- `app/` — rotas finas: só `metadata` e o componente do módulo. Cada grupo tem `loading.tsx` e `error.tsx`.
- `modules/<id>/` — ecrãs (`components/`) e dados de exemplo (`data.ts`, a trocar por `queries.ts`).
  `schedule`, `secretariat`, `cafeteria`, `news`, `complaints`, `portal`, `public-site`, `auth`.
- `components/common/` — peças partilhadas: `site/` (cabeçalho e rodapé públicos), `auth/` (login),
  `news/` (cartões, carrossel, newsletter), `segmented-control.tsx`, `under-construction.tsx`, `module-icons.ts`.
- `lib/` — **cópias provisórias** dos contratos de outros grupos, só para o protótipo funcionar:
  `lib/modules` (G3: registo, com a proposta do módulo `news`), `lib/auth` (G1: `getUser()` falso) e
  `lib/notifications` (G3: avisos de exemplo). Não vão para o repositório principal.

## Login: o que o G1 tem de fazer

O ecrã está pronto em `components/common/auth/`. A página só liga o ecrã à server action:

```tsx
// app/(auth)/login/page.tsx
import { LoginScreen } from "@/components/common/auth/login-screen";
import { signIn } from "@/modules/auth/actions";

export default function LoginPage() {
  return <LoginScreen action={signIn} />;
}
```

A action recebe o `FormData` do formulário (campos `email`, `password` e `remember`) e devolve um
`LoginState` com códigos de erro **em inglês**; o ecrã mostra-os em português:

```ts
type LoginState = {
  error?: "invalid_credentials" | "unexpected";
  fieldErrors?: { email?: "email_required" | "email_not_institutional"; password?: "password_required" };
  email?: string; // para não apagar o email depois de um erro
};
```

Em `modules/auth/actions.ts` está uma action de demonstração (aceita qualquer email `@ipt.pt`; a
palavra-passe `errada` mostra o erro). O G1 troca o corpo pelo login do Supabase
(`signInWithPassword`) e mantém a mesma assinatura; em caso de sucesso faz `redirect("/portal")`.

## Imagens

- `public/images/campus-ipt.webp` e `public/images/refeitorio-prato.webp` — fotografias do Stitch,
  convertidas para WebP (240 KB e 97 KB).
- `public/images/noticias/*.svg` — ilustrações das restantes notícias.
- As imagens do Stitch alojadas em `lh3.googleusercontent.com` **não** foram usadas: são ligações
  temporárias e externas.

## O que é só simulação

Pedidos à secretaria, saldo e senhas do refeitório, inscrições em eventos, newsletter, denúncias,
emissão de certidões e publicação de artigos mudam só na página aberta. O perfil nas notícias é
simulado com `?perfil=staff`.
