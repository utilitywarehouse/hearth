# Tooltip

Use Tooltip to temporarily display short, non-critical contextual text
related to an element when it receives keyboard focus or is hovered. It
requires a single child element as its trigger, and must be used within a
TooltipProvider (or the global HearthProvider).

```tsx
<Flex justifyContent="center" padding="800">
  <Tooltip {...args}>
    <UnstyledIconButton label="further information">
      <InfoSmallIcon />
    </UnstyledIconButton>
  </Tooltip>
</Flex>
```

## Setup

`Tooltip` requires a provider to be present in the component tree. You can use
either the global `HearthProvider` or the more specific `TooltipProvider`
depending on your needs.

### HearthProvider

When setting up your application, wrap it with `HearthProvider`. This is the
preferred approach as it includes all necessary providers for Hearth
components, including tooltip support.

```tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App({ children }) {
  return <HearthProvider>{children}</HearthProvider>;
}
```

### TooltipProvider

If you only need tooltip functionality in a specific part of your application,
you can use `TooltipProvider` directly.

```tsx
import { TooltipProvider } from '@utilitywarehouse/hearth-react';

function MyFeature({ children }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
```

## Usage

The `Tooltip` component accepts any single child element as the trigger, and
displays the tooltip content on hover or focus.

```tsx
import { Tooltip } from '@utilitywarehouse/hearth-react';
import { InfoSmallIcon } from '@utilitywarehouse/hearth-react-icons';

<Tooltip description="Helpful information">
  <UnstyledIconButton label="further information">
    <InfoSmallIcon />
  </UnstyledIconButton>
</Tooltip>;
```

You can also use it with other interactive elements, such as buttons:

```tsx
<Flex justifyContent="center" padding="800">
  <Tooltip {...args}>
    <Button variant="outline" colorScheme="functional" size="sm">
      Tooltip
    </Button>
  </Tooltip>
</Flex>
```

## Alignment

Use the `align` prop to control the position of the tooltip relative to the
trigger. The available options are: `topLeft`, `topCenter`, `topRight`,
`bottomLeft`, `bottomCenter`, `bottomRight`, `leftCenter`, and `rightCenter`.

The default alignment is `topCenter`.

```tsx
<Flex direction="column" alignItems="center" gap="400" padding="800">
  <Flex direction="row" gap="400" alignItems="center">
    <Tooltip description="Left Center align" align="leftCenter">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
    <Tooltip description="Right Center align" align="rightCenter">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
  </Flex>
  <Flex direction="row" gap="400">
    <Tooltip description="Bottom Left align" align="bottomLeft">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
    <Tooltip description="Bottom Center align" align="bottomCenter">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
    <Tooltip description="Bottom Right align" align="bottomRight">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
  </Flex>
  <Flex direction="row" gap="400">
    <Tooltip description="Top Left align" align="topLeft">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
    <Tooltip description="Top Center align" align="topCenter">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
    <Tooltip description="Top Right align" align="topRight">
      <UnstyledIconButton label="further information">
        <InfoSmallIcon />
      </UnstyledIconButton>
    </Tooltip>
  </Flex>
</Flex>
```

## Heading

You can optionally include a `heading` alongside the `description` to provide
more structured tooltip content.

```tsx
<Flex justifyContent="center" padding="800">
  <Tooltip {...args}>
    <UnstyledIconButton label="further information">
      <InfoSmallIcon />
    </UnstyledIconButton>
  </Tooltip>
</Flex>
```

## Accessibility

Adheres to the [WAI-ARIA Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) pattern.

### Keyboard interactions

| Key      | Description                                |
| -------- | ------------------------------------------ |
| `Tab`    | Opens/closes the tooltip without delay.    |
| `Space`  | If open, closes the tooltip without delay. |
| `Enter`  | If open, closes the tooltip without delay. |
| `Escape` | If open, closes the tooltip without delay. |

## API

| Prop                   | Type                                                                                                                         | Default     | Description                                                                                                                                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style`                | `CSSProperties \| ((state: TooltipPopupState) => CSSProperties \| undefined)`                                                | —           | Style applied to the element, or a function that returns a style object based on the component's state.                                                                                                                                                     |
| `className`            | `string`                                                                                                                     | —           | CSS class applied to the tooltip content                                                                                                                                                                                                                    |
| `children`             | `ReactElement<unknown, string \| JSXElementConstructor<any>>`                                                                | —           | A single element that acts as the trigger for the tooltip.                                                                                                                                                                                                  |
| `disabled`             | `boolean`                                                                                                                    | `false`     | Whether the tooltip is disabled.                                                                                                                                                                                                                            |
| `open`                 | `boolean`                                                                                                                    | —           | Whether the tooltip is currently open.                                                                                                                                                                                                                      |
| `trackCursorAxis`      | `"none" \| "x" \| "y" \| "both"`                                                                                             | `'none'`    | Determines which axis the tooltip should track the cursor on.                                                                                                                                                                                               |
| `defaultOpen`          | `boolean`                                                                                                                    | `false`     | Whether the tooltip is initially open. To render a controlled tooltip, use the `open` prop instead.                                                                                                                                                         |
| `onOpenChange`         | `((open: boolean, eventDetails: TooltipRootChangeEventDetails) => void)`                                                     | —           | Event handler called when the tooltip is opened or closed.                                                                                                                                                                                                  |
| `onOpenChangeComplete` | `((open: boolean) => void)`                                                                                                  | —           | Event handler called after any animations complete when the tooltip is opened or closed.                                                                                                                                                                    |
| `actionsRef`           | `RefObject<TooltipRootActions \| null>`                                                                                      | —           | A ref to imperative actions. - `unmount`: Unmounts the tooltip popup. - `close`: Closes the tooltip imperatively when called.                                                                                                                               |
| `handle`               | `TooltipHandle<unknown>`                                                                                                     | —           | A handle to associate the tooltip with a trigger. If specified, allows external triggers to control the tooltip's open state. Can be created with the Tooltip.createHandle() method.                                                                        |
| `triggerId`            | `string \| null`                                                                                                             | —           | ID of the trigger that the tooltip is associated with. This is useful in conjunction with the `open` prop to create a controlled tooltip. There's no need to specify this prop when the tooltip is uncontrolled (that is, when the `open` prop is not set). |
| `defaultTriggerId`     | `string \| null`                                                                                                             | —           | ID of the trigger that the tooltip is associated with. This is useful in conjunction with the `defaultOpen` prop to create an initially open tooltip.                                                                                                       |
| `align`                | `"rightCenter" \| "leftCenter" \| "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "topLeft" \| "topCenter" \| "topRight"` | `topCenter` | Sets the position of the tooltip relative to its trigger.                                                                                                                                                                                                   |
| `heading`              | `string`                                                                                                                     | —           | An optional heading shown above the description for more structured tooltip content.                                                                                                                                                                        |
| `description`          | `ReactNode`                                                                                                                  | —           | The content of the tooltip.                                                                                                                                                                                                                                 |
