---
name: react-interaction-tests
description: "Use when: adding Storybook interaction tests (`play` functions) to component stories in Hearth React (packages/react). Covers the storybook/test import, the await-every-expect gotcha, query/interaction patterns, and what behavior is worth testing."
argument-hint: "Component name whose stories need play functions"
---

# React Interaction Tests

## When to Use

- Adding a `play` function to a story in `packages/react/src/components/<Component>/<Component>.stories.tsx`
- `packages/react-native` already has this pattern; `packages/react` did not until interaction tests were first added to `Accordion` — treat that file as the reference example.

## Setup

Stories run as real browser tests via `@storybook/addon-vitest` (Playwright/Chromium), configured in `packages/react/vitest.config.ts`. No config changes are needed to add a `play` function — just write it.

Import test utilities from `storybook/test` (a subpath of the `storybook` package itself), **not** the older `@storybook/test` package:

```ts
import { expect, userEvent, waitFor, within } from 'storybook/test';
```

Run with:

```sh
pnpm test:storybook   # from packages/react
```

## Critical gotcha: every `expect(...)` needs `await`

`packages/react`'s ESLint config runs **type-aware** linting over `.stories.tsx` files (`@typescript-eslint/no-floating-promises` is active), and `storybook/test`'s `expect` is a web-first, auto-retrying assertion — its return type is a thenable. A bare `expect(x).toHaveAttribute(...)` statement will fail lint with:

```
Promises must be awaited... @typescript-eslint/no-floating-promises
```

Fix: prefix every standalone `expect(...)` statement with `await`, even for assertions that "look" synchronous:

```ts
await expect(trigger).toHaveAttribute('aria-expanded', 'true');
await expect(content).toBeVisible();
await expect(canvas.getByText('Content 1')).toBeInTheDocument();
```

Exception: an `expect(...)` used as the **return expression** inside a `waitFor(() => ...)` callback does not need its own `await` — `waitFor` itself is awaited, and the callback's return value isn't a floating statement:

```ts
await waitFor(() => expect(canvas.queryByText('Content 1')).not.toBeInTheDocument());
```

(`packages/react-native` doesn't hit this because its ESLint config uses non-type-checked `tseslint.configs.recommended`, so `no-floating-promises` never fires there — don't copy its bare `expect()` style into `packages/react`.)

## Query and interaction patterns

- Wrap the canvas once per `play`: `const canvas = within(canvasElement);`
- Query by accessible role/name, not by class or test id: `canvas.getByRole('button', { name: 'Item 1' })`. The accessible name usually comes from a text/`title`-style prop rendered as the trigger's children — check the component's `.tsx` to confirm what ends up as the button's text.
- For content that mounts asynchronously (e.g. after a click), use `await canvas.findByText(...)` rather than `getByText` — it retries until found.
- For content that unmounts after a close animation, wrap the disappearance assertion in `waitFor`:
  ```ts
  await waitFor(() => expect(canvas.queryByText('Content 1')).not.toBeInTheDocument());
  ```
- For content that stays mounted but toggles visibility (e.g. a `forceMount`-style prop backed by a `hidden` attribute), assert with `toBeVisible()` / `not.toBeVisible()` rather than presence/absence — `jest-dom`'s `toBeVisible` respects `hidden` on ancestors.
- Use `userEvent.click(...)` (not raw `.click()`) for interactions — it produces more realistic pointer events.

## What's worth testing

Focus `play` functions on behavior driven by **this component's own props and custom logic** — not on behavior the underlying primitive library (Radix UI / Base UI) already owns, like generic keyboard navigation or focus management. Concretely:

- Distinct prop-driven states or modes (e.g. a `type`/`variant` prop that changes how the component behaves, not just how it looks)
- Boolean flags that change behavior, not just styling (e.g. a `collapsible`-style prop, a `forceMount`-style DOM-retention prop)
- Default/initial state derived from props (e.g. `defaultValue`)
- Any bespoke DOM-manipulation logic the component adds on top of the primitive (animation-sync `hidden`-attribute toggling, custom mount/unmount timing)

Skip `play` functions for stories that are pure rendering/visual variants (custom markup composition, heading level, color scheme) with no distinct state-toggling behavior — those are already covered by the component rendering without error.

## Verify before you finish

1. `pnpm test:storybook` (from `packages/react`) — confirm the new `play` functions actually pass in the browser.
2. `pnpm lint:js` — type-aware lint; catches missing `await` on `expect(...)`.
3. `npx tsc --noEmit -p tsconfig.json` — confirm no type errors.
4. `pnpm checks` from the repo root before finishing.

Watch stderr during `test:storybook` for React warnings unrelated to the assertions themselves (e.g. an invalid DOM attribute) — rendering a story in a real browser for the first time can surface pre-existing component bugs that Storybook's static preview didn't catch.
