# Tooltip

Use `Tooltip` to temporarily display short, contextual text, that
is not critical information, related to an element when
the element receives keyboard focus or the mouse hovers over it.

- [Setup](#setup)
- [Usage](#usage)
- [Alignment](#alignment)
- [Heading](#heading)
- [Accessibility](#accessibility)
  - [Keyboard interactions](#keyboard-interactions)
- [API](#api)

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

| Prop                     | Type                                                                                                                         | Default     | Description                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `align`                  | `"rightCenter" \| "leftCenter" \| "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "topLeft" \| "topCenter" \| "topRight"` | `topCenter` |                                                                                                                       |
| `aria-label`             | `string`                                                                                                                     | —           | A more descriptive label for accessibility purpose                                                                    |
| `heading`                | `string`                                                                                                                     | —           |                                                                                                                       |
| `hideWhenDetached`       | `boolean`                                                                                                                    | —           |                                                                                                                       |
| `updatePositionStrategy` | `"optimized" \| "always"`                                                                                                    | —           |                                                                                                                       |
| `forceMount`             | `true`                                                                                                                       | —           | Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries. |
| `onEscapeKeyDown`        | `((event: KeyboardEvent) => void)`                                                                                           | —           | Event handler called when the escape key is down. Can be prevented.                                                   |
| `onPointerDownOutside`   | `((event: PointerDownOutsideEvent) => void)`                                                                                 | —           | Event handler called when the a `pointerdown` event happens outside of the `Tooltip`. Can be prevented.               |
| `open`                   | `boolean`                                                                                                                    | —           |                                                                                                                       |
| `defaultOpen`            | `boolean`                                                                                                                    | —           |                                                                                                                       |
| `onOpenChange`           | `((open: boolean) => void)`                                                                                                  | —           |                                                                                                                       |
| `description`            | `ReactNode`                                                                                                                  | —           |                                                                                                                       |
