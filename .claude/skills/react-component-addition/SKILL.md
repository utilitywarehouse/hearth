---
name: react-component-addition
description: "Use when: adding a new component to Hearth React (packages/react). Covers file structure, props patterns, forwardRef, extractProps, stories, docs, and index.ts exports. Invoke this skill any time someone asks to create, scaffold, or add a new component to packages/react — even if they don't say 'skill'."
argument-hint: "Component name and any Radix/Base UI primitives it wraps"
---

# React Component Addition

## When to Use
- Adding a new component under `packages/react/src/components`
- Creating the props, stories, docs, and export wiring for a new component
- Wrapping a Radix UI or Base UI primitive into a Hearth component

## Before You Start
- Check whether a similar component already exists in the library.
- Identify whether the component wraps a Radix/Base UI primitive or a native HTML element.
- Confirm any variant/size tokens required for the component's CSS.
- For architectural context — styling pipeline, token pipeline, build system, testing setup — see [`packages/react/CLAUDE.md`](../../../packages/react/CLAUDE.md).

---

## Standard Folder Structure

```
packages/react/src/components/<Component>/
  <Component>.tsx           # Component implementation
  <Component>.props.ts      # Prop definitions (PropDef object + TypeScript interface)
  <Component>.stories.tsx   # Storybook stories
  <Component>.docs.mdx      # Storybook docs (optional but expected for new components)
  <Component>.css           # Component CSS (always required)
  <Component>.context.ts    # React context (only for composite/compound components)
  <SubComponent>.tsx        # Sub-components (compound patterns)
  <SubComponent>.props.ts
```

No `index.ts` per component folder — components are exported directly from the root `src/index.ts`.

---

## Props File (`<Component>.props.ts`)

Use the `PropDef` system to describe how props map to CSS classes. Read [`references/props-conventions.md`](references/props-conventions.md) when writing `<Component>.props.ts` — it covers the PropDef example, interface-vs-type rule, incorporating primitive props, avoiding extra named types, and prop ordering.

---

## Component File (`<Component>.tsx`)

Read [`references/implementation-conventions.md`](references/implementation-conventions.md) when writing `<Component>.tsx` — it covers the forwardRef pattern, the component JSDoc rule, Radix/Base UI import suffixing, Flex-based layout, typography components, space tokens, PropDef/data-* state classes, and the `warn` helper.

---

## CSS File (`<Component>.css`)

Every component needs a CSS file. The root selector uses the `h-` prefixed class name. See [CSS conventions](references/css-conventions.md) for selector patterns, token rules, and the full example.

```css
.h-MyComponent {
  gap: var(--h-my-component-gap);
  border-radius: var(--h-my-component-border-radius);
  padding: var(--h-my-component-padding);

  &:where(.h-variant-subtle) { ... }
  &:where([data-colorscheme='info']) { ... }

  @breakpoints {
    &:where(.h-r-size-md) { ... }
  }

  & :where(.h-MyComponentSubElement) { ... }
}
```

Register the file in `src/components/index.css`:

```css
@import url('./MyComponent/MyComponent.css');
```

---

## Storybook Stories (`<Component>.stories.tsx`)

Read [`references/stories-conventions.md`](references/stories-conventions.md) when writing `<Component>.stories.tsx` — it covers one-concept-per-story, JSDoc-on-every-story, `KitchenSink` tagging, the full UW service options table, and a complete stories example.

---

## Docs (`<Component>.docs.mdx`)

Read [`references/docs-conventions.md`](references/docs-conventions.md) when writing `<Component>.docs.mdx` — it covers the MDX template, section heading guidance, valid `sourceState` values, API section rules, the compound component API pattern, and optional sections (Alternatives, Accessibility).

---

## Exporting from `src/index.ts`

Add exports at the **bottom** of `src/index.ts`, with an **empty line** between the new exports and the previous component's exports.

```ts
// ... existing exports above ...

export { AnotherExistingComponent } from './components/AnotherExisting/AnotherExisting';
export type { AnotherExistingComponentProps } from './components/AnotherExisting/AnotherExisting.props';

// ← empty line here
export { MyComponent } from './components/MyComponent/MyComponent';
export type { MyComponentProps } from './components/MyComponent/MyComponent.props';
// For compound components, add sub-component exports in the same block:
export { MyComponentItem } from './components/MyComponent/MyComponentItem';
export type { MyComponentItemProps } from './components/MyComponent/MyComponentItem.props';
```

Rules:
- Always export the component **and** its props type (`export type`)
- No wildcard exports
- Add to the bottom — do not insert in the middle of the file

---

## Figma Code Connect

Every new component should have a Figma Code Connect template file. See the [`/figma-code-connect`](./../figma-code-connect/SKILL.md) skill for the full template format and compound component patterns.

For the full API reference and advanced patterns, invoke `/anthropic-skills:figma-code-connect`.

---

## Checklist

- [ ] `<Component>.tsx` — `forwardRef`, `extractProps`, `withGlobalPrefix`, `displayName`, `data-testid`
- [ ] `'use client'` directive at top of `.tsx` if the component wraps a Radix UI or Base UI primitive
- [ ] `<Component>.css` — `.h-ComponentName` root selector; variant classes (`h-variant-*`), responsive classes (`h-r-size-*`), data attribute selectors; sub-elements nested under root; token custom properties only (no raw values). See [CSS conventions](references/css-conventions.md).
- [ ] CSS registered in `src/components/index.css` via `@import url('./ComponentName/ComponentName.css')`
- [ ] `<Component>.props.ts` — PropDef object + TypeScript interface; no extra type aliases for primitive props; common props after Picks; **every prop has a JSDoc comment** with `@default` where applicable
- [ ] Component export has a JSDoc comment describing what it is and any non-obvious usage constraints
- [ ] Radix/Base UI imports use `...Primitive` suffix
- [ ] Layout uses `Flex`/`Box`/`Grid`, not extra CSS classnames
- [ ] Typography uses `Heading`, `BodyText`, or `DetailText` — not custom styled elements
- [ ] Spacing uses space tokens (`"200"`, `"400"`) — not raw px
- [ ] `data-*` attributes used for CSS state selectors
- [ ] `<Component>.stories.tsx` — `KitchenSink`, `Playground`, and at least one feature story
- [ ] `<Component>.docs.mdx` — description, KitchenSink canvas, Playground canvas, feature sections, ArgTypes
- [ ] All `<Canvas>` blocks use valid `sourceState` values: `'show'`, `'hide'`, or `'none'` — not `'shown'`/`'hidden'`
- [ ] StorybookLink imports use `import { StorybookLink } from '@utilitywarehouse/hearth-storybook-utils'` (not a relative path)
- [ ] `src/index.ts` updated at the bottom with an empty line separating from previous exports
- [ ] Figma Code Connect template(s) added in `packages/react/figma/`. See [`/figma-code-connect`](./../figma-code-connect/SKILL.md).
- [ ] TypeScript passes — run `npx --node-options="" tsc --noEmit -p packages/react/tsconfig.json 2>&1 | grep "<ComponentName>"` and confirm no errors beyond the pre-existing `@storybook/react-vite` module declaration error
