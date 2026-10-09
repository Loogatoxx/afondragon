# Secção «Interface» para o AGENTS.md

> Rascunho da frente Design system (G4 e G5) para entregar à frente Contratos do núcleo (G3).
> O `AGENTS.md` é da frente Contratos: são eles que colam esta secção no ficheiro final.
> Quando os contratos do módulo e da notificação estiverem fechados, revemos os nomes dos campos.

---

## Interface

Todos os ecrãs são montados com o Design system. Exemplos ao vivo em `/design-system`; regras completas em `docs/design-system.md`.

### Componentes

- Usar **só** componentes de `components/ui/` (shadcn/ui) e `components/comuns/`.
- Não copiar um componente para a pasta do módulo para o alterar. Falta um componente ou uma variante? Abre-se uma issue para a frente Design system.
- Não instalar outra biblioteca de componentes (MUI, Bootstrap, Chakra, …).
- Ícones: só `lucide-react`.

### Cores e estilos

- Usar só as classes do tema: `bg-primary`, `text-primary-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-sucesso`, `bg-aviso`, `bg-destructive`, `bg-info`, …
- **Proibido:** cores do Tailwind (`bg-blue-600`, `text-gray-500`), códigos (`#2B44E6`, `text-[#333]`) e `style={{ ... }}` com cores.
- Mudar de universidade = mudar as variáveis em `app/globals.css` e o logótipo. Nunca os componentes.

### Estrutura de cada ecrã

```tsx
<CabecalhoPagina titulo="Aulas" descricao="As tuas unidades curriculares" />

{aCarregar ? <ACarregar variante="linhas" />
  : erro ? <MensagemErro mensagem="Não foi possível carregar as aulas." />
  : aulas.length === 0 ? <EstadoVazio titulo="Ainda não tens aulas" />
  : <Table>…</Table>}
```

- Um `CabecalhoPagina` por ecrã.
- Todos os ecrãs com dados têm **três estados**: a carregar (`ACarregar`), vazio (`EstadoVazio`) e erro (`MensagemErro`).
- Um só botão principal (`<Button>`) por ecrã; os outros são `variant="secondary"` ou `"outline"`.
- Estados de pedidos e registos com `<Badge>`: `sucesso` (concluído), `aviso` (pendente), `destructive` (recusado/expirado), `info`, `outline` (rascunho/arquivado).
- Confirmar ações destrutivas com `<Dialog>`.

### Portal (menu, cabeçalho e sino)

- O menu lateral é o `<MenuLateral itens={…} icones={…} />` e nasce **sempre** do registo de módulos (`modulosDe(perfil)`). Nunca se escreve o menu à mão.
- O cabeçalho é o `<CabecalhoPortal />`, com o `<SinoNotificacoes />` em `acoes`.
- Exemplo completo em `/design-system/menu`.

### Acessibilidade

- Cada `Input`/`Select` tem um `Label` com `htmlFor`.
- Botões só com ícone têm `aria-label`.
- Tudo funciona só com teclado (Tab, setas, Enter, Esc) e no telemóvel (390 px, sem scroll horizontal).
- `text-muted-foreground` só sobre cartões e painéis, não diretamente no fundo da página (contraste insuficiente).

### Texto

- Português de Portugal, curto e sem siglas internas («Guardar», não «Submeter form»).
- Mensagens de erro dizem o que aconteceu e o que fazer.
