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
  <Component>.css           # Component CSS (if needed)
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

**Use `data-*` attributes for CSS state, not className variants:**

```tsx
// ✅ CORRECT — data attributes, CSS targets [data-variant="subtle"]
<span data-variant={variant} data-colorscheme={colorScheme} />

// ❌ WRONG
<span className={`${componentClassName}--${variant}`} />
```

Always include `data-testid={componentClassName}` on the root element.

---

## Storybook Stories (`<Component>.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
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

<Meta title="Components / MyComponent" />

<Flex justifyContent="between" alignItems="baseline">
  # MyComponent
  <ViewMarkdownLink to="components/my-component" />
</Flex>

Brief description of what the component is and when to use it.

<Canvas of={Stories.KitchenSink} sourceState="hide" />
<Canvas of={Stories.Playground} sourceState="show" />

## Variants
The `variant` prop controls the visual style.
<Canvas of={Stories.Variants} sourceState="none" />
<Source of={Stories.Variants} />

## API
This component supports the following common props:
- <StorybookLink to="common-props-margin">Margin</StorybookLink>

<ArgTypes of={MyComponent} exclude="margin*" />
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
- [ ] `<Component>.props.ts` — PropDef object + TypeScript interface; no extra type aliases for primitive props; common props after Picks
- [ ] Radix/Base UI imports use `...Primitive` suffix
- [ ] Layout uses `Flex`/`Box`/`Grid`, not extra CSS classnames
- [ ] Typography uses `Heading`, `BodyText`, or `DetailText` — not custom styled elements
- [ ] Spacing uses space tokens (`"200"`, `"400"`) — not raw px
- [ ] `data-*` attributes used for CSS state selectors
- [ ] `<Component>.stories.tsx` — `KitchenSink`, `Playground`, and at least one feature story
- [ ] `<Component>.docs.mdx` — description, KitchenSink canvas, Playground canvas, feature sections, ArgTypes
- [ ] `src/index.ts` updated at the bottom with an empty line separating from previous exports
