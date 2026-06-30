---
name: base-ui-migration
description: "Use when migrating a Hearth React component in packages/react from radix-ui to @base-ui/react. Always start in plan mode. The first deliverable is an API diff table for approval; implementation follows only after the user approves."
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

3. **Fetch the base-ui API docs** for the equivalent component:
   ```
   https://base-ui.com/react/components/<component-slug>.md
   ```
   (slug is lowercase kebab-case, e.g. `toggle-group`, `scroll-area`)

4. **Determine the scope of consumer impact**: which radix props are forwarded through the Hearth props interface vs. used only internally.

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

**In the props file:**
```ts
/** @deprecated Use `keepMounted` instead. Will be removed in the next major version. */
forceMount?: true;
/** Keep the panel mounted in the DOM even when closed. */
keepMounted?: boolean;
```

**In the component file:**
```tsx
if (process.env.NODE_ENV !== 'production' && forceMount !== undefined) {
  console.warn(
    '[Hearth] <ComponentName>: the `forceMount` prop is deprecated. Use `keepMounted` instead.'
  );
}
const resolvedKeepMounted = keepMounted ?? (forceMount ? true : undefined);
```

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

Use these as a starting point. Always verify against the live base-ui docs — APIs evolve.

### Accordion

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Accordion.Root` type `'single'` | `Accordion.Root` (default) | `type` prop removed |
| `Accordion.Root` type `'multiple'` | `Accordion.Root multiple` | `type` replaced by `multiple: boolean` |
| `Accordion.Root collapsible` | _(always collapsible)_ | remove prop |
| `Accordion.Content` | `Accordion.Panel` | internal rename |
| `forceMount` on Content | `keepMounted` on Panel | deprecation shim |

### Tabs

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Tabs.Trigger` | `Tabs.Tab` | internal rename |
| `Tabs.Content` | `Tabs.Panel` | internal rename |
| `activationMode` on Root | `activateOnFocus` on `Tabs.List` | moved + renamed; expose on Hearth's List sub-component if needed |
| `forceMount` on Content | `keepMounted` on Panel | deprecation shim |

### Checkbox

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Indicator asChild` | `Indicator render` | internal only |
| _(none)_ | `parent`, `uncheckedValue`, `nativeButton` | new base-ui props; opt-in |

### Switch

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Switch.Thumb` | `Switch.Thumb` | no change |
| _(none)_ | `uncheckedValue`, `nativeButton` | new opt-in props |

### Radio

| Radix | Base UI | Notes |
|-------|---------|-------|
| `RadioGroup.Item` | `Radio.Root` | internal rename |
| `RadioGroup.Indicator` | `Radio.Indicator` | internal rename |
| `onValueChange` | `onValueChange` (with `eventDetails`) | same name, richer signature |

### Select

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Select.Content` | `Select.Popup` + `Select.Positioner` | structural split (internal) |
| `Select.Viewport` | _(built into List)_ | remove from JSX |
| `Select.ScrollUpButton` | `Select.ScrollUpArrow` | internal rename |
| `Select.ScrollDownButton` | `Select.ScrollDownArrow` | internal rename |

### Tooltip

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Tooltip.Content` | `Tooltip.Popup` + `Tooltip.Positioner` | structural split (internal) |
| `Provider delayDuration` | `Provider delay` | renamed; deprecation shim |
| `Provider skipDelayDuration` | `Provider timeout` | renamed; deprecation shim |
| `Root disableHoverableContent` | `Root disableHoverablePopup` | renamed; deprecation shim |

### Popover

| Radix | Base UI | Notes |
|-------|---------|-------|
| `Popover.Content` | `Popover.Popup` + `Popover.Positioner` | structural split (internal) |
| `avoidCollisions`, `collisionPadding` | `collisionAvoidance` on Positioner | if exposed, deprecation shim or breaking |

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
   - `minor` for deprecation-only (old names still work)
   - `major` for breaking prop removals

5. **Include in the PR description:**
   - The API diff table
   - The consumer migration prompt (if applicable)
   - A note that visual output is unchanged

---

## Checklist

- [ ] API diff table produced and approved before any code written
- [ ] All `radix-ui` imports in the component folder replaced with `@base-ui/react`
- [ ] Deprecated props have `@deprecated` JSDoc + dev-mode `console.warn`
- [ ] Public prop interface name unchanged (no consumer TypeScript breakage)
- [ ] `asChild` preserved on public API where it existed
- [ ] Internal `asChild` usage on primitives replaced with base-ui `render` prop
- [ ] Breaking changes documented in `.docs.mdx` under `## Migration`
- [ ] `pnpm checks` passes
- [ ] `pnpm generate:llm-docs` run if public API changed
- [ ] Changeset created with correct semver bump
- [ ] Consumer migration prompt included in PR description (or note that none is needed)
