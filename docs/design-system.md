# Design System — Regras de uso

> Responsáveis: grupos de Design (G4/G5). Dúvidas → falar connosco antes de criar componentes novos.

## Onde está cada coisa

| O quê | Onde |
|---|---|
| Cores, fonte, arredondamento (tokens) | `app/globals.css` |
| Componentes base (shadcn/ui) | `components/ui/` |
| Componentes comuns do projeto | `components/common/` |
| Exemplos ao vivo | rota `/design-system` |

## Identidade visual

- **Cores:** paleta do grupo (verde `#74B816` / `#416800`, navy `#182230`, azul `#0284C7`). A lista completa está no topo de `app/globals.css` como `--palette-*`.
- **Fontes:** *Plus Jakarta Sans* nos títulos (`font-heading`), *Public Sans* no texto (`font-sans`).
- **Raios:** `rounded-sm` 0.25rem (botões, campos), `rounded-md` 0.5rem, `rounded-lg` 1rem (painéis), `rounded-xl` 1.5rem (cards).
- **Espaçamentos:** os `--space-*` do ficheiro original são iguais à escala do Tailwind (`p-4` = 1rem, `gap-6` = 1.5rem, …).
- **Foco do teclado:** contorno azul de 3px em tudo (não remover `outline`).

### Classes de cor disponíveis

| Classe | Cor | Uso |
|---|---|---|
| `bg-primary` / `text-primary-foreground` | `#416800` / branco | Botão principal, item ativo do menu |
| `bg-brand` | `#74B816` | Etiquetas, destaques (nunca com texto branco) |
| `bg-brand-light` | `#D5F5A6` | Fundos suaves de destaque |
| `bg-secondary` | `#E5E7E9` | Botão secundário |
| `bg-inverted` | `#292D30` | Botão escuro |
| `bg-background` | `#D9DADB` | Fundo da página |
| `bg-card` | `#ECEDEF` | Cards, superfícies |
| `bg-panel` | `#F4F6F8` | Painéis / secções |
| `text-foreground` | `#414838` | Texto normal |
| `text-heading` | `#17191C` | Títulos |
| `text-muted-foreground` | `#566171` | Texto secundário |
| `bg-success` | `#267647` | Sucesso |
| `bg-warning` | `#E6A23C` (texto preto) | Avisos |
| `bg-destructive` | `#C91F26` | Erros, apagar |
| `bg-info` | `#0369A1` | Informação |
| `border-border` / `border-input` | `#D1D5DB` / `#858A80` | Linhas / bordas de campos |

### Ajustes de acessibilidade (só com cores da paleta)

Testámos o contraste (WCAG AA: 4.5:1 para texto, 3:1 para bordas de campos). Mudámos 4 usos, **sem criar cores novas**:

| Antes | Contraste | Agora | Contraste |
|---|---|---|---|
| Hover do botão `#619D0D` + texto branco | 3.3 | `#416800` a 90% | ≈ 6 |
| Texto secundário `#858A80` sobre `#ECEDEF` | 3.0 | `#566171` (secondary-light) | 5.6 |
| Info `#0284C7` + texto branco | 4.1 | `#0369A1` (tertiary-dark) | 5.9 |
| Borda de campo `#C5CCB6` | 1.4 | `#858A80` (text-muted) | 3.0 |

`#0284C7` continua a ser usado no contorno de foco.

## Regras obrigatórias

1. **Só se usam componentes de `components/ui` e `components/common`.**
   Não copiar um componente para a pasta do vosso módulo para o alterar. Se falta uma variante, peçam-nos.
2. **Nada de cores soltas.** ❌ `bg-blue-600`, `text-[#333]`, `style={{ color: "red" }}`
   ✅ `bg-primary`, `text-muted-foreground`, `border-border`, `text-destructive`.
3. **Não instalar outra biblioteca de componentes** (MUI, Bootstrap, Chakra, …).
4. **Cada ecrã com dados tem 3 estados:** `<LoadingState />`, `<EmptyState />` e `<ErrorMessage />`.
5. **Funciona no telemóvel e com teclado:** todos os `Input` têm `Label` com `htmlFor`; nada só com rato.

## Componentes disponíveis

### Base (`@/components/ui/...`)
- `Button` — variantes: `default`, `secondary`, `inverted`, `outline`, `ghost`, `destructive`, `info`, `link`; tamanhos `sm`, `default` (48px), `lg` (56px), `icon` (56px — usar sempre `aria-label`).
- `Badge` — etiqueta; variantes `default` (verde), `secondary`, `outline`, `success`, `warning`, `destructive`, `info`.
- `Alert`, `AlertTitle`, `AlertDescription` — variantes `default`, `success`, `warning`, `destructive`, `info`.
- `Input`, `Label`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

- `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel` — escolher uma opção. Dar `id` ao `SelectTrigger` e ligar ao `Label` com `htmlFor`.
- `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` — confirmações e formulários curtos. Ter sempre `DialogTitle`.
- `Sidebar` e companhia (`SidebarProvider`, `SidebarInset`, `SidebarMenu`, `SidebarMenuButton`, `SidebarTrigger`, …) — menu lateral. Exemplo completo em `/design-system/menu` (código em `app/design-system/menu/page.tsx`).
  - No telemóvel abre como painel por cima do conteúdo; no computador recolhe para ícones (`collapsible="icon"`); atalho Ctrl+B.
  - Item ativo: `isActive` (verde-escuro com texto branco, como no ficheiro do grupo).
- Peças usadas pela sidebar, também disponíveis: `Separator`, `Sheet`, `Tooltip`, `Skeleton`.
- `Spinner` — ícone a rodar, para botões "A guardar…" / "A entrar…".
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` — listas de registos. Exemplo completo (com os 4 estados) em `/design-system`, secção «Dados».
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — separadores; mudam com as setas do teclado.
- `Empty` (e partes) — base do `EmptyState`; usar o `EmptyState` nos ecrãs.
- `Popover` — painel que abre por cima (usado pelo sino).

### Comuns (`@/components/common/...`)
Feitos por cima dos componentes do shadcn, não de raiz.

- `PageHeader` — `title`, `description?`, `actions?` (usa `Separator`)
- `EmptyState` — `title?`, `description?`, `icon?`, `action?` (usa `Empty`)
- `LoadingState` — `label?`, `variant?: "spinner" | "rows"`, `rows?` (usa `Spinner` e `Skeleton`)
- `ErrorMessage` — `title?`, `message?`, `action?` (usa `Alert`)

#### Portal (com a frente Contratos do núcleo)

Só desenham: os dados vêm por props, do registo de módulos e de `notificar()`. Exemplo completo em `/design-system/menu` (código em `app/design-system/menu/portal-example.tsx`).

- `SideMenu` — `items: { id, name, route, count? }[]`, `icons?: Record<id, Icon>`, `brandName?`, `onSignOut?`. O item ativo vem da rota atual.
- `PortalHeader` — `title?`, `name?`, `roleLabel?`, `actions?` (pôr aqui o sino).
- `NotificationBell` — `notifications: { id, title, message, type, read, createdAt, link? }[]` (`type`: `info` | `success` | `warning` | `error`), `onMarkAsRead?`, `onMarkAllAsRead?`, `viewAllHref?` (por defeito `/notificacoes`), `max?`.

Os três têm de estar dentro de `<SidebarProvider>` com `<SidebarInset>` à volta do conteúdo:

```tsx
<SidebarProvider>
  <SideMenu items={modulesForRole(me.role)} icons={ICONES} onSignOut={signOut} />
  <SidebarInset>
    <PortalHeader title="Aulas" name={me.name} roleLabel={roleLabel}
      actions={<NotificationBell notifications={alerts} />} />
    <main className="p-4 sm:p-8">{children}</main>
  </SidebarInset>
</SidebarProvider>
```

> Os tipos seguem os contratos da frente Contratos (`g3/rules`): `PortalModule` (`id`, `name`, `route`) e `Notification` (`type`: `info` | `success` | `warning` | `error`). IDs oficiais dos módulos: `portal`, `classes`, `schedule`, `secretariat`, `cafeteria`, `applications`, `complaints`.

## Ecrã de login (para a frente Dados e login)

Exemplo pronto em `/design-system/login` — código em `app/design-system/login/`.
A página verdadeira `/login` é da frente Dados e login: copiam o layout e trocam a simulação pelo login do Supabase.

Componentes usados: `Card`, `Label`, `Input`, `Button`, `Spinner` e `Alert` (`variant="destructive"`).

```tsx
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Entrar</CardTitle>
    <CardDescription>Use o seu email institucional.</CardDescription>
  </CardHeader>
  <form action={entrar}>
    <CardContent className="space-y-4">
      {erro && (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível entrar</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Palavra-passe</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
    </CardContent>
    <CardFooter className="mt-6">
      <Button type="submit" className="w-full" disabled={aEntrar}>
        {aEntrar && <Spinner aria-hidden="true" />}
        {aEntrar ? "A entrar…" : "Entrar"}
      </Button>
    </CardFooter>
  </form>
</Card>
```

- Mensagens de erro genéricas ("Email ou palavra-passe incorretos."), nunca dizer qual dos dois falhou.
- Botão de sair: `<Button variant="outline">Sair</Button>`.

## Exemplo de um ecrã

```tsx
import { PageHeader } from "@/components/common/cabecalho-pagina"
import { LoadingState } from "@/components/common/a-carregar"
import { EmptyState } from "@/components/common/estado-vazio"
import { ErrorMessage } from "@/components/common/mensagem-erro"

export function ContractList({ loading, error, contracts }) {
  return (
    <>
      <PageHeader title="Contratos" />
      {loading ? <LoadingState />
        : error ? <ErrorMessage message={erro} />
        : contracts.length === 0 ? <EmptyState title="Sem contratos" />
        : /* tabela */ null}
    </>
  )
}
```

## Notícias / newsletter (extra, fora das aulas)

Exemplo completo em `/design-system/noticias` (código em `app/design-system/noticias/`):

- **Lista** (`/design-system/noticias`): carrossel de destaques + grelha de cartões.
- **Artigo** (`/design-system/noticias/<slug>`): capa, título, autor, data e texto.
- **Publicar** (`/design-system/noticias/publicar`): formulário com validação, imagem de capa com descrição obrigatória e pré-visualização ao vivo. Só para quem tem permissão.

A permissão está **simulada** com `?perfil=staff` no endereço. No projeto verdadeiro a página chama `requireRole([...])` (frente Dados e login) e o servidor volta a verificar a permissão ao gravar. O exemplo **não grava nada**: guardar o artigo e a imagem (ex.: Supabase Storage) é trabalho de quem fizer o módulo.

As imagens de exemplo (`public/design-system/noticias/*.svg`) são ilustrações com as cores da paleta; trocar por fotografias reais.

### Componentes (`@/components/common/news/...`)

- `NewsCarousel` — `items: { article, href }[]`, `label?`. Cada diapositivo é clicável. Muda com setas, pontos, teclas ← → ou arrastando. **Não avança sozinho** (quem lê devagar não perde a notícia). O texto fica numa faixa escura, para ter contraste sobre qualquer imagem.
- `ArticleCard` — `article`, `href?`. O cartão inteiro é clicável; sem `href` serve de pré-visualização.
- `ArticleView` — `article`. Página de leitura.
- Tipo `Artigo` em `tipos.ts`: `slug`, `title`, `resumo`, `corpo[]`, `categoria`, `data`, `autor`, `imagem { src, alt }`, `destaque?`.

### Componentes base novos (`@/components/ui/...`)

- `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` (shadcn, usa `embla-carousel-react`).
- `Textarea` — texto longo, com o mesmo aspeto do `Input`.
- `Checkbox` — sempre com `Label` ao lado.

### Regras para imagens

- Toda a imagem tem `alt` que descreve o que se vê. Imagens decorativas: `alt=""`.
- Capas em 16:9; o componente corta para caber (`object-cover`).
- Texto por cima de imagens só com faixa escura por baixo (`bg-overlay/80`).

## Testes de acessibilidade (Aula 3)

Feitos com o axe-core (regras WCAG 2.1 AA) em `/design-system`, `/design-system/menu` e `/design-system/login`, a 1280 px e a 390 px (telemóvel): **sem problemas**.

- Teclado: separadores com setas, sino abre com Enter, avisos abrem com Tab + Enter, diálogos fecham com Esc, menu com Ctrl+B.
- Telemóvel: sem scroll horizontal; o menu abre como painel lateral.
- Contraste: o texto secundário (`#566171`) tem 4.49:1 sobre o fundo da página (`#D9DADB`), mesmo abaixo de 4.5:1. Por isso **`text-muted-foreground` usa-se só sobre cartões e painéis** (5.0 a 5.8:1); diretamente no fundo usa-se `text-foreground`.

## Mudança de nomes (regras do G3)

Os componentes das aulas 1 e 2 (já no `main` do professor) mudaram de nome. Quem os usa só tem de atualizar o import e as props:

| Antes | Agora | Props |
|---|---|---|
| `components/comuns/cabecalho-pagina` · `CabecalhoPagina` | `components/common/page-header` · `PageHeader` | `titulo` → `title`, `descricao` → `description`, `acoes` → `actions` |
| `components/comuns/estado-vazio` · `EstadoVazio` | `components/common/empty-state` · `EmptyState` | `titulo` → `title`, `descricao` → `description`, `acao` → `action`, `icone` → `icon` |
| `components/comuns/a-carregar` · `ACarregar` | `components/common/loading-state` · `LoadingState` | `texto` → `label`; novo: `variant="rows"`, `rows` |
| `components/comuns/mensagem-erro` · `MensagemErro` | `components/common/error-message` · `ErrorMessage` | `titulo` → `title`, `mensagem` → `message`, `acao` → `action` |
| variantes `sucesso`, `aviso`, `invertido` | `success`, `warning`, `inverted` | `Button`, `Badge`, `Alert` |
| classes `bg-sucesso`, `bg-aviso`, `bg-marca`, `bg-painel`… | `bg-success`, `bg-warning`, `bg-brand`, `bg-panel`… | — |

## Regras do projeto que afetam o design system (`AGENTS.md`, frente Contratos)

- Pastas e código em inglês: `components/common/` (antes `components/comuns/`), `components/common/news/`. Comentários no código em inglês; texto visível em português de Portugal.
- Rotas (URLs) em português: `/design-system/noticias`.
- Perfis: `student`, `teacher`, `staff`, `admin`. No ecrã mostram-se em português (ex.: «Aluno»).
- Tokens e variantes em inglês: `success`, `warning`, `inverted`, `brand`, `panel`, `field`, `overlay`.
- Sem valores arbitrários do Tailwind sempre que haja equivalente na escala; sem `style` inline; sem cores em hexadecimal fora de `globals.css`.
- Cada página tem `metadata`; `/design-system` tem `loading.tsx` (usa `LoadingState`) e `error.tsx` (usa `ErrorMessage`).
- Commits e títulos de PR em inglês (`type(scope): subject`); descrição do PR em português.

## Próximos passos (Aula 4)

- Rever os tipos do portal quando a frente Contratos fechar os contratos.
- Entregar a secção de interface do `AGENTS.md` (rascunho em `docs/agents-interface-section.md`).
- Demonstração: montar um ecrã de lista ao vivo só com componentes.
