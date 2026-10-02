# Design System — Regras de uso

> Responsáveis: grupos de Design (G4/G5). Dúvidas → falar connosco antes de criar componentes novos.

## Onde está cada coisa

| O quê | Onde |
|---|---|
| Cores, fonte, arredondamento (tokens) | `app/globals.css` |
| Componentes base (shadcn/ui) | `components/ui/` |
| Componentes comuns do projeto | `components/comuns/` |
| Exemplos ao vivo | rota `/design-system` |

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
- `Button` — variantes: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`; tamanhos `sm`, `default`, `lg`, `icon`.
- `Input`, `Label`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

### Comuns (`@/components/comuns/...`)
- `CabecalhoPagina` — `titulo`, `descricao?`, `acoes?`
- `EstadoVazio` — `titulo?`, `descricao?`, `acao?`
- `ACarregar` — `texto?`
- `MensagemErro` — `titulo?`, `mensagem?`, `acao?`

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

## Próximos componentes (planeado)

- Aula 2: `select`, `dialog`, `sidebar`
- Aula 3: tabela, badge, abas; integração com Contratos (cabeçalho, menu lateral, sino)
