---
name: base-ui-migration
description: "Use when migrating a Hearth React component in packages/react from radix-ui to @base-ui/react, upgrading off Radix, swapping the underlying primitive library, or phasing out Radix usage. Always start in plan mode. The first deliverable is an API diff table for approval; implementation follows only after the user approves."
argument-hint: "Component name (e.g. Tabs, Checkbox, Select)"
---

# Base UI Migration

## When to Use

Migrating any component under `packages/react/src/components` that imports from `radix-ui` to use `@base-ui/react` instead.

Both packages coexist in `package.json`. You are replacing the underlying primitive, not the Hearth public API — visual styling and component composition stay the same unless base-ui forces a structural change.

---

## Phase 1 — Research (always in plan mode)

Before writing any code, gather the following:

1. **Read the current component files**
   - `packages/react/src/components/<Component>/<Component>.tsx`
   - `packages/react/src/components/<Component>/<Component>.props.ts`
   - Any sub-component files in the same folder

2. **Identify all radix primitives used**
   ```sh
   grep -r "radix-ui\|@radix-ui" packages/react/src/components/<Component>/
   ```

3. **Confirm the full subcomponent inventory**
   List every sub-component used in the target component folder (e.g. `ScrollArea`, `Viewport`, `ScrollUpButton`). Every sub-component on the Radix import must have a Base UI equivalent identified before implementation begins. Do not leave any sub-primitive on the old library.

4. **Fetch the base-ui API docs** for the equivalent component:
   ```
   https://base-ui.com/react/components/<component-slug>.md
   ```
   (slug is lowercase kebab-case, e.g. `toggle-group`, `scroll-area`)

5. **Enumerate all props before removing anything**
   For every prop on every sub-component of the target component, record:
   - The prop name
   - Where it is handled: **library-internal** (Radix/Base UI owns it) or **Hearth code** (our JSX or props file references it)

   Do not remove any prop that Radix or Base UI handles internally, even if it appears unused in Hearth's own code — the library may rely on it for accessibility, state management, or event wiring.

6. **Determine the scope of consumer impact**: which radix props are forwarded through the Hearth props interface vs. used only internally.

---

## Phase 2 — API Diff (plan deliverable, must be approved before implementation)

Produce an API diff table as the primary output of the plan. The user must approve this before any code is written.

**Table format:**

| Radix prop / part | Base UI equivalent | Change type | Exposed in Hearth props? | Consumer impact |
|-------------------|--------------------|-------------|--------------------------|-----------------|
| `Accordion.Content` | `Accordion.Panel` | structural | no | none — internal rename |
| `forceMount` | `keepMounted` | renamed | yes | deprecated shim |
| `type='single'\|'multiple'` | `multiple: boolean` | prop change | yes | breaking |
| `delayDuration` on Provider | `delay` on Provider | renamed | yes | deprecated shim |

**Rule:** Props handled internally by the library (Radix or Base UI) must not be removed even if Hearth's code does not reference them directly. Mark these as `internal` in the "Exposed in Hearth props?" column and leave them in place or map them to their Base UI equivalent.

**Change types:**
- `renamed` — same behaviour, different name; use a deprecation shim
- `removed` — no equivalent; breaking change, document migration path
- `added` — new base-ui prop with no radix equivalent; safe opt-in
- `structural` — a sub-component part is renamed (e.g. `Content` → `Popup`)
- `moved` — prop exists but is now on a different sub-component

After the table, add a **summary** of:
- Props being deprecated (old name → new name)
- Props being removed as breaking changes
- Internal structural changes (invisible to consumers)

Then produce a filled-in **Consumer Migration Prompt** (see section below).

---

## Phase 3 — Decision Framework: Deprecate vs. Break

Apply these rules when deciding how to handle each change:

| Situation | Action |
|-----------|--------|
| Single prop rename, one-to-one equivalent | Deprecation shim — keep old name, add new name, `@deprecated` JSDoc, dev `warn()` |
| Multiple related props removed together | Commit to breaking change — avoids long-term shim churn; document clearly |
| Sub-component part rename (e.g. `Content` → `Popup`) and Hearth does not re-export that type | Internal change only — no consumer impact, no shim needed |
| Sub-component part rename and Hearth re-exports the sub-component's props type | Breaking — update the exported type name or add a type alias with `@deprecated` |
| `asChild` on Hearth's public API | Keep as-is — implement internally with `@radix-ui/react-slot` or base-ui's `render` prop |
| `asChild` only used internally on a primitive sub-part | Remove, switch to base-ui `render` prop |
| `forceMount` | Always rename to `keepMounted`; deprecation shim |
| Positioning props (`side`, `align`, `sideOffset`, etc.) moved from `Content` to `Positioner` | Internal structural change — absorb in Hearth's opaque component; no consumer impact |
| Radix prop appears absent from Base UI at first glance | **Check carefully before marking as removed** — Base UI often renames rather than drops (e.g. `textValue` → `label`). Always fetch the live Base UI docs and search for synonyms before deciding to break. |

---

## Phase 4 — Implementation Patterns

### Import swap

```ts
// Before
import { Tabs as RadixTabs } from 'radix-ui';

// After — sub-path import (preferred for tree-shaking)
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
// or barrel import if the component uses several base-ui parts
import { Tabs as TabsPrimitive } from '@base-ui/react';
```

Check which style the codebase already uses for components already on base-ui and be consistent.

---

### Deprecation shim (single renamed prop)

**Type the deprecated prop by referencing the new prop's type from the Base UI primitive** — do not manually specify a type like `MouseEventHandler<HTMLElement>`. This keeps the deprecated prop automatically in sync with the real prop it maps to:

```ts
// ✅ CORRECT — deprecated prop type derived from the new prop
/** @deprecated Use `onClick` instead. */
onSelect?: ComponentPropsWithoutRef<typeof MenuPrimitive.Item>['onClick'];

// ❌ AVOID — manually-specified type that can drift
/** @deprecated Use `onClick` instead. */
onSelect?: MouseEventHandler<HTMLElement>;
```

**In the props file:**
```ts
/** @deprecated Use `keepMounted` instead. Will be removed in the next major version. */
forceMount?: true;
/** Keep the panel mounted in the DOM even when closed. */
keepMounted?: ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>['keepMounted'];
```

Note: always pull `keepMounted`'s type from the primitive sub-part that actually owns it (e.g. `Portal`, not `Popup`).

**In the component file:**
    import { warn } from '../../helpers/logger';

    warn(
      forceMount !== undefined,
      '<ComponentName>: the `forceMount` prop is deprecated. Use `keepMounted` instead.'
    );
    const resolvedKeepMounted = keepMounted ?? (forceMount ? true : undefined);

---

### `asChild` — public API stays, internals change

If the Hearth component exposes `asChild` to consumers, **keep it**. Implement it internally using `@radix-ui/react-slot` (already a dep) or base-ui's `render` prop — whichever fits the shape of the new primitive.

Where `asChild` was used only **inside** Hearth's JSX on a primitive sub-part and is not consumer-facing, switch to base-ui's `render` prop:

```tsx
// Before (radix — internal use)
<CheckboxPrimitive.Indicator asChild className={indicatorClass}>
  <TickSmallIcon />
</CheckboxPrimitive.Indicator>

// After (base-ui — internal use)
<CheckboxPrimitive.Indicator
  render={<TickSmallIcon className={indicatorClass} />}
/>
```

---

### `Content` → `Popup` + `Positioner` (Tooltip, Popover, Select)

Base UI splits Radix's single `Content` part into two:
- `Positioner` — handles position, collision avoidance, alignment
- `Popup` — the visible content element

Because Hearth's components are opaque (consumers don't compose raw primitives), this is an internal structural change. Map Radix `Content` props as follows:

| Radix (on Content) | Base UI location |
|--------------------|-----------------|
| `side`, `align`, `sideOffset`, `alignOffset` | `Positioner` |
| `avoidCollisions`, `collisionPadding`, `collisionBoundary` | `Positioner` (as `collisionAvoidance`) |
| `className`, styling | `Popup` |
| `forceMount` | `Popup keepMounted` (after shim) |

Example:
```tsx
// Before (radix)
<PopoverPrimitive.Content side={side} sideOffset={8} className={contentClass}>
  {children}
</PopoverPrimitive.Content>

// After (base-ui)
<PopoverPrimitive.Positioner side={side} sideOffset={8}>
  <PopoverPrimitive.Popup className={contentClass}>
    {children}
  </PopoverPrimitive.Popup>
</PopoverPrimitive.Positioner>
```

---

### Props file updates

- Remove `Omit<ComponentPropsWithRef<typeof SomeRadixPrimitive.Xxx>, ...>` base types
- Replace with base-ui equivalent types or explicit prop declarations
- Add `@deprecated` JSDoc to shim props
- Keep the same exported interface/type names — consumers' TypeScript must not break

**For opaque popup/content components, write a fully explicit interface** rather than inheriting from the Base UI `Popup` type and `Omit`-ing things. Base UI's `Popup` type carries internals (`render`, `style` callbacks, `nativeButton`, etc.) that leak into the public API. Instead, declare only what consumers actually need:

```ts
// ✅ CORRECT — explicit interface, only consumer-facing props
export interface MenuContentProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  keepMounted?: ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>['keepMounted'];
  /** @deprecated Use `keepMounted` instead. */
  forceMount?: true;
}

// ❌ AVOID — inherits internals (render, style callbacks, nativeButton…)
export type MenuContentProps = Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.Popup>,
  'render' | 'className'
> & { ... };
```

Similarly, when inheriting from a Base UI item/trigger type, omit internal props consumers should never see: `'render' | 'children' | 'nativeButton' | 'style'` (Base UI uses `style` as a state callback — redeclare it as `CSSProperties` if needed).

---

## Consumer Migration Prompt Template

When the API diff reveals consumer-facing changes (renamed or removed props), generate a filled-in version of this prompt and include it in the plan output and the PR description.

```
I'm upgrading @utilitywarehouse/hearth-react. The <ComponentName> component has
migrated from Radix UI to Base UI internally. The following prop changes affect consumers:

RENAMED (deprecated — old name still works but will warn):
  - `<oldPropA>` → `<newPropA>`: <reason>
  - `<oldPropB>` → `<newPropB>`: <reason>

REMOVED (breaking):
  - `<removedProp>`: <migration guidance or alternative>

Please search this codebase for all usages of <ComponentName> imported from
'@utilitywarehouse/hearth-react' and apply the following changes:
  - Replace every `<oldPropA>=` with `<newPropA>=`
  - Replace every `<oldPropB>=` with `<newPropB>=`
  - Remove `<removedProp>` — [describe what to do instead]

Do not change any other logic, styling, or structure. After making changes,
run TypeScript to confirm no type errors remain.
```

If there are no consumer-facing changes, state that explicitly: "No prop changes affect consumers — this is an internal implementation change only."

---

## Known Component Mappings Reference

**Load-trigger:** If the target component is one of `Accordion`, `Tabs`, `Checkbox`, `Switch`, `Radio`, `Select`, `Tooltip`, or `Popover`, read `references/component-mappings.md` before Phase 2. It contains the Radix → Base UI prop mappings for each component, organized by section. For unmapped components, proceed with live base-ui docs as your reference.

---

## After Implementation

1. **Run checks:**
   ```sh
   pnpm checks
   ```

2. **Regenerate LLM docs** (if public component API changed):
   ```sh
   pnpm generate:llm-docs
   ```

3. **Add to `.docs.mdx`** — if there are any consumer-facing changes, add a `## Migration` section at the bottom of the component's docs file describing the change and the old → new prop names.

4. **Create a changeset** (see `add-changeset` skill):
   - `patch` for deprecation-only (old names still work)
   - `minor` for breaking prop removals

5. **Include in the PR description:**
   - The API diff table
   - The consumer migration prompt (if applicable)
   - A note that visual output is unchanged

---

## Checklist

- [ ] API diff table produced and approved before any code written
- [ ] All `radix-ui` imports in the component folder replaced with `@base-ui/react`
- [ ] Deprecated props have `@deprecated` JSDoc + dev-mode `warn()`
- [ ] Public prop interface name unchanged (no consumer TypeScript breakage)
- [ ] `asChild` preserved on public API where it existed
- [ ] Internal `asChild` usage on primitives replaced with base-ui `render` prop
- [ ] Breaking changes documented in `.docs.mdx` under `## Migration`
- [ ] `pnpm checks` passes
- [ ] `pnpm generate:llm-docs` run if public API changed
- [ ] Changeset created with correct semver bump
- [ ] Consumer migration prompt included in PR description (or note that none is needed)
- [ ] Every prop enumerated and classified (library-internal vs. Hearth code) before any prop was removed
- [ ] Every subcomponent (ScrollArea, Viewport, etc.) confirmed migrated — no sub-primitive left on radix-ui
