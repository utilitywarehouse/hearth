# Plan: Menu — Radix UI → Base UI Migration

## Context

Migrate `packages/react/src/components/Menu` from `radix-ui` (`DropdownMenu` primitive) to `@base-ui/react` (`Menu`). Both packages coexist in `package.json`. Goal: eliminate the `radix-ui` import from the Menu folder without changing visual output, public component API (where possible), or composition patterns.

The Menu folder has 4 sub-components: `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`.

---

## Phase 2 — API Diff

### Full diff table

| Radix prop / part | Base UI equivalent | Change type | Exposed in Hearth props? | Consumer impact |
|-------------------|--------------------|-------------|--------------------------|-----------------|
| `DropdownMenu.Root` | `Menu.Root` | structural | — | none |
| `Root: dir` | removed | removed | omitted already | none |
| `Root: modal` | `Root: modal` | same | yes (pass-through) | none |
| `Root: open / onOpenChange / defaultOpen` | same | same | yes (pass-through) | none |
| `DropdownMenu.Trigger` | `Menu.Trigger` | structural | — | none |
| `Trigger: asChild` (hardcoded internally) | `Trigger: render` prop | internal | omitted from public API | none |
| `DropdownMenu.Portal` | `Menu.Portal` | structural | — | none |
| `Portal: forceMount` | `Positioner/Popup: keepMounted` | renamed | **yes** | deprecation shim |
| `DropdownMenu.Content` | `Menu.Positioner` + `Menu.Popup` | structural | — | none — content is opaque |
| `Content: side / align` (via `placement`) | `Positioner: side / align` | internal | `placement` custom prop kept | none |
| `Content: sideOffset` (hardcoded 4) | `Positioner: sideOffset` | internal | not exposed | none |
| `Content: collisionPadding` (hardcoded 8) | `Positioner: collisionPadding` | internal | not exposed | none |
| `Content: onCloseAutoFocus` (workaround) | not needed | removed | not exposed | none |
| `Content: onInteractOutside` (forceMount workaround) | not needed — base-ui handles keepMounted natively | removed | not exposed | none |
| MutationObserver hide/show logic | not needed | removed | — | none (simpler impl) |
| `ScrollAreaPrimitive` inside content | `Menu.Viewport` | structural | — | none |
| `DropdownMenu.Item` | `Menu.Item` | structural | — | none |
| `Item: onSelect` | `Item: onClick` | renamed | **yes** (inherited via `ComponentPropsWithRef`) | **breaking** |
| `Item: textValue` | removed | removed | **yes** (inherited) | **breaking** |
| `Item: asChild` | removed | removed | **yes** (inherited, but never worked) | **breaking** |
| `Item: closeOnClick` | `Item: closeOnClick` | added | — | new opt-in |

### Decision summary

**Deprecation shim (minor bump):**
- `MenuContent: forceMount` → `keepMounted` — single rename, straightforward equivalent.

**Breaking changes (major bump):**
- `MenuItem: onSelect` removed → consumers should use `onClick`. These are clustered, so we commit to the break rather than shimming.
- `MenuItem: textValue` removed → no equivalent needed.
- `MenuItem: asChild` removed → it was in the inherited type but the component never forwarded it; practically unused.

**Internal changes (no consumer impact):**
- All structural renames (`Content` → `Positioner + Popup`, `Portal`, `Trigger` render pattern)
- Removal of the MutationObserver + `onCloseAutoFocus` + `onInteractOutside` workarounds
- `ScrollAreaPrimitive` → `Menu.Viewport`

---

## Implementation plan

### `Menu.tsx` + `Menu.props.ts`

Swap import, no other changes. `Menu.Root` has an identical surface to `DropdownMenu.Root` for the props Hearth exposes.

```ts
// Before
import { DropdownMenu as MenuPrimitive } from 'radix-ui';
export type MenuProps = Omit<ComponentPropsWithRef<typeof MenuPrimitive.Root>, 'dir'>;

// After
import { Menu as MenuPrimitive } from '@base-ui/react';
export type MenuProps = ComponentPropsWithRef<typeof MenuPrimitive.Root>;
// (dir doesn't exist on base-ui Root so no Omit needed)
```

### `MenuTrigger.tsx` + `MenuTrigger.props.ts`

Replace `asChild` with base-ui `render` prop. The public API is unchanged — consumers still pass a single child element as the trigger.

```tsx
// Before
<MenuPrimitive.DropdownMenuTrigger ref={ref} className={cn(componentClassName, className)} asChild {...props} />

// After — children rendered via the render prop (equivalent to asChild)
<MenuPrimitive.Trigger
  ref={ref}
  className={cn(componentClassName, className)}
  render={children as React.ReactElement}
  {...rest}  // everything except children
/>
```

Props type: replace `ComponentPropsWithRef<typeof MenuPrimitive.DropdownMenuTrigger>` with `ComponentPropsWithRef<typeof MenuPrimitive.Trigger>`, keep the same `Omit<..., 'asChild'>` exclusion (base-ui doesn't have asChild, but we omit `render` instead to keep the render implementation internal).

### `MenuContent.tsx` + `MenuContent.props.ts`

Largest change. Three sub-goals:
1. Replace Portal + Content with Portal + Positioner + Popup
2. Replace `forceMount` with `keepMounted` (deprecation shim)
3. Replace `ScrollAreaPrimitive` with `Menu.Viewport`
4. Remove the MutationObserver and workaround event handlers (no longer needed)

```tsx
// After structure
<MenuPrimitive.Portal keepMounted={resolvedKeepMounted}>
  <MenuPrimitive.Positioner
    {...placementTranslation[placement]}
    sideOffset={4}
    collisionPadding={8}
  >
    <MenuPrimitive.Popup
      ref={ref}
      className={cn(componentClassName, className)}
      {...rest}
    >
      <MenuPrimitive.Viewport className={`${componentClassName}List`}>
        {children}
      </MenuPrimitive.Viewport>
    </MenuPrimitive.Popup>
  </MenuPrimitive.Positioner>
</MenuPrimitive.Portal>
```

Props type: rebuild `MenuContentProps` without inheriting from Radix types. Keep `placement` and `keepMounted` (plus deprecated `forceMount`). Drop all the omitted Radix props that no longer exist.

Deprecation shim:
```tsx
if (process.env.NODE_ENV !== 'production' && forceMount !== undefined) {
  console.warn('[Hearth] MenuContent: `forceMount` is deprecated. Use `keepMounted` instead.');
}
const resolvedKeepMounted = keepMounted ?? (forceMount ? true : undefined);
```

### `MenuItem.tsx` + `MenuItem.props.ts`

Swap `DropdownMenu.Item` → `Menu.Item`. Rebuild props type explicitly (stop inheriting from Radix type) to remove `onSelect`, `textValue`, `asChild`.

```ts
// Before
export interface MenuItemProps extends ComponentPropsWithRef<typeof MenuPrimitive.Item> {
  colorScheme?: 'functional' | 'destructive';
}

// After
export interface MenuItemProps extends ComponentPropsWithRef<typeof MenuPrimitive.Item> {
  colorScheme?: 'functional' | 'destructive';
  // onSelect / textValue / asChild are gone — breaking change
}
```

The component implementation stays the same (spread `...props` onto `Menu.Item`).

---

## Files to modify

| File | Change |
|------|--------|
| `Menu/Menu.tsx` | import swap only |
| `Menu/Menu.props.ts` | import swap, remove unnecessary `Omit` |
| `Menu/MenuTrigger.tsx` | import swap, `asChild` → `render` prop |
| `Menu/MenuTrigger.props.ts` | import swap, update base type |
| `Menu/MenuContent.tsx` | import swap, Portal+Positioner+Popup structure, keepMounted shim, remove workarounds, Menu.Viewport |
| `Menu/MenuContent.props.ts` | rebuild type, add keepMounted + deprecated forceMount |
| `Menu/MenuItem.tsx` | import swap |
| `Menu/MenuItem.props.ts` | import swap, rebuild without Radix-specific props |

---

## Consumer migration prompt

```
I'm upgrading @utilitywarehouse/hearth-react. The MenuItem component has breaking
prop changes as part of a migration from Radix UI to Base UI.

REMOVED (breaking):
  - `onSelect`: Use `onClick` instead. Standard React onClick works the same way
    for both mouse and keyboard activation.
  - `textValue`: Remove this prop — it has no equivalent and is no longer needed.
  - `asChild`: Remove this prop — it was never functional on MenuItem.

Please search this codebase for all usages of MenuItem imported from
'@utilitywarehouse/hearth-react' and apply the following changes:
  - Replace every `onSelect=` with `onClick=`
  - Remove every `textValue=` prop and its value
  - Remove every `asChild` prop

Do not change any other logic, styling, or structure. After making changes,
run TypeScript to confirm no type errors remain.
```

`MenuContent.forceMount` continues to work (with a deprecation warning) — no immediate action needed for consumers using it, but they should migrate to `keepMounted`.

---

## Verification

1. `pnpm checks` — lint + types must pass
2. `pnpm dev:react` — open Storybook, navigate to Menu stories, verify:
   - Menu opens and closes correctly
   - `placement` variants all position correctly
   - Items are clickable and close the menu
   - `keepMounted` (and deprecated `forceMount`) keeps DOM mounted when closed
3. `pnpm generate:llm-docs` — because `MenuItem` public API changed

---

## Changeset

- `major` bump for `@utilitywarehouse/hearth-react` (breaking `MenuItem` prop removals)
- Changelog entry: note `onSelect` → `onClick`, `textValue` removed, `MenuContent.forceMount` deprecated → `keepMounted`

---

## Skill structure

### Frontmatter
```yaml
---
name: base-ui-migration
description: "Use when migrating a Hearth React component from radix-ui to base-ui. Always start in plan mode. First step is a full API diff; implementation follows only after approval."
argument-hint: "Component name (e.g. Tabs, Checkbox, Select)"
---
```

### Sections

1. **When to Use** — migrating any component in `packages/react` that imports from `radix-ui`

2. **Phase 1 — Research (always in plan mode)**  
   Steps to run before writing any code:
   - Read the current component files: `<Component>.tsx`, `<Component>.props.ts`
   - Fetch `https://base-ui.com/react/components/<component-slug>.md` for the base-ui API
   - Grep the existing hearth component to find every radix primitive used
   - Identify which radix props are currently exposed through the Hearth props interface vs. silently passed through

3. **Phase 2 — API Diff (output of plan, must be approved)**  
   Format: produce a table with columns: `Radix prop/part`, `Base UI equivalent`, `Change type`, `Consumer impact`.  
   Change types:
   - `renamed` — use deprecation shim
   - `removed` — breaking change, document migration path
   - `added` — new opt-in, no consumer impact
   - `structural` — component part renamed (e.g. `Content` → `Popup`)
   - `moved` — prop moved to a different sub-component

4. **Decision framework: deprecate vs. break**  
   - Single prop rename → deprecate with `@deprecated` JSDoc + console.warn in dev + accept both old and new name
   - Multiple related props removed at once → commit to breaking change (avoids long-term shim churn)
   - Structural sub-component renames (e.g. `TabsContent` → `TabPanel`) are internal to Hearth so they're only breaking if Hearth re-exports the sub-component type
   - `asChild` on Hearth's **public API** → keep as-is. Implement internally using either `@radix-ui/react-slot` (already a dep) or base-ui's `render` prop pattern — whichever is cleaner. Consumers should never see this change.
   - `asChild` that was only used **internally** in the primitive JSX (e.g. `<Indicator asChild>`) → switch to base-ui's `render` prop
   - `forceMount` → always rename to `keepMounted` (deprecate with shim)

5. **Implementation patterns**

   **Import swap:**
   ```ts
   // Before
   import { Tabs as RadixTabs } from 'radix-ui';
   // After
   import * as TabsPrimitive from '@base-ui/react/tabs';
   // or the barrel:
   import { Tabs as TabsPrimitive } from '@base-ui/react';
   ```

   **Deprecation shim (single prop rename):**
   ```tsx
   // In component .tsx
   if (process.env.NODE_ENV !== 'production' && legacyProp !== undefined) {
     console.warn('[Hearth] <ComponentName> prop `legacyProp` is deprecated. Use `newProp` instead.');
   }
   const resolvedProp = newProp ?? legacyProp;
   ```
   And in props file:
   ```ts
   /** @deprecated Use `newProp` instead. Will be removed in next major. */
   legacyProp?: SomeType;
   newProp?: SomeType;
   ```

   **`asChild` — public API stays, internals change:**  
   If the Hearth component exposes `asChild` publicly, keep it. Implement it using `@radix-ui/react-slot` (which remains a dep) to merge props onto the child, or if the base-ui primitive's `render` prop is a cleaner fit, use that internally and map `asChild` + `children` into it.  
   Where `asChild` was only used **inside** Hearth's JSX on a primitive sub-part (not exposed to consumers), replace with base-ui's `render` prop:
   ```tsx
   // Before (radix internal)
   <CheckboxPrimitive.Indicator asChild className={indicatorClass}>
     <TickSmallIcon />
   </CheckboxPrimitive.Indicator>
   // After (base-ui internal)
   <CheckboxPrimitive.Indicator
     render={<TickSmallIcon className={indicatorClass} />}
   />
   ```

   **`forceMount` → `keepMounted`:**
   ```tsx
   // In props file — deprecation shim
   /** @deprecated Use `keepMounted`. */
   forceMount?: true;
   keepMounted?: boolean;
   ```
   ```tsx
   // In component
   const resolvedKeepMounted = keepMounted ?? (forceMount ? true : undefined);
   ```

   **Content → Popup + Positioner (Tooltip, Popover, Select):**  
   Base-ui splits Radix's single `Content` part into `Positioner` (handles position/collision) + `Popup` (the visible element). Hearth's internal JSX structure changes but the public prop surface need not if Hearth's component is already opaque (i.e. consumers don't compose the primitive directly). Document in plan which props were on Radix Content and map them: `side`, `align`, `sideOffset`, `alignOffset`, `collisionPadding`, `avoidCollisions` → move to Positioner. Content styling props → move to Popup.

6. **Known component mappings reference**

   | Component | Radix part | Base UI part | Notes |
   |-----------|-----------|--------------|-------|
   | Accordion | `Accordion.Content` | `Accordion.Panel` | internal rename |
   | Accordion | `type='single'\|'multiple'` | `multiple: boolean` | prop change on Root |
   | Accordion | `collapsible` | _(always collapsible)_ | remove prop |
   | Accordion | `forceMount` on Content | `keepMounted` on Panel | deprecate shim |
   | Tabs | `Tabs.Trigger` | `Tabs.Tab` | internal rename |
   | Tabs | `Tabs.Content` | `Tabs.Panel` | internal rename |
   | Tabs | `activationMode` on Root | `activateOnFocus` on List | moved + renamed; expose on Hearth's TabsList if needed |
   | Tabs | `forceMount` on Content | `keepMounted` on Panel | deprecate shim |
   | Checkbox | `Indicator asChild` | `Indicator render` | internal only |
   | Checkbox | _(none exposed)_ | `parent`, `uncheckedValue`, `nativeButton` | new opt-ins |
   | Switch | `Thumb` part (same name) | `Switch.Thumb` | no change |
   | Switch | _(none exposed)_ | `uncheckedValue`, `nativeButton` | new opt-ins |
   | Radio | `RadioGroup.Item` | `Radio.Root` | internal rename |
   | Radio | `RadioGroup.Indicator` | `Radio.Indicator` | internal rename |
   | Select | `Select.Content` | `Select.Popup` (+ `Select.Positioner`) | structural split |
   | Select | `Select.Viewport` | _(built into List)_ | remove from JSX |
   | Select | `Select.ScrollUpButton/Down` | `Select.ScrollUpArrow/DownArrow` | internal rename |
   | Tooltip | `Tooltip.Content` | `Tooltip.Popup` (+ `Tooltip.Positioner`) | structural split |
   | Tooltip | `Provider delayDuration` | `Provider delay` | rename; deprecate shim |
   | Tooltip | `Provider skipDelayDuration` | `Provider timeout` | rename; deprecate shim |
   | Tooltip | `disableHoverableContent` on Root | `disableHoverablePopup` on Root | rename; deprecate shim |
   | Popover | `Popover.Content` | `Popover.Popup` (+ `Popover.Positioner`) | structural split |
   | Popover | `avoidCollisions`, `collisionPadding` | `collisionAvoidance` on Positioner | if exposed, map |

7. **Props file updates**  
   - Remove any `Omit<ComponentPropsWithRef<typeof RadixPrimitive.Xxx>, ...>` base types
   - Replace with equivalent base-ui types or explicit prop lists
   - Add `@deprecated` JSDoc to any shim props
   - Keep the same exported interface name so consumers' TypeScript doesn't break

8. **Consumer migration prompt**  
   Include a ready-to-paste agent prompt for consumers to migrate their usage. Template:

   ```
   I'm upgrading to a new version of @utilitywarehouse/hearth-react where <ComponentName>
   has migrated from Radix UI to Base UI internally. The following prop changes affect consumers:

   <PASTE THE BREAKING/RENAMED PROPS FROM THE API DIFF TABLE>

   Please search this codebase for all usages of <ComponentName> from
   '@utilitywarehouse/hearth-react' and apply the following changes:
   - Replace `<oldProp>` with `<newProp>` on every usage
   - [list other changes]

   Do not change any other logic or styling. After making changes, run TypeScript to verify.
   ```
   The agent producing the migration should generate a filled-in version of this prompt as part of its plan output.

9. **Changeset**  
   After implementation, run `pnpm changeset`. Use `minor` for deprecation-only changes, `major` for breaking prop removals. Follow the `add-changeset` skill.

10. **Checklist**
    - [ ] API diff table produced and approved before any code written
    - [ ] All radix imports replaced with base-ui equivalents
    - [ ] Deprecated props have `@deprecated` JSDoc + dev-mode `console.warn`
    - [ ] Breaking changes documented in `.docs.mdx` under a "Migration" section
    - [ ] `pnpm checks` passes
    - [ ] `pnpm generate:llm-docs` run if public API changed
    - [ ] Changeset created
    - [ ] Consumer migration prompt included in PR description

---

## Files to create

- `.agents/skills/base-ui-migration/SKILL.md` (new file)

No symlink action needed — the `.claude/skills → ../.agents/skills` symlink already covers it.

---

## Verification

1. Run `ls .claude/skills/` to confirm the skill is discoverable
2. Invoke `/base-ui-migration Checkbox` and verify it enters plan mode and outputs an API diff table
3. `pnpm checks` must pass after any migration implemented with the skill
