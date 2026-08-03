# Implementation Conventions

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

## Critical rules for implementation

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
