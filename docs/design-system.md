# Design System — Regras de uso

> Responsáveis: grupos de Design (G4/G5). Dúvidas → falar connosco antes de criar componentes novos.

## Onde está cada coisa

| O quê | Onde |
|---|---|
| Cores, fonte, arredondamento (tokens) | `app/globals.css` |
| Componentes base (shadcn/ui) | `components/ui/` |
| Componentes comuns do projeto | `components/comuns/` |
| Exemplos ao vivo | rota `/design-system` |

## Identidade visual

- **Cores:** paleta do grupo (verde `#74B816` / `#416800`, navy `#182230`, azul `#0284C7`). A lista completa está no topo de `app/globals.css` como `--paleta-*`.
- **Fontes:** *Plus Jakarta Sans* nos títulos (`font-heading`), *Public Sans* no texto (`font-sans`).
- **Raios:** `rounded-sm` 0.25rem (botões, campos), `rounded-md` 0.5rem, `rounded-lg` 1rem (painéis), `rounded-xl` 1.5rem (cards).
- **Espaçamentos:** os `--space-*` do ficheiro original são iguais à escala do Tailwind (`p-4` = 1rem, `gap-6` = 1.5rem, …).
- **Foco do teclado:** contorno azul de 3px em tudo (não remover `outline`).

### Classes de cor disponíveis

| Classe | Cor | Uso |
|---|---|---|
| `bg-primary` / `text-primary-foreground` | `#416800` / branco | Botão principal, item ativo do menu |
| `bg-marca` | `#74B816` | Etiquetas, destaques (nunca com texto branco) |
| `bg-marca-claro` | `#D5F5A6` | Fundos suaves de destaque |
| `bg-secondary` | `#E5E7E9` | Botão secundário |
| `bg-invertido` | `#292D30` | Botão escuro |
| `bg-background` | `#D9DADB` | Fundo da página |
| `bg-card` | `#ECEDEF` | Cards, superfícies |
| `bg-painel` | `#F4F6F8` | Painéis / secções |
| `text-foreground` | `#414838` | Texto normal |
| `text-heading` | `#17191C` | Títulos |
| `text-muted-foreground` | `#566171` | Texto secundário |
| `bg-sucesso` | `#267647` | Sucesso |
| `bg-aviso` | `#E6A23C` (texto preto) | Avisos |
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

1. **Só se usam componentes de `components/ui` e `components/comuns`.**
   Não copiar um componente para a pasta do vosso módulo para o alterar. Se falta uma variante, peçam-nos.
2. **Nada de cores soltas.** ❌ `bg-blue-600`, `text-[#333]`, `style={{ color: "red" }}`
   ✅ `bg-primary`, `text-muted-foreground`, `border-border`, `text-destructive`.
3. **Não instalar outra biblioteca de componentes** (MUI, Bootstrap, Chakra, …).
4. **Cada ecrã com dados tem 3 estados:** `<ACarregar />`, `<EstadoVazio />` e `<MensagemErro />`.
5. **Funciona no telemóvel e com teclado:** todos os `Input` têm `Label` com `htmlFor`; nada só com rato.

## Componentes disponíveis

### Base (`@/components/ui/...`)
- `Button` — variantes: `default`, `secondary`, `invertido`, `outline`, `ghost`, `destructive`, `info`, `link`; tamanhos `sm`, `default` (48px), `lg` (56px), `icon` (56px — usar sempre `aria-label`).
- `Badge` — etiqueta; variantes `default` (verde), `secondary`, `outline`, `sucesso`, `aviso`, `destructive`, `info`.
- `Alert`, `AlertTitle`, `AlertDescription` — variantes `default`, `sucesso`, `aviso`, `destructive`, `info`.
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
- `Empty` (e partes) — base do `EstadoVazio`; usar o `EstadoVazio` nos ecrãs.
- `Popover` — painel que abre por cima (usado pelo sino).

### Comuns (`@/components/comuns/...`)
Feitos por cima dos componentes do shadcn, não de raiz.

- `CabecalhoPagina` — `titulo`, `descricao?`, `acoes?` (usa `Separator`)
- `EstadoVazio` — `titulo?`, `descricao?`, `icone?`, `acao?` (usa `Empty`)
- `ACarregar` — `texto?`, `variante?: "spinner" | "linhas"`, `linhas?` (usa `Spinner` e `Skeleton`)
- `MensagemErro` — `titulo?`, `mensagem?`, `acao?` (usa `Alert`)

#### Portal (com a frente Contratos do núcleo)

Só desenham: os dados vêm por props, do registo de módulos e de `notificar()`. Exemplo completo em `/design-system/menu` (código em `app/design-system/menu/exemplo-portal.tsx`).

- `MenuLateral` — `itens: { id, name, route, contador? }[]`, `icones?: Record<id, Icone>`, `marca?`, `onSair?`. O item ativo vem da rota atual.
- `CabecalhoPortal` — `titulo?`, `nome?`, `perfil?`, `acoes?` (pôr aqui o sino).
- `SinoNotificacoes` — `notificacoes: { id, title, message, type, read, createdAt, link? }[]`, `onMarcarComoLida?`, `onMarcarTodas?`, `verTodasHref?` (por defeito `/notificacoes`), `maximo?`.

Os três têm de estar dentro de `<SidebarProvider>` com `<SidebarInset>` à volta do conteúdo:

```tsx
<SidebarProvider>
  <MenuLateral itens={modulosDe(eu.perfil)} icones={ICONES} onSair={sair} />
  <SidebarInset>
    <CabecalhoPortal titulo="Aulas" nome={eu.nome} perfil={eu.perfil}
      acoes={<SinoNotificacoes notificacoes={avisos} />} />
    <main className="p-4 sm:p-8">{children}</main>
  </SidebarInset>
</SidebarProvider>
```

> Os nomes dos campos seguem o rascunho da frente Contratos (`g3/contratos`). Quando os contratos estiverem fechados, revemos estes tipos.

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
import { CabecalhoPagina } from "@/components/comuns/cabecalho-pagina"
import { ACarregar } from "@/components/comuns/a-carregar"
import { EstadoVazio } from "@/components/comuns/estado-vazio"
import { MensagemErro } from "@/components/comuns/mensagem-erro"

export function ListaContratos({ aCarregar, erro, contratos }) {
  return (
    <>
      <CabecalhoPagina titulo="Contratos" />
      {aCarregar ? <ACarregar />
        : erro ? <MensagemErro mensagem={erro} />
        : contratos.length === 0 ? <EstadoVazio titulo="Sem contratos" />
        : /* tabela */ null}
    </>
  )
}
```

## Testes de acessibilidade (Aula 3)

Feitos com o axe-core (regras WCAG 2.1 AA) em `/design-system`, `/design-system/menu` e `/design-system/login`, a 1280 px e a 390 px (telemóvel): **sem problemas**.

- Teclado: separadores com setas, sino abre com Enter, avisos abrem com Tab + Enter, diálogos fecham com Esc, menu com Ctrl+B.
- Telemóvel: sem scroll horizontal; o menu abre como painel lateral.
- Contraste: o texto secundário (`#566171`) tem 4.49:1 sobre o fundo da página (`#D9DADB`), mesmo abaixo de 4.5:1. Por isso **`text-muted-foreground` usa-se só sobre cartões e painéis** (5.0 a 5.8:1); diretamente no fundo usa-se `text-foreground`.

## Próximos passos (Aula 4)

- Rever os tipos do portal quando a frente Contratos fechar os contratos.
- Entregar a secção de interface do `AGENTS.md` (rascunho em `docs/agents-secao-interface.md`).
- Demonstração: montar um ecrã de lista ao vivo só com componentes.
