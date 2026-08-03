# Docs Conventions

~~~mdx
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
```

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
~~~

## Section headings

`## Usage` in the template above is a starting point. Prefer feature-specific headings that match the component's props — `## Variants`, `## Sizes`, `## Label`, `## Disabled`, `## Read-only`, etc. Reserve `## Usage` for genuinely generic guidance that doesn't fit a more specific heading.

Include a table of contents (anchor link list) when the docs page has **4 or more sections**.

## `sourceState` valid values

Valid values for the `sourceState` attribute on `<Canvas>`:

| Value | Effect |
|-------|--------|
| `'show'` | Shows the code panel expanded |
| `'hide'` | Shows the code panel collapsed |
| `'none'` | Hides the code panel entirely |

**Never use `'shown'` or `'hidden'`** — these are silently invalid and fall back to the default.

## API section rules

- **Import components directly** for `ArgTypes` (e.g. `import { MyComponent } from './MyComponent'`) — not via `Stories.*`. `of={MyComponent}` gives accurate prop types; `of={Stories.Playground}` can show incorrect or missing props.
- **Use `include` to explicitly list props** shown in the API table rather than relying on the default. This prevents internal or inherited HTML props from cluttering the docs.
- **Always add `exclude={'aria-*'}`** — aria props are inherited from the HTML element and not worth documenting per-component.
- **Note the underlying primitive or element** at the top of the API section — e.g. "This component is based on the [Base UI ToggleGroup primitive](https://base-ui.com/react/components/toggle-group)" or "This component is based on the `button` element." Link to the Base UI docs when wrapping a Base UI primitive.
- **Import `StorybookLink` from `@utilitywarehouse/hearth-storybook-utils`** — not from a relative path.

## Compound component API

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

## Optional sections

Include these sections when applicable — do not add them to every component's docs:

- **`## Alternatives`**: include when 2 or more other components serve overlapping use cases (e.g., TextInput / PasswordInput / CurrencyInput / SearchInput family). Cross-link peers with `<StorybookLink>`.
- **`## Accessibility`**: required for interactive components with keyboard interactions, ARIA roles, focus management, or non-obvious screen reader behaviour (e.g., modals with focus traps, roving tabindex groups, components with `role="search"`). Optional for purely visual components.
