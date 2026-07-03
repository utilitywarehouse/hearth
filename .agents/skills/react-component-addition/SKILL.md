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

Use the `PropDef` system to describe how props map to CSS classes. This drives `extractProps()` at runtime.

```ts
import type { ComponentPropsWithRef } from 'react';
import type { PropDef } from '../../props/prop-def';
import type { MarginProps } from '../../props/margin.props';
import type { Responsive } from '../../types/responsive';

// Define allowed tokens as const tuples for type inference
const variants = ['subtle', 'emphasis', 'outline'] as const;
const sizes = ['sm', 'md'] as const;

export const myComponentPropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'subtle' },
  size:    { className: 'size',    tokens: sizes,    responsive: true,  default: 'md' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  size:    PropDef<(typeof sizes)[number]>;
};

// Interface: component-specific picks come FIRST, shared props (MarginProps etc.) come AFTER
export interface MyComponentProps
  extends Pick<
      ComponentPropsWithRef<'div'>,
      'className' | 'children' | 'id'
    >,
    MarginProps {
  variant?: (typeof variants)[number];
  size?: Responsive<(typeof sizes)[number]>;
  // other component-specific props
}
```

### Critical rules for props

**Prefer `interface` over `type` for props declarations.** Interfaces produce clearer error messages, are open for extension, and are the established convention in this codebase. Use `type` only when the shape cannot be expressed as an interface — for example, a union of two object types or a pure type alias with `&` intersection that involves primitives:

```ts
// ✅ CORRECT — interface for the main props shape
export interface MyComponentProps extends Pick<ComponentPropsWithRef<'div'>, 'className' | 'children'> {
  variant?: 'subtle' | 'emphasis';
}

// ✅ CORRECT — type alias is fine when an interface cannot express it
export type MyComponentVariant = 'subtle' | 'emphasis';

// ❌ AVOID — type alias where an interface would work
export type MyComponentProps = {
  variant?: 'subtle' | 'emphasis';
};
```

**Every prop must have a JSDoc comment.** This drives Storybook's controls panel and the generated LLM docs — undocumented props show up blank in both. Include what the prop does, any constraints or pairing rules, and a `@default` tag where applicable:

```ts
export type MyComponentProps = {
  /**
   * The visual style of the component.
   * @default subtle
   */
  variant?: 'subtle' | 'emphasis';
  /**
   * Sets the height of the component. Accepts a responsive value to display
   * different sizes at different breakpoints.
   * @default md
   */
  size?: Responsive<'sm' | 'md'>;
  /** The content to render inside the component. */
  children?: ReactNode;
};
```

**Consider how to incorporate props from the underlying primitive.** Base UI and Radix primitives expose implementation details in their Props types — Base UI's `Toggle.Props`, for example, adds `render` (slot customisation), `className`/`style` as state callbacks, and `preventBaseUIHandler` on every event handler. The preferred pattern is to use the HTML element type as the base and `Pick` only the behavioural props from the primitive that consumers genuinely need:

```ts
// ✅ PREFERRED — HTML element as base, Pick specific behavioural props from the primitive
export type SegmentedControlOptionProps = Omit<ComponentPropsWithRef<'button'>, 'value' | 'children'>
  & Pick<Toggle.Props, 'pressed' | 'defaultPressed' | 'onPressedChange'>
  & { value: string; label: string; }

// also valid for group-style components — Pick from the primitive, HTML element for the rest
export type SegmentedControlProps = Pick<ToggleGroup.Props, 'value' | 'defaultValue' | 'onValueChange' | 'disabled' | 'loopFocus' | 'orientation' | 'children'>
  & Omit<ComponentPropsWithRef<'div'>, 'onChange'>
  & { size?: Responsive<'sm' | 'md'> }
  & MarginProps

// ❌ AVOID — leaks Base UI internals (render, className callbacks, preventBaseUIHandler)
export type SegmentedControlOptionProps = Toggle.Props & { ... }
```

Add a comment on the type explaining the approach taken and what was deliberately excluded.

**Do not create extra named types for primitive props.** Use `Pick` inline:

```ts
// ✅ CORRECT — inline Pick, no extra type alias
export interface ExpandableCardProps
  extends Pick<
      ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>,
      'open' | 'defaultOpen' | 'onOpenChange' | 'disabled' | 'className'
    >,
    MarginProps {
  heading: string;
}

// ❌ WRONG — unnecessary named alias
type CollapsibleRootProps = ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>;
export interface ExpandableCardProps extends MarginProps, Pick<CollapsibleRootProps, 'open' | ...> {}
```

**Shared/common props go AFTER component-specific picks:**

```ts
// ✅ CORRECT
export interface ExpandableCardProps
  extends Pick<ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>, 'open' | 'disabled'>,
    MarginProps {       // ← common props come after the Pick

// ❌ WRONG
export interface ExpandableCardProps
  extends MarginProps,  // ← common props before the Pick
    Pick<ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>, 'open' | 'disabled'> {
```

---

## Component File (`<Component>.tsx`)

```tsx
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { myComponentPropDefs } from './MyComponent.props';
import type { MyComponentProps } from './MyComponent.props';

const COMPONENT_NAME = 'MyComponent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME); // → 'h-MyComponent'

type MyComponentElement = ComponentRef<'div'>;

export const MyComponent = forwardRef<MyComponentElement, MyComponentProps>((props, ref) => {
  const {
    className,
    children,
    colorScheme = 'info',
    ...componentProps
  } = extractProps(props, myComponentPropDefs, marginPropDefs);

  return (
    <div
      ref={ref}
      className={cn(componentClassName, className)}
      data-colorscheme={colorScheme}
      data-testid={componentClassName}
      {...componentProps}
    >
      {children}
    </div>
  );
});

MyComponent.displayName = COMPONENT_NAME;
```

**Always add a JSDoc comment on the component export.** Follow the [Storybook documenting guidance](https://storybook.js.org/docs/ai/best-practices#documenting-your-components):

- Start with *when* to use this component (not just what it is)
- Call out what to use *instead* when it doesn't apply (e.g. "For navigation, use Tabs instead")
- Add non-obvious constraints (required props, compound component parent requirements)
- Add a short `@summary` tag — a one-liner used by the AI manifest separately from the full description

```tsx
/**
 * Use MyComponent to [do X].
 * For [related use case], use [OtherComponent] instead.
 * [Any non-obvious constraint — e.g. "Must be a direct child of ParentComponent".]
 *
 * @summary [one-line description of when to reach for this component]
 */
export const MyComponent = forwardRef<...>(...);
```

### Critical rules for implementation

**Radix/Base UI imports must be suffixed with `Primitive`:**

```ts
// ✅ CORRECT
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { Tabs as TabsPrimitive } from 'radix-ui';

// ❌ WRONG — no suffix
import { Collapsible } from 'radix-ui';
```

**Use `Flex` for layout instead of inventing CSS classnames for wrapper divs:**

The most common mistake is adding a `<div className={`${componentClassName}Content`}>` wrapper just to arrange children — this creates CSS surface area that doesn't need to exist. Use `Flex` (or `Box`/`Grid`) directly:

```tsx
// ✅ CORRECT
<Flex direction="column" gap="200">
  <Heading as="h3" variant="h3">{heading}</Heading>
  <BodyText>{description}</BodyText>
</Flex>

// ❌ WRONG — wrapper div with a generated classname purely for layout
<div className={`${componentClassName}Content`}>
  <span className={`${componentClassName}Heading`}>{heading}</span>
</div>
```

**Use typography components (`Heading`, `BodyText`, `DetailText`) — never a styled span/div:**

```tsx
// ✅ CORRECT
<Heading as="h3" variant="h3">{title}</Heading>
<BodyText size="md" color="secondary">{subtitle}</BodyText>

// ❌ WRONG — adding custom classnames for typography
<span className={`${componentClassName}Title`}>{title}</span>
```

**Use space tokens for spacing — never raw px values:**

```tsx
// ✅ CORRECT
<Flex gap="200" padding="400" />

// ❌ WRONG
<Flex gap={8} style={{ padding: '16px' }} />
```

**Use PropDef/extractProps classes (e.g. `.h-variant-subtle`) and `data-*` attributes for state — avoid custom variant className patterns:**

~~~tsx
// ✅ CORRECT — variants via PropDef/extractProps classes; other state via data-*
<span className="h-MyComponent h-variant-subtle" data-colorscheme="info" />

// ❌ WRONG — custom className patterns for variants/state
<span className={`${componentClassName}--${variant}`} />
~~~

Always include `data-testid={componentClassName}` on the root element.

**Use the `warn` helper for dev-mode warnings — never `console.warn` directly:**

A logger helper lives at `src/helpers/logger.ts`. Use it for deprecated props or any condition that should surface a warning in development but be silent in production.

```ts
import { warn } from '../../helpers/logger';

// warn(condition, message) — fires only in non-production
warn(legacyProp !== undefined, 'MyComponent: `legacyProp` is deprecated. Use `newProp` instead.');
```

The message is automatically prefixed with `[Hearth React Warning]:`.

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

See [Storybook best practices](https://storybook.js.org/docs/ai/best-practices.md) for full guidance. Key rules from the [documenting your components](https://storybook.js.org/docs/ai/best-practices#documenting-your-components) section:

- **Each story demonstrates one concept** — do not mix unrelated variations (e.g. sizes AND icons AND disabled all in one story). The `KitchenSink` is the only exception; tag it with `tags: ['!manifest']` to exclude it from AI manifests.
- **JSDoc on every story export** — describe *why* you would use whatever is demonstrated, not just *what* it shows. A description that restates the story name adds no value.
- **`KitchenSink` always gets `tags: ['!manifest']`** — it mixes too many concepts to be a useful AI reference.

```tsx
// ✅ CORRECT — describes why, not what
/** Use the `icon` prop to pair an icon with each label. Match Small icons to size="sm" and Medium icons to size="md". */
export const WithIcons: Story = { ... };

// ❌ WRONG — just restates the story name
/** Shows the component with icons. */
export const WithIcons: Story = { ... };
```

### Using service options in stories

When a story needs realistic multi-option examples, use the full set of UW services — each has a paired icon in `@utilitywarehouse/hearth-react-icons`. Never use a subset; always use all six so the story reflects real usage.

| Service | Small icon | Medium icon |
|---------|-----------|-------------|
| Gas | `GasSmallIcon` | `GasMediumIcon` |
| Electricity | `ElectricitySmallIcon` | `ElectricityMediumIcon` |
| Mobile | `MobileSmallIcon` | `MobileMediumIcon` |
| Broadband | `BroadbandSmallIcon` | `BroadbandMediumIcon` |
| Insurance | `InsuranceSmallIcon` | `InsuranceMediumIcon` |
| Cashback | `CashbackCardSmallIcon` | `CashbackCardMediumIcon` |

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { MyComponent } from './MyComponent';
const variants = ['subtle', 'emphasis'] as const;
const sizes = ['sm', 'md'] as const;

const meta: Meta<typeof MyComponent> = {
  title: 'Components / MyComponent',
  component: MyComponent,
  argTypes: {
    variant: { options: variants, control: { type: 'radio' } },
    size:    { options: sizes,    control: { type: 'radio' } },
    children: { control: { type: 'text' } },
  },
  args: {
    variant: 'subtle',
    size: 'md',
    children: 'MyComponent',
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

/**
 * Visual matrix of all combinations — used in docs and Chromatic snapshot testing.
 * Not a usage reference; excluded from AI manifests via the !manifest tag.
 */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <Flex gap="200" wrap="wrap">
      {variants.map(v => (
        <MyComponent key={v} variant={v}>Label</MyComponent>
      ))}
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  render: args => <MyComponent {...args} />,
};

/** One story per notable feature, each demonstrating a single concept. */
export const Variants: Story = {
  render: () => (
    <Flex gap="200">
      <MyComponent variant="subtle">Subtle</MyComponent>
      <MyComponent variant="emphasis">Emphasis</MyComponent>
    </Flex>
  ),
};
```

### Story best practices

**One concept per story**: each feature story should demonstrate a single concept or usage pattern. Avoid stories that combine multiple unrelated concerns (e.g. "SizesAndVariants"). If a matrix of combinations is needed for visual testing, put it in `KitchenSink` and tag it `['!manifest']`.

**JSDoc on every export**: add a `/** ... */` JSDoc comment above each story export explaining the *why* — what the story demonstrates and when a developer should use that pattern. This is used by Storybook's AI manifest system to describe the story to agents.

**Tag `KitchenSink` with `['!manifest']`**: the comprehensive matrix mixes too many concepts to be useful as an AI reference. The tag excludes it from Storybook's AI manifest while keeping it in docs and Chromatic.

**One story per variant/state**: add dedicated stories for each meaningful feature — sizes, icons, disabled, multiple selection — rather than relying solely on `KitchenSink`. This makes docs more navigable and gives agents clear, focused examples.

**Use meta-level `args` for defaults**: set shared defaults (size, defaultValue, etc.) in `meta.args` rather than hardcoding them in each story's `render`. Stories can override individual args when they need to demonstrate a specific state.

---

## Docs (`<Component>.docs.mdx`)

```mdx
import { Meta, Canvas, ArgTypes } from '@storybook/addon-docs/blocks';
import * as Stories from './MyComponent.stories';
import { MyComponent } from './MyComponent';
import { MarkdownDocHeader } from '../../../docs/storybook-components/MarkdownDocHeader';
import { StorybookLink } from '@utilitywarehouse/hearth-storybook-utils';

<Meta title="Components / MyComponent" />

<MarkdownDocHeader title="MyComponent" to="components/my-component" />

Brief description of what the component is and when to use it.

- [Usage](#usage)
- [Variants](#variants)
- [API](#api)

<Canvas of={Stories.KitchenSink} sourceState="show" />

## Usage

Brief usage description with a code example.

```tsx
<MyComponent variant="subtle">Label</MyComponent>
\```

<Canvas of={Stories.Playground} sourceState="show" />

## Variants

The `variant` prop controls the visual style.

<Canvas of={Stories.Variants} sourceState="show" />

## API

This component is based on the [Base UI X primitive](https://base-ui.com/react/components/x)
and supports the following common props:

- <StorybookLink to="common-props-margin">Margin</StorybookLink>

<ArgTypes
  of={MyComponent}
  include={'variant|size|disabled'}
  exclude={'aria-*'}
/>
```

### API section rules

- **Import components directly** for `ArgTypes` (e.g. `import { MyComponent } from './MyComponent'`) — not via `Stories.*`. `of={MyComponent}` gives accurate prop types; `of={Stories.Playground}` can show incorrect or missing props.
- **Use `include` to explicitly list props** shown in the API table rather than relying on the default. This prevents internal or inherited HTML props from cluttering the docs.
- **Always add `exclude={'aria-*'}`** — aria props are inherited from the HTML element and not worth documenting per-component.
- **Note the underlying primitive or element** at the top of the API section — e.g. "This component is based on the [Base UI ToggleGroup primitive](https://base-ui.com/react/components/toggle-group)" or "This component is based on the `button` element." Link to the Base UI docs when wrapping a Base UI primitive.
- **Import `StorybookLink` from `@utilitywarehouse/hearth-storybook-utils`** — not from a relative path.

### Compound component API

For compound components, use a single `## API` section with a `###` subsection per sub-component — not separate top-level sections:

```mdx
## API

This component is based on the [Base UI X primitive](https://base-ui.com/react/components/x)
and supports the following common props:

- <StorybookLink to="common-props-margin">Margin</StorybookLink>

<ArgTypes of={MyComponent} include={'size|disabled'} exclude={'aria-*'} />

### MyComponentItem API

This component is based on the `button` element.

<ArgTypes of={MyComponentItem} include={'value|label|icon|disabled'} exclude={'aria-*'} />
```

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
- [ ] `src/index.ts` updated at the bottom with an empty line separating from previous exports
- [ ] Figma Code Connect template(s) added in `packages/react/figma/`. See [`/figma-code-connect`](./../figma-code-connect/SKILL.md).
- [ ] TypeScript passes — run `npx --node-options="" tsc --noEmit -p packages/react/tsconfig.json 2>&1 | grep "<ComponentName>"` and confirm no errors beyond the pre-existing `@storybook/react-vite` module declaration error
