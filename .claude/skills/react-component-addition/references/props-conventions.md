# Props Conventions

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

## Critical rules for props

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
