# Responsive Two-Column Layout with hearth-react

To build a responsive two-column layout in hearth-react — stacked on mobile, side-by-side on tablet and above — you'll use the `Box` component for layout and the `Card` component for each column's content.

## Key Components

- **`Box`** — the primary layout primitive. It supports CSS grid and flexbox properties, and accepts responsive values using the `{ mobile, tablet, desktop }` object syntax.
- **`Card`** — used to wrap the content inside each column.

## Responsive Value Syntax

hearth-react components accept responsive prop values as an object with breakpoint keys:

```ts
{ mobile: <value>, tablet: <value>, desktop: <value> }
```

The breakpoints cascade upward, so setting `tablet` applies from tablet onwards unless overridden by `desktop`.

## Example: Two-Column Layout with Cards

```tsx
import { Box, Card } from '@utilitywarehouse/hearth-react';

function TwoColumnLayout() {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ mobile: '1fr', tablet: '1fr 1fr' }}
      gap={{ mobile: 2, tablet: 4 }}
    >
      <Card>
        <Box padding={3}>
          <p>Column 1 content</p>
        </Box>
      </Card>

      <Card>
        <Box padding={3}>
          <p>Column 2 content</p>
        </Box>
      </Card>
    </Box>
  );
}
```

### What this does

- `display="grid"` turns the outer `Box` into a CSS grid container.
- `gridTemplateColumns={{ mobile: '1fr', tablet: '1fr 1fr' }}` gives a single column on mobile and two equal columns on tablet and above.
- `gap={{ mobile: 2, tablet: 4 }}` applies a smaller gap on mobile (when stacked) and a larger gap on tablet and above (when side-by-side). The values map to the design token spacing scale (multiples of 8px by default, so `2` = 16px and `4` = 32px).
- Each column contains a `Card` with a `Box` inside to control internal padding.

## Alternative: Using Flexbox

If you prefer flexbox over grid, you can achieve the same result:

```tsx
import { Box, Card } from '@utilitywarehouse/hearth-react';

function TwoColumnLayout() {
  return (
    <Box
      display="flex"
      flexDirection={{ mobile: 'column', tablet: 'row' }}
      gap={{ mobile: 2, tablet: 4 }}
    >
      <Box flex="1">
        <Card>
          <Box padding={3}>
            <p>Column 1 content</p>
          </Box>
        </Card>
      </Box>

      <Box flex="1">
        <Card>
          <Box padding={3}>
            <p>Column 2 content</p>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
```

### What this does

- `flexDirection={{ mobile: 'column', tablet: 'row' }}` stacks items vertically on mobile and places them side-by-side from tablet onwards.
- `flex="1"` on each inner `Box` ensures both columns grow equally to fill available space.
- The `gap` prop handles spacing between the columns (or rows on mobile).

## Which approach to prefer

Use **CSS grid** (`gridTemplateColumns`) when:
- You want strict equal columns regardless of content.
- You may need to extend to more than two columns later.

Use **flexbox** (`flexDirection`) when:
- Column widths may need to vary (e.g., a sidebar + main content pattern with different `flex` values).
- You want content to dictate column width more naturally.

For a simple equal two-column layout, the grid approach is the most concise.

## Notes on spacing scale

The `gap` prop values (`2`, `4`, etc.) refer to the hearth spacing scale. If you want a specific pixel value you may use CSS string values instead, e.g. `gap="16px"`, but using the scale tokens is preferred for consistency.
