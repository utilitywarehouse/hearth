# Grid

The Grid component helps you create responsive grid layouts with configurable columns and spacing. It's perfect for creating photo galleries, card layouts, and other grid-based UI elements.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## Playground

```tsx
// Example usage
<Grid {...args} style={{ width: 400 }}>
  <GridItem color="#FFD6D6" />
  <GridItem color="#D6FFD6" />
  <GridItem color="#D6D6FF" />
  <GridItem color="#FFFFD6" />
  <GridItem color="#FFD6FF" />
  <GridItem color="#D6FFFF" />
</Grid>
```

## Usage

```jsx
// Example usage
import { Grid, Box, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Grid columns={2} spacing="md" width={300}>
    <Box backgroundColor={color.green[400]} height={100} padding="200">
      <BodyText color="inverted">Item 1</BodyText>
    </Box>
    <Box backgroundColor={color.blue[400]} height={100} padding="200">
      <BodyText color="inverted">Item 2</BodyText>
    </Box>
    <Box backgroundColor={color.red[400]} height={100} padding="200">
      <BodyText color="inverted">Item 3</BodyText>
    </Box>
    <Box backgroundColor={color.yellow[400]} height={100} padding="200">
      <BodyText color="inverted">Item 4</BodyText>
    </Box>
  </Grid>
);
```

### Responsive Columns

The Grid component supports responsive column layouts based on screen size breakpoints:

```jsx
// Example usage
import { Grid, Box, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Grid
    columns={{
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    }}
    spacing="md"
    width="100%"
  >
    <Box backgroundColor={color.green[400]} height={100} padding="200">
      <BodyText color="inverted">Item 1</BodyText>
    </Box>
    <Box backgroundColor={color.blue[400]} height={100} padding="200">
      <BodyText color="inverted">Item 2</BodyText>
    </Box>
    <Box backgroundColor={color.red[400]} height={100} padding="200">
      <BodyText color="inverted">Item 3</BodyText>
    </Box>
    <Box backgroundColor={color.yellow[400]} height={100} padding="200">
      <BodyText color="inverted">Item 4</BodyText>
    </Box>
  </Grid>
);
```

### Custom Gaps

You can specify different horizontal and vertical spacing:

```jsx
// Example usage
import { Grid, Box, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Grid columns={2} columnGap={24} rowGap={8}>
    <Box backgroundColor={color.green[400]} height={100} padding="200">
      <BodyText color="inverted">Item 1</BodyText>
    </Box>
    <Box backgroundColor={color.blue[400]} height={100} padding="200">
      <BodyText color="inverted">Item 2</BodyText>
    </Box>
    <Box backgroundColor={color.red[400]} height={100} padding="200">
      <BodyText color="inverted">Item 3</BodyText>
    </Box>
    <Box backgroundColor={color.yellow[400]} height={100} padding="200">
      <BodyText color="inverted">Item 4</BodyText>
    </Box>
  </Grid>
);
```

## Props

The Grid component extends all the props from the [View component](https://reactnative.dev/docs/view), and adds the following:

| Name             | Type                                                               | Default | Description                                                   |
| ---------------- | ------------------------------------------------------------------ | ------- | ------------------------------------------------------------- |
| `columns`        | `number` or `GridColumns`                                          | 2       | Number of columns or responsive object with breakpoint values |
| `spacing`        | `'none' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | -       | Spacing between grid items (both rows and columns)            |
| `columnGap`      | `number`                                                           | -       | Gap between columns (overrides spacing if provided)           |
| `rowGap`         | `number`                                                           | -       | Gap between rows (overrides spacing if provided)              |
| `containerStyle` | `StyleProp\<ViewStyle\>`                                           | -       | Style for the grid container                                  |
| `itemStyle`      | `StyleProp\<ViewStyle\>`                                           | -       | Style applied to each grid item                               |
| `rowStyle`       | `StyleProp\<ViewStyle\>`                                           | -       | Style applied to each row                                     |

Where `GridColumns` is defined as:

```tsx
// Example usage
type GridColumns = {
  [key in keyof UnistylesBreakpoints]?: number;
};
```

With breakpoint keys typically being: `xs`, `sm`, `md`, `lg`, `xl`.
