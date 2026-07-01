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

---

## CSS File (`<Component>.css`)

Every component needs a CSS file. The root selector uses the `h-` prefixed class name.

```css
.h-MyComponent {
  /* Base styles using component-scoped custom properties */
  gap: var(--h-my-component-gap);
  border-radius: var(--h-my-component-border-radius);
  padding: var(--h-my-component-padding);

  /* Variant styles — target the class generated by PropDef/extractProps */
  &:where(.h-variant-subtle) {
    color: var(--h-my-component-subtle-color);
    background-color: var(--h-my-component-subtle-background-color);
  }

  &:where(.h-variant-emphasis) {
    color: var(--h-my-component-emphasis-color);
    background-color: var(--h-my-component-emphasis-background-color);
  }

  /* Data attribute state selectors */
  &:where([data-colorscheme='info']) {
    --h-my-component-subtle-color: var(--h-feedback-info-foreground-default);
    --h-my-component-subtle-background-color: var(--h-feedback-info-surface-subtle);
  }

  /* Responsive variant classes — inside @breakpoints block */
  @breakpoints {
    &:where(.h-r-size-md) {
      --h-my-component-padding: var(--h-my-component-md-padding);
    }

    &:where(.h-r-size-sm) {
      --h-my-component-padding: var(--h-my-component-sm-padding);
    }
  }

  /* Sub-elements — nested under the root selector */
  & :where(.h-MyComponentTrigger) {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
  }

  & :where(.h-MyComponentContent) {
    overflow: hidden;
  }
}
```

### CSS conventions

**Selector patterns:**
- Root: `.h-ComponentName { }` — matches `withGlobalPrefix('ComponentName')`
- PropDef-driven variants: `&:where(.h-variant-subtle)` — the `h-variant-` prefix is generated by `extractProps`; the suffix matches the token value
- Responsive PropDef classes: `&:where(.h-r-size-md)` — `h-r-` prefix for responsive props, inside `@breakpoints { }`
- Data attribute state: `&:where([data-colorscheme='info'])` — for non-PropDef props set via `data-*` attributes
- Sub-elements: `& :where(.h-ComponentNameSubElement)` — nested inside the root selector

**Token custom properties:**
- Use component-scoped tokens (`var(--h-my-component-gap)`) for values that may need theming or overriding. These are defined in `src/styles/tokens/components.css` (auto-generated from Figma tokens — do not hand-edit).
- For one-off values that won't be themed, use global tokens directly: `var(--h-space-200)`, `var(--h-border-radius-md)`, `var(--h-border-subtle)`.
- Never use raw values (`16px`, `#fff`) — always go through the token system.

**Disabled opacity is handled globally — do not add it to component CSS:**
`src/styles/utilities/disabled.css` applies `opacity: var(--h-opacity-disabled)` to any element with `[data-disabled]` or `[aria-disabled="true"]`. Do not add `opacity` rules for disabled state in component CSS. You may still add `cursor: not-allowed` in component CSS since that is not covered globally.

**Radix UI custom properties** (e.g. `--radix-collapsible-content-height`) require a stylelint-disable comment:

```css
/* stylelint-disable-next-line custom-property-pattern, csstools/value-no-unknown-custom-properties -- Radix UI specific custom property */
height: var(--radix-collapsible-content-height);
```

### Register the CSS file

Add an `@import` to `src/components/index.css`. The comment at the top of that file warns that order affects the cascade — add at the bottom unless there's a dependency reason to place it elsewhere:

```css
/* in src/components/index.css */
@import url('./MyComponent/MyComponent.css');
```

---

## Storybook Stories (`<Component>.stories.tsx`)

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

// Comprehensive matrix of all combinations — used in docs, hidden source
export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <Flex gap="200" wrap="wrap">
      {variants.map(v => (
        <MyComponent key={v} variant={v}>Label</MyComponent>
      ))}
    </Flex>
  ),
};

// Interactive sandbox — empty render (uses args/argTypes)
export const Playground: Story = {};

// One story per notable feature
export const Variants: Story = {
  render: () => (
    <Flex gap="200">
      <MyComponent variant="subtle">Subtle</MyComponent>
      <MyComponent variant="emphasis">Emphasis</MyComponent>
    </Flex>
  ),
};
```

---

## Docs (`<Component>.docs.mdx`)

```mdx
import { Meta, Canvas, Source, ArgTypes } from '@storybook/addon-docs/blocks';
import * as Stories from './MyComponent.stories';
import { MyComponent } from './MyComponent';
import { MarkdownDocHeader } from '../../../docs/storybook-components/MarkdownDocHeader';

<Meta title="Components / MyComponent" />

<MarkdownDocHeader title="MyComponent" to="components/my-component" />

Brief description of what the component is and when to use it.

<Canvas of={Stories.KitchenSink} sourceState="hide" />
<Canvas of={Stories.Playground} sourceState="show" />

## Variants
The `variant` prop controls the visual style.
<Canvas of={Stories.Variants} sourceState="none" />
<Source of={Stories.Variants} />

## API

<ArgTypes of={MyComponent} exclude={'margin*'} />
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

## Checklist

- [ ] `<Component>.tsx` — `forwardRef`, `extractProps`, `withGlobalPrefix`, `displayName`, `data-testid`
- [ ] `'use client'` directive at top of `.tsx` if the component wraps a Radix UI or Base UI primitive
- [ ] `<Component>.css` — `.h-ComponentName` root selector; variant classes (`h-variant-*`), responsive classes (`h-r-size-*`), data attribute selectors; sub-elements nested under root; token custom properties only (no raw values)
- [ ] CSS registered in `src/components/index.css` via `@import url('./ComponentName/ComponentName.css')`
- [ ] `<Component>.props.ts` — PropDef object + TypeScript interface; no extra type aliases for primitive props; common props after Picks
- [ ] Radix/Base UI imports use `...Primitive` suffix
- [ ] Layout uses `Flex`/`Box`/`Grid`, not extra CSS classnames
- [ ] Typography uses `Heading`, `BodyText`, or `DetailText` — not custom styled elements
- [ ] Spacing uses space tokens (`"200"`, `"400"`) — not raw px
- [ ] `data-*` attributes used for CSS state selectors
- [ ] `<Component>.stories.tsx` — `KitchenSink`, `Playground`, and at least one feature story
- [ ] `<Component>.docs.mdx` — description, KitchenSink canvas, Playground canvas, feature sections, ArgTypes
- [ ] `src/index.ts` updated at the bottom with an empty line separating from previous exports
