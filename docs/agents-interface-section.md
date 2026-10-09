# Secção «Interface» para o AGENTS.md

> Rascunho da frente Design system (G4 e G5) para a frente Contratos (G3) colar no `AGENTS.md`.
> Segue o formato do `AGENTS.md` do branch `g3/rules`: em inglês, regras curtas.
> Pode substituir a secção «Tailwind» atual (as regras dela estão todas incluídas aqui).

---

## Interface (design system)

- Live examples: `/design-system`. Usage guide: `docs/design-system.md`.
- Build screens only with `components/ui` (shadcn/ui) and `components/common`. Icons: `lucide-react` only.
- Missing a component or variant? Open an issue for G4-5. Never copy a component into a module to change it,
  and never install another component library.
- Colours only through theme tokens (`bg-primary`, `text-muted-foreground`, `bg-success`, `bg-warning`,
  `bg-destructive`, `bg-info`, `border-border`, …). No hex colours, no Tailwind palette colours
  (`bg-blue-600`), no inline `style`. Avoid arbitrary values (`w-[37px]`).
- Rebranding = change `app/globals.css` and the logo. Components never change for a rebrand.
- Every screen: one `CabecalhoPagina`, and three data states: `ACarregar` (loading),
  `EstadoVazio` (empty) and `MensagemErro` (error). Route segments also get `loading.tsx` and `error.tsx`.
- One primary `Button` per screen; others use `variant="secondary"` or `"outline"`.
  Destructive actions are confirmed with `Dialog`.
- Status labels with `Badge`: `success` (done), `warning` (pending), `destructive` (refused/expired),
  `info`, `outline` (draft/archived).
- Portal shell: `MenuLateral` (items from `modulesForRole(role)`, never hand-written), `CabecalhoPortal`
  and `SinoNotificacoes` (alerts from `notify()`), inside `SidebarProvider`. Example: `/design-system/menu`.
- Accessibility: every `Input`/`Select`/`Textarea` has a `Label` with `htmlFor`; icon-only buttons have
  `aria-label`; every image has meaningful `alt` (`alt=""` if decorative); everything works with the
  keyboard and at 390 px without horizontal scroll. `text-muted-foreground` only on cards/panels,
  not directly on the page background (contrast).
- UI text in pt-PT, short, without internal acronyms. Error messages say what happened and what to do.
